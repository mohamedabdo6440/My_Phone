import Image from 'next/image'
import { useEffect , useState , useMemo } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { useRouter } from 'next/router'


// import { generateCondition } from '@/components/BuyDetails'
import { CartTab, setQuantity, setSubTotal, setTotal } from '@/rtk/features/orderSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/pages/cart.module.scss'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import getRepositories from '@/lib/repositories'
import useScroll from '@/hooks/useScroll'
import useToast from '@/hooks/useToast'
import routes from '@/constants/routes'
import Loader from '../loaders/Loader'
import { toast } from 'react-hot-toast'
import Cookies from 'universal-cookie'
import { toggleAuthForm } from '@/rtk/features/authFormSlice'
import AccountConfirmation from '../forms/OrderConfirmation'




interface CartProps {
    setTab: ActionCreatorWithPayload<CartTab>
    values: {
        brand: string
        model: string
        imageUrl: string
        condition: string
        carrier: string
        storage: string
    }
}

const Cart = ({ setTab, values }: CartProps) => {
    const dispatch:any = useAppDispatch()
    const { quantity, subTotal, shippingFee, total } = useAppSelector((state) => state.order)
    const buySelector = useAppSelector((state) => state.buy)
    const sellSelctor = useAppSelector((state) => state.sell)
    const { page } = useAppSelector((state) => state.home)
    const router = useRouter()
    let [loader , setLoader] = useState(false)
    const cookie = new Cookies()

    useEffect(() => {
        {page == 'sell' ? dispatch(setSubTotal({ subTotal: sellSelctor.cart.includesData.price.sell * quantity })) : dispatch(setSubTotal({ subTotal: buySelector.cart.includesData.price.buy * quantity })) } 
    }, [quantity, dispatch])

    useEffect(() => {
    dispatch(setTotal({ total: subTotal + (subTotal * shippingFee / 100)}))
    }, [subTotal, shippingFee, dispatch])

    useEffect(() => {
        dispatch(setQuantity({ quantity: 1 }))
    }, [])
    
    var scroll = useMemo(() => useScroll(),[])

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
                localStorage.setItem('cart' , 1)
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

  async  function checkCart(e:any){
        const repositories = getRepositories('production')
        const active = await repositories.order.getCart()
        if(active.status == 204){
            addtoCart(e)
        }else{
            if(active.data.type === page){
                addItemsToCart(e)
            }else{
               dispatch(toggleAuthForm('confirmation'))
            }
        }
    }


  


    return (
        <>
            <h2 className={styles.title}>My Cart</h2>
            <table>
                <thead>
                    <tr className={styles.table_row}>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={styles.table_row}>
                        <td className={styles.product}>
                            <strong className={styles.content_title}>
                                {values.brand} {values.model}
                            </strong>
                            <div className={styles.content_wrapper}>
                                <div className={styles.image}>
                                    <Image
                                        src={`${page == 'buy' ? buySelector.payload.model?.imageUrl == null ? "/favicon-16x16.png" :  buySelector.payload.model?.imageUrl : sellSelctor.payload.model?.imageUrl == null ? "/favicon-16x16.png" : sellSelctor.payload.model?.imageUrl }`}
                                        width='100%'
                                        height='100%'
                                        objectFit='contain'
                                        layout='responsive'
                                        loading='lazy'
                                        alt={`${page == 'buy' ? buySelector.payload.model?.name  : sellSelctor.payload.model?.name }`}
                                    />
                                </div>
                                {
                                        page == 'sell' ? 
                                        <>
                                 <strong>
                                      Carrier:  {page == 'sell' ? sellSelctor.cart.includesData.info.carrier : buySelector.cart.includesData.info.carrier} 
                                       </strong>
                                       <div className={styles.details}>
                                    
                                    <div>
                                    Condition : {sellSelctor.cart.includesData.info.condition }
                                    </div>
                                    <div>
                                        <strong>Storage: </strong>
                                        <span> {page == 'sell' ? sellSelctor.cart.includesData.info.storage : buySelector.cart.includesData.info.storage }</span>
                                    </div>
                                
                                {/* {values.storage && (
                                    <div>
                                        <strong>Storage </strong>
                                        <span>{values.storage}</span>
                                    </div>
                                )} */}
                            </div>
                                        
                                        </> 
                                        : 
                                        
                                        <>
                                        <strong>
                                             Carrier:  {buySelector.cart.includesData.info.carrier} 
                                              </strong>
                                              <div className={styles.details}>
                                           
                                           <div>
                                           Condition : { buySelector.cart.includesData.info.condition}
                                           </div>
                                           <div>
                                               <strong>Storage: </strong>
                                               <span> { buySelector.cart.includesData.info.storage }</span>
                                           </div>
                                       
                                       {/* {values.storage && (
                                           <div>
                                               <strong>Storage </strong>
                                               <span>{values.storage}</span>
                                           </div>
                                       )} */}
                                   </div>
                                               
                                               </> 
                                }
                              
                               
                            </div>
                        </td>
                        <td className={styles.price}>
                            <span>{page == 'sell' ? sellSelctor.cart.includesData.price.sell : buySelector.cart.includesData.price.buy}$</span>
                        </td>
                        <td className={styles.button}>
                            <div
                                className={styles.icon}
                                onClick={() => {
                                    if (quantity === 1) return
                                    dispatch(setQuantity({ quantity: quantity-1 }))
                                }}
                            >
                                <FaMinus />
                            </div>
                            <span>{quantity}</span>
                            <div className={styles.icon} onClick={() => dispatch(setQuantity({ quantity: quantity+1 }))}>
                                <FaPlus />
                            </div>
                        </td>
                        <td className={styles.price}>
                            <span>{subTotal}$</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className={styles.footer}>
                <div className={styles.total_wrapper}>
                    <div className={styles.subtotal}>
                        <strong>Subtotal</strong>
                        <span>{subTotal}$</span>
                        <strong>Shipping</strong>
                        <span>{shippingFee}%</span>
                    </div>
                    <div className={styles.total}>
                        <strong>Total</strong>
                        <span>{total}$</span>
                    </div>
                </div>
                    <button className={`${styles.button}`} onClick={(e) =>{
                       cookie.get('token') ?  checkCart(e) :  dispatch(toggleAuthForm('login'))
                    } }>
                    Add To Cart
                    </button>
                   
               
            </div>
        </>
    )
}

export default Cart
