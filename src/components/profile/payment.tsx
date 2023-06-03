import Image from "next/image"
import React from "react"
import { FaPlus } from "react-icons/fa"

// local modules
import {useAppSelector } from "@/rtk/hook"
import styles from "@/styles/pages/profile.module.scss"

// local static files
import remove from "@/images/web_delete.png"
import editViolet from "@/images/web_editviolet.png"
import editWhite from "@/images/web_editwhite.png"
import visa from "@/images/web_visa.png"


const Payment = () => {
    const { theme }:any = useAppSelector((state) => state.theme)
    return  (
        <section className={`${styles.section} ${theme === "light" ? styles.light : styles.dark}`}>
            
            <div className={styles.payment}>
                <h3>Payment Type</h3>
                <div className={styles.card}>
                    <div className={styles.card_image}>
                        <Image src={visa} alt="Visa" />
                    </div>
                    <div className={styles.card_details}>
                        <div className={styles.icons}>
                            <Image src={theme === "light" ? editViolet : editWhite} alt="Edit icon" />
                            <Image src={remove} alt="remove icon" />
                        </div>
                    </div>
                    <span>
                        <FaPlus fontSize="0.5em" /> Add A New Payment
                    </span>
                </div>
            </div>
          
        </section>
    ) 
}


export default Payment
