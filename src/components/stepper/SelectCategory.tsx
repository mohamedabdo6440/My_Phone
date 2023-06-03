import {ActionCreatorWithPayload} from '@reduxjs/toolkit'

// local modules
import {BuyPayload} from '@/rtk/features/buySlice'
import {SellPayload, setCategorySell} from '@/rtk/features/sellSlice'
import {useAppDispatch, useAppSelector} from '@/rtk/hook'
import styles from '@/styles/components/selectBrand.module.scss'
import {CardSelector} from "@/components/common/selector";
import getRepositories from "@/lib/repositories";
import {useEffect, useState} from "react";
import {TProduct} from "@/interfaces";

export interface TBrand {
    _id: string
    brand: string
    imageUrl: string
}

interface SelectBrandProps {
    title?: string
    setCategory: ActionCreatorWithPayload<BuyPayload> | ActionCreatorWithPayload<SellPayload>
    setCategorySell: ActionCreatorWithPayload<BuyPayload> | ActionCreatorWithPayload<SellPayload>
}

const SelectCategory = ({setCategory }: SelectBrandProps) => {

    const {theme}:any = useAppSelector((state) => state.theme)
    const { page } = useAppSelector((state) => state.home)
    const dispatch = useAppDispatch()
    const [categories, setCategories] = useState<TProduct[]>([])

    useEffect(() => {
        getCompanies() 
    }, [])

    const getCompanies = async () => {
        const repositories = getRepositories('production')
        const products = await repositories.device.getCategories()
        setCategories(products)
    }
    return (categories) ? (
        <section className={styles.wrapper}>
            <h1>Select Your Product Brand To Get Started</h1>
            <div className={styles.card_wrapper}>
                {[...categories]
                    .sort((a, b) => sortProducts.indexOf(a.name) - sortProducts.indexOf(b.name))
                    .map((product, index) => (
                        <CardSelector
                            key={index}
                            theme={theme}
                            name={product.name}
                            imageUrl={product.imageUrl}
                            onClick={() =>{
                                page == 'buy' ? dispatch(setCategory({ ...product })) :
                                 dispatch(setCategorySell({ ...product }))  
                            }}
                        />
                    ))}
            </div>
        </section>
    ) : <h1>Nothing</h1>
}

const sortProducts = ['iPhone', 'Samsung Galaxy', 'Watch', 'Airpod', 'iPad', 'Macbook']

export default SelectCategory
