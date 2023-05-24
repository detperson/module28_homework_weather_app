import React from "react";
import s from './WeatherToday.module.css'
import {WeatherParameter} from "../WeatherParametr/WeatherParameter";

export function WeatherToday({ weather }) {

    function dayConvert(unix_timestamp) {
        let a = new Date(unix_timestamp * 1000)
        let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
        let day = days[a.getDay()]
        return day
    }

    function timeConverter(unix_timestamp) {
        let a = new Date(unix_timestamp * 1000);
        let hour = a.getHours();
        let min = a.getMinutes();
        //добавляем нули в начало
        if (hour < 10) {
            hour = '0' + hour
        }
        if (min < 10) {
            min = '0' + min
        }
        let time = hour + ':' + min;
        return time;
    }

    return (
        <>
            <div className={s.today_block}>
                <div
                    className={s.image}
                    style={{
                        backgroundImage: `url(/images/${weather.length ? weather[0].weather[0].icon : '10d'}.png)`,
                    }}
                />
                <div className={s.temp}>
                    {weather.length ? Math.round(weather[0].main.temp) : 'Нет данных'}°
                </div>
                <div className={s.cityAndDayDiv}>
                    <span className={s.day}>
                        {weather.length ? dayConvert(weather[0].dt) : 'Нет данных'}
                    </span>
                    <span className={s.city}>
                        {weather.length ? (`${weather[0].name}, ${weather[0].sys.country}`) : 'Нет данных'}
                    </span>
                </div>
            </div>
            {weather.length && <div className={s.weather_body}>
                <WeatherParameter name='Ощущается как' data={Math.round(weather[0].main.feels_like) + ' °'}/>
                <WeatherParameter name='Ветер' data={(Math.round(weather[0].wind.speed * 10) / 10) + ' м/с'}/>
                <WeatherParameter name='Влажность' data={weather[0].main.humidity + ' %'}/>
                <WeatherParameter name='Давление' data={Math.round(weather[0].main.pressure * 0.750064) + ' мм рт. ст.'}/>
                <WeatherParameter name='Облачность' data={weather[0].clouds.all + ' %'}/>
                <WeatherParameter name='Описание' data={weather[0].weather[0].description}/>
                <WeatherParameter name='Восход / Закат'
                                  data={timeConverter(weather[0].sys.sunrise) + ' / ' + timeConverter(weather[0].sys.sunset)}
                />
            </div>}
        </>
    )
}