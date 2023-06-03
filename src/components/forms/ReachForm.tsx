import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

// local modules
import axios from '@/lib/axios'
import routes from '@/constants/routes'
import useToast from '@/hooks/useToast'
import { setLoading } from '@/rtk/features/commonSlice'
import { nextStep, resetState, setStep } from '@/rtk/features/repairSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/reachForm.module.scss'

// local static files
import appointment from '@/images/web_appointment.png'
import controller from '@/images/web_controller.png'
import headphone from '@/images/web_headphone.png'
import location from '@/images/web_location.png'
import IconButton from '../buttons/IconButton'
import paypal from '@/images/web_paypal.png'
import stripe from '@/images/web_stripe.png'
import { toggleAuthForm } from '@/rtk/features/authFormSlice'
import getRepositories from '@/lib/repositories'
import { useState } from 'react'
import Loader from '../loaders/Loader'
import Checkout from '../stepper/Checkout'
import Cookies from 'universal-cookie'



const ReachForm = () => {
    const { theme }:any = useAppSelector((state) => state.theme)
    const { loading } = useAppSelector((state) => state.common)
    const { payload } = useAppSelector((state) => state.repair)
    const authInfo = useAppSelector((state) => state.authInfo)
    const [loader, setLoader] = useState(false)
    const dispatch = useAppDispatch()
    const toast = useToast()
    const router = useRouter()
    const cookies = new Cookies()
    


    async function confirmOrder(e:any){
        e.preventDefault()
        const repositories = getRepositories('production')
        const active = await repositories.order.confirmOrder()
        if(active.status === 201){
            router.push(routes.HOME)
            toast.success('order confirmed')
            setLoader(false)
            dispatch(nextStep({}))
            localStorage.setItem("cart" , '0')
        }else{
            setLoader(false)
            toast.error('Cart Not confirmed yet we have an updates kindly try later on')
        }
        }


    const confirmAppointment: React.FormEventHandler = async (e) => {
        e.preventDefault()
        const values: any = {}

        const data = new FormData(e.target as HTMLFormElement)

        for (let [k, v] of data.entries()) {
            if (!v) continue
            values[k] = v
        }
        // if (!values.firstName || !values.lastName || !values.email || !values.phoneNumber || !values.contactBy) return toast.error('Fill in all fields.')
        dispatch(setLoading(true))
        if(!payload.address){
            toast.error('kindly choose your address first')
        }else{
            confirmOrder(e)
            router.push(routes.HOME)
            toast.success('Appoinment Confirm! Please check your email.', 5000)
            // dispatch(resetState())
        }
        dispatch(setLoading(false))

    }
    

    const changeTime = () => dispatch(setStep(7))
    const chooseAddress = ()=> dispatch(toggleAuthForm('availAddress'))

    return (
        <form onSubmit={confirmAppointment} className={`${styles.section} ${theme === 'light' ? styles.light : styles.dark}`}>
            <h2 className='text-center text-[#10c1e4] text-4xl'>Last Step! How Can We Reach You?</h2>
            {
                !cookies.get('token') && payload.service_type == "MAIL IT" || !cookies.get('token') && payload.service_type == "CARRY IN" ? 
                <div className={styles.form}>
                <div className={styles.input}>
                    <input type='text' placeholder='First Name' name='firstName' />
                    <input type='text' placeholder='Last Name' name='lastName' />
                    <input type='email' placeholder='Email' name='email' />
                    <input type='number' placeholder='Phone Number' name='phoneNumber' />
                </div>
                <div className={styles.contact_me}>
                    <h4>You can contact me by</h4>
                    <div className={styles.checkbox_wrapper}>
                        <div className={styles.checkbox}>
                            <input type='checkbox' name='contactBy' id='phoneCall' value='phoneCall' />
                            <label htmlFor='phoneCall'>Phone Call</label>
                        </div>
                        <div className={styles.checkbox}>
                            <input type='checkbox' name='contactBy' id='email' value='email' />
                            <label htmlFor='email'>Email</label>
                        </div>
                        <div className={styles.checkbox}>
                            <input type='checkbox' name='contactBy' id='sms' value='sms' />
                            <label htmlFor='sms'>SMS/text</label>
                        </div>
                    </div>
                </div>
                <div className='flex max-[750px]:flex-col'>
                {
                    loader == true ? <Loader /> : 
                    <button type='submit' className={styles.button}>
                    CONFIRM YOUR REPAIR APPOINTMENT
                </button>
                }
            <button className={styles.button} onClick={()=>dispatch(nextStep({}))}>
               Pay Now
            </button>
            </div>
                </div>
                : ''
            }
            {
                cookies.get('token') ?
                <>
                <div className={`${styles.footer} justify-center`}>
                <div>
                    <h4>Appointment Time</h4>
                    <div>
                        <div className={styles.icon}>
                            <Image src={appointment} alt='Appointment icon' />
                        </div>
                        <div className={styles.content}>
                            <span>{payload.scheduleTime}</span>
                            <span>{payload.scheduleDate}</span>
                            <h3 onClick={changeTime}>Change Time</h3>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>Repair Location</h4>
                    <div>
                        <div className={styles.icon}>
                            <Image src={location} alt='Location icon' />
                        </div>
                        <div className={styles.content}>
                            {
                                payload.service_type === "CARRY IN" ? '' : 
                                <div>
                                   {
                                    payload.service_type != 'COME TO YOU' ? 
                                    <div>
                                    <span>New York - Center City</span>
                                    <span>1135 walnut street, #100A Philadelphia, PA 1265</span>
                                    </div> : 
                                   <span>{payload.address}</span> 
                                   }
                                   
                                </div>
                            }
                            <h3 onClick={chooseAddress}>Choose An Address</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex max-[750px]:flex-col'>
                {
                    loader == true ? <Loader /> : 
                    <button type='submit' className={styles.button}>
                    CONFIRM YOUR REPAIR APPOINTMENT
                </button>
                }
            <button className={styles.button} onClick={()=>dispatch(nextStep({}))}>
               Pay Now
            </button>
            </div>
                </>
                :  ""
            }
            {
                !cookies.get('token') && payload.service_type == "COME TO YOU" ?  <Checkout /> : ''
            }
            
            
            <div className={styles.background}>
                <div className={styles.image1}>
                    <Image src={headphone} alt='HeadPhone' />
                </div>
                <div className={styles.image2}>
                    <Image src={controller} alt='HeadPhone' />
                </div>
            </div>
            {loading && (
                <span className={styles.loading}>
                    <AiOutlineLoading3Quarters fontSize='2.5rem' />
                </span>
            )}
        </form>
    )
}

export default ReachForm
