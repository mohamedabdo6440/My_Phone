import { useEffect } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import {
    MdOutlineDevicesOther,
    MdOutlineLocalShipping,
} from 'react-icons/md'

// local modules
import { NextPageWithLayout } from '../_app'
import Layout from '@/components/forms/Layout'
import MyCart from '@/components/stepper/MyCart'
import SellDetails from '@/components/stepper/SellDetails'
import Stepper from '@/components/stepper/Stepper'
import { nextStep, setStep, setTabSell } from '@/rtk/features/sellSlice'
import { setPage } from '@/rtk/features/homeSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import { getCommonSteps } from '@/components/common/orders/selection'

const Sell: NextPageWithLayout = () => {
    const { step, tab, completedStep, payload } = useAppSelector((state) => state.sell)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setPage('sell'))
    }, [])

    const steps = [
        ...getCommonSteps(payload, nextStep),
        {
            label: 'Device Details',
            errorMsg: 'Input details',
            icon: <MdOutlineDevicesOther />,
            content: <SellDetails />,
        },
        {
            label: 'Checkout',
            errorMsg: 'checkout',
            icon: <MdOutlineLocalShipping />,
            content: (
                <MyCart
                    values={{
                        // product: payload.brand!,
                        brand: '',
                        model: '',
                        carrier: payload.device_details?.carrier!,
                        condition: payload.device_details?.condition!,
                        storage: payload.device_details?.storage!,
                        // imageUrl: product.find((brand) => brand.brand === payload.brand!)?.imageUrl!,
                        imageUrl: ''
                    }}
                    tab={tab}
                    setTab={setTabSell}
                />
            ),
        },
    ]

    return <Stepper steps={steps} activeStep={step} setStep={setStep} completedStep={completedStep} />
}

Sell.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export default Sell
