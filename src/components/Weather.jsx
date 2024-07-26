// rafce --> to create a React arrow function

// import React from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import sun_icon from '../assets/sunny.png'
import wind_icon from '../assets/wind.png'
import { useEffect, useRef, useState } from 'react'

const Weather = () => {

    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": sun_icon,
        "01n": sun_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    // API call using Open Weather API 
    const search = async (city) => {
        if (city === "") {
            alert("Enter the city name.");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || cloud_icon;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })

        } catch (error) {
            setWeatherData(false)
            console.error("Error in fetching weather data.")
        }
    }

    useEffect(() => {
        search("London");
    }, [])


    return (

        // Main weather component
        <div className='weather'>
            {/* Search bar component */}
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search' />
                <img src={search_icon} className='search-icon' onClick={() => search(inputRef.current.value)} />
            </div>

            {weatherData ? <>

                {/* Weather icon and local temp/location  */}
                <img src={weatherData.icon} className='weather-icon' />
                <p className='temperature'>{weatherData.temperature} °c</p>
                <p className='location'>{weatherData.location}</p>

                {/* Weather data */}
                <div className="weather-data">

                    {/* Drizzle weather */}
                    <div className="col">
                        <img src={drizzle_icon} />
                        <div>
                            <p>{weatherData.humidity} %</p>
                            <span>Humidity</span>
                        </div>
                    </div>

                    {/* Wind weather  */}
                    <div className="col">
                        <img src={wind_icon} />
                        <div>
                            <p>{weatherData.windSpeed} Km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>

            </> : <></>}


        </div>
    )
}

export default Weather
