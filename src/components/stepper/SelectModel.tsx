import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import Image from 'next/image'
import { useState , useEffect} from 'react'
// local modules
import { TModel, TVariantGroup } from '@/interfaces'
import { BuyPayload } from '@/rtk/features/buySlice'
import { RepairPayload } from '@/rtk/features/repairSlice'
import styles from '@/styles/components/selectBrand.module.scss'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import {CardSelector} from "@/components/common/selector";
import getRepositories from '@/lib/repositories'
import {TProduct, TSeries} from "@/interfaces";
import Loader from '../loaders/Loader'

interface SelectModelProps {
    nextStep: ActionCreatorWithPayload<BuyPayload> | ActionCreatorWithPayload<RepairPayload>
    series:TSeries,
    product:TProduct

}





const SelectModel = (
    { nextStep, series , product   }: SelectModelProps,
) => {
    const { theme }:any = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    const [models, setModel] = useState<TModel[]>([])
    const buySelector = useAppSelector((state) => state.buy)
    const sellSelctor = useAppSelector((state) => state.sell)
    const { page } = useAppSelector((state) => state.home)

    useEffect(() => {
        getModel()
    }, [])

    const getModel = async () => {
        const repositories = getRepositories('production')
        const models = await repositories.device.getModels(`${page == 'buy' ?  buySelector.series.url :  sellSelctor.series.url }`)
        setModel(models)
    }

    

    return (models) ? (
        <section className={styles.wrapper}>
            <h1>Select Your Model</h1>
            <div className={styles.card_wrapper}>
                {[...models]
                    .sort((modelA, modelB) => parseInt(modelB.name) - parseInt(modelA.name))
                    .map((model, index) => (
                        <CardSelector
                            key={index}
                            theme={theme}
                            name={model.full_name}
                            availabilty={model.sold_out}
                            page={page}
                            imageUrl={model.imageUrl}
                            onClick={() => dispatch(nextStep({ model }))}
                        />
                    ))}
            </div>
        </section>
    ): <Loader />
}

export default SelectModel


