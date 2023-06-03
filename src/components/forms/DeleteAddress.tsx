import React, { useState } from 'react'
import styles from '@/styles/components/loginForm.module.scss'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import Loader from '../loaders/Loader'
import getRepositories from '@/lib/repositories'
import { toggleAuthForm } from '@/rtk/features/authFormSlice'
import { toast } from 'react-hot-toast'
import routes from '@/constants/routes'


export default function DeleteAddress() {
    const { theme }:any = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    let [loader , setLoader] = useState(false)
    const router = useRouter()
    const user = useAppSelector((state)=> state.user)

    const deleteAddress = async (e:any , id:any) => {
        e.preventDefault()
           setLoader(true)
           const repositories = getRepositories('production')
           const model = await repositories.address.deleteAddress(id)
           setLoader(false)
            if(model == true){
                toast.success('address deleted')
                dispatch(toggleAuthForm(false)) 
                router.push(routes.HOME)
            }
           
    }


  return (
    <div className={`${styles.container} ${theme === 'light' ? null : styles.dark} form_close`}>
    <form className={styles.form}>
        <h3>You Are About to Delete Your Address Are You Sure To Take This Action?</h3>
        {
            loader == true ? <div className='w-[fit-content] m-auto'><Loader /></div> : 
            <div className='flex justify-around w-[100%] gap-[100px]'>
            <button type='submit' onClick={(e)=>deleteAddress(e , user.userData.addressId)}>Yes</button>
            <button type='submit' onClick={(e)=>{
                 e.preventDefault()
                 dispatch(toggleAuthForm(false)) 
            }}>No</button>
            </div>
        }
    </form>
</div>
  )
}
