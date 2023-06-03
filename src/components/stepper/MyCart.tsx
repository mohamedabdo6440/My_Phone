import {useEffect} from 'react'
// local modules
import Cart from '@/components/stepper/Cart'
import Checkout from '@/components/stepper/Checkout'
import Confirmation from '@/components/stepper/Confirmation'
import { CartTab } from '@/rtk/features/orderSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/pages/cart.module.scss'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'


interface CartProps {
    tab: CartTab
    setTab: ActionCreatorWithPayload<CartTab>
    values: {
        brand: string
        model: string
        imageUrl: string
        condition: string
        carrier: string
        storage: string
        color?: string
    }
}

const MyCart = ({ tab, setTab, values }: CartProps) => {
    const { theme }:any = useAppSelector((state) => state.theme)
    const { page } = useAppSelector((state) => state.home)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTab('cart'))
    }, [])
    

    return (
        <section className={`${styles.section} ${theme === 'light' ? styles.light : styles.dark} `}>
            <div className={styles.header}>
                <strong className={`${tab === 'cart' ? styles.active : null}`} onClick={() => dispatch(setTab('cart'))}>
                    Confirmation
                </strong>
                {/* <strong className={`${tab === 'checkout' ? styles.active : null}`} onClick={() => dispatch(setTab('checkout'))}>
                    Checkout
                </strong>
                {
                    page == 'sell' ? '' : 
                    <strong className={`${tab === 'confirmation' ? styles.active : null}`} onClick={() => dispatch(setTab('confirmation'))}>
                    Confirmation
                         </strong>
                } */}
                
            </div>
            {tab === 'cart' && <Cart values={values} setTab={setTab} />}
            {tab === 'checkout' && (
                <Checkout color={values.color!} imageUrl={values.imageUrl} model={`${values.brand} ${values.model}`} setTab={setTab} />
            )}
            {tab === 'confirmation' && <Confirmation />}
        </section>
    )
}

export default MyCart
