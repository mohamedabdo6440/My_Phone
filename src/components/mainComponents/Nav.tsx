import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useRef } from 'react'
import { BsCart2, BsCurrencyDollar, BsHouseDoor, BsTools } from 'react-icons/bs'

// local modules
import routes from '@/constants/routes'
import useClickOutside from '@/hooks/useClickOutside'
import { changeTheme } from '@/rtk/features/themeSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/nav.module.scss'
import { useState } from 'react'

// local static files
import burger from '@/images/mobile_burger.png'
import cart from '@/images/web_cart.png'
import myphonelogodark from '@/images/web_dark_myphone.png'
import sun from '@/images/web_dark_sun.png'
import moon from '@/images/web_light_moon.png'
import myphonelogo from '@/images/web_light_myphone.png'
import search from '@/images/web_search.png'
import userIcon from '@/images/web_user.png'
//slices
import { start } from "@/rtk/features/buySlice"
import { startSell } from "@/rtk/features/sellSlice"
import { setDataToNull } from '@/rtk/features/orderSlice'
import Cookies from 'universal-cookie'




const Nav = () => {
    const { pathname, push } = useRouter()
    const { theme }:any = useAppSelector((state) => state.theme)
    const { items }:any = useAppSelector((state) => state.cart)
    const [navOpen, setNavOpen] = useState(false)

    const dispatch = useAppDispatch()
    const ref = useRef<HTMLUListElement>(null)
    const closeHandler = useCallback(() => {
        setNavOpen(!navOpen)
    }, [navOpen])

    useClickOutside(ref, closeHandler)
    const cookie = new Cookies()

    return (
        <div className={`${theme === 'light' ? styles.light : styles.dark}`}>
            <nav className={`${styles.nav}`}>
                <div className={`${styles.burger} flex gap-5`}>
                    {/* <Image className='burger-menu' src={burger} alt='Burger Menu' onClick={closeHandler} /> */}
                     <Image src={userIcon} alt='user' width='20%' height='20%' onClick={() => push(routes.PROFILE)}/>
                    <Link href={routes.SEARCH}>
                    <Image  src={search} alt='search' width='20%' height='20%'/>
                    </Link>

                </div>
                <Link href={routes.HOME}>
                    <div className={styles.logo}>
                        <Image src={theme === 'light' ? myphonelogo : myphonelogodark} alt='Logo' />
                    </div>
                </Link>

                {/* mobile footer  */}
                <ul ref={ref} className={`${styles.links_open} ${theme === 'light' ? styles.light : styles.dark} z-[5000000000000000]`}>
                        <li>
                            <BsHouseDoor />
                            <Link href={routes.HOME}>
                                <a>HOME</a>
                            </Link>
                        </li>
                        <li>
                            <BsCart2 />
                            <Link href={routes.BUY}>
                                <a onClick={()=>{
                                    dispatch(start({}))
                                    dispatch(setDataToNull({}))
                                }}>BUY</a>
                            </Link>
                        </li>
                        <li>
                            <BsCurrencyDollar />
                            <Link href={routes.SELL}>
                                <a onClick={()=>{
                                    dispatch(startSell({}))
                                    dispatch(setDataToNull({}))
                                }}>SELL</a>
                            </Link>
                        </li>
                        <li>
                            <BsTools />
                            <Link href={routes.REPAIR}>
                                <a >REPAIR</a>
                            </Link>
                        </li>
                </ul>
                {/* end of mobile footer  */}

                {/* nav header links */}

                <ul className={styles.links}>
                    <li className={`${pathname === routes.HOME && styles.active}`}>
                        <Link href={routes.HOME}>HOME</Link>
                    </li>
                    <li className={`${pathname.includes(routes.BUY) && styles.active}`} onClick={()=>{
                        dispatch(start({}))
                        dispatch(setDataToNull({}))
                        }}>
                        <Link href={routes.BUY} >BUY</Link>
                    </li>
                    <li className={`${pathname.includes(routes.SELL) && styles.active}`} onClick={()=>{
                        dispatch(startSell({}))
                        dispatch(setDataToNull({}))
                        
                        }}>
                        <Link href={routes.SELL} >SELL</Link>
                    </li>
                    <li className={`${pathname.includes(routes.REPAIR) && styles.active}`}>
                        <Link href={routes.REPAIR}>REPAIR</Link>
                    </li>
                </ul>
                {/*end of nav header links */}

                {/* light mode and cart  */}
                <ul className={styles.menus}>
                    <li className={styles.hidden}>
                        <Image src={userIcon} alt='user' onClick={() => push(routes.PROFILE)} />
                    </li>
                    <Link href={routes.SEARCH}>
                        <li className={styles.hidden}>
                            <Image src={search} alt='search' />
                        </li>
                    </Link>
                    <Link href={routes.ORDER} >
                        <li >
                            <Image src={cart} alt='cart'className={styles.materialIcon} />
                            {
                                cookie.get('token') ? <span className={styles.count}>{localStorage.getItem('cart')}</span> : ''
                            }
                           
                        </li>
                    </Link>
                    <li>
                        <div className={styles.toggle_theme}>
                            <div className={theme === 'light' ? styles.light : styles.dark}>
                                <span className={styles.circle} onClick={() => dispatch(changeTheme())} />
                                <Image src={theme === 'light' ? sun : moon} alt='theme mode' />
                            </div>
                        </div>
                    </li>
                </ul>
                {/* end of light mode and cart  */}

                {/* {navOpen && (
                    <ul ref={ref} className={`${styles.links_open} ${theme === 'light' ? styles.light : styles.dark}`}>
                        <div className={styles.mobile_nav}>
                            <Link href={routes.PROFILE}>
                                <li onClick={closeHandler}>
                                    <Image src={userIcon} alt='user' />
                                </li>
                            </Link>
                            <Link href={routes.SEARCH}>
                                <li onClick={closeHandler}>
                                    <Image src={search} alt='search' />
                                </li>
                            </Link>
                            <Link href={routes.ORDER}>
                                <li onClick={closeHandler}>
                                    <Image src={cart} alt='cart' />
                                </li>
                            </Link>
                        </div>
                        <li>
                            <BsHouseDoor />
                            <Link href={routes.HOME}>
                                <a onClick={closeHandler}>HOME</a>
                            </Link>
                        </li>
                        <li>
                            <BsCart2 />
                            <Link href={routes.BUY}>
                                <a onClick={closeHandler}>BUY</a>
                            </Link>
                        </li>
                        <li>
                            <BsCurrencyDollar />
                            <Link href={routes.SELL}>
                                <a onClick={closeHandler}>SELL</a>
                            </Link>
                        </li>
                        <li>
                            <BsTools />
                            <Link href={routes.REPAIR}>
                                <a onClick={closeHandler}>REPAIR</a>
                            </Link>
                        </li>
                    </ul>
                )} */}
              
            </nav>
        </div>
    )
}

export default Nav
