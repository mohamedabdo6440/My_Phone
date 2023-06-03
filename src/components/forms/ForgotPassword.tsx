import { MdClose } from 'react-icons/md'
// local modules
import { useCountDown } from '@/hooks/useCountDown'
import useToast from '@/hooks/useToast'
import axios from '@/lib/axios'
import { toggleAuthForm } from '@/rtk/features/authFormSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/forgotPassword.module.scss'
import getRepositories from '@/lib/repositories'
import { useEffect, useState } from 'react'
import Loader from '../loaders/Loader'


const ForgotPassword = () => {
    const { theme }:any = useAppSelector((state) => state.theme)
    // const [counter, start] = useCountDown(120)
    const toast = useToast()
    const dispatch = useAppDispatch()
    const [mail , setMail] : any = useState('')
    const [loader , setLoader] = useState(false)

    // const submitHandler: React.FormEventHandler = async (e) => {
    //     e.preventDefault()

    //     const values = new FormData(e.target as HTMLFormElement)

    //     const { email } = Object.fromEntries(values.entries())

    //     try {
    //         start()
    //         const result = await axios(`/auth/send-verification?emailAddress=${email}&type=reset`)

    //         if (result.status >= 200 && result.status <= 299) {
    //             toast.success('Success! Check your email.')
    //         } else {
    //             toast.error('Error! Please try again later')
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         toast.error('Error! Please try again later.')
    //     }
    // }


  async  function  updateMail(e:any){
        setLoader(true)
        e.preventDefault()
        const repositories = getRepositories('production')
        const models: any = await repositories.user.resetPw(mail)
        if(models.status == false){
            toast.error(models.message)
            setLoader(false)
        }else{
            setMail('')
            toast.success(models.message)
            dispatch(toggleAuthForm("updatePassword"))
            setLoader(false)
        }
        
    }
    






    return (
        <div className={`${styles.container} ${theme === 'light' ? null : styles.dark} form_close`}>
            <form className={styles.form} onSubmit={updateMail}>
                <h3>Forgot Password</h3>
                <p>Enter the email address associated with your account and we&lsquo;ll send you a linke to reset your password.</p>
                <input type='email' placeholder='Email' name='email' onChange={(e)=>setMail(e.target.value)}/>
                {
                    loader == false ?  <button disabled={!mail}>Request Password Reset</button> : <Loader />
                }
                {/* {!!counter && <div className={styles.timer}>try again in {counter}s</div>} */}
                <span className={styles.divider} />
                <span>
                    <strong onClick={() => dispatch(toggleAuthForm('login'))}>Back to Login</strong>
                </span>
                <div className={`${styles.close} form_close`}>
                    <MdClose />
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword
