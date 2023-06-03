import React,{useState , useLayoutEffect} from 'react'
import { CardSelector } from '@/components/common/selector';
import { TCompany } from '@/interfaces';
import getRepositories from '@/lib/repositories';
import styles from '@/styles/components/selectBrand.module.scss'
import { useAppDispatch, useAppSelector } from '@/rtk/hook';
import { nextStep } from '@/rtk/features/repairSlice'


export default function SelectProductRepair() {


    const {theme}:any = useAppSelector((state) => state.theme)
    const selector = useAppSelector((state) => state.repair)

    const dispatch = useAppDispatch()
    const [products, setProducts] = useState<TCompany[]>([])

    useLayoutEffect(() => {
    getProducts()
    }, [])


    const getProducts = async () => {
        const repositories = getRepositories('production')
        const product = await repositories.device.getProducts(`${selector.payload.productUrl}`)
        setProducts(product)  
    }


//     if(products.length == 1){
//       dispatch(nextStep({ 
//         seriesUrl: products[0].url,
//         name: products[0].name
    
//     }))
//   }else{
      return (products) ? (
          <section className={styles.wrapper}>
              <h1>Select Your Product Brand To Get Started</h1>
              <div className={styles.card_wrapper}>
                  {[...products]
                      .map((product, index) => ( 
                          <CardSelector
                              key={index}
                              theme={theme}
                              name={product.name}
                              imageUrl={product.imageUrl}
                              onClick={()=>dispatch(nextStep({ 
                                seriesUrl: product.url ,
                                name : product.name
                              }))}
                          />
                      ))}
              </div>
          </section>
      ) :  <h1>Nothing</h1>
}

// }
