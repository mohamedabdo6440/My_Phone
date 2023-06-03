import React from 'react'
import {TCarier} from "@/interfaces";
import styles from '@/styles/components/sellDetails.module.scss'
import InputButton from '@/components/buttons/InputButton';

interface model {
  model  : TCarier[]
}

export default function Storage({model} : model) {
  return (
    <>
    <h3>STORAGE</h3>
<div className={styles.detail_wrapper}>
    {
        model.filter((storage , index , self)=>
        index === self.findIndex(c => c.info.storage === storage.info.storage)
        ).map((storage)=>
        <InputButton extra={'hidden'} imgIcons={''} text={storage.info.storage} name='storage' value={storage.info.storage} key={storage.id} />
        )
    }
</div>
</>
  )
}
