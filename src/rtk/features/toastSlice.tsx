import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TInitialState {
    show: boolean
    label?: string
    type: 'success' | 'warning' | 'error'
}

interface TPayload {
    label: string
    type: TInitialState['type']
}

const initialState: TInitialState = {
    show: false,
    label: '',
    type: 'success',
}

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        toast: (state, action: PayloadAction<TPayload>) => {
            state.show = true
            state.label = action.payload.label
            state.type = action.payload.type
        },
        closeToast: (state) => {
            state.show = false
        },
    },
})

export const { toast, closeToast } = toastSlice.actions
export default toastSlice.reducer
