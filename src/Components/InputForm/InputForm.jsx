import React, {useState} from "react";
import style from './InputForm.module.css'
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";

export function InputForm({ onFetchToday, onFetch5Days, weatherTime }) {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    const [geoFetch, setGeoFetch] = useState(false)
    const [disabledBtns, setDisabledBtns] = useState(false)

    const submitHandler = async (event) => {
        event.preventDefault()
        setError('')
        //Отключаем кнопки, что бы небыло лишних запросов, пока сервер отвечает
        setDisabledBtns(true)

        if (value.trim().length === 0 && !geoFetch) {
            setError('Пожалуйста введите город.')
            setDisabledBtns(false)
            return
        }

        try {
            await fetchWeatherToday()
            await fetchWeather5Days()
            setDisabledBtns(false)
        } catch (error) {
            console.log('Error:', error.message)
            setDisabledBtns(false)
        }

        setGeoFetch(false)
    }

    const fetchWeatherToday = async () => {
        const response = await fetch(urlToday + params.toString())
        const json = await response.json()
        if (json.cod === 200) {
            onFetchToday([json])
            weatherTime('today')
        } else {
            setError(json.message)
        }
    }

    const fetchWeather5Days = async () => {
        params.set('cnt', '36')
        const response = await fetch(url5Days + params.toString())
        const json = await response.json()
        if (json.cod === '200') {
            onFetch5Days(json.list)
        }
    }

    const changeHandler = (event) => {
        setValue(event.target.value)
    }

    let urlToday = `https://api.openweathermap.org/data/2.5/weather?`
    let url5Days = `https://api.openweathermap.org/data/2.5/forecast?`
    let params = new URLSearchParams({
        units : 'metric',
        lang : 'ru',
        appid : '96228b37a7e096d3ec11c1d275c4d2a1'
    })

    const clickBtn = () => {
        params.set('q', value.trim())
    }

    const clickGeo = () => {
        setGeoFetch(true)
        if (!navigator.geolocation) {
            setError('Ваш браузер не поддерживает геолокацию...')
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    params.set(
                        'lat',
                        (Math.round(position.coords.latitude * 100)/100).toString()
                    )
                    params.set(
                        'lon',
                        (Math.round(position.coords.longitude * 100)/100).toString()
                    )
                    fetchWeatherToday()
                    fetchWeather5Days()
                },
                (error) => {
                    setError(error.message)
                }
            )
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <input
                type="text"
                className={style.input_form}
                placeholder="Enter city..."
                value={value}
                onChange={changeHandler}
            />
            <button
                type="submit"
                className={style.send_btn}
                onClick={clickBtn}
                disabled={disabledBtns}
            >
                Найти
            </button>
            <button
                type='button'
                className={style.geo_btn}
                onClick={clickGeo}
                disabled={disabledBtns}
            >
                Geo
            </button>
            {error && <ErrorMessage error={error}/>}
        </form>
    )
}