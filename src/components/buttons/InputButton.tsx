import { ChangeEventHandler } from 'react'

// local modules
import { useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/inputButton.module.scss'


interface ButtonProps {
    text: string
    name: string
    value: string
    onChange?: ChangeEventHandler<Element>
    imgIcons:string
    extra:string
}

const InputButton = ({ text, name, value, onChange , imgIcons , extra  }: ButtonProps) => {
    const { theme }:any = useAppSelector((state) => state.theme)

    return (
        <div className={`${styles.button} ${theme === 'light' ? styles.light : styles.dark}`}>
            <input hidden type='radio' name={name} id={value} value={value} onChange={onChange} />
            <label htmlFor={value}>{text}{imgIcons == '' ? '' : <img className={`${extra} w-[40px]`} src={`${imgIcons}`}/>}  </label>
        </div>
    )
}

export default InputButton
