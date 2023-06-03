import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'

// Local modules
import { useAppSelector } from '@/rtk/hook'
import StripeCheckout from "./StripeCheckout";

const StripeCheckoutForm = () => {

    const stripePromise = loadStripe(
        process.env.payment_stripe_publishable_key ?? "fake"
    )
    const { checkout } = useAppSelector((state) => state.order)

    const options = {
        clientSecret: checkout.paymentStripeClientSecret,
        appearance: {
            theme: 'stripe',
        },
    } as StripeElementsOptions;

    return (
        <Elements options={options} stripe={stripePromise}>
            <StripeCheckout />
        </Elements>
    )
}

export default StripeCheckoutForm
