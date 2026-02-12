import React, { useState, useEffect } from 'react';
import axios from 'axios';

// component om de instellingen geschiedenis te tonen
const History = () => {
    const [history, setHistory] = useState([]);
     // haalt de geschiedenis van de instellingen op
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3001/api/settings/history');
                setHistory(response.data);
            } catch (error) {
                console.error('Fout bij ophalen geschiedenis: ', error);
        };
    }

        fetchHistory();
    }, []); 

// rendeer de instellingen geschiedenis    
return (
    <div className='container'>
        <h2>instellingen Geschiedenis</h2>
        { history.length > 0 ? (
        history.map((entry, index) => (
            <div key={index} className='entry-history'>
                <h3>Gebruiker ID: {entry.user_id}</h3>
                <p>Locatie: {entry.settings.location}</p>
                <p>Wind: {entry.settings.knockOutFactors.wind}</p>
                <p>Regen: {entry.settings.knockOutFactors.rain}</p>
                <p>Koud: {entry.settings.knockOutFactors.cold}</p>
                <p>Warm: {entry.settings.knockOutFactors.hot}</p>
                <p>Sneeuw: {entry.settings.knockOutFactors.snow}</p>
                <p>Tijd: {entry.settings.timePreferred}</p>
            </div>
        ))
    ): (
        <p>Geen instellingen gevonden</p>
    )}   
    </div>
);
};

export default History;