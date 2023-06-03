import {  createSlice, PayloadAction } from '@reduxjs/toolkit'



export type CartTab = 'cart' | 'checkout' | 'confirmation'

export type CheckoutPayload = TInitialState['checkout']

interface TInitialState {
    tab: 'sell' | 'buy' | 'repair'
    filter: 'all' | 'pending' | 'completed'
    checkout: {
        paymentProcessor: string
        shippingProvider: string
        paymentIdentifier: string // this will hold the payment 'identifier_id' for paypal or payment 'intent_id' for stripe
        paymentApproveUrl: string
        paymentStripeClientSecret: string
        name: string
        emailAddress: string
        address: string
        appart: string
        city: string
        zipCode: string
        phoneNumber: string
        lastName:string
    }
    quantity: number
    subTotal: number
    shippingFee: number
    total: number
}

const initialState: TInitialState = {
    tab: 'sell',
    filter: 'all',
    checkout: {
        paymentProcessor: '',
        shippingProvider: '',
        paymentIdentifier: '',
        paymentApproveUrl: '',
        paymentStripeClientSecret: '',
        name: '',
        lastName : '',
        emailAddress: '',
        address: '',
        appart: '',
        city: '',
        zipCode: '',
        phoneNumber: ''
    },
    quantity: 1,
    subTotal: 0,
    shippingFee: 0.5,
    total: 0
}



const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setTab: (state, action: PayloadAction<TInitialState['tab']>) => {
            state.tab = action.payload
        },
        setFilter: (state, action: PayloadAction<TInitialState['filter']>) => {
            state.filter = action.payload
        },
        setCheckoutDetails: (state, action: PayloadAction<CheckoutPayload>) => {
            state.checkout.paymentProcessor = action.payload.paymentProcessor
            state.checkout.shippingProvider = action.payload.shippingProvider
            state.checkout.paymentIdentifier = action.payload.paymentIdentifier
            state.checkout.paymentApproveUrl = action.payload.paymentApproveUrl
            state.checkout.paymentStripeClientSecret = action.payload.paymentStripeClientSecret
            state.checkout.name = action.payload.name
            state.checkout.lastName = action.payload.lastName
            state.checkout.emailAddress = action.payload.emailAddress
            state.checkout.address = action.payload.address
            state.checkout.appart = action.payload.appart
            state.checkout.city = action.payload.city
            state.checkout.zipCode = action.payload.zipCode
            state.checkout.phoneNumber = action.payload.phoneNumber
        },
        setQuantity: (state, action) => {
            state.quantity = action.payload.quantity
        },
        setSubTotal: (state, action) => {
            state.subTotal = action.payload.subTotal
        },
        setShippingFee: (state, action) => {
            state.shippingFee = action.payload.shippingFee
        },
        setTotal: (state, action) => {
            state.total = action.payload.total
        },
        setDataToNull:(state , action)=>{
            state.checkout.paymentProcessor = ''
            state.checkout.shippingProvider = ''
            state.checkout.paymentIdentifier = ''
            state.checkout.paymentApproveUrl = ''
            state.checkout.paymentStripeClientSecret = ''
            state.checkout.name = ''
            state.checkout.emailAddress = ''
            state.checkout.address = ''
            state.checkout.appart = ''
            state.checkout.city = ''
            state.checkout.zipCode = ''
            state.checkout.phoneNumber = ''
        }
    },
})

export const { setTab, setFilter, setCheckoutDetails, setQuantity, setSubTotal, setShippingFee, setTotal, setDataToNull } = orderSlice.actions
export default orderSlice.reducer
