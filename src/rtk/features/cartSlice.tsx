import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type HomePage = string | boolean

interface TInitialState {
    items : string | boolean
}

const initialState: TInitialState = {
   items : false,
}

const cartSLice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<HomePage>) => {
            state.items = action.payload
        },
    },
})

export const { setItems } = cartSLice.actions
export default cartSLice.reducer
