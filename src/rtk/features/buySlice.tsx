import { TProduct } from '@/rtk/features/commonSlice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartTab } from './orderSlice'
import { TModel } from '@/interfaces'

export type BuyPayload = TInitialState['payload']

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
        price?: number
        name?: string
        device_details?: {
            carrier: string
            condition: string
            storage: string
            color: string
        }
    }
    product: any
    variant: any
    category: any
    series: any
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
    cart : null

}

const buySlice = createSlice({
    name: 'buy',
    initialState,
    reducers: {
        nextStep: (state, action: PayloadAction<BuyPayload>) => {
            state.completedStep = state.step + 1
            state.step = state.step + 1
            state.payload = { ...state.payload, ...action.payload }
        },
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload
            state.completedStep = action.payload
        },
        setTab: (state, action: PayloadAction<CartTab>) => {
            state.tab = action.payload
        },
        setProduct: (state, action) => {
            state.product = action.payload
        },
        setCategory: (state, action: PayloadAction<BuyPayload>) => {
          state.category = action.payload.product?.name
          state.completedStep = state.step + 1
          state.step = state.step + 1
        },
        setSeris: (state, action) => {
            state.series = action.payload.series
            state.category = action.payload.product?.name
            state.completedStep = state.step + 1
            state.step = state.step + 1
        },
        setSerisToNull: (state, action) => {
            state.series = null
        },
        productStep:(state, action)=>{
            state.product = action.payload
            state.completedStep = state.step + 1
            state.step = state.step + 1
        },
        start:(state, action)=>{
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

export const { cartData ,start,nextStep, setStep, setTab, setProduct ,setCategory , setSeris , setSerisToNull , productStep } = buySlice.actions
export default buySlice.reducer
