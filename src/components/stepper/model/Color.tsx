import React from 'react'
import {TCarier} from "@/interfaces";
import styles from '@/styles/components/sellDetails.module.scss'
import InputColor from '@/components/buttons/InputColor';


interface model {
  model  : TCarier[]
}

export default function Color({model} : model) {
  return (
    <>
    <h3>Color</h3>
   
    <div className={styles.color_wraper}>
    {
        model.filter((color , index , self)=>
        index === self.findIndex(c => c.info.color === color.info.color)
        ).map((color)=>
        <InputColor event={`${color.info.color.toLowerCase()}`} key={color.id} text={''} name='color'  value={color.info.color}/>
        // <InputButton text={color.info.color} name='color' value={color.info.color} key={color.id} />
        )
    }
</div>
</>
  )
}
