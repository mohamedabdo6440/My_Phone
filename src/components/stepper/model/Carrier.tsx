import React from 'react'
import {TCarier} from "@/interfaces";
import styles from '@/styles/components/sellDetails.module.scss'
import InputButton from '@/components/buttons/InputButton';


interface model {
  model  : TCarier[]
}

export default function Carrier({model} : model) {
  return (
    <>
    <h3>CARRIER</h3>
    <div className={styles.detail_wrapper}>
    {
     model.filter((carrier , index , self)=>
     index === self.findIndex(c => c.info.carrier === carrier.info.carrier)
     ).map((carrier)=>
     <InputButton extra={'flex'} imgIcons={`/images/${carrier.info.carrier}.png`} text={''} name='carrier' value={carrier.info.carrier} key={carrier.id} />
     )
   }
</div>
</>
  )
}
