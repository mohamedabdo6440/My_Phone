import { CardSelector } from '@/components/common/selector'
import Loader from '@/components/loaders/Loader'
import { TModel } from '@/interfaces'
import getRepositories from '@/lib/repositories'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import React , {useState , useEffect} from 'react'
import styles from '@/styles/components/selectBrand.module.scss'
import { nextStep } from '@/rtk/features/repairSlice'



export default function SelectModelRepair() {



    const { theme }:any = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    const [models, setModel] = useState<TModel[]>([])
    const selector = useAppSelector((state) => state.repair)
    const { page } = useAppSelector((state) => state.home)


    useEffect(() => {
        getModel()
    }, [])

    const getModel = async () => {
        const repositories = getRepositories('production')
        const models = await repositories.device.getModels(`${selector.payload.modelUrl}`)
        setModel(models.filter((bool:any) => bool.has_repairs))
    }




    return (models.length != 0) ? (
        <section className={styles.wrapper}>
            <h1>Select Your Model</h1>
            <div className={styles.card_wrapper}>
                {
                [...models]
                    .filter((bool:any) => bool.has_repairs)
                    .map((model, index) => (
                        <CardSelector
                            key={index}
                            theme={theme}
                            name={model.full_name}
                            availabilty={model.sold_out}
                            page={page}
                            imageUrl={model.imageUrl}
                            onClick={() => dispatch(nextStep({ 
                                issueUrl : model.url,
                                model : model.imageUrl,
                                brand : model.name
                            }))}
                        />
                    ))}
            </div>
        </section>
    ): <div className='text-center'>No Available products to repair</div>
}
