import Image from 'next/image'

// local modules
import useToast from '@/hooks/useToast'
import { nextStep, setIssuesSlice } from '@/rtk/features/repairSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/repairSchedule.module.scss'

// local static files
import heartpsp from '@/images/web_heartandpsp.png'
import watch from '@/images/web_watch.png'
import getRepositories from '@/lib/repositories'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import routes from '@/constants/routes'
import { useEffect, useState } from 'react'
import useScroll from '@/hooks/useScroll'
import Loader from '../loaders/Loader'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from 'date-fns';



const RepairSchedule = () => {
    const { theme }:any = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const nextSevenDays = getNextSevenDays()
    const [loader, setLoader] = useState(false)
    const todays = nextSevenDays[0]
    const today = new Date();
    const tmw = new Date();

    const [startDate, setStartDate]:any = useState(tmw.setDate(today.getDate() + 1));

  
    async function confirmSchdule(e:any , values:any){
        e.preventDefault()
        setLoader(false)
        const repositories = getRepositories('production')
        const active = await repositories.order.SchudleConfirmation( values.time , startDate.toISOString().slice(0, 10))
        if(active.status === 200){
            toast.success('appointment confirmed')
            dispatch(nextStep({}))
            setLoader(true)
        }else{
         toast.error('we have an updates try later on')
        setLoader(false)
        }
        }



    const submitHandler: React.FormEventHandler = (e) => {
        setLoader(true)
        e.preventDefault()
        const values: any = {}

        const data = new FormData(e.target as HTMLFormElement)

        for (let [k, v] of data.entries()) {
            if (!v) continue
            values[k] = v
        }

        if (!values.time){
            setLoader(false)
            return toast.error('Select Schedule')
        }else{
            confirmSchdule(e , values)
            setLoader(false)
            // setTimeout(() => {
            //  confirmOrder(e)
            // }, 1000);
        }

    }

    useEffect(() => {
        useScroll()
    }, [])
    

    

    return (
        <section className={`${styles.section} ${theme === 'light' ? styles.light : styles.dark}`}>
            <h1>When do you want to come in?</h1>
            <form onSubmit={submitHandler}>
                <div className={`${styles.main}`}>
                    <div className={`${styles.day_wrapper}`}>
                        {nextSevenDays.map((date) => (
                            <div key={date.date} className={styles.card} onClick={()=>{
                                let dateString:any = date.value; 
                                let data:any = new Date(dateString); 
                                data.setDate(data.getDate()); 
                                let nextDayString = data.toISOString().slice(0, 10);
                                setStartDate(new Date(nextDayString))
                                dispatch(setIssuesSlice({
                                    scheduleDate : data.toISOString().slice(0, 10)
                                }))
                            }}>
                                <input hidden type='radio' name='schedule' id={date.day} value={String(date.value)} />
                                <label htmlFor={date.day}>
                                    <strong>{date.day}</strong>
                                    <span>{`${date.month}/${date.date}`}</span>
                                </label>
                            </div>
                        ))}
                        {/* <h3>Kindly Enter Your Address:</h3>
                        <div>
                            <input type='text' name='address' className='w-[100%] rounded-[5px] p-[0.75rem] border-[1px] border-[solid] border-[#b3b3b5]' placeholder='enter your address'/>
                        </div> */}
                        <div className={`${styles.pick} flex-col`} id="daysSelector">
                            <span className='text-sm font-bold'>Change your date</span>
                            <DatePicker
                            closeOnScroll={(e) => e.target === document}
                            selected={startDate}
                            onChange={(date:any) =>{
                                setStartDate(date)
                                dispatch(setIssuesSlice({
                                    scheduleDate : date.toISOString().slice(0, 10)
                                }))
                                
                            }}
                            className="text-center"
                            minDate={subDays(new Date() , -1)}
                            />
                        </div>
                        
                        
                    </div>
                    <div className={`${styles.time_wrapper}`} id="timeSelector">
                        <strong>
                            choose a time :
                            {/* <span>{`${today.day} ${today.month}/${today.date}`}</span> */}
                        </strong>
                        {/* <div className={`${styles.pick} ${styles.hidden}`}>
                            <input type='date' name='schedule' id='time' min='' />
                            <span>DAYS</span>
                        </div> */}
                        

                        <div className={styles.pick}>
                            <input type='time' name='time' id='time' 
                            onChange={(e)=>{
                                dispatch(setIssuesSlice({
                                    scheduleTime : e.target.value
                                }))
                            }} />
                            <span>TIME</span>
                        </div>
                    </div>
                </div>
                <div className={`${styles.button} w-[fit-content] m-auto`}>
                {
                    loader == true ?<div className='w-[fit-content] m-auto'><Loader /> </div> : <button type='submit' className='m-auto .button'>Confirm</button>
                }    
                </div>
            </form>

            <div className={styles.background}>
                <div className={styles.image1}>
                    <Image src={heartpsp} alt='Heart with PSP' />
                </div>
                <div className={styles.image2}>
                    <Image src={watch} alt='Watch' />
                </div>
            </div>
            
        </section>
    )
}

const getNextSevenDays = () => {
    const nextSevenDays: { day: string; month: number; date: number; value: string }[] = []

    //
    const dayAsString = (dayIndex: number) => {
        const weekdays = []
        weekdays[0] = 'Sun'
        weekdays[1] = 'Mon'
        weekdays[2] = 'Tue'
        weekdays[3] = 'Wed'
        weekdays[4] = 'Thu'
        weekdays[5] = 'Fri'
        weekdays[6] = 'Sat'

        return weekdays[dayIndex]
    }

    for (let i = 1; i <= 7; i++) {
        let currentDate = new Date()

        currentDate.setDate(new Date().getDate() + i)
        nextSevenDays.push({
            day: dayAsString(currentDate.getDay()),
            month: currentDate.getMonth() + 1,
            date: currentDate.getDate(),
            value: currentDate.toISOString().split('T')[0],
        })
    }

    return nextSevenDays
}

export default RepairSchedule
