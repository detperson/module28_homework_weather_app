import React, {useState} from "react";
import './App.css'
import {InputForm} from "./Components/InputForm/InputForm";
import {WeatherToday} from "./Components/WeatherToday/WeatherToday";
import {WeatherDays} from "./Components/WeatherDays/WeatherDays";
import {ForecastNav} from "./Components/ForecastNav/ForecastNav";


function App() {
    const [weather, setWeather] = useState([])
    const [weather5Days, setWeather5Days] = useState([])
    const [todayOr5Days, setTodayOr5Days] = useState('')

    const createWeatherArr = (weatherArr) => {
        setWeather(weatherArr)
    }

    const createWeather5Arr = (weather5Arr) => {
        setWeather5Days(weather5Arr)
    }

    const weatherTime = (result) => {
        setTodayOr5Days(result)
    }

    return (
        <div className="wrapper">
            <div className="_container">
                <div className="main-input">
                    <div className='header__logo'>Weather</div>
                    <InputForm onFetchToday={createWeatherArr} onFetch5Days={createWeather5Arr} weatherTime={weatherTime} />
                    {todayOr5Days && <ForecastNav weatherTime={weatherTime} todayOr5Days={todayOr5Days} />}
                </div>
                {todayOr5Days === 'today' ? <WeatherToday weather={weather} /> : ''}
                {todayOr5Days === '5days'? <WeatherDays weather={weather} weather5Days={weather5Days} /> : ''}
            </div>
        </div>
    )
}

export default App;
