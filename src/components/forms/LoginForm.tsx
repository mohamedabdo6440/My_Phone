import { useRouter } from 'next/router'
import { useState } from 'react'
import { MdClose } from 'react-icons/md'

// local modules
import useToast from '@/hooks/useToast'
import axios from '@/lib/axios'
import { toggleAuthForm } from '@/rtk/features/authFormSlice'
import { setAuthInfo } from '@/rtk/features/authSlice'
import { setLoading } from '@/rtk/features/commonSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/loginForm.module.scss'
import Loader from '@/components/loaders/Loader'
import { setItems } from '@/rtk/features/cartSlice'

//cookie 
import Cookies from 'universal-cookie'
import getRepositories from '@/lib/repositories'


const LoginForm = () => {
    // const { values } = useAppSelector((state) => state.form.login)
    const { theme }:any = useAppSelector((state) => state.theme)
    let loading = useAppSelector((state)=> state.common)
    const [values, setValues] = useState({
        username: '',
        password: '',
    })

    const dispatch = useAppDispatch()
    const router = useRouter()
    const toast = useToast()
    const cookie = new Cookies()

    const getItems = async (e:any) => {
        e.preventDefault()
        const repositories = getRepositories('production')
        const companies = await repositories.order.getCart()
        if(companies.status == 200){
            dispatch(setItems(true))
            localStorage.setItem('cart' , '1')
        }else{
            dispatch(setItems(false))
            localStorage.setItem('cart' , '0')

        }

    }


    const submitHandler: React.FormEventHandler = async (e) => {
        e.preventDefault()
        dispatch(setLoading(true))
        try {
            const result = await axios.post('/auth/token', values)
            if (result.status >= 200 && result.status <= 299) {
                dispatch(toggleAuthForm(false))
                dispatch(setLoading(false))
                dispatch(setAuthInfo(result.data))
                let token = result.data.access
                cookie.set('token' , token ,{
                    expires : new Date(Date.now() + 28800000)
                })
                getItems(e)
                // router.pathname === '/verify' ? router.push('/') : router.back()
            } else {
                dispatch(setLoading(false))
                throw new Error(result.statusText)
            }
        } catch (error) {
            toast.error('Invalid email or password')
        }
        dispatch(setLoading(false))
    }

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setValues((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    return (
        <div className={`${styles.container} ${theme === 'light' ? null : styles.dark} form_close`}>
            <form className={styles.form} onSubmit={submitHandler}>
                <h3>Login Your Account</h3>
                <input type='text' placeholder='Email' name='username' value={values.username} onChange={handleChange} />
                <input type='password' placeholder='Password' name='password' value={values.password} onChange={handleChange} />
                {
                    loading.loading == false ?<button disabled={!values.password || !values.username}>Login</button> : <Loader />
                }
               
                <span className={styles.forgot} onClick={() => dispatch(toggleAuthForm('forgotPassword'))}>
                    Forgot password?
                </span>
                <span className={styles.divider} />
                <span>
                    Not a member? <strong onClick={() => dispatch(toggleAuthForm('register'))}>Create an account.</strong>
                </span>

                <div className={`${styles.close} form_close`}>
                    <MdClose cursor='pointer' />
                </div>
            </form>
        </div>
    )
}

export default LoginForm
