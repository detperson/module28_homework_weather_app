import React from 'react'
import s from './ErrorMessage.module.css'

export function ErrorMessage({ error }) {
    return (
        <p className={s.error}>{error}</p>
    )
}