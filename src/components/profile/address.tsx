import Image from "next/image"
import React, { useEffect, useState } from "react"

// local modules
import {  useAppDispatch, useAppSelector } from "@/rtk/hook"
import styles from "@/styles/pages/profile.module.scss"

// local static files
import remove from "@/images/web_delete.png"
import editViolet from "@/images/web_editviolet.png"
import editWhite from "@/images/web_editwhite.png"
import Link from "next/link"
import routes from "@/constants/routes"
import { RiDeleteBinLine } from "react-icons/ri"
import { FaRegEdit } from "react-icons/fa"
import getRepositories from "@/lib/repositories"
import { toast } from "react-hot-toast"
import Loader from "@/components/loaders/Loader"
import { toggleAuthForm } from "@/rtk/features/authFormSlice"
import { setAddressId } from "@/rtk/features/userSlice"




const Address = () => {
        const { theme }:any = useAppSelector((state) => state.theme)
        const [address, setAddress]:any = useState(null)
        const [Loader, setLoader] = useState(false)
        const dispatch = useAppDispatch()

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

        const SetAdress = (props:{fName:string , lName:string , street:any , zip:string , city:string , state:string , phone:any,id:number})=>{

            return(
                <>
                <div className={`justify-between items-center rounded bg-gray-200  flex  py-4 px-2 border-l-4 border-[#5E2CDF]`}>
                    <div><h5 className="text-black text-lg font-normal">{props.fName} {props.lName}  &nbsp; &nbsp; {props.street} &nbsp;&nbsp;{props.zip}&nbsp;&nbsp; {props.city} &nbsp;&nbsp; {props.state} &nbsp;&nbsp; {props.phone}</h5></div>
                    <div >
                    <button className="mr-2 text-[#5E2CDF]" onClick={(e)=>{
                        e.preventDefault()
                        dispatch(setAddressId({
                            id: props.id
                        }))
                        dispatch(toggleAuthForm('updateAddress'))
                    }}><FaRegEdit size={25}/></button>
                    <button className="mr-2 text-[#5E2CDF]" onClick={(e)=>{
                        e.preventDefault()
                        dispatch(setAddressId({
                            id: props.id
                        }))
                        dispatch(toggleAuthForm('deleteAddress'))
                    }}><RiDeleteBinLine size={25}/></button>
                    </div>
               </div>
               <br />
                </>
            )
            
            }

        useEffect(() => {
            getMyAddress()
        }, [])



        return (address != null) ? (
        <section className={`${styles.section} ${theme === "light" ? styles.light : styles.dark}`}>

            <div className={styles.address}>
                <div className={styles.title}>
                    <h3 >My Address</h3>
                    <span>Add And Manage The Addresses You Use Regularly.</span>
                </div>
                <form>
                   <div className={`relative flex`}>
                    <h4>Manage Your Address</h4>
                        <span className={` font-medium  text-[#5E2CDF] absolute top-0 right-0 `}>
                            <div className="cursor-pointer" onClick={()=>dispatch(toggleAuthForm('addAdress'))}>
                             Add  New Address&gt;&gt;
                            </div>
                        </span>
                   </div>
                   <br />
                   {
                    address.results != 0 ?
                    address.results.map((e:any, index:number)=>{
                        return (
                            <SetAdress fName={e.firstName} lName={e.lastName}
                                       street={`${e.address1} ${e.address2}`}
                                       zip={e.postCode} city={e.city}
                                       state={e.state} phone={e.phone}
                                       id={e.id}
                                       key={index} />
                        )
                    })
                    : 'No Address Found For You'
                   }

                </form>
            </div>

        </section>
    ) : null
}

export default Address


