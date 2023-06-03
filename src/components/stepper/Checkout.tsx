import { NextPage } from 'next'
import Image from 'next/image'
import React, { useReducer , useState , useMemo, useEffect } from 'react'


// local modules
import IconButton from '@/components/buttons/IconButton'
import axios from '@/lib/axios'
import { CartTab } from '@/rtk/features/orderSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import { setCheckoutDetails } from '@/rtk/features/orderSlice'
import styles from '@/styles/components/checkout.module.scss'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { HomePage } from '@/rtk/features/homeSlice'

// local static files
import fedex from '@/images/web_fedex.png'
import paypal from '@/images/web_paypal.png'
import stripe from '@/images/web_stripe.png'
import ups from '@/images/web_ups.png'
import uspostal from '@/images/web_uspostal.png'

//imgs
import iphone from "@/images/web_iphone12.png";
import useScroll from '@/hooks/useScroll'
import getRepositories from '@/lib/repositories'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import routes from '@/constants/routes'
import { toggleAuthForm } from '@/rtk/features/authFormSlice'
import Cookies from 'universal-cookie'
import Loader from '../loaders/Loader'








interface CheckoutProps {
    setTab: ActionCreatorWithPayload<CartTab>
    imageUrl: string
    model: string
    color: string
}

const Checkout: NextPage<CheckoutProps> = ({ setTab, color, imageUrl, model }) => {
    const router = useRouter()
    const { theme }:any = useAppSelector((state) => state.theme)
    const { page } = useAppSelector((state) => state.home)
    const { checkout, total, quantity } = useAppSelector((state) => state.order)
    const { payload } = useAppSelector((state) => {
        if (page == 'buy') {
            return state.buy
        } else {
            return state.sell
        }
    })
    const buySelector = useAppSelector((state) => state.buy)
    const sellSelctor = useAppSelector((state) => state.sell)
    const orderSelector = useAppSelector((state)=> state.order)
    const __model__: any = payload.model
    const dispatch = useAppDispatch()
    let [loader , setLoader] = useState(false)
    let cookie = new Cookies()
    var userData = {
        first_Name : checkout.name , 
        last_Name : checkout.lastName , 
        email : checkout.emailAddress , 
        address : checkout.address ,
        apartment : checkout.appart , 
        city : checkout.city , 
        zip: checkout.zipCode , 
        phoneNumber : checkout.phoneNumber
    }

    var scroll = useMemo(() => useScroll(),[])
  
    function confirmation(e:any){
        e.preventDefault()
        if(cookie.get('token')){
        addOrder(e)
        }else{
            dispatch(toggleAuthForm('login'))
        }
    }


    
    function validateForm(){
        let  Joi = require('joi');
          let schume = Joi.object({
            first_Name:Joi.string().min(3).max(30).required(),
            last_Name:Joi.string().min(3).max(30).required(),
            email:Joi.string().email({tlds: { allow: ['com', 'net'] } }).required(),
            address:Joi.string().min(3).max(70).required(),
            apartment:Joi.string().min(3).max(70).required(),
            city:Joi.string().min(3).max(70).required(),
            zip:Joi.number().min(20).required(),
            phoneNumber:Joi.number().min(14).required()
          }) 

        return schume.validate(userData)   
      }
 

    const addOrder = async (e:any) => {
        e.preventDefault()
        let validateResponse =  validateForm()
        if(validateResponse.error){
           return toast.error(validateResponse.error.details[0].message)
        }else{
            setLoader(true)
            const repositories = getRepositories('production')
            // const model = await repositories.order.addOrder(page , quantity , page == 'buy' ? buySelector.cart.includesData.url :  sellSelctor.cart.includesData.url)
            const model = await repositories.order.confirmOrder()
            if(model.status == 200 || 201){
                toast.success('order made succefully')
                router.push(routes.HOME)  
                setLoader(false)
            }else{
                setLoader(false)
            }
            
        }
       
    }

    const notACustomer = async (e:any) => {
        e.preventDefault()
        let validateResponse =  validateForm()
        if(validateResponse.error){
           return toast.error(validateResponse.error.details[0].message)
        }else{ 
            setLoader(true)
            const repositories = getRepositories('production')
            let request : any = await repositories.order.notACustomer(orderSelector.checkout.emailAddress ,orderSelector.checkout.name , orderSelector.checkout.lastName , orderSelector.checkout.phoneNumber)
            if(request.status == 500){
            toast.error("We Have an updates try later on")
            setLoader(false)

            }else if(request.status != 200 && request.status != 201){
                for(let key in request.data) {
                    toast.error(key + ': ' + request.data[key]);
            } 
            setLoader(false)
            }else{
                toast.success('we sent you an email to set your account')  
                addOrder(e)
            }
        }
    }

    const paypalHandler = async () => {
        try {
            const result = await axios.post('/payment/paypal/create-orders', { amount: total })

            if (result.status == 200) {
                dispatch(setCheckoutDetails({
                    ...checkout,
                    paymentProcessor: 'paypal',
                    paymentIdentifier: result.data.id,
                    paymentApproveUrl: result.data.links[1].href
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const stripeHandler = async () => {
        try {
            const result = await axios.post('/payment/stripe/create-payment-intent', {
                items: [
                    { id: `${payload.brand} ${__model__.model}` },
                ],
                amount: total
            })

            if (result.status == 200) {
                dispatch(setCheckoutDetails({
                    ...checkout,
                    paymentProcessor: 'stripe',
                    paymentIdentifier: result.data.paymentIntentId,
                    paymentApproveUrl: result.data.url,
                    paymentStripeClientSecret: result.data.clientSecret
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const generateChoicesLabel = (page: HomePage) => {
        switch (page) {
            case 'buy':
                return {
                    paymentChoiceLabel: 'How would you like pay?',
                    shippingChoiceLabel: 'How would your device to be shipped?'
                }
            case 'sell':
                return {
                    paymentChoiceLabel: 'How would you like to be paid?',
                    shippingChoiceLabel: 'How would you like to ship your device?'
                }
            default:
                break;
        }
    }

   
    

    return (
        <div className={`${styles.container} ${theme === 'light' ? styles.light : styles.dark}`}>
            <form>
                {/* {
                    page == 'sell' ? '' : 
                    <div className={styles.header}>
                    <span>{generateChoicesLabel(page)?.paymentChoiceLabel}</span>
                    <ul>
                        <li>
                            <IconButton image={paypal} name='payment_type' value='paypal' onChange={paypalHandler} />
                        </li>
                        <li>
                            <IconButton image={stripe} name='payment_type' value='stripe' onChange={stripeHandler} />
                        </li>
                    </ul>
                </div>
                } */}
                
                {/* <div className={styles.header}>
                    <span>{generateChoicesLabel(page)?.shippingChoiceLabel}</span>
                    <ul>
                        <li>
                            <IconButton image={fedex} name='shippper' value='fedex'  onChange={(e) => {
                                    const target = e.target as HTMLTextAreaElement
                                    
                                    dispatch(setCheckoutDetails({ ...checkout, shippingProvider: target.value }))
                                }
                            } />
                        </li>
                        <li>
                            <IconButton image={uspostal} name='shippper' value='us_portal' onChange={(e) => {
                                    const target = e.target as HTMLTextAreaElement
                                    
                                    dispatch(setCheckoutDetails({ ...checkout, shippingProvider: target.value }))
                                }
                            } />
                        </li>
                        <li>
                            <IconButton image={ups} name='shippper' value='ups' onChange={(e) => {
                                    const target = e.target as HTMLTextAreaElement
                                    dispatch(setCheckoutDetails({ ...checkout, shippingProvider: target.value }))
                                }
                            } />
                        </li>
                    </ul>
                </div> */}
                <div className={`${styles.input_wrapper} ${styles.shrink}`}>
                    <label htmlFor='name'>First Name</label>
                    <input type='text' id='name' name='name' onChange={(e) =>
                        dispatch(setCheckoutDetails({ ...checkout, name: e.target.value }))
                    } />
                </div>
                <div  className={`${styles.input_wrapper} ${styles.shrink}`}>
                    <label htmlFor='name'>Last Name</label>
                    <input type='text' id='last_Name' name='last_Name' onChange={(e) =>{
                    dispatch(setCheckoutDetails({ ...checkout, lastName: e.target.value }))
                    }
                        
                    } />
                </div>
                <div className={styles.input_wrapper}>
                    <label htmlFor='email'>Email Address</label>
                    <input type='email' id='email' name='email' onChange={(e) =>
                        dispatch(setCheckoutDetails({ ...checkout, emailAddress: e.target.value }))
                    } />
                </div>
                <div className={styles.input_wrapper}>
                    <label htmlFor='address'>House Number & StreetName</label>
                    <input type='text' id='address' name='address' onChange={(e) =>
                        dispatch(setCheckoutDetails({ ...checkout, address: e.target.value }))
                    } />
                </div>
                <div className={`${styles.input_wrapper} ${styles.shrink}`}>
                    <label htmlFor='apartment'>Apartment, Suite</label>
                    <input type='text' id='apartment' name='apartment' onChange={(e) =>
                        dispatch(setCheckoutDetails({ ...checkout, appart: e.target.value }))
                    } />
                </div>
                <div className={`${styles.input_wrapper} ${styles.shrink}`}>
                    <label htmlFor='city'>City</label>
                    <input type='text' id='city' name='city' onChange={(e) =>
                        dispatch(setCheckoutDetails({ ...checkout, city: e.target.value }))
                    } />
                </div>
                <div className={`${styles.input_wrapper} ${styles.shrink}`}>
                    <label htmlFor='zip'>ZIP</label>
                    <input type='text' id='zip' name='zip' onChange={(e) =>
                        dispatch(setCheckoutDetails({ ...checkout, zipCode: e.target.value }))
                    } />
                </div>
                <div className={`${styles.input_wrapper} ${styles.shrink}`}>
                    <label htmlFor='phoneNumber'>Phone Number</label>
                    <input type='text' id='phoneNumber' name='phoneNumber' onChange={(e) =>
                        dispatch(setCheckoutDetails({ ...checkout, phoneNumber: e.target.value }))
                    } />
                </div>

                <div className={styles.button}>
                    {/* {  
                        loader == false ?
                        <button onClick={(e) =>{
                            confirmation(e)
                        }}>PROCEED</button>
                        : 
                        <Loader /> 
                    } */}
                     {  
                        loader == false ?
                        <button onClick={(e:any)=>notACustomer(e)}>Confirm</button>
                        : 
                        <Loader /> 
                    }
                   
                </div>
                
            </form>
               
            {/* <div className={styles.order_summary}>
                <div className={styles.title}>
                    <h3>Order Summary</h3>
                </div>
                <div className={styles.header}>
                    <strong>Price</strong>
                    <span>{total}$</span>
                    <strong>Shipping</strong>
                    <span>5%</span>
                </div>
                <div className={styles.footer}>
                    <div className={styles.image}>
                        <Image src={`${payload.model?.imageUrl == null ? "/favicon-16x16.png" : payload.model?.imageUrl }`} layout='responsive' width='100%' objectFit='contain' height='100%' alt={payload.model?.name} />
                    </div>
                    <div className={styles.details}>
                        <strong>{`${payload.model?.str}`}</strong>
                        <div>
                            {color && (
                                <>
                                    <span className={styles.color} style={{ background: payload.device_details?.color.split('.')[0] }} />
                                    <span>{payload.device_details?.color.split('.')[1]}</span>
                                </>
                            )}
                            <span> {quantity}x</span>
                            <span>${total}</span>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Checkout
