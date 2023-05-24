import React from 'react'
import s from "./ForecastNav.module.css";

export function ForecastNav({ weatherTime, todayOr5Days }) {

    return (
        <div
            className={s.nav_days}
        >
            <div
                className={todayOr5Days === 'today' ? `${s.today} ${s.active}` : s.today }
                onClick={() => weatherTime('today')}
            >Сегодня
            </div>
            <div
                className={todayOr5Days === '5days' ? `${s.days5} ${s.active}` : s.days5}
                onClick={() => weatherTime('5days')}
            >На 5 дней
            </div>
        </div>
    )
}