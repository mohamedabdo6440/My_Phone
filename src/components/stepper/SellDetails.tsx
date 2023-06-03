import React , { useEffect, useState , useMemo } from 'react'
import Image from 'next/image'

// local modules
import InputButton from '@/components/buttons/InputButton'
import useToast from '@/hooks/useToast'
import { cartData, nextStep } from '@/rtk/features/sellSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/sellDetails.module.scss'

// local static files
import heart from '@/images/web_heart.png'

// model data
import {TCarier} from "@/interfaces";

// api data
import getRepositories from '@/lib/repositories'
import useScroll from '@/hooks/useScroll'
import InputColor from '@/components/buttons/InputColor'
import Color from './model/Color'
import Carrier from './model/Carrier'
import Condtion from './model/Condtion'
import Storage from './model/Storage'
import State from './model/State'
import Questions from './model/Questions'








const SellDetails = () => {
    const { theme }:any = useAppSelector((state) => state.theme)
    const { payload } = useAppSelector((state) => state.sell)
    const dispatch = useAppDispatch()
    const toast = useToast()
    const buySelector = useAppSelector((state) => state.buy)
    const sellSelctor = useAppSelector((state) => state.sell)
    const { page } = useAppSelector((state) => state.home)

    let [model , setModel] = useState<TCarier[]>([])

    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault()

        let values: any = {}
        const data = new FormData(e.target as HTMLFormElement)

        for (let [k, v] of data.entries()) {
            values[k] = v
        }

        if (
            // !values.carrier ||
            // !values.storage ||
            // !values.back_crack ||
            // !values.status ||
            // !values.front_crack ||
            // !values.icloud_on ||
            !values.condition
            
        ) {
            return toast.error('Please fill in all fields')
        }
        const includesObject = model.some(item => item.info.carrier === values.carrier && item.info.color === values.color && item.info.storage === values.storage && item.info.state === values.state);
        if(includesObject == true){
            const includesData = model.find(item => item.info.carrier === values.carrier && item.info.color === values.color && item.info.storage === values.storage && item.info.state === values.state);
            dispatch(cartData({ includesData }))
            // console.log(includesData)
        }else{
            toast.error('This Product is not available. kindly try to choose another one')
        }

    }

    var scroll = useMemo(() => useScroll(),[])
    
    useEffect(() => {
        getModelData()
    }, [])

    const getModelData = async () => {
        const repositories = getRepositories('production')
        const model = await repositories.device.getModelData(`${sellSelctor.payload.model?.url}/all-variants`)
        setModel(model)
    }






    return (model.length != 0) ? (
        <section className={styles.section}>
            <h2 className={styles.title}>{` ${payload.model?.str}`}</h2>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.background}>
                        <Image src={heart} alt='Heart background' />
                    </div>
                    <div className={styles.image}>
                        <Image
                            src={payload.model?.imageUrl == null ? '/favicon-16x16.png'  : payload.model?.imageUrl}
                            layout='responsive'
                            objectFit='contain'
                            width='200%'
                            height='200%'
                            alt='Iphone 13 Pro Max'
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
    ) : ''
}

export default SellDetails
