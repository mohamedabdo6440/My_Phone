/* eslint-disable react/jsx-key */

import React from "react"

// local modules

import {  useAppSelector } from "@/rtk/hook"
import styles from "@/styles/pages/profile.module.scss"

// local static files



const Commission = () => {
    const { theme }:any = useAppSelector((state) => state.theme)
    return  (
        <section className={`${styles.section} ${theme === "light" ? styles.light : styles.dark}`}>
          
            <div className={styles.commission}>
                <div className={styles.title}>
                    <h3>My Commission</h3>
                    <span>The commissions you earn from your referral are displayed here</span>
                </div>
                <div className={styles.card_wrapper}>
                    <Card title={<h5>Referral Comission</h5>} spanOne={["Total"  , <br /> , "commission"]} spanTwo="$0.00"></Card>
                    <Card spanOne={["Available"  , <br /> , "commission"]} spanTwo="$0.00"></Card>
                    <Card spanOne={["Pending"  , <br /> , "commission"]} spanTwo="$0.00"></Card>
                    <Card spanOne={["Used"  , <br /> , "commission"]} spanTwo="$0.00"></Card>
                    <Card title={<h5>Comission Composition</h5>} spanOne={["Individual invite"  , <br /> , "Center"]} spanTwo="$0.00"></Card>
                    <Card spanOne={["Brand"  , <br /> , "Ambassador"]} spanTwo="$0.00"></Card>
                </div>
                <div className={styles.invite_wrapper}>
                    <p>
                        Invite 2 friends to complete their orders on my phone, then you can become a brand ambassador! You can earn unlimited
                        commission!
                    </p>
                    <button>Invite Now</button>
                </div>
            </div>
          
        </section>
    )
}

export default Commission

const Card=(props:{title?:any , spanOne:any , spanTwo:string })=>{
return (
    <>
    {props.title}
    <div className={styles.card}>
        <span>
            {props.spanOne}
        </span>
        <span>{props.spanTwo}</span>
    </div>
    </>
)
}
