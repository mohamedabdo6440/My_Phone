import {ActionCreatorWithPayload} from '@reduxjs/toolkit'

// local modules
import {BuyPayload, setSeris} from '@/rtk/features/buySlice'
import {RepairPayload} from '@/rtk/features/repairSlice'
import {useAppDispatch, useAppSelector} from '@/rtk/hook'
import styles from '@/styles/components/selectBrand.module.scss'
import {CardSelector} from "@/components/common/selector";
import {TProduct, TSeries} from "@/interfaces";
import {useEffect, useState} from "react";
import getRepositories from "@/lib/repositories";
import {SellPayload , setSerisSell} from '@/rtk/features/sellSlice'
import Loader from '../loaders/Loader'



interface SelectModelProps {
    nextStep: ActionCreatorWithPayload<SellPayload> | ActionCreatorWithPayload<RepairPayload> | ActionCreatorWithPayload<BuyPayload>
    // setSeris: ActionCreatorWithPayload<SellPayload> | ActionCreatorWithPayload<RepairPayload> | ActionCreatorWithPayload<BuyPayload> 
    product: TProduct

}



const SelectSeries = (
    {nextStep, product}: SelectModelProps,
) => {
    const {theme}:any = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    const [series, setSeries] = useState<TSeries[]>([])
    const buySelector = useAppSelector((state) => state.buy)
    const sellSelctor = useAppSelector((state) => state.sell)
    const { page } = useAppSelector((state) => state.home)

    useEffect(() => {
        getSeries()
    }, [])


    const getSeries = async () => {
        const repositories = getRepositories('production')
        const series = await repositories.device.getSeries(`${page == 'buy' ? buySelector.product.url : sellSelctor.product.url}`)
        setSeries(series)
    }
    if (series.length === 1 ){
        page == 'buy' ?  dispatch(setSeris({series: series[0]})) : dispatch(setSerisSell({series: series[0]}))
    } else {
        return (series.length != 0) ?  (
            <section className={styles.wrapper}>
                <h1>Select Your {`${page == 'buy' ? buySelector.product.name : sellSelctor.product.name  }`} Series</h1>
                <div className={styles.card_wrapper}>
                    {[...series]
                        .sort((a, b) => parseInt(a.product) - parseInt(b.product))
                        .map((series, index) => (
                            <CardSelector
                                key={index}
                                theme={theme}
                                name={series.name}
                                imageUrl={series.imageUrl}
                                onClick={() => {
                                    page == 'buy' ?  dispatch(setSeris({series})) : dispatch(setSerisSell({series}))
                            }}
                            />
                        ))}
                </div>
            </section>
        ) : <div className='flex justify-center'><Loader /></div>
    }
   
// }

}

export default SelectSeries
