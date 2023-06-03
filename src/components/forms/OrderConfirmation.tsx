import React , {useState}from 'react'
import styles from '@/styles/components/loginForm.module.scss'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import { toggleAuthForm } from '@/rtk/features/authFormSlice'
import { setTabSell } from '@/rtk/features/sellSlice'
import { setTab } from '@/rtk/features/buySlice'
import getRepositories from '@/lib/repositories'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import routes from '@/constants/routes'




const OrderConfirmation = ({action}:any)=> {
    const { theme }:any = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    let [loader , setLoader] = useState(false)
    const router = useRouter()
    const buySelector = useAppSelector((state) => state.buy)
    const sellSelctor = useAppSelector((state) => state.sell)
    const { page } = useAppSelector((state) => state.home)
    const { quantity, subTotal, shippingFee, total } = useAppSelector((state) => state.order)


    const accountConfirmation = (e:any)=>{
        e.preventDefault()
        if(e.target.innerText == 'Yes'){
            addtoCart(e)
            dispatch(toggleAuthForm(false))
        }else{
            dispatch(toggleAuthForm(false)) 
        }
        // dispatch(setTabSell('cart'))
        // dispatch(setTab('cart'))
        
    }

    const addtoCart = async (e:any) => {
        e.preventDefault()
           setLoader(true)
           const repositories = getRepositories('production')
           const model = await repositories.order.createCart(page , 'web')
           if(model.status == 500){
               toast.error('we have an updates try later on')
           }else{
               toast.success('your cart made succecfully')
               addItemsToCart(e)
               router.push(routes.HOME)  
               setLoader(false)
               localStorage.setItem('cart' , '1')
           } 
   }

   const addItemsToCart = async (e:any)=>{
    e.preventDefault()
    const repositories = getRepositories('production')
    const model = await repositories.order.addOrder(page , quantity , page == 'buy' ? buySelector.cart.includesData.url :  sellSelctor.cart.includesData.url)
    if(model.status == 200 || 201){
        toast.success('items added')
        router.push(routes.HOME)  
        setLoader(false)
    }else{
        setLoader(false)
    }
}

  return (
    <div className={`${styles.container} ${theme === 'light' ? null : styles.dark} form_close`}>
        <form className={styles.form} onSubmit={accountConfirmation}>
            <h3>You Have A Cart And you are going to delete it are you sure that you need to take this action?</h3>
            <div className='flex justify-around w-[100%] gap-[100px]'>
            <button type='submit' onClick={(e)=>accountConfirmation(e)}>Yes</button>
            <button type='submit' onClick={(e)=>accountConfirmation(e)}>No</button>
            </div>
        </form>
    </div>
  )
}
export default OrderConfirmation