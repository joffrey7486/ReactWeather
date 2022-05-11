import React, { useState } from "react";
import env from "react-dotenv";

const Weather = () => {
    const api = env.APIKEY;
    const url = env.URL; 

    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    const search = (e) => {
        if (e.key === "Enter") {
            fetch(`${url}weather?q=${query}&units=metric&lang=fr&appid=${api}`)
                .then(res => res.json())
                .then(data => {
                    setWeather(data);
                    setQuery("");
                    console.log(data);
                });
        }
    }

    const dateBuilder = (d) => {
        let months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
        let days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    }

    return (

        <main>
            <div className="search-box">
                <input type="text" placeholder="Rechercher..." value={query} onChange={e => setQuery(e.target.value)} onKeyPress={search} />
            </div>
            {(typeof weather.main != "undefined") ? (
                <div className="weather-box">
                    <div className="location">{weather.name}, {weather.sys.country}</div>
                    <div className="date">{dateBuilder(new Date())}</div>
                    <div className="weather-results">
                        <div className="weather-icon">
                            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt=""/>
                        </div> 
                        <div className="weather">{weather.weather[0].description}</div>
                        <div className="weather-temp">
                        <p>Entre: {Math.round(weather.main.temp_min)}°C et {Math.round(weather.main.temp_max)}°C</p>
                        </div>
                    </div>
                </div>

            ) : (
                    <div className="weather-box">
                        <div className="location">Veuillez entrer une ville</div>
                    </div>
                )}
        </main>

    )     
}

export default Weather;
