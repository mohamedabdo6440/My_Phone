import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useRouter } from 'next/router'


export interface TProduct {
    _id: string
    model: string
    brand: string
    imageUrl: string
    carrier: string[]
    condition: string[]
    storage: string[]
    color: string[]
    price?: number
    product?: any
    name?: string
}

export interface TBrand {
    _id: string
    brand: string
    imageUrl: string
}

interface TInitialState {
    loading: boolean
    products: TProduct[]
    brands: TBrand[]
    variantGroups:[]
}

const initialState: TInitialState = {
    loading: false,
    variantGroups: [],
    products:[],
    brands:[]
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setProducts: (state, action: PayloadAction<TProduct[]>) => {
            state.products = action.payload
        },
        setBrands: (state, action: PayloadAction<TBrand[]>) => {
            state.brands = action.payload
        },
    },
})

export const { setLoading, setProducts, setBrands } = commonSlice.actions
export default commonSlice.reducer
