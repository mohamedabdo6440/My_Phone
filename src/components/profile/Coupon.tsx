import Image from "next/image"
import React from "react"
import image from "../../../public/images/web_coupon.png"
// local modules
import { useAppSelector } from "@/rtk/hook"
import styles from "@/styles/pages/profile.module.scss"

// local static files

const Coupon = () => {
    
    const { theme }:any = useAppSelector((state) => state.theme)
    return (
        <section className={`${styles.section} ${theme === "light" ? styles.light : styles.dark}`}>


            <div className={styles.coupon}>
                <div className={styles.title}>
                    <h3>My Coupon</h3>
                    <span>Check your coupons and use them as soon as possible.</span>
                </div>
                <div className={styles.content}>
                    <div className={styles.tab_wrapper}>
                        <span className={styles.tab_active}>Coupon Available</span>
                        <span>Coupon Unavailable</span>
                    </div>
                    <div className={styles.tab_display}>
                        <div className={styles.image}>
                            <Image src={image} alt='coupon' />
                        </div>
                        <span>Oops, You have no available coupon</span>
                        <span>All your available coupons will be displayed here.</span>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Coupon
