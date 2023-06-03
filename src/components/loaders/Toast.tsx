import { MdCheckCircleOutline, MdClose, MdErrorOutline, MdOutlineWarningAmber } from 'react-icons/md'

// local modules
import { closeToast } from '@/rtk/features/toastSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/toast.module.scss'

const Toast = () => {
    const { show, type, label } = useAppSelector((state) => state.toast)
    const { theme }:any = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()

    return (
        <div className={`${styles.container} ${theme === 'light' ? styles.light : styles.dark}`}>
            {show && (
                <div className={styles.toast_wrapper}>
                    <div className={styles.toast_content}>
                        <div className={styles.icon}>
                            {type === 'success' ? (
                                <MdCheckCircleOutline color='green' />
                            ) : type === 'warning' ? (
                                <MdOutlineWarningAmber color='yellow' />
                            ) : (
                                <MdErrorOutline color='red' />
                            )}
                        </div>
                        <strong>{label}</strong>
                        <div className={styles.close} onClick={() => dispatch(closeToast())}>
                            <MdClose />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Toast
