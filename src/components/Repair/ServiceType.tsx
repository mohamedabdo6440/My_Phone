import Image from 'next/image'
import { MdKeyboardArrowRight } from 'react-icons/md'

// local modules
import { nextStep, setStep } from '@/rtk/features/repairSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/serviceType.module.scss'

// local static files
import badge from '@/images/web_badge.png'
import fivestars from '@/images/web_fivestars.png'
import phonetilt_1 from '@/images/web_phonetilt1.png'
import phonetilt_2 from '@/images/web_phonetilt2.png'
import timecheck from '@/images/web_timecheck.png'
import warrantychecks from '@/images/web_warrantycheck.png'
import getRepositories from '@/lib/repositories'
import { useEffect, useState } from 'react'

//icons
import { TiDeleteOutline } from 'react-icons/ti'
import { AiFillDelete } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'
import{IconContext} from 'react-icons'
import { toast } from 'react-hot-toast'
import Loader from '../loaders/Loader'





const ServiceType = () => {
    const { theme }:any = useAppSelector((state) => state.theme)
    const { payload }:any = useAppSelector((state) => state.repair)
    const dispatch = useAppDispatch()
    const [cart, setCart]:any = useState(null)
    const [loader, setLoader]:any = useState(false)
    let summuryData:any =[]
    let finalSummary:any = {}
    let [go , setGo]:any = useState(null)


async function getdata() {
    const repositories = getRepositories('production')
    const active = await repositories.order.getCart()
    setLoader(false)
    if(active.data.type === "repair" ){
        setCart(active)
        summuryData =  active.data.items.map((item:any)=>{
            return{
                name : item.repairInfo.modelInfo.str,
                image: item.repairInfo.modelInfo.imageUrl ? item.repairInfo.modelInfo.imageUrl : '/android-chrome-512x512.png',
                issue:item.repairInfo.typeInfo.str,
                id: item.id,
                deviceId: item.repairInfo.modelInfo.id,
                price: item.price,
                url:item.url,
                model:item.repairInfo.model
            }
        })
        summuryData.forEach((e:any)=>{
            if(finalSummary.hasOwnProperty(e.deviceId)){
                finalSummary[`${e.deviceId}`].issues.push({
                   issue:e.issue,
                   price: e.price,
                   url:e.url
               })
               finalSummary[`${e.deviceId}`].urls.push(e.url)
            }else{
                finalSummary[`${e.deviceId}`] = {
                    name : e.name,
                    image: e.image,
                    model:e.model,
                    id: e.id,
                    issues:[],
                    urls:[]
                }
                finalSummary[`${e.deviceId}`].issues.push({
                    issue:e.issue,
                    price: e.price,
                    url:e.url
                })
                finalSummary[`${e.deviceId}`].urls.push(e.url)
            }

        })
        finalSummary = Object.values(finalSummary)
        setGo(finalSummary)
    }else{
        setGo(null)
        setCart(null)
    }

}
async function deleteItem(e:number){
    const repositories = getRepositories('production')
    const active = await repositories.order.deleteItem(e)
    toast.loading('we are proccing your request')
    if(active.status === 204){
        getdata()
        toast.dismiss()
        toast.success('item deleted')
    }
}
async function collectionConfirmation(e:string){
    const repositories = getRepositories('production')
    const active = await repositories.order.collectionConfirmation(e)
    toast.loading('we are proccing your request')
    getdata()
    if(active.status === 200){
        toast.dismiss()
        toast.success('service confirmed')
    }
}

async function deleteDevice(values:any){
    const repositories = getRepositories('production')
    const active = await repositories.order.deleteItems(values)
    toast.loading('we are proccing your request')
    if(active.status === 204){
        toast.dismiss()
        getdata()
        toast.success('items deleted')
    }
    }



useEffect(() => {
    setLoader(true)
    setTimeout(() => {
        getdata()
    }, 2000);


}, [])



    return (go != null) ?  (
        <div className={`${styles.section} ${theme === 'light' ? styles.light : styles.dark}`}>


         <section className='w-1/2 max-[500px]:w-[90%]	m-auto p-[30px] border-solid border-[#5d2bdfa3] border-[1px]'>
            <h2 className='text-center text-[#5d2bdf] font-bold border-b-[1px] border-b-[solid] border-b-[#5d2bdf] mb-5'>Summary</h2>
            {
               go.map((e:any , index:any)=>{
                    return(
                        <div className='grid grid-cols-12 justify-between items-center  border-b-[1px] border-b-[solid] border-b-[#5d2bdf] mb-5 p-1' key={index}>
                        <div className=' col-span-3 max-[720px]:col-span-12 items-center'>
                            <img src={e.image}  width="100px" className='m-auto'/>

                        </div>
                        <div className='col-span-9 max-[720px]:col-span-12 mx-3'>
                            <div className='grid grid-cols-12 items-center  border-b-[1px] border-b-[solid] border-b-[#5d2bdf]'>
                                <div className='col-span-10'>
                                <h6 className='text-[#10c1e4] font-medium max-[720px]:text-xs '>
                                {e.name}</h6>
                                </div>
                                <div className='col-span-1'>
                                 <span className='cursor-pointer m-auto grid grid-cols-12 gap-2' >
                                <div className='col-span-6'
                                 onClick={()=>{
                                    deleteDevice(e.urls)
                                    }}
                                >
                                <IconContext.Provider value={{color: 'red'}}>
                                <AiFillDelete />
                                </IconContext.Provider>
                                </div>
                                <div className='col-span-6'
                               onClick={()=>{
                                deleteDevice(e.urls)
                                dispatch(nextStep({
                                    issueUrl: e.model
                                }))
                                dispatch(setStep(5))
                            }}
                                >
                                <IconContext.Provider value={{color: 'blue'}}>
                                <FiEdit2 />
                                </IconContext.Provider>
                                </div>
                             </span>
                                </div>
                                </div>
                                <div className='grid grid-cols-12 text-sm'>
                                {
                              e.issues.map((i:any , index:any)=>{
                                return(
                                <div className='col-span-12 m-3 bg-[#3ecfef] rounded-[5px] p-1' key={index}>
                            <div className='grid items-center gap-3 grid-cols-2 max-[720px]:flex max-[720px]:flex-col text-center' key={index}>
                            <div className='grid-cols-6	text-start'>
                              {i.issue}
                              </div>
                             <span className=' text-end text-[#5d2bdf] font-bold flex items-center gap-3 justify-end max-[720px]:flex-col max-[720px]:text-center'> {i.price} {cart.data.price_currency}
                             <span className='cursor-pointer' onClick={()=>deleteItem(e.id)}>
                                <IconContext.Provider value={{color: 'red'}}>
                                <TiDeleteOutline />
                                </IconContext.Provider>

                             </span>
                             </span>

                                    </div>
                                    </div>
                                )
                              })
                            }
                                </div>


                        </div>
                        </div>
                    )
                })
            }

            <div className='text-end text-[#5d2bdf] font-bold'>
               <p>Total : {cart.data.price}  {cart.data.price_currency}</p>
            </div>
          </section>
        <div className='text-center mt-5'>
         <button className={`w-[35%] m-auto border-solid border-[1px] border-sky-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center ${theme === "light" ? 'text-dark' : 'text-white'}`}
         onClick={()=>dispatch(setStep(1))}
         > Add Another item </button>
        </div>
            <div className={styles.header}>
                <h1>How do you want to get your cellphone fixed?</h1>
                <span>Here&rsquo;s what&rsquo;s available in your area: </span>

                <div className={styles.card_wrapper}>
                    <div className={styles.card} onClick={() => {
                        dispatch(nextStep({ service_type: 'CARRY IN' }))
                        collectionConfirmation(payload.service_type)
                        }}>
                        <div className={styles.content}>
                            <strong>Carry-In</strong>
                            <p>
                                Phone repairs in 4 hours or <br /> less. Free diagnostics.
                            </p>
                        </div>
                        <MdKeyboardArrowRight />
                    </div>
                    <div className={styles.card} onClick={() =>{
                        dispatch(nextStep({ service_type: 'COME TO YOU' }))
                        collectionConfirmation(payload.service_type)
                    }}>
                        <div className={styles.content}>
                            <strong>We Come to You</strong>
                            <p>
                                Phone repairs in 2 hours or <br /> less. Deposit required.
                            </p>
                        </div>
                        <MdKeyboardArrowRight />
                    </div>
                    <div className={styles.card} onClick={() =>{
                        dispatch(nextStep({ service_type: 'MAIL IT' }))
                        collectionConfirmation(payload.service_type)

                    }}>
                        <div className={styles.content}>
                            <strong>Mail-in Repair</strong>
                            <p>
                                Free shipping both ways and repairs <br /> are completed in less than a week.
                            </p>
                        </div>
                        <MdKeyboardArrowRight />
                    </div>
                    <div className={styles.background_1}>
                        <Image src={phonetilt_1} alt='Tilted Phone' />
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.card}>
                    <div className={styles.image}>
                        <Image src={warrantychecks} alt='Badge with check' />
                    </div>
                    <span>LIFETIME WARRANTY</span>
                </div>
                <div className={styles.card}>
                    <div className={styles.image}>
                        <Image src={badge} alt='Award Badge' />
                    </div>
                    <span>EXPERT TECHNICIANS</span>
                </div>
                <div className={styles.card}>
                    <div className={styles.image}>
                        <Image src={timecheck} alt='Clock with check mark' />
                    </div>
                    <span>SAME DAY REPAIRS</span>
                </div>
                <div className={styles.card}>
                    <div className={styles.image}>
                        <Image src={fivestars} alt='Five Stars' />
                    </div>
                    <span>1M+ DEVICES FIXED</span>
                </div>
                <div className={styles.background_2}>
                    <Image src={phonetilt_2} alt='Tilted Phone' />
                </div>
            </div>
        </div>
    ) :  loader == false ? '' : <div className='w-[fit-content] m-auto'><Loader /> </div>
}

export default ServiceType
