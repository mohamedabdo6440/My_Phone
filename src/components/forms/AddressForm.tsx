import React, { useEffect } from 'react'
import styles from '@/styles/components/loginForm.module.scss'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import { MdClose } from 'react-icons/md'
import {phone} from 'phone';
import { toast } from 'react-hot-toast';
import getRepositories from '@/lib/repositories';
import { toggleAuthForm } from '@/rtk/features/authFormSlice';
import { useRouter } from 'next/router';
import routes from '@/constants/routes';
import { setUserData } from '@/rtk/features/userSlice';




export default function AddressForm() {

    const router = useRouter();
    const { theme }:any = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    const props = useAppSelector((state) => state.user)

    var data = {
        fName : '',
        lName : '',
        company:'',
        address1:'',
        address2:'',
        city:'',
        state:'',
        postCode:'',
        phoneNumber:'',
        customer: props.userData.url
    
    }

    const getProfile = async () => {
          const repositories = getRepositories();
          const user:any = await repositories.user.getCurrentUserProfile();
          if(user.detail){
          toast.error('Kindly log in Again')
          }else{
            dispatch(setUserData({
              url: user.url
            }))
          }
        }

        useEffect(() => {
            getProfile()
        }, [])
        
    




     const submitHandler: React.FormEventHandler = async (e:any) => {
        e.preventDefault()
         if(!data.fName || !data.lName || !data.company || !data.address1 || !data.address2 || !data.city || !data.postCode || !data.state){
            toast.error('kindly enter your full details')
        }else{
            const repositories = getRepositories('production')
            const active = await repositories.address.createAddress(data)
            toast.loading('we are proccing your request')
            if(active.status === 200 || active.status === 201){
                toast.dismiss()
                toast.success('address added')
                dispatch(toggleAuthForm(false))
            }else{
                toast.dismiss()
                for(let key in active.data) { 
                    toast.error(key + ': ' + active.data[key]); 
                 }
            }
        }
    }

  return (
    <div className={`${styles.container} ${theme === 'light' ? null : styles.dark} form_close`}>
            <form className={`${styles.form} max-w-[35%]`} id="form" onSubmit={submitHandler}>
                <div className='grid gap-3 grid-cols-2 '>
                <h3>Add An Address</h3>
                <input type='text' placeholder='first Name' required name='fname' onChange={(e)=>data.fName = e.target.value} />
                <input type='text' placeholder='Last Name' required  name='lname' onChange={(e)=>data.lName = e.target.value}/>
                <input type='text' placeholder='company' required  name='company' onChange={(e)=>data.company = e.target.value}/>
                <input type='text' placeholder='address1' required  name='address1' onChange={(e)=>data.address1 = e.target.value}/>
                <input type='text' placeholder='address2' required name='address2'  onChange={(e)=>data.address2 = e.target.value}/>
                <input type='text' placeholder='city' required name='city' onChange={(e)=>data.city = e.target.value}/>
                <input type='text' placeholder='state' required name='state' onChange={(e)=>data.state = e.target.value}/>
                <input type='number' placeholder='postCode' required name='postCode' onChange={(e)=>data.postCode = e.target.value}/>
                <input type='number' placeholder='phone' required name='phone' onChange={(e)=>data.phoneNumber = e.target.value}/>
                </div>
                <button type='submit'>Add</button>
            </form>
        </div>
  )
}
