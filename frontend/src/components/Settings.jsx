import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie";    

// component voor het instellen van de instellingen
const Settings = ({ initSettings, setUserId }) => {
    const [location, setLocation] = useState(initSettings.location);
    const [knockOutFactors, setKnockOutFactors] = useState(initSettings.knockOutFactors);
    const [timePreferred, setTimePreferred] = useState(initSettings.timePreferred);
    const navigate = useNavigate();
    
    // functie om de instellingen op te slaan
    const submitSettings = async (e) => {
        e.preventDefault();
        // slaat de instellingen op
        const settings = { location, knockOutFactors, timePreferred };
        try {
            const response = await axios.post('http://127.0.0.1:3001/api/settings', settings);
            const { user_id } = response.data;
            Cookies.set('user_id', user_id, { expires: 7 });
            Cookies.set('settings', JSON.stringify(settings), { expires: 7 });
            localStorage.setItem('user_id', user_id);
            localStorage.setItem('settings', JSON.stringify(settings));
            navigate('/');
        } catch (error) {
            console.error('Fout bij opslaan instellingen: ', error);
        }
    };

    // rendeert het formulier voor het instellen van de instellingen
    return (
        <div className="container">
        <form onSubmit={submitSettings}>
            <label>
                Locatie:
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </label>
            <label>
                Wind (km/h):
                <input type="number" value={knockOutFactors.wind} onChange={(e) => setKnockOutFactors({ ...knockOutFactors, wind: e.target.value })} />
            </label>
            <label>
                Regen (% kans):
                <input type="number" value={knockOutFactors.rain} onChange={(e) => setKnockOutFactors({ ...knockOutFactors, rain: e.target.value })} />
            </label>
            <label>
                Koud (°C):
                <input type="number" value={knockOutFactors.cold} onChange={(e) => setKnockOutFactors({ ...knockOutFactors, cold: e.target.value })}  />
            </label>
            <label>
                Warm (°C):
                <input type="number" value={knockOutFactors.hot} onChange={(e) => setKnockOutFactors({ ...knockOutFactors, hot: e.target.value })}/>
            </label>
            <label>
                Sneeuw (% kans):
                <input type="number" value={knockOutFactors.snow} onChange={(e) => setKnockOutFactors({ ...knockOutFactors, snow: e.target.value })} />
            </label>
            <label>
                Tijd:
                <input type="time" value={timePreferred} onChange={(e) => setTimePreferred(e.target.value)} />
            </label>
            <button type="submit">Opslaan</button>
            <button type="button" onClick={() => navigate('/')}>Annuleren</button>
        </form>
        </div>
    );
};

export default Settings;