FIETSWEER APP

De fietsweer app maakt het voor de gebruikers mogelijk om de weersvoorspelling te kunnen controleren en de fiets weer condities te bepalen op basis van persoonlijke instellingen

INHOUDSOPGAVE

1. OVERZICHT
2. INSTALLATIE
3. GEBRUIK
4. EEN NIEUWE API SLEUTEL AANVRAGEN
5. TECHNOLOGIEËN EN BIBLIOTHEKEN
6. MAPPENSTRUCTUUR
7. BIJDRAGE

OVERZICHT:
De fietsweer applicatie maakt gebruik van de OpenWeatherMap API om de gebruikers te kunnen voorzien van de weersinformatie. Gebruikers kunnen de instellingen naar hun voorkeuren instellen zoals de locatie, voorkeur voor de vertrektijd, de uitsluitingsfactoren zoals wind, regen, kou warmte en sneeuw

INSTALLATIE:

volg de volgende stappen om de applicatie te installeren en uit te voeren

1. Clone de repository:
git@github.com:Rac-Software-Development/werkplaats-4---inhaalopdracht-Dylan-1024040.git cd fietsweer-app

# installeer frontend (React) onderdelen
2. installeer de frontend en backend dependencies:
cd frontend
npm install

# installeer de backend (Flask) onderdelen
cd..
cd backend
python -m venv venv
source venv/bin/activate op Unix of MacOS of venv\Scripts\activate op windows
pip install -r requirements.txt

3. start de backend server:
# Vanuit de backend-map
flask run

4. Start de frontend dev server:
# Vanuit de frontend-map
npm install

npm start

5. Open de app in je browser: http://localhost:3000

GEBRUIK:
1. Homepagina: Toont de fiets weer adviezen voor de komende drie dagen (vandaag, morgen en overmorgen) op basis van uw ingestelde voorkeuren

2. Instellingen: Hier kunt u de voorkeuren aanpassen zoals locatie, vertrektijd, en de factoren voor wind, regen, kou, warmte en sneeuw.

3. Geschiedenis: Bekijk de geschiedenis van alle opgeslagen instellingen, daar wordt onder meer gebruik gemaakt van cookies De laatst ingestelde instellingen wordt altijd als eerste getoond


EEN NIEUWE API-sleutel aanvragen
1. Ga naar de website van OpenWeatherMap en maak een account aan of log in (https://home.openweathermap.org/users/sign_up) of (https://home.openweathermap.org/users/sign_in)

2. Ga naar de profiel instellingen en zoek de sectie waar u de API-sleutels kunt beheren

3. Genereer een nieuwe API-sleutel voor het gebruik van de API

4. Vervang de oude API-key in de back-end

TECHNOLOGIEËN EN BIBLIOTHEKEN:
- Frontend: React, react-router-dom, axios, js-cookies, JavaScript, HTML, CSS

- Backend: Flask (Python), Flask-CORS, requests, JSON, Python, os, uuid

MAPPENSTRUCTUUR:
fietsweer-app/
|
|---frontend/          # frontend-code (React)
|      |-public/
|      |-src/
|      |  |--components/
|      |  |--app.jsx
|
|
|---backend/
       |---app.py
       |--- settings/  
       |--- venv/

# sidenote: de settings folder in de backend wordt automatisch aangemaakt zodra de backend runt, hierin worden de user-id's met de waardes bewaard

### API endpoints:
- '/api/settings'
GET: Haal de huidige instellingen op
POST: Werk de instellingen bij
- '/api/weather/<user_id>'
GET: Haal de weersvoorspellingen en fietsadviezen op voor een specifieke gebruiker
- '/api/settings/history'
GET: Haal de geschiedenis van alle opgeslagen instellingen op


BIJDRAGE:
Voel u vrij om opmerkingen te plaatsen over het project. Feedback is altijd welkom en daardoor wil ik ook blijven groeien als ontwikkelaar en als mens.


Hogeschool Rotterdam 2024

Dylan Mendes Freire (1024040)



MIT LICENSE
