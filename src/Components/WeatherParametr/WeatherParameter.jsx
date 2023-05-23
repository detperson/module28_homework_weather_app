import React from "react";
import s from "./WeatherParameter.module.css"

export function WeatherParameter({ name, data }) {
    return (
        <div className={s.parameter_box}>
            <div className={s.name}>
                {name}
            </div>
            <div className={s.data}>
                {data}
            </div>
        </div>
    )
}