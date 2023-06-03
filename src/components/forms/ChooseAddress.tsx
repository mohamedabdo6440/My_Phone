import React, { useEffect, useState } from 'react'
import styles from '@/styles/components/loginForm.module.scss'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import Loader from '../loaders/Loader'
import getRepositories from '@/lib/repositories'
import { toggleAuthForm } from '@/rtk/features/authFormSlice'
import { toast } from 'react-hot-toast'
import routes from '@/constants/routes'
import { nextStep, setIssuesSlice } from '@/rtk/features/repairSlice'


export default function ChooseAddress() {
    const { theme }:any = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    let [loader , setLoader] = useState(false)
    const [address, setAddress]:any = useState(null)
    const [cartData, setCartData]:any = useState(null)
    const router = useRouter()
    const user = useAppSelector((state)=> state.user)

    async  function getMyAddress() {
        const repositories = getRepositories('production')
        const address = await repositories.address.getCurrentUserAddresses()
        setLoader(true)
        if(address.status === 200){
            setAddress(address.data)
            setLoader(false)

        }else{
            toast.error('we have an updates try later on')
            setLoader(false)
        }
    }
    async function getdata() {
      const repositories = getRepositories('production')
      const active = await repositories.order.getCart()
      if(active.status === 200 && active.data.type === "repair"){
        setCartData(active)
      }
  }
  async function confirmAddress(e:any) {
    const repositories = getRepositories('production')
    const active = await repositories.order.confirmAddress(e , cartData.data.url)
    if(active.status === 201){
      toast.success('address confirmed')
    }
  
}

    useEffect(() => {
        getMyAddress()
        getdata()
    }, [])
    


  return (address) ? (
    <div className={`${styles.container} ${theme === 'light' ? null : styles.dark} form_close`}>
          <form className={`${styles.form} max-w-[60%]`}>

          {
                    address.results != 0 ?
                    address.results.map((e:any, index:number)=>{
                        return (
                          <div key={index}   className={`justify-between items-center rounded bg-gray-200  flex  py-4 px-2 border-l-4 border-[#5E2CDF] cursor-pointer`} >
                            <div   onClick={()=>{
                              confirmAddress(e.url)
                              dispatch(setIssuesSlice({
                                address : e.address1
                              }))
                              dispatch(toggleAuthForm(false))
                            }}>
                            <h5 className="text-black text-lg font-normal">
                            {e.firstName} {e.lastName} 
                             &nbsp; &nbsp; 
                             {e.address1} {e.address2} &nbsp;&nbsp;
                             {e.postCode}&nbsp;&nbsp; {e.city} &nbsp;&nbsp; {e.state} &nbsp;&nbsp;
                             </h5>
                             </div>
                             </div>
                        )
                    })
                    : 'No Address Found For You'
                   }
                 <div>
                 <div>
                 </div>
               <div>
              
                 </div>
                 </div>
                 <button className='w-[fit-content]' onClick={(e)=>{
                    e.preventDefault()
                   dispatch(toggleAuthForm('addAdress'))
                    }}>Add a new address</button>
               </form>
        </div>
  ) : <div className='w-[fit-content] m-auto'><Loader /></div> 
}
