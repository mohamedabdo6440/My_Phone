import { useEffect } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { MdOutlineDevicesOther, MdOutlineShoppingBag } from 'react-icons/md'

// local modules
import { NextPageWithLayout } from '../_app'
import BuyDetails from '@/components/stepper/BuyDetails'
import Layout from '@/components/forms/Layout'
import MyCart from '@/components/stepper/MyCart'
import Stepper from '@/components/stepper/Stepper'
import { nextStep, setStep, setTab , setCategory } from '@/rtk/features/buySlice'
import { setPage } from '@/rtk/features/homeSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import { TProduct, TVariantGroup } from '@/interfaces'
import getRepositories from '@/lib/repositories'
import { getCommonSteps } from '@/components/common/orders/selection'
import { setCategorySell } from '@/rtk/features/sellSlice'


const BrandDefault = () => {
    const { step, completedStep, tab, payload } = useAppSelector((state) => state.buy)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setPage('buy'))
    }, [])
    const steps = [
        ...getCommonSteps( payload, nextStep , setCategory , setCategorySell),
        {
            label: 'Device Details',
            errorMsg: 'Input details',
            icon: <MdOutlineDevicesOther />,
            content: <BuyDetails />,
        },
        {
            label: 'Checkout',
            errorMsg: 'checkout',
            icon: <MdOutlineShoppingBag />,
            content: (
                <MyCart
                  values={{
                        // product: payload.products!,
                        // model: payload.model?.model!,
                        imageUrl: payload.model?.imageUrl!,
                        ...payload.device_details!,
                    }}
                    tab={tab}
                    setTab={setTab}
                />
            ),
        },
    ]

    return <Stepper steps={steps} activeStep={step} setStep={setStep} completedStep={completedStep} />
}

BrandDefault.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
}

// export const getStaticProps: GetStaticProps<{ products: TProduct[]; variantGroups: TVariantGroup[] }> = async () => {
//     const repositories = getRepositories("test")
//     const products = await repositories.device.getProducts()
//     const variantGroups = await repositories.device.getVariantGroups()

//     return {
//         props: {
//             brands: products,
//             variantGroups: variantGroups,
//         },
//         revalidate: 10,
//     }
// }



export default BrandDefault
