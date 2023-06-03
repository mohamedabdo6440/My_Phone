import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TProduct } from '@/rtk/features/commonSlice'
import { TModel } from '@/interfaces'

export type RepairPayload = TInitialState['payload']

interface TInitialState {
    step: number
    completedStep: number
    payload: {
        brand?: string
        name?: string
        category?: string
        products?: TProduct[]
        model?: TModel
        device_issue?: []
        repairIssueUrl?:string
        service_type?: string
        url?: string
        productUrl?: string
        seriesUrl?: string
        modelUrl?: string
        issueUrl?: string
        scheduleTime?: string
        scheduleDate?: string
        user?: boolean
        address?:string
        reach_form_inputs?: {
            firstName: string
            lastName: string
            email: string
            phoneNumber: string
            contactBy: string
        }
    }
    issues:[]
}

const initialState: TInitialState = {
    step: 1,
    completedStep: 1,
    payload: {},
    issues:[]
    
}

const repairSlice = createSlice({
    name: 'repair',
    initialState,
    reducers: {
        nextStep: (state, action: PayloadAction<RepairPayload>) => {
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
        resetState: (state) => {
            state.step = initialState.step
            state.completedStep = initialState.completedStep
            state.payload = initialState.payload
        },
        setIssuesSlice:(state , action)=>{
            state.payload = {
                ...state.payload,
                ...action.payload,
            }
        },
        setRepairToNull:(state , action)=>{
            state.completedStep = 1
            state.step = 1
        },
        setCart:(state , action)=>{
            state.completedStep = 7
            state.step = 7
        }
    },
})

export const { setCart, setRepairToNull ,setIssuesSlice ,nextStep, setStep, resetState } = repairSlice.actions
export default repairSlice.reducer
