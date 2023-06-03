import React from 'react'
import styles from '@/styles/components/loginForm.module.scss'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import { toggleAuthForm } from '@/rtk/features/authFormSlice'
import { setTabSell } from '@/rtk/features/sellSlice'
import { setTab } from '@/rtk/features/buySlice'
import getRepositories from '@/lib/repositories'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import routes from '@/constants/routes'
import { setIssuesSlice } from '@/rtk/features/repairSlice'


export default function UserConfirmation() {
const { theme }:any = useAppSelector((state) => state.theme)
const dispatch = useAppDispatch()

  return (
    <div className={`${styles.container} ${theme === 'light' ? null : styles.dark} form_close`}>
        <form className={styles.form}>
            <h3>Do You Have An Account ?</h3>
            <div className='flex justify-around w-[100%] gap-[100px]'>
            <button type='submit' onClick={()=>{dispatch(setIssuesSlice({
                user : true
            }))
            dispatch(toggleAuthForm('login'))
            }}>Yes</button>
            <button type='submit' onClick={()=>{
                dispatch(setIssuesSlice({
                    user : false
                }))
                dispatch(toggleAuthForm(false))}}>No</button>
            </div>
        </form>
    </div>
  )
}
