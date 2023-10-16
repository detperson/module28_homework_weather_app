import React from 'react'
import s from './Day.module.css'

export function Day({ temp, data, description, pressure, image}) {

    function timeConverter(UNIX_timestamp) {
        let a = new Date(UNIX_timestamp * 1000);
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        //добавляем нули в начало
        if (hour < 10) {
            hour = '0' + hour
        }
        if (min < 10) {
            min = '0' + min
        }
        let time = date + ' ' + month + ' ' + hour + ':' + min;
        return time;
    }

    function dayConvert(unix_timestamp) {
        let a = new Date(unix_timestamp * 1000)
        let days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
        let day = days[a.getDay()]
        return day
    }

    return (
        <div className={s.daybox}>
            <div className={s.data_box}>
                <div className={s.today}>
                    {(new Date().getDay() === new Date(data * 1000).getDay()) ? 'Сегодня' : dayConvert(data)}
                </div>
                <div className={s.data}>{timeConverter(data)}</div>
            </div>
            <div className={s.indicators}>
                <div
                    className={s.image}
                    style={{
                        backgroundImage: `url(/images/${image}.png)`,
                    }}
                />
                <div className={s.temperature}>{Math.round(temp)}°</div>
                <div className={s.pressure}>{Math.round(pressure * 0.750064) + ' мм рт. ст.'}</div>
                <div className={s.description}>{description}</div>
            </div>
        </div>
    )
}
