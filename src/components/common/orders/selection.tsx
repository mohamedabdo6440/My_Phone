import {TProduct, TVariantGroup} from '@/interfaces'
import {MdOutlineMobileFriendly, MdOutlineSendToMobile , MdCorporateFare} from 'react-icons/md'
import {GrSort} from 'react-icons/gr'
import SelectProduct from '@/components/stepper/SelectProduct'
import SelectModel from '@/components/stepper/SelectModel'
import SelectSeries from "@/components/stepper/SelectSeries";
import SelectCompany from '@/components/stepper/SelectCompany'
import SelectCategory from '@/components/stepper/SelectCategory'
import { Suspense } from 'react' 





// here is our stepper in what we can select

export function getCommonSteps(
    payload: any,
    nextStep: any,
    setCategory : any,
    setCategorySell: any
) {
    return [
        {
            label: 'Select Company',
            errorMsg: 'Select Company',
            icon: <MdCorporateFare/>,
            content: 
            <SelectCompany {...{
                nextStep
            }} />
            ,
        },
        // {
        //     label: 'Select Category',
        //     errorMsg: 'Select Category',
        //     icon: <GrSort/>,
        //     content: <SelectCategory {...{
        //         setCategory,
        //         setCategorySell
        //     }} />,
        // },
        {
            label: 'Select Product',
            errorMsg: 'Select Product',
            icon: <MdOutlineMobileFriendly/>,
            content: <SelectProduct {...{
                nextStep
            }} />,
        },
        {
            label: 'Select Series',
            errorMsg: 'Select Series',
            icon: <MdOutlineSendToMobile/>,
            content: <SelectSeries {...{
                product: payload.product!,
                nextStep,
            }} />,
        },
        {
            label: 'Select Model',
            errorMsg: 'Select Model',
            icon: <MdOutlineSendToMobile/>,
            content: <SelectModel {...{
                product: payload.product!,
                series: payload.series!,
                nextStep,
            }} />,
        },
    ]
}
