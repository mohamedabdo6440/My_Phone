
import React, { useEffect , useMemo } from 'react'

// local modules
import { useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/confirmation.module.scss'
import StripeCheckoutForm from '@/components/forms/StripeCheckoutForm'
import PaypalCheckoutButton from '@/components/forms/PaypalCheckoutButton'
import useScroll from '@/hooks/useScroll'
import IconButton from '../buttons/IconButton'
import paypal from '@/images/web_paypal.png'
import stripe from '@/images/web_stripe.png'



const Confirmation = () => {
    const { theme }:any = useAppSelector((state) => state.theme)
    const { checkout, total, shippingFee } = useAppSelector((state) => state.order)

    const scroll = useMemo(() => useScroll(), []) 

    return (
        <div className={`${styles.container} ${theme === 'light' ? styles.light : styles.dark}`}>

            <ul className='flex justify-center gap-5'>
                        <li>
                            <IconButton image={paypal} name='payment_type' value='paypal' />
                        </li>
                        <li>
                            <IconButton image={stripe} name='payment_type' value='stripe'  />
                        </li>
                    </ul> 
            <div className={styles.main}>
                <div className={styles.wrapper}>
                    <strong>{checkout.emailAddress}</strong>
                    <div>All email about your order will be sent here</div>
                </div>
                <div className={styles.wrapper}>
                    <strong>
                        Payment details: <span>{checkout.paymentProcessor}</span>
                    </strong>
                    <div>
                        <span>{checkout.emailAddress}</span>
                        <button>Change</button>
                    </div>
                </div>
                <div className={styles.wrapper}>
                    <strong>
                        Shipping Details:
                    </strong>
                    <div>
                        <span>
                            {checkout.name} <br /> {checkout.address}, {checkout.city}
                        </span>
                        <button>Change</button>
                    </div>
                </div>
                <div className={styles.total}>
                    <strong>Item total</strong>
                    <span>{total}$</span>
                    <strong>Shipping</strong>
                    <span>{shippingFee}%</span>
                </div>
                <div className={styles.checkbox}>
                    <input type='checkbox' name='terms' id='terms' />
                    <label htmlFor='terms'>Terms and policy</label>
                </div>
            </div>
            {checkout.paymentProcessor == 'stripe' ? <StripeCheckoutForm /> : <PaypalCheckoutButton />}
        </div>
    )
}

export default Confirmation
