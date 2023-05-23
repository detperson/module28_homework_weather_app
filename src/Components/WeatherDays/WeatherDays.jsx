import React from 'react'
import s from './WeatherDays.module.css'
import {Day} from "../Days/Day";

export function WeatherDays({ weather, weather5Days }) {

    console.log('weather5Days', weather5Days)
    console.log('weather', weather)

    return (
        <div className={s.days}>
            <Day
                temp={weather[0].main.temp}
                data={weather[0].dt}
                description={weather[0].weather[0].description}
                pressure={weather[0].main.pressure}
                image={weather[0].weather[0].icon}
            />
            { weather5Days.map(day => {
                let time = (new Date(day.dt * 1000)).getHours()
                let date = (new Date(day.dt * 1000)).getDate()
                let todayDay = (new Date(Date.now())).getDate()
                if (time === 12 && date !== todayDay) {
                    return <Day
                        temp={day.main.temp}
                        data={day.dt}
                        description={day.weather[0].description}
                        image={day.weather[0].icon}
                        pressure={day.main.pressure}
                        key={day.dt} />
                }
            }
            ) }
        </div>
    )
}