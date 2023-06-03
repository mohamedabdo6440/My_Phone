import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TInitialState {
    open: boolean
    email: string
}

const initialState: TInitialState = {
    open: false,
    email: '',
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<string>) => {
            state.email = action.payload
            state.open = true
        },
        closeModal: (state) => {
            state.email = ''
            state.open = false
        },
    },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
