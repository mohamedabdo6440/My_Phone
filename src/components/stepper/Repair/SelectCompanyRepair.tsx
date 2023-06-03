import React, { useEffect, useState } from 'react'
import styles from '@/styles/components/selectBrand.module.scss'
import { CardSelector } from "@/components/common/selector";
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import { nextStep } from '@/rtk/features/repairSlice'
import getRepositories from '@/lib/repositories';


export default function SelectDevice() {


  const { theme }: any = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()
  const [companies, setCompanies]: any = useState()

  async function getCompanies() {
    const repositories = getRepositories('production')
    const companies: any = await repositories.device.getCompanies()
    setCompanies(companies)

  }
  console.log(companies);

  useEffect(() => {
    getCompanies()
  }, [])




  return (companies) ? (
    <section className={styles.wrapper}>
      <h1>Select Your Product Brand To Get Started</h1>
      <div className={styles.card_wrapper}>
        {
          companies && (
            companies.map((company: any, index: any) => (

              <CardSelector
                key={index}
                theme={theme}
                name={company.name}
                imageUrl={company.imageUrl}
                onClick={() => dispatch(nextStep({ productUrl: company.url }))}
              />
            ))
          )

        }

      </div>
    </section>
  ) : null
}








