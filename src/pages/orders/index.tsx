import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// local modules
import routes from '@/constants/routes'
import {canAccess, GetServerSidePropsComponent, IPageProps} from '@/lib/auth'
import { toggleAuthForm } from '@/rtk/features/authFormSlice'
import { setFilter, setTab } from '@/rtk/features/orderSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/pages/order.module.scss'

// local static files
import Layout from '@/components/forms/Layout'
import { NextPageWithLayout } from '../_app'
import { TOrder } from '@/interfaces'
// import { generateCarrier } from '@/components/BuyDetails'
import getRepositories from "@/lib/repositories";
//images
import emptyCart from '@/images/emptycart.webp'
import useMediaQuery from '@/hooks/useMediaQueries'
import { GiCancel } from 'react-icons/gi'
import InputColor from '@/components/buttons/InputColor'
import Cookies from 'universal-cookie'
import { toast } from 'react-hot-toast'
import Loader from '@/components/loaders/Loader'
import {IconContext} from 'react-icons'


const MyOrder: any = (props:any) => {    
    const cookie = new Cookies()
    const { theme }:any = useAppSelector((state) => state.theme)
    const orderState = useAppSelector((state) => state.order)
    const orderStatusFilter = orderState.filter
    const orderTypeFilter = orderState.tab
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [orders, setOrders] = useState<TOrder[]>()
    const mobile = useMediaQuery('(max-width: 600px)')
    const [cart, setCart]:any = useState(null)
    const [loader, setLoader] = useState(false)


  
    
    useEffect(() => {
        getdata()
    }, [])
    
    async function getdata() {
        const repositories = getRepositories('production')
        const active = await repositories.order.getCart()
        if(active.data.type === "sell" || active.data.type === "buy"){
            setCart(active)
        }else{
            setCart(false)
        }
        console.log(active)
        
    }
    async function confirm() {
        setLoader(true)
        const repositories = getRepositories('production')
        const result = await repositories.order.confirmOrder()
       if(result.status == 201){
        router.push(routes.HOME) 
        setLoader(false)
        localStorage.setItem('cart' , 0)
       }else{
        setLoader(false)
       }
    }



    if(cookie.get('token')){
        return cart != null ? (
            <section className={`${styles.section} ${theme === 'light' ? styles.light : styles.dark}`}>
                <h2>My  {cart.type} Cart</h2>
    
                {
                    cart === false ? 
                    <div className='flex justify-center flex-col items-center gap-10'>
                        <Image src={emptyCart} width="150%" height="150%" />
                        <p>Your Cart Is Empty</p>
                    </div> : 
                    <div className={styles.phones}>
                     {
                         cart.data.items.map((e:any , index:any)=>{
                                return (
                                    <div key={index} className={`${styles.cartCard} m-auto relative`}>
                                        <div className='absolute top-1	right-1 cursor-pointer'>
                                        <IconContext.Provider value={{size : '20px' , color : 'red'}}>
                                        <GiCancel />
                                        </IconContext.Provider>
                                        </div>
                                        <div>
                                            <Image
                                                src={e.deviceInfo.imageUrl}
                                                width='80%'
                                                height='100%'
                                                objectFit='contain'
                                                alt={e.deviceInfo.str}
                                            />
                                        </div>
                                        <div>
                                            <h3>{`${e.deviceInfo.company} ${e.deviceInfo.series}  ${e.deviceInfo.model}`}</h3>

                                            <span>{e.deviceInfo.variantInfo.storage}
                                            </span>
                                            <span>{e.deviceInfo.variantInfo.carrier} </span>
                                            <span>{e.deviceInfo.variantInfo.condition}</span>
                                            {/* <p>Color : <InputColor event={`${product.variantInfo.color.toLowerCase()}`} extra={'w-4 h-4'} text={''} name='color'  value={product.variantInfo.color}/></p> */}
                                            <br />
                                            <strong>{e.deviceInfo.price.sell} {cart.data.price_currency}</strong>
                                            {/* <span>Free shipping</span> */}
                                        </div>
                                    </div>
                                )
                         })
                     }
                    </div>
                }
                
    
                <div className='text-center mt-20'>
                    {
                         cart === false ? '' : loader == false ? <button onClick={()=>confirm()} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Confirm for {cart.data.price_ttc}</button> :<div className='text-center '><Loader/></div> 
                    }
                
                </div>
    
                {/* <div className='flex justify-center flex-col items-center gap-10'>
                        <Image src={emptyCart} width="150%" height="150%" />
                        <p>Your Cart Is Empty</p>
                    </div> */}    
                {/* <div className={styles.tabs} >
                    <h3 className={`${orderTypeFilter === 'sell' ? styles.active : null}`}
                        onClick={() => dispatch(setTab('sell'))} id="sellSmart">
                        Sell Smart
                    </h3>
                    <h3 className={`${orderTypeFilter === 'buy' ? styles.active : null}`}
                        onClick={() => dispatch(setTab('buy'))} id="buySmart">
                        Buy Smart
                    </h3>
                    <h3 className={`${orderTypeFilter === 'repair' ? styles.active : null}`}
                        onClick={() => dispatch(setTab('repair'))} id="repairSmart">
                        Repair Smart
                    </h3>
                </div>
                <div>
                    <div className={styles.filter}>
                        <span className={`${orderStatusFilter === 'all' ? styles.active : null}`}
                              onClick={() => dispatch(setFilter('all'))}>
                            All Orders
                        </span>
                        <span className={`${orderStatusFilter === 'pending' ? styles.active : null}`}
                              onClick={() => dispatch(setFilter('pending'))}>
                            Pending Orders
                        </span>
                        <span className={`${orderStatusFilter === 'completed' ? styles.active : null}`}
                              onClick={() => dispatch(setFilter('completed'))}>
                            Completed Orders
                        </span>
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.row}>
                                <th>Order Date</th>
                                <th>Carrier</th>
                                <th>Order Value</th>
                                <th>Order Status</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterOrders(orders).map((order: TOrder) => {
                                    return OrderRow(order)
                                })
                            }
                        </tbody>
                    </table>
                </div> */}
    
            </section>
        ) : <div className='flex justify-center'><Loader /></div>
    }else{
        router.push('/')
      dispatch(toggleAuthForm('login'))
    }

   
}

MyOrder.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export async function getServerSideProps(context:any) {
    const repositories = getRepositories('production')
    const data = await repositories.order.getCartItems()

    return {
      props: {
       data: data,
      },
    };
  }

export default MyOrder
