import React, {useState} from "react";
import style from './InputForm.module.css'
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";

export function InputForm({ onFetchToday, onFetch5Days, weatherTime }) {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    const [geoFetch, setGeoFetch] = useState(false)
    const [disabledBtns, setDisabledBtns] = useState(false)

    const submitHandler = (event) => {
        event.preventDefault()
        setError('')
        //Отключаем кнопки, что бы небыло лишних запросов, пока сервер отвечает
        setDisabledBtns(true)

        console.log('geoFetch', geoFetch)
        if (value.trim().length === 0 && !geoFetch) {
            setError('Пожалуйста введите город.')
            setDisabledBtns(false)
            return
        }

        fetch(urlToday + params.toString())
            .then(result =>  result.json())
            .then(json => {
                if (json.cod === 200) {
                    onFetchToday([json])
                    weatherTime('today')
                } else {
                    setError(json.message)
                }
                setDisabledBtns(false)
                // console.log('json ответ fetch', json)
            })
            .catch(error => {
                setDisabledBtns(false)
                console.log('Error 1 day: ', error.message)
            })

        //Запрос погоды на 5 дней
        // params.set('cnt', '32')
        fetch(url5Days + params.toString())
            .then(result => result.json())
            .then(json => {
                if (json.cod === '200') {
                    onFetch5Days(json.list)
                }
                console.log('json ответ fetch', json)
            })
            .catch(error => console.log('Error 5 days: ', error.message))
        setGeoFetch(false)
    }

    const changeHandler = (event) => {
        setValue(event.target.value)
    }

    let urlToday = `https://api.openweathermap.org/data/2.5/weather?`
    let url5Days = `https://api.openweathermap.org/data/2.5/forecast?`
    let params = new URLSearchParams({
        // q : 'Novorossiysk',
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
            navigator.geolocation.getCurrentPosition((position) => {
                console.log('pos', position)
                params.set('lat', (Math.round(position.coords.latitude * 100)/100).toString())
                params.set('lon', (Math.round(position.coords.longitude * 100)/100).toString())
            },
            (error) => {
                setError(error.message)
            })
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
                type='submit'
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