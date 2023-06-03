import React, { useEffect, useState , ChangeEventHandler  , useMemo} from 'react'

import Image from 'next/image'

// local modules
import InputButton from '@/components/buttons/InputButton'
import InputColor from '@/components/buttons/InputColor'

import useToast from '@/hooks/useToast'
import { cartData, nextStep } from '@/rtk/features/buySlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/sellDetails.module.scss'

//slices 

import {BuyPayload} from '@/rtk/features/buySlice'
import {productStepsell, SellPayload} from '@/rtk/features/sellSlice'


// local static files
import heart from '@/images/web_heart.png'

// api data
import getRepositories from '@/lib/repositories'

// data 

import {TCarier} from "@/interfaces";
import useScroll from '@/hooks/useScroll'
import Color from './model/Color'
import Carrier from './model/Carrier'
import State from './model/State'
import Storage from './model/Storage'
import Questions from './model/Questions'
import Condtion from './model/Condtion'
import Loader from '../loaders/Loader'



interface ButtonProps {
    onChange?: ChangeEventHandler<Element>
}



const BuyDetails = ({onChange}:ButtonProps) => {
    const { theme }:any = useAppSelector((state) => state.theme)
    const { payload } = useAppSelector((state) => state.buy)
    const dispatch = useAppDispatch()
    const toast = useToast()
    const buySelector = useAppSelector((state) => state.buy)


    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault()

        let values: any = {}
        const data = new FormData(e.target as HTMLFormElement)

        for (let [k, v] of data.entries()) {
            values[k] = v
        }
        if (
            !values.condition
        ) {
            return toast.error('Please fill in all fields')
        }
        const includesObject = model.some(item => item.info.carrier === values.carrier && item.info.color === values.color && item.info.storage === values.storage && item.info.state === values.state);
        if(includesObject == true){
            const includesData = model.find(item => item.info.carrier === values.carrier && item.info.color === values.color && item.info.storage === values.storage && item.info.state === values.state);
            dispatch(cartData({ includesData }))
        }else{
            toast.error('This Product is not available. kindly try to choose another one')
        }
    }

    let [model , setModel] = useState<TCarier[]>([])

    

    var scroll = useMemo(() => useScroll(),[])
    
    useEffect(() => {
        getModelData()
    }, [])

    const getModelData = async () => {
        const repositories = getRepositories('production')
        const model = await repositories.device.getModelData(`${buySelector.payload.model?.url}/available-variants`)
        setModel(model)
        console.log(model)
    }


    return (model.length != 0)? (
        <section className={styles.section}>
            <h2 className={styles.title}>{`${payload.model?.str}`}</h2>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.background}>
                        <Image src={heart} alt='Heart background' />
                    </div>
                    {/* <h2>
                        Your Device&rsquo;s Value
                        <br />
                        $1,020.00
                    </h2> */}

                    <div className={styles.image}>
                        <Image
                            src={payload.model?.imageUrl == null ? '/favicon-16x16.png' : payload.model?.imageUrl }
                            layout='responsive'
                            objectFit='contain'
                            width='200%'
                            height='200%'
                            alt={payload.model?.name}
                        />
                    </div>
                </div>
                <div className={styles.detail}>
                <form className={`${styles.form} ${theme === 'light' ? styles.light : styles.dark}`} onSubmit={handleSubmit}>
                        {
                            model[0].info.color ? 
                            <div>
                            <Color model={model}/>
                        </div>
                            : ''
                        }
                        
                        <div>
                            {
                                model[0].info.carrier ? 
                               <>
                               <Carrier model={model}/>
                                </> 
                                :
                                 ''
                            }
                           
                        </div>
                        <div>
                            {
                               model[0].info.condition ? 
                             <>
                            <Condtion  model={model}/>
                            </>
                                : '' 
                            }
                           
                        </div>
                        {
                             model[0].info.state ? 
                             <>
                             <State model={model}/>
                             
                             </>

                             : ''
                        }
                   
                        <div>
                            {
                                model[0].info.storage ? 
                                <>
                                <Storage  model={model}/>
                                </> : ''
                            }
                        </div>
                         <Questions />
                        <button type='submit' className={styles.button}>
                            CHECKOUT
                        </button>
                    </form>
                </div>
            </div>
        </section>
    ) : <div className='flex justify-center'><Loader /></div>
}

export default BuyDetails
