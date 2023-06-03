import { closeToast, toast } from '@/rtk/features/toastSlice'
import { useAppDispatch } from '@/rtk/hook'

const useToast = () => {
    const dispatch = useAppDispatch()

    const success = (label: string, timer = 3000) => {
        dispatch(toast({ label, type: 'success' }))

        setTimeout(() => {
            dispatch(closeToast())
        }, timer)
    }

    const warning = (label: string, timer = 3000) => {
        dispatch(toast({ label, type: 'warning' }))

        setTimeout(() => {
            dispatch(closeToast())
        }, timer)
    }

    const error = (label: string, timer = 3000) => {
        dispatch(toast({ label, type: 'error' }))

        setTimeout(() => {
            dispatch(closeToast())
        }, timer)
    }

    return {
        success,
        warning,
        error,
    }
}

export default useToast
