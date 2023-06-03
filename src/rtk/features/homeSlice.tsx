import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type HomePage = 'buy' | 'sell' | 'repair'

interface TInitialState {
    page: HomePage
}

const initialState: TInitialState = {
    page: 'buy',
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<HomePage>) => {
            state.page = action.payload
        },
    },
})

export const { setPage } = homeSlice.actions
export default homeSlice.reducer
