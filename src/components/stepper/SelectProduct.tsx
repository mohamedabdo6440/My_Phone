
import React ,{useCallback, useLayoutEffect, useMemo} from 'react'
import {ActionCreatorWithPayload} from '@reduxjs/toolkit'

// local modules
import {BuyPayload, productStep} from '@/rtk/features/buySlice'
import {productStepsell, SellPayload} from '@/rtk/features/sellSlice'
import {useAppDispatch, useAppSelector} from '@/rtk/hook'
import styles from '@/styles/components/selectBrand.module.scss'
import {CardSelector} from "@/components/common/selector";
import getRepositories from "@/lib/repositories";
import {useEffect, useState} from "react";
import {TCompany, TProduct} from "@/interfaces";




export interface TBrand {
    _id: string
    brand: string
    imageUrl: string
}

interface SelectBrandProps {
    title?: string
    nextStep: ActionCreatorWithPayload<BuyPayload> | ActionCreatorWithPayload<SellPayload>
}

const SelectProduct = ({nextStep}: SelectBrandProps) => {

    const {theme}:any = useAppSelector((state) => state.theme)
    const buySelector = useAppSelector((state) => state.buy)
    const sellSelctor = useAppSelector((state) => state.sell)
    const { page } = useAppSelector((state) => state.home)

    const dispatch = useAppDispatch()
    const [products, setProducts] = useState<TCompany[]>([])

    useLayoutEffect(() => {
    getProducts()
    }, [])


    const getProducts = async () => {
        const repositories = getRepositories('production')
        const product = await repositories.device.getProducts(
            page == 'buy' ? buySelector.payload.company.url : sellSelctor.payload.company.url
        )
        setProducts(product)  
    }

    if(products.length == 1){
        page == 'sell' ?    dispatch(productStepsell(products[0])) : dispatch(productStep(products[0]))  
    }else{
        return (products) ? (
            <section className={styles.wrapper}>
                <h1>Select Your Product Brand To Get Started</h1>
                <div className={styles.card_wrapper}>
                    {[...products]
                        .sort((a, b) => sortProducts.indexOf(a.name) - sortProducts.indexOf(b.name))
                        .map((product, index) => ( 
                            <CardSelector
                                key={index}
                                theme={theme}
                                name={product.name}
                                imageUrl={product.imageUrl}
                                onClick={() => {
                                    page == 'sell' ?    dispatch(productStepsell(product)) : dispatch(productStep(product))
                                    
                                }}
                            />
                        ))}
                </div>
            </section>
        ) :  <h1>Nothing</h1>
    }
 

 
}

const sortProducts = ['iPhone', 'Samsung Galaxy', 'Watch', 'Airpod', 'iPad', 'Macbook']

export default SelectProduct
