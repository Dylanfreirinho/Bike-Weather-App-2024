import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Settings from './components/Settings';
import Weather from './components/Weather';
import History from './components/History';
import Navigation from './components/Navigation';
import './App.css';

// hoofd component
const App = () => {
  // state voor de gebruiker id en de instellingen
  const [userId, setUserId] = useState(null);
  const [initSettings, setInitSettings] = useState({
    location: '',
    knockOutFactors: {
      wind: 0,
      rain: 0,
      cold: 0,
      hot: 0,
      snow: 0,
    },
    timePreferred: '08:00',
  });

  //haalt de instellingen op van de gebruiker
  useEffect(() => {
    const fetchSettings = async () => {
      const userIdFromCookie = Cookies.get('user_id');
      if (userIdFromCookie) {
        try {
          const response = await axios.get('http://127.0.0.1:3001/api/settings');
          setInitSettings(response.data);
          setUserId(userIdFromCookie);
        } catch (error) {
          console.error('Fout bij ophalen instellingen: ', error);
      }
    }
  }
    fetchSettings();
  }, []);


  // rendeert de navigatie en de routes
  return (
    <Router>
      <Navigation />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Weather userId={userId} />} />
          <Route path="/settings" element={<Settings initSettings={initSettings} setUserId={setUserId} />} /> 
          <Route path="/history" element={<History  />} />
        </Routes>
      </div>
   </Router>  
  );
}

export default App;
