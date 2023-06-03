import React , {useEffect, useState} from 'react'
import styles from '@/styles/components/selectBrand.module.scss'
import {CardSelector} from "@/components/common/selector";
import {useAppDispatch, useAppSelector} from '@/rtk/hook'
import { nextStep } from '@/rtk/features/repairSlice'
import getRepositories from '@/lib/repositories';


export default function SelectCategory() {


    const {theme}:any = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    const [Categries, setCategries]:any = useState()

  async  function getCompanies(){
      const repositories = getRepositories('production')
      const categries:any = await repositories.device.getCategories()
      setCategries(categries)
    }

    useEffect(() => {
      getCompanies()
    }, [])
    

  return (Categries)? (
    <section className={styles.wrapper}>
            <h1>Select Your Product Brand To Get Started</h1>
            <div className={styles.card_wrapper}>              
                {
                    Categries.results.map((category: any , index: any) => (
                        <CardSelector
                        key={index}
                        theme={theme}
                        name={category.name}
                        imageUrl={category.imageUrl}
                        onClick={() => dispatch(nextStep({ productUrl: category.url }))}
                        />
                    ))}
                   
            </div>
        </section>
  ): null
}








