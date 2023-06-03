import { useState } from 'react'
import { useRouter } from 'next/router'
import { StripePaymentElementOptions } from '@stripe/stripe-js'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'

// Local modules
import { useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/confirmation.module.scss'
import getRepositories from '@/lib/repositories'

const StripeCheckout = () => {
    const authInfo = useAppSelector((state) => state.authInfo)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { page } = useAppSelector((state) => state.home)
    const { checkout, quantity, total } = useAppSelector((state) => state.order)
    const { product, payload } = useAppSelector((state) => {
        if (page == 'buy') {
            return state.buy
        } else {
            return state.sell
        }
    })

    const stripe = useStripe()
    const elements = useElements()

    const router = useRouter()

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     const repo = getRepositories()
    //     const ok = await repo.order.addOrder(
    //         product, quantity, authInfo.userId, page, payload, checkout, total,
    //     )

    //     if (!ok) {
    //         return
    //     }

    //     if (!stripe || !elements) {
    //         // Stripe.js has not yet loaded.
    //         // Make sure to disable form submission until Stripe.js has loaded.
    //         return
    //     }

    //     setIsLoading(true)

    //     const { error } = await stripe.confirmPayment({
    //         elements,
    //         confirmParams: {
    //             // Make sure to change this to your payment completion page
    //             return_url: process.env.payment_stripe_return_url!,
    //         },
    //     })

    //     if (error) {
    //         router.push(`/orders/error?payment_intent=${checkout.paymentIdentifier}`)
    //         setIsLoading(false)
    //         return
    //     }
    // }

    const paymentElementOptions = {
        layout: "tabs"
    } as StripePaymentElementOptions;

    return (
        <form id="payment-form">
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} id="submit" className={styles.button}>
                <span id="button-text">
                    {isLoading ? "Loading..." : "Checkout with Stripe"}
                </span>
            </button>
        </form>
    )
}

export default StripeCheckout
