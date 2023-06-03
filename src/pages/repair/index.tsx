import { useEffect } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import {
    MdCorporateFare,
    MdMiscellaneousServices,
    MdOutlineEngineering,
    MdOutlineSchedule,
    MdOutlineSend,
    MdOutlineSendToMobile,
} from 'react-icons/md'

// local modules
import { NextPageWithLayout } from '../_app'
import Layout from '@/components/forms/Layout'
import ReachForm from '@/components/forms/ReachForm'
import RepairIssues from '@/components/Repair/RepairIssues'
import RepairSchedule from '@/components/Repair/RepairSchedule'
import ServiceType from '@/components/Repair/ServiceType'
import Stepper from '@/components/stepper/Stepper'
import { nextStep, setCart, setRepairToNull, setStep } from '@/rtk/features/repairSlice'
import { setPage } from '@/rtk/features/homeSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import { TProduct, TVariantGroup } from '@/interfaces'
import getRepositories from "@/lib/repositories";
import { getCommonSteps } from '@/components/common/orders/selection'
import SelectDevice from '@/components/stepper/Repair/SelectCompanyRepair'
import SelectProduct from '@/components/stepper/Repair/SelectProductRepair'
import SelectSeriesRepair from '@/components/stepper/Repair/SelectSeriesRepair'
import SelectModelRepair from '@/components/stepper/Repair/SelectModelRepair'
import Confirmation from '@/components/stepper/Confirmation'
import Cookies from 'universal-cookie'
import SelectCategory from '@/components/stepper/Repair/SelectCategoryRepair'
import { toggleAuthForm } from '@/rtk/features/authFormSlice'





const Repair = () => {
    
    const { step, completedStep, payload } = useAppSelector((state) => state.repair)
    const dispatch = useAppDispatch()
    const cookie = new Cookies()

    useEffect(() => {
        dispatch(setPage('repair'))
        dispatch(setRepairToNull({}))
        if(cookie.get('token')){
            getdata()
        }else{
            dispatch(toggleAuthForm('user'))
        }
    }, [])

    async function getdata() {
        const repositories = getRepositories('production')
        const active = await repositories.order.getCart()
        if(active.status === 200 && active.data.type === "repair"){
            dispatch(setCart({}))
        }
      
    }

    const steps = [
        {
            label: 'Select Category',
            errorMsg: 'Kindly Select Company',
            icon: <MdCorporateFare />,
            content: <SelectCategory />,
        },
        {
            label: 'Select Company',
            errorMsg: 'Select Company',
            icon: <MdCorporateFare />,
            content: <SelectDevice />,
        },
        {
            label: 'Select Product',
            errorMsg: 'Select Product',
            icon: <MdOutlineEngineering />,
            content: <SelectProduct />,
        },
        {
            label: 'Select Series',
            errorMsg:'Select Series',
            icon: <MdOutlineSendToMobile />,
            content: <SelectSeriesRepair />,
        },
        {
            label: 'Select Model',
            errorMsg: 'Select Model',
            icon: <MdCorporateFare />,
            content: <SelectModelRepair />,
        },
        {
            label: 'issue',
            errorMsg: 'Choose Your Issue',
            icon: <MdCorporateFare />,
            content: <RepairIssues />,
        },
        {
            label: 'Service Type',
            errorMsg: 'Pick service type',
            icon: <MdMiscellaneousServices />,
            content: <ServiceType />,
        },
        {
            label: 'Schedule Your Time',
            errorMsg: 'Pick schedule',
            icon: <MdOutlineSchedule />,
            content: <RepairSchedule />,
        },
        {
            label: 'How To Reach You',
            errorMsg: 'thank you',
            icon: <MdOutlineSend />,
            content: <ReachForm />,
        },
        {
            label: 'prepaid payment',
            errorMsg: 'thank you',
            icon: <MdOutlineSend />,
            content: <Confirmation />,
        },
    ]

    return <Stepper steps={steps} activeStep={step} setStep={setStep} completedStep={completedStep} />
}

Repair.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>
}



  

export default Repair
