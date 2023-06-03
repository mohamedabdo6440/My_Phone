import { useRef } from 'react'
import { MdCheckCircle, MdClose } from 'react-icons/md'

// local modules
import useClickOutside from '@/hooks/useClickOutside'
import { useCountDown } from '@/hooks/useCountDown'
import useToast from '@/hooks/useToast'
import axios from '@/lib/axios'
import { closeModal } from '@/rtk/features/modalSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/modal.module.scss'

const Modal = () => {
    const { email, open } = useAppSelector((state) => state.modal)
    const dispatch = useAppDispatch()
    const modalRef = useRef<HTMLDivElement>(null)
    const [counter, start] = useCountDown(120, 1000)
    const toast = useToast()

    const closeHandler = () => {
        dispatch(closeModal())
    }

    useClickOutside(modalRef, closeHandler)

    const handleResend = async () => {
        start()

        try {
            const result = await axios(`/auth/send-verification?emailAddress=${email}&type=verify`)

            if (result.status >= 200 && result.status <= 299) {
                toast.success('Success! Check your email.')
            } else {
                toast.error('Error! Please try again later')
            }
        } catch (error) {
            toast.error('Error! Please try again later.')
        }
    }

    return open ? (
        <div className={styles.wrapper}>
            <div className={styles.modal} ref={modalRef}>
                <div className={styles.header}>
                    <div className={styles.icon}>
                        <MdCheckCircle />
                    </div>
                    <div className={styles.title}>
                        Your account has been <br /> successfully created
                    </div>
                </div>
                <div className={styles.content}>
                    <strong>Check your email inbox now</strong>
                    <p>
                        We&lsquo;ve sent you a verification link to your email address <strong>&lt;{email}&gt;</strong>. Please check your email inbox
                        and verify your email address within 15 mins.
                    </p>
                    <button disabled={!!counter} onClick={handleResend}>
                        Re-send verification link
                    </button>
                    {!!counter && <div>try again in {counter}s</div>}
                </div>
                <div className={styles.close} onClick={closeHandler}>
                    <MdClose />
                </div>
            </div>
        </div>
    ) : null
}

export default Modal
