import React, { useState } from 'react'
import styles from '@/styles/components/loginForm.module.scss'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import { toggleAuthForm } from '@/rtk/features/authFormSlice'
import Loader from '../loaders/Loader'
import { useRouter } from 'next/router'


export default function DunnoForm() {
    const { theme }:any = useAppSelector((state) => state.theme)
    let [loader , setLoader] = useState(false)
    const dispatch = useAppDispatch()
    const router = useRouter()

  return (
    <div className={`${styles.container}  ${theme === 'light' ? null : styles.dark} form_close`}>
    <form className={`${styles.form} max-w-[50%]`}>
        <h3>Kinldy Explain The Issue If You Know It</h3>
        <textarea id="message" className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your issue here..."></textarea>
        {
            loader == true ? 
            <div className='w-[fit-content] m-auto'><Loader /></div> 
            : 
            <div className='flex justify-around w-[100%] gap-[100px]'>
            <button type='submit' onClick={()=>
                dispatch(toggleAuthForm(false))
            }>Save</button>
            <button type='submit' onClick={()=>
                dispatch(toggleAuthForm(false))
            }>i don't really know</button>
            </div>
        }
    </form>
</div>
  )
}
