import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TInitialState {
    authFormOpen: 'confirmation' | 'login' | 'register' | 'forgotPassword' | 'updatePassword' | 'addAdress' | "deleteAddress" |'availAddress'| 'updateAddress' | "dunno" | "user" | false
    auth: boolean
}

const initialState: TInitialState = {
    authFormOpen: false,
    auth: false,
}

const authFormSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleAuthForm: (state, action: PayloadAction<TInitialState['authFormOpen']>) => {
            state.authFormOpen = action.payload
        },
    },
})

export const { toggleAuthForm } = authFormSlice.actions
export default authFormSlice.reducer
