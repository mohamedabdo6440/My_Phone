import React, { useEffect, useState } from 'react'
import styles from '@/styles/components/loginForm.module.scss'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import { toast } from 'react-hot-toast'
import getRepositories from '@/lib/repositories'
import { toggleAuthForm } from '@/rtk/features/authFormSlice'


export default function UpdateAddress() {
    const { theme }:any = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    const user = useAppSelector((state)=> state.user)
    const [address, setAddress]:any = useState(null)

   var data = {
        fName :'',
        lName : '',
        company: '',
        address1:'',
        address2: '',
        city: '',
        state: '',
        postCode: '',
        phoneNumber: '',
        customer: user.userData.url
    }

    var updatedData = {
        fName : '',
        lName : '',
        company:'',
        address1:'',
        address2:'',
        city:'',
        state:'',
        postCode:'',
        phoneNumber:'',
        customer: user.userData.url
    
    }

    const changedProperties:any = {};
    function getChangedProperties(data:any, updatedData:any , e:any) {
        e.preventDefault()
        for (let key in updatedData) {
          if (data[key] !== updatedData[key]) {
            changedProperties[key] = updatedData[key];
          }
        }
        return changedProperties
      }

    async  function getMyAddress() {
        const repositories = getRepositories('production')
        const address = await repositories.address.getSpecifcAddresses(user.userData.addressId)
        if(address.status === 200){
            setAddress(address.data)
            data.fName = address.data.firstName,
            data.lName = address.data.lastName,
            data.company = address.data.company,
            data.address1 = address.data.address1,
            data.address2 = address.data.address2,
            data.city = address.data.city,
            data.state = address.data.state,
            data.postCode = address.data.postCode,
            data.phoneNumber = address.data.phone
        }else{
            toast.error('we have an updates try later on')
        }
    }

    async  function updateAddress(e:any) {
        e.preventDefault()
        getChangedProperties( data , updatedData , e)
        if(JSON.stringify(changedProperties) === '{}'){
            toast.error('no updates done')
        }else{
        
            const repositories = getRepositories('production')
            const newAddress = await repositories.address.updateAddress(address.id , changedProperties)
            if(newAddress.status === 200 || newAddress.status === 201){
               toast.success('address has been updated succefully ')
               dispatch(toggleAuthForm(false))
            }else{
                toast.error('we have an updates try later on')
            }
        }

    }

    useEffect(() => {
        getMyAddress()
    }, [])
    

  return (address != null) ?  (
    <div className={`${styles.container} ${theme === 'light' ? null : styles.dark} form_close`}>
            <form className={`${styles.form} max-w-[35%]`} id="form" onSubmit={updateAddress}>
                <div className='grid gap-3 grid-cols-2 '>
                <h3>Update Your Address</h3>
                <input type='text' placeholder='first Name' defaultValue={address.firstName} required name='fname' onChange={(e)=>updatedData.fName = e.target.value} />
                <input type='text' placeholder='Last Name' defaultValue={address.lastName} required  name='lname' onChange={(e)=>updatedData.lName = e.target.value}/>
                <input type='text' placeholder='company' defaultValue={address.company} required  name='company' onChange={(e)=>updatedData.company = e.target.value}/>
                <input type='text' placeholder='address1' defaultValue={address.address1} required  name='address1' onChange={(e)=>updatedData.address1 = e.target.value}/>
                <input type='text' placeholder='address2' defaultValue={address.address2}  required name='address2'  onChange={(e)=>updatedData.address2 = e.target.value}/>
                <input type='text' placeholder='city' defaultValue={address.city} required name='city' onChange={(e)=>updatedData.city = e.target.value}/>
                <input type='text' placeholder='state' defaultValue={address.state} required name='state' onChange={(e)=>updatedData.state = e.target.value}/>
                <input type='number' placeholder='postCode' defaultValue={address.postCode} required name='postCode' onChange={(e)=>updatedData.postCode = e.target.value}/>
                <input type='text' placeholder='phone' defaultValue={address.phone} required name='phone' onChange={(e)=>updatedData.phoneNumber = e.target.value}/>
                </div>
                <button type='submit'>update</button>
            </form>
        </div>
  ) : ''
}
