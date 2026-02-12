import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// component voor het weer advies
const Weather = () => {
    const [dataWeather, setDataWeather ] = useState({
        location: '',
        departure: '',
        okay_to_bike: [],
    });
    
    // haalt de weer data op
    useEffect(() => {
        const userId = Cookies.get('user_id');
        if (userId) {
            const fetchWeather = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:3001/api/weather/${userId}`);
                    setDataWeather(response.data);
                    console.log('weer data opgehaald', response.data);
            } catch (error) {
                console.error('Fout bij ophalen weer data: ', error);
            }
        };
        fetchWeather();
}

}, []);

    // rendeert de weer data
    return (
        <div className="container">
            <h2>Weer voospelling</h2>
            <p>Locatie: {dataWeather.location}</p>
            <p>VertrekTijd: {dataWeather.departure}</p>
            {dataWeather.okay_to_bike.slice(0, 3).map((data, index) => (
                <div key={index}>
                    <p>Datum: {data.date}</p>
                    <p>
                        Fietsweer: 
                        {data.bike_okay ? (
                            <span style={{ color: 'green', fontSize: '24px' }}>&#10003;</span>
                        ) : (
                            <span style={{ color: 'red', fontSize: '24px' }}>&#10005;</span>
                        )}
                    </p>
                </div>
            ))}
        </div>

    );
};

export default Weather;