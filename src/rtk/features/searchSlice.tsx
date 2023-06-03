import { TProduct } from '@/rtk/features/commonSlice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Product = TProduct & {
    color: string
    condition: string
}

interface TInitialState {
    search: string
    pageNum: number
    totalPages: number
    products: Product[]
    filter: string
}

const initialState: TInitialState = {
    search: '',
    pageNum: 1,
    totalPages: 10,
    products: [],
    filter: '',
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setPageNum: (state, action: PayloadAction<number>) => {
            state.pageNum = action.payload
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload
        },
        setProducts: (state, action: PayloadAction<any>) => {
            state.products = action.payload
        },
        setFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload
        },
    },
})

export const { setSearch, setPageNum, setTotalPages, setProducts, setFilter } = searchSlice.actions
export default searchSlice.reducer
