import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { CartTab } from '@/rtk/features/orderSlice'
import { TProduct } from '@/rtk/features/commonSlice'
import { TModel } from '@/interfaces'




export type SellPayload = TInitialState['payload']

export type CheckoutPayload = TInitialState['checkout']

interface TInitialState {
    step: number
    completedStep: number
    tab: CartTab
    payload: {
        company?: any
        brand?: string
        category?: string
        product?: TProduct
        products?: TProduct[]
        model?: TModel
        device_details?: {
            condition: string
            carrier: string
            storage: string
            color: string
            phone_status: string
            back_crack: string
            front_crack: string
            icloud_on: string
        }
    }
    product: any
    variant: any
    category: any
    series: any
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
    }
    cart : any
}

const initialState: TInitialState = {
    step: 1,
    completedStep: 1,
    tab: 'cart',
    payload: {},
    product: null,
    variant: [{ brand: { $regex: null, $options: 'i' } }, { model: { $regex: null, $options: 'i' } }],
    category: null,
    series: null,
    checkout: {
        paymentProcessor: '',
        shippingProvider: '',
        paymentIdentifier: '',
        paymentApproveUrl: '',
        paymentStripeClientSecret: '',
        name: '',
        emailAddress: '',
        address: '',
        appart: '',
        city: '',
        zipCode: '',
        phoneNumber: ''
    },
    cart : null
}

const sellSlice = createSlice({
    name: 'sell',
    initialState,
    reducers: {
        nextStep: (state, action: PayloadAction<SellPayload>) => {
            state.completedStep = state.step + 1
            state.step = state.step + 1
            state.payload = {
                ...state.payload,
                ...action.payload,
            }
        },
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload
            state.completedStep = action.payload
        },
        setTabSell: (state, action: PayloadAction<CartTab>) => {
            state.tab = action.payload
        },
        setProduct: (state, action) => {
            state.product = action.payload
        },
        setCategorySell: (state, action: PayloadAction<SellPayload>) => {
            state.category = action.payload.product?.name
            state.completedStep = state.step + 1
            state.step = state.step + 1
          },
          setSerisSell: (state, action) => {
            state.series = action.payload.series
            state.category = action.payload.product?.name
            state.completedStep = state.step + 1
            state.step = state.step + 1
        },
        setSerisToNullSell: (state, action) => {
            state.series = null
        },
        productStepsell:(state, action)=>{
            state.product = action.payload
            state.completedStep = state.step + 1
            state.step = state.step + 1
        },
        startSell:(state, action)=>{
            state.step = 1
            state.completedStep = 1
        },
        cartData:(state, action)=>{
            state.cart = action.payload
            state.completedStep = state.step + 1
            state.step = state.step + 1
        },
    },
})

export const { cartData ,startSell ,nextStep, setStep, setTabSell, setProduct , setCategorySell , setSerisSell , setSerisToNullSell , productStepsell } = sellSlice.actions
export default sellSlice.reducer
