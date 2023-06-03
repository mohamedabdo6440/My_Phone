import { useEffect, useRef, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

// local modules
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/pagination.module.scss'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import axios from 'axios'
import Loader from '../loaders/Loader'




interface PaginationProps {
    next : any
    prev:any 
    setData:any
}

const Pagination = ({next , prev  ,  setData}: PaginationProps) => {
    const { theme }:any = useAppSelector((state) => state.theme)
    const pageContainerRef = useRef<HTMLDivElement>(null)
    // const pages = [...Array(totalPages).keys()].map((num) => num + 1)
    const dispatch = useAppDispatch()
    let [loader , setLoader] = useState(false)
    // useEffect(() => {
    //     const pageRef = pageContainerRef.current as HTMLDivElement

    //     if (!totalPages) return

    //     if (pageRef && pageNum >= 4 && pages[pages.length - 1] - pageNum > 1) {
    //         pageRef.style.left = `-${20 * (pageNum - 3)}%`
    //     } else if (pages[pages.length - 1] - pageNum <= 1) {
    //         return
    //     } else {
    //         pageRef.style.left = `0`
    //     }
    // }, [pageNum, pages, totalPages])

   async function fetchData(e:any){
        setLoader(true)
        let getdata = await axios.get(e) 
        if(getdata.status){
            setData(getdata.data)
        }
        setLoader(false)
    }

    return (
        // <div className={`${styles.container} ${theme === 'light' ? styles.light : styles.dark}`}>
        //     <div className={styles.wrapper}>
        //         <div
        //             className={styles.button}
        //             onClick={() => {
        //                 if (pageNum === pages[0]) return
        //                 dispatch(setPageNum(pageNum - 1))
        //             }}
        //         >
        //             <MdKeyboardArrowLeft />
        //         </div>
        //         <div className={styles.page_wrapper}>
        //             <div className={styles.pages} ref={pageContainerRef}>
        //                 {pages.map((page) => (
        //                     <div key={page}>
        //                         <span onClick={() => dispatch(setPageNum(page))} className={pageNum === page ? styles.active : undefined}>
        //                             {page}
        //                         </span>
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>
        //         <div
        //             className={styles.button}
        //             onClick={() => {
        //                 if (pageNum === pages[length - 1]) return
        //                 dispatch(setPageNum(pageNum + 1))
        //             }}
        //         >
        //             <MdKeyboardArrowRight />
        //         </div>
        //     </div>
        // </div>
        <div className='flex justify-center'>
            {
                loader == false ? 
                <>
                <button disabled={prev == null ? true:false} onClick={()=>fetchData(prev)} type="button" className=" text-white bg-red-600  focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 disabled:bg-gray-300">previous</button>
                <button disabled={next == null ? true:false} onClick={()=>fetchData(next)} type="button" className="text-gray-900  bg-blue-600   focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg   font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 disabled:bg-gray-300">Next</button>
                </>
                : <Loader />
            }
        
        </div>
    ) 
}

export default Pagination
