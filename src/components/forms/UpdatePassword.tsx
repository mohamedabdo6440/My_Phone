import { useState } from 'react'
import { MdClose } from 'react-icons/md'

// local modules
import useToast from '@/hooks/useToast'
import axios from '@/lib/axios'
import { toggleAuthForm } from '@/rtk/features/authFormSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/updatePassword.module.scss'

const UpdatePassword = () => {
    const { theme }:any = useAppSelector((state) => state.theme)
    const toast = useToast()
    const [verified, setVerified] = useState(false)
    const dispatch = useAppDispatch()

    const verifyOldPassword: React.FocusEventHandler = async (e) => {
        const target = e.target as HTMLInputElement

        try {
            const result = await axios(`/auth/confirm-old-password?password=${target.value}`)

            if (result.status !== 200) {
                setVerified(false)
                toast.error('Incorrect old password')
            } else {
                setVerified(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const submitHandler: React.FormEventHandler = async (e) => {
        e.preventDefault()

        const values = new FormData(e.target as HTMLFormElement)

        const { newPassword, confirmNewPassword } = Object.fromEntries(values.entries())

        if (newPassword !== confirmNewPassword) return toast.error('Password must match')
        try {
            const result = await axios.put('/auth/update-password', { password: newPassword })

            if (result.status >= 200 && result.status <= 299) {
                toast.success('Success! Password updated')
                dispatch(toggleAuthForm(false))
            } else {
                toast.error('Error! Please try again later')
            }
        } catch (error) {
            console.log(error)
            toast.error('Error! Please try again later.')
        }
    }

    return (
        <div className={`${styles.container} ${theme === 'light' ? null : styles.dark} form_close`}>
            <form className={styles.form} onSubmit={submitHandler}>
                <h3>Update password</h3>
                <p>Enter the old password to verify it is you.</p>
                <input className={styles.error_input} type='password' placeholder='Old Password' name='oldPassword' onBlur={verifyOldPassword} />
                <span className={styles.divider} />
                <p>Enter your new password.</p>
                <input type='password' placeholder='New Password' name='newPassword' />
                <input type='password' placeholder='Confirm New Password' name='confirmNewPassword' />
                <button disabled={!verified}>Update Password</button>

                <div className={`${styles.close} form_close`}>
                    <MdClose />
                </div>
            </form>
        </div>
    )
}

export default UpdatePassword
