import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

// local modules
import {BuyPayload, setSerisToNull} from '@/rtk/features/buySlice'
import {SellPayload, setSerisToNullSell} from '@/rtk/features/sellSlice'
import {useAppDispatch, useAppSelector} from '@/rtk/hook'
import styles from '@/styles/components/selectBrand.module.scss'
import {CardSelector} from "@/components/common/selector";
import getRepositories from "@/lib/repositories";
import {Suspense, useEffect, useState} from "react";
import { TCompany } from '@/interfaces'




interface SelectBrandProps {
    title?: string
    nextStep: ActionCreatorWithPayload<BuyPayload> | ActionCreatorWithPayload<SellPayload>
}



const SelectCompany = ({nextStep}: SelectBrandProps) => {

    const {theme}:any = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    const [companies, setCompanies] = useState<TCompany[]>([])

    useEffect(() => {
        getCompanies()
        dispatch(setSerisToNull(null))
        dispatch(setSerisToNullSell(null))
    }, [])

    const getCompanies = async () => {
        const repositories = getRepositories('production')
        const companies = await repositories.device.getCompanies()
        setCompanies(companies)
    }

    

    return (companies) ? (

        <section className={styles.wrapper}>
            <h1>Select Your Product Brand To Get Started</h1>
            <div className={styles.card_wrapper}>
                {[...companies]
                    .sort()
                    .map((company , index) => (
                        <CardSelector
                            key={index}
                            theme={theme}
                            name={company.name}
                            imageUrl={company.imageUrl}
                            onClick={() =>{
                                dispatch(nextStep({ company }))
                            }}
                        />
                    ))}
            </div>
        </section>
    ) : <h1>Nothing</h1>
}

export default SelectCompany

