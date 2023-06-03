import React from 'react'
import {TCarier} from "@/interfaces";
import styles from '@/styles/components/sellDetails.module.scss'
import InputButton from '@/components/buttons/InputButton';

interface model {
  model  : TCarier[]
}

export default function State({model} : model) {
  return (
    <>
     <h3>State</h3>
     <div className={styles.detail_wrapper}>

{
      model.filter((state , index , self)=>
      index === self.findIndex(c => c.info.state === state.info.state)
      ).map((state)=>
      <InputButton text={state.info.state} name='state' value={state.info.state} key={state.id} imgIcons={''} extra={''} />
      )
  }
  </div>
</>
  )
}
