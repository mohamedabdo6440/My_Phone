import React from 'react'
import styles from '@/styles/components/inputColor.module.scss'

interface ColorProps {
    text: string
    name: string
    value: string
    event:any
    extra?:any
}

export default function InputColor({text , value , name , event , extra}: ColorProps) {


  return (
    <div className={`${styles.button}`}>
        <input hidden type='radio' name={name} id={value} value={value} />
        <label htmlFor={value} className={`bg-${event}-500 ${extra}`}>{text}</label>
    </div>
  )
}
