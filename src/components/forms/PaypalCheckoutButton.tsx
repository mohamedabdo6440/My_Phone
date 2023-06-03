import React from 'react'

// Local modules
import axios from '@/lib/axios'
import { useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/confirmation.module.scss'
import getRepositories from '@/lib/repositories'

const PaypalCheckoutButton = () => {
    const authInfo = useAppSelector((state) => state.authInfo)

    const { page } = useAppSelector((state) => state.home)
    const { checkout, quantity, total } = useAppSelector((state) => state.order)
    const { product, payload } = useAppSelector((state) => {
        if (page == 'buy') {
            return state.buy
        } else {
            return state.sell
        }
    })



    // const submitPayment = async () => {
    //     const repo = getRepositories()
    //     const ok = await repo.order.addOrder(
    //         product, quantity, authInfo.userId, page, payload, checkout, total,
    //     )

    //     if (!ok) {
    //         return
    //     }

    //     try {
    //         const res = await axios.get(`/payment/paypal/capture-orders/${checkout.paymentIdentifier}`)
    //         window.open(res.data.links[1].href, '_blank', 'noopener,noreferrer')
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <button id="submit" className={styles.button} >
            <span id="button-text">
                Checkout with Paypal
            </span>
        </button>
    )
}

export default PaypalCheckoutButton
