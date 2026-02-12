from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import json
import os
import uuid
from config import OPENWEATHERMAP_API_KEY

# flask app initialisatie
app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)

base_dir = os.path.dirname(__file__)


settings_dir = os.path.join(base_dir, 'settings')


# maakt de settings directory aan als deze nog niet bestaat
if not os.path.exists(settings_dir):
    os.makedirs(settings_dir)
else:
    print('settings directory already exists')
   
# shows the settings of the user
def settings_load(user_id):
    if not user_id:
        return {
            'location': '',
            'knockOutFactors': {
                'wind': 0,
                'rain': 0,
                'cold': 0,
                'hot': 0,
                'snow': 0
            },
            'timePreferred': '08:00'
        }
    file_with_settings = os.path.join(settings_dir, f'{user_id}.json')
    if os.path.exists(file_with_settings):
        with open(file_with_settings, 'r') as file:
            return json.load(file)
    return {
        'location': '',
        'knockOutFactors': {
            'wind': 0,
            'rain': 0,
            'cold': 0,
            'hot': 0,
            'snow': 0
        },
        'timePreferred': '08:00'
    }

# slaat de instellingen van de gebruiker op     
def settings_save(user_id, settings):
    file_with_settings = os.path.join(settings_dir, f'{user_id}.json')
    with open(file_with_settings, 'w') as file:
        json.dump(settings, file)
        
 # route voor het ophalen van de instellingen van de gebruiker       
@app.route('/api/settings', methods=['GET'])
def settings_get():
    user_id = request.cookies.get('user_id')
    if user_id:
        return jsonify(settings_load(user_id))
    else:
        return jsonify(settings_load(None))

# route voor het updaten van de instellingen van de gebruiker
@app.route('/api/settings', methods=['POST'])
def settings_update():
    user_id = request.cookies.get('user_id')
    if not user_id:
        user_id = str(uuid.uuid4())
        
    settings = request.json
    settings_save(user_id, settings)
    
    response = jsonify({'status': 'success', 'user_id': user_id})
    response.set_cookie('user_id', user_id)
    return response

# route voor het ophalen van de weerdata van de gebruiker
@app.route('/api/weather/<user_id>', methods=['GET'])
def weather_get(user_id):
    settings = settings_load(user_id)
    location = settings['location']
    time_preferred = settings['timePreferred']
    hours_preferred = str((int(time_preferred.split(':')[0]) // 3) * 3).zfill(2)
    
    # API URL
    key = OPENWEATHERMAP_API_KEY
    url = f'https://api.openweathermap.org/data/2.5/forecast?q={location}&appid={key}&units=metric'
    
    # haalt de weerdata op van de API
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        forecast = data['list']
        weather_data = {
            "id": user_id,
            "location": location,
            "departure": time_preferred,
            "okay_to_bike": []
        }
        
        # controleert of het weer goed genoeg is om te fietsen
        for item in forecast:
            date = item['dt_txt'].split(' ')[0]
            time = item['dt_txt'].split(' ')[1][:5]
            if time.startswith(hours_preferred):
                bike_okay = True
                if item['wind']['speed'] > float(settings['knockOutFactors']['wind']):
                    bike_okay = False
                if item['pop'] > float(settings['knockOutFactors']['rain']) / 100:
                    bike_okay = False
                if item['main']['temp'] < float(settings['knockOutFactors']['cold']):
                    bike_okay = False
                if item['main']['temp'] > float(settings['knockOutFactors']['hot']):
                    bike_okay = False
                if 'snow' in item and item['snow'].get('3h', 0) > float(settings['knockOutFactors']['snow']) / 100:
                    bike_okay = False
                weather_data["okay_to_bike"].append({
                    "date": date,
                    "bike_okay": bike_okay
                })
        return jsonify(weather_data)
    else:
        return jsonify({'error': 'weer data kan niet worden opgehaald'}), 500

# route voor het ophalen van de instellingen van de gebruiker
@app.route('/api/settings/history', methods=['GET'])
def settings_history():
    settings_history = []
    for filename in os.listdir(settings_dir):
        if filename.endswith('.json'):
            user_id = filename.split('.')[0]
            settings = settings_load(user_id)
            settings_history.append({
                'user_id': user_id,
                'settings': settings})
    return jsonify(settings_history)


# route voor het ophalen van de weerdata van de gebruiker
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

# route voor het ophalen van de statische bestanden
@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

# start de app in debug mode
if __name__ == '__main__':
    app.run(debug=True, port=3001)