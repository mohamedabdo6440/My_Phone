import React from 'react'
import {TCarier} from "@/interfaces";
import styles from '@/styles/components/sellDetails.module.scss'
import InputButton from '@/components/buttons/InputButton';

interface model {
  model  : TCarier[]
}

export default function Color({model} : model) {
  return (
    <>
     <h3>Condition</h3>
<div className={styles.detail_wrapper}>
    {
        model.filter((condition , index , self)=>
        index === self.findIndex(c => c.info.condition === condition.info.condition)
        ).map((carrier)=>
        <InputButton extra={'flex'} imgIcons={``} text={carrier.info.condition} name='condition' value={carrier.info.condition} key={carrier.id} />
        )
    }
</div>
</>
  )
}
