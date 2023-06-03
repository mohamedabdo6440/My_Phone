import React from 'react'

import Image from 'next/image'



export default function Summary({total , image , model , quantity , color  , name , styles}:any) {
  return (
        <div className={styles.order_summary}>
                <div className={styles.title}>
                    <h3>Order Summary</h3>
                </div>
                <div className={styles.header}>
                    <strong>Price</strong>
                    <span>{total}$</span>
                    <strong>Shipping</strong>
                    <span>5%</span>
                </div>
                <div className={styles.footer}>
                    <div className={styles.image}>
                        <Image src={`${image}`} layout='responsive' width='100%' objectFit='contain' height='100%' alt={name} />
                    </div>
                    <div className={styles.details}>
                        <strong>{`${model}`}</strong>
                        <div>
                            {color && (
                                <>
                                    <span className={styles.color} style={{ background:color.split('.')[0] }} />
                                    <span>{color.split('.')[1]}</span>
                                </>
                            )}
                            <span> {quantity}x</span>
                            <span>${total}</span>
                        </div>
                    </div>
                </div>
            </div>
  )
}
