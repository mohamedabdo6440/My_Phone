import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthInfoPayload {
    _id: string
    emailAddress: string
    firstName: string
    lastName: string
    birthDate: string
    gender: string
    phoneNumber: string
    address: string
    city: string
    profileImageUrl: string
}

const initialState = {
    userId: '',
    emailAddress: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    phoneNumber: '',
    address: '',
    city: '',
    profileImageUrl: ''
}

const authSlice = createSlice({
    name: 'authInfo',
    initialState,
    reducers: {
        setAuthInfo: (state, action: PayloadAction<AuthInfoPayload>) => {
            state.userId = action.payload._id
            state.emailAddress = action.payload.emailAddress
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.birthDate = action.payload.birthDate
            state.gender = action.payload.gender
            state.phoneNumber = action.payload.phoneNumber
            state.address = action.payload.address
            state.city = action.payload.city
            state.profileImageUrl = action.payload.profileImageUrl
        },
        resetAuthInfo: (state) => {
            state.userId = initialState.userId
            state.emailAddress = initialState.emailAddress
            state.firstName = initialState.firstName
            state.lastName = initialState.lastName
            state.birthDate = initialState.birthDate
            state.gender = initialState.gender
            state.phoneNumber = initialState.phoneNumber
            state.address = initialState.address
            state.city = initialState.city
            state.profileImageUrl = initialState.profileImageUrl
        }
    },
})

export const { setAuthInfo, resetAuthInfo } = authSlice.actions
export default authSlice.reducer