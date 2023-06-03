import React , {useState , useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import { TSeries } from '@/interfaces';
import getRepositories from '@/lib/repositories';
import Loader from '@/components/loaders/Loader';
import { CardSelector } from '@/components/common/selector';
import styles from '@/styles/components/selectBrand.module.scss'
import { nextStep } from '@/rtk/features/repairSlice'


export default function SelectSeriesRepair() {
    const {theme}:any = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    const selector = useAppSelector((state) => state.repair)
    const [series, setSeries] = useState<TSeries[]>([])
   

    useEffect(() => {
        getSeries()
    }, [])


    const getSeries = async () => {
        const repositories = getRepositories('production')
        const series = await repositories.device.getSeries(`${selector.payload.seriesUrl}`)
        setSeries(series)
    }


    if (series.length == 1 ){
    dispatch(nextStep({ modelUrl: series[0].url }))
    } else {
        return (series.length !== 0) ?  (
            <section className={styles.wrapper}>
                <h2>Select Your {`${selector.payload.name}`} Series</h2>
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
                                    dispatch(nextStep({ modelUrl: series.url }))
                            }}
                            />
                        ))}
                </div>
            </section>
        ) : <div className='flex justify-center'><Loader /></div>
    }


}
