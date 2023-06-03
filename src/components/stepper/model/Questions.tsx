import React from 'react'
import {TCarier} from "@/interfaces";
import styles from '@/styles/components/sellDetails.module.scss'
import InputButton from '@/components/buttons/InputButton';



export default function Questions() {
  return (
    <>
   <div>
                            <h3>PHONE STATUS</h3>
                            <div className={`${styles.detail_wrapper} ${styles.status}`}>
                                {/* {phoneStatus.map((status, index) => (
                                    <InputButton text={status.text} name='status' value={status.value} key={index} />
                                ))} */}
                                 <InputButton text='No Locks' name='status' value='NoLocks' imgIcons={''} extra={''} />
                                <InputButton text='Financed' name='status' value='Financed' imgIcons={''} extra={''} />
                                <InputButton text='Blacklisted/Blocked' name='status' value='Blacklisted' imgIcons={''} extra={''} />
                                <InputButton text='Activation Lock' name='status' value='Activation' imgIcons={''} extra={''} />
                            </div>
                        </div>
                        <div>
                            <h3>ARE THERE ANY CRACKS/CHIPS ON THE BACK?</h3>
                            <div className={styles.detail_wrapper}>
                                <InputButton text='Yes' name='back_crack' value='back_yes' imgIcons={''} extra={''} />
                                <InputButton text='No' name='back_crack' value='back_no' imgIcons={''} extra={''} />
                            </div>
                        </div>
                        <div>
                            <h3>ANY CRACKS/CHIP ON FRONT SCREEN?</h3>
                            <div className={styles.detail_wrapper}>
                                <InputButton text='Yes' name='front_crack' value='front_yes' imgIcons={''} extra={''} />
                                <InputButton text='No' name='front_crack' value='front_no' imgIcons={''} extra={''} />
                            </div>
                        </div>
                        <div>
                            <h3>IS YOUR ICLOUD TURNED OFF?</h3>
                            <div className={styles.detail_wrapper}>
                                <InputButton text='Yes' name='icloud_on' value='icloud_yes' imgIcons={''} extra={''} />
                                <InputButton text='No' name='icloud_on' value='icloud_no' imgIcons={''} extra={''} />
                            </div>
                        </div>
</>
  )
}
