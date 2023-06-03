
import React from "react"
import { FaRegCopy } from "react-icons/fa"

// local modules

import {  useAppSelector } from "@/rtk/hook"
import styles from "@/styles/pages/profile.module.scss"
    
   const Invite =()=>{ 
    const { theme }:any = useAppSelector((state) => state.theme)
    return  (
        <section className={`${styles.section} ${theme === "light" ? styles.light : styles.dark}`}>

            <div className={styles.invite}>
                <div className={styles.title}>
                    <h3>Individual Invite Center</h3>
                </div>
                <div className={styles.content}>
                    <h5>You Referral Methods:</h5>
                    <div className={styles.code_wrapper}>
                        <span>Share your invitation code</span>
                        <strong>Mt256922</strong>
                        <button>
                            <FaRegCopy />
                            Copy
                        </button>
                    </div>
                    <div className={styles.code_wrapper}>
                        <span>Share your referral link</span>
                        <strong>https://buymyphones.com</strong>
                        <button>
                            <FaRegCopy />
                            Copy
                        </button>
                    </div>
                </div>
            </div>

            
        </section>
    ) 
}
export default Invite
