
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
// local modules

import {  useAppSelector } from "@/rtk/hook";
import styles from "@/styles/pages/profile.module.scss";
import OrderDetails from "@/pages/orders/[id]";
import routes from "@/constants/routes";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";
//apis
import getRepositories from "@/lib/repositories";

import { TOrders , product } from '@/interfaces'
import jwtDecode, { JwtPayload } from "jwt-decode";





const Order =(props : any) =>{
  const { theme }:any = useAppSelector((state) => state.theme);

  let [current , setCurrent] = useState('Sell Smart')
  let [orders , setOrders] = useState('All Orders')
  let [allOrders , setAllOrders] :any = useState()

  const getOrders = async () => {
    const repositories = getRepositories('production')
    const orders:any = await repositories.device.getOrders()
    setAllOrders(orders)
}

useEffect(() => {
   getOrders() 
}, [])

    
  const ButtonOne = (props:{title:string,active:boolean})=>{
    const Button_Style = `${props.active ? "bg-[#10c1e4]" : null} rounded-full max-[965px]:font-medium max-[965px]:text-xs max-[541px]:text-[9px] max-[541px]:p-1  max-[965px]:p-2 font-extrabold inline-block px-6 py-2.5  text-black text-sm leading-tight  hover:bg-[#10c1e4] hover:text-white focus:bg-[#10c1e4] focus:outline-none focus:ring-0 active:bg-[#10c1e4] transition duration-150 ease-in-out ${theme === "light" ? "text-black" : "text-white"}`;
    return <button type="button" className={Button_Style} onClick={()=>setCurrent(props.title)}>{props.title}</button>
  }
  const ButtonTwo = (props:{title:string,active:boolean})=>{
    const Button_Style = `${props.active ? "bg-[#10c1e4]" : null} rounded-full font-semibold	max-[541px]:text-[9px] max-[541px]:p-1 max-[965px]:font-medium max-[965px]:text-xs  max-[965px]:p-2 inline-block px-3 py-2.5 text-black  text-xs leading-tight  hover:bg-[#10c1e4] hover:text-white focus:bg-[#10c1e4] focus:outline-none focus:ring-0 active:bg-[#10c1e4] transition duration-150 ease-in-out ${theme === "light" ? "text-black" : "text-white"}`;
    return <button type="button" className={Button_Style} onClick={()=>setOrders(props.title)}>{props.title}</button>
  }


  return  (
    <section
      style={{ marginTop: 0 }}
      className={`${styles.section} ${
        theme === "light" ? styles.light : styles.dark
      } w-full`}
    >
      <div className={`border-2 p-2.5 max-[1150px]:w-[90%]   max-[1050px]:w-[80%] max-sm:w-[94%] max-[600px]:w-[88%] max-[900px]:w-[70%]  border-[#5E2CDF] w-full rounded-lg`}>
        <div className={styles.header}>
          <h1 className={`text-[#5E2CDF]  font-extrabold italic`}>My Order</h1> <br />
        </div>
        <div className=" flex items-center justify-center">
          <div className={` w-[80%]   flex justify-between rounded-full shadow-md hover:shadow-lg focus:shadow-lg ${theme === "light" ? "bg-gray-200" : "bg-[#2f2b4f]"}`} role="group">
          <ButtonOne title={"Sell Smart"} active={current == 'Sell Smart' ? true : false} />
          <ButtonOne title={"Buy Smart"} active={current == 'Buy Smart' ? true : false} />
          <ButtonOne title={"Repair Smart"} active={current == 'Repair Smart' ? true : false} />
        </div>
        </div> <br />
        <div className=" flex items-center justify-center">
          <div className={`w-[90%]  rounded-full flex justify-between shadow-md hover:shadow-lg focus:shadow-lg ${theme === "light" ? "bg-gray-200" : "bg-[#2f2b4f] text-white"}`} role="group">
          <ButtonTwo title={"All Orders"} active={orders == "All Orders" ? true : false}  />
          <ButtonTwo title={"Pending Orders"} active={orders == "Pending Orders" ? true : false} />
          <ButtonTwo title={"Completed Orders"} active={orders == "Completed Orders" ? true : false} />
          </div>
        </div>
        <br />
            
      <div className="relative mx-8 max-[600px]:mx-4 overflow-x-auto max-lg:hidden">
          <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs border border-[#5E2CDF] text-white uppercase  bg-[#10c1e4]">
                  <tr>
                      <th scope="col" className="px-6 py-3 max-[600px]:px-4 max-[600px]:py-1">
                          Product
                      </th>
                      <th scope="col" className="px-6 py-3 max-[600px]:px-4 max-[600px]:py-1">
                          Carrier
                      </th>
                      <th scope="col" className="px-6 py-3 max-[600px]:px-4 max-[600px]:py-1">
                          Storage
                      </th>
                      <th scope="col" className="px-6 py-3 max-[600px]:px-4 max-[600px]:py-1">
                         Amount
                      </th>
                      <th scope="col" className="px-6 py-3 max-[600px]:px-4 max-[600px]:py-1">
                          
                      </th>
                  </tr>
              </thead>
              <tbody>
                {
                  allOrders != null && allOrders.results.map((product:any) =>{
                    return(
                      product.orderItems.map((productDetail:any) =>{
                        return(
                     <tr className= {`${current == 'Repair Smart' ? product.type != 'repair' ? 'hidden' : '' : ''}${current == 'Sell Smart' ? product.type != 'sell' ? 'hidden' : '' : ''} ${current == 'Buy Smart' ? product.type != 'buy' ? 'hidden' : '' : ''} ${theme === "light" ? "bg-white border-b" : "bg-[#2f2b4f]"} ${orders == 'Pending Orders' ? product.status != 'pending' ? 'hidden' : '' :   orders == 'Completed Orders' ? product.status == 'pending' ? 'hidden' : '' : ''}`} key={productDetail.id}>
                    <th scope="row" className={`px-6 py-4 font-medium  whitespace-nowrap ${theme === "light" ? "text-gray-900" : "text-white" }`}>
                          {
                            productDetail.deviceInfo != null ?  productDetail.deviceInfo.model_variant_str : ''
                          }
                      </th>
                      <td className={`px-6 py-4 ${theme === "light" ? "text-gray-900" : "text-white" } ` }>
                          {
                            productDetail.deviceInfo != null ?  productDetail.deviceInfo.imei : ''
                          }
                      </td>
                      <td className={`px-6 py-4 ${theme === "light" ? "text-gray-900" : "text-white" } ` }>
                          {
                            productDetail.deviceInfo != null ?  productDetail.deviceInfo.serial_number : ''
                          }
                      </td>
                      <td className={`px-6 py-4 ${theme === "light" ? "text-gray-900" : "text-white" } ` }>
                          {
                            product.price
                          }$
                      </td>
                      <td className="px-6 py-4">
                        <button type="button" className={`rounded-full font-extrabold 
                        inline-block px-6 py-2.5
                          text-sm leading-tight  
                           border focus:bg-[#10c1e4] focus:outline-none
                            focus:ring-0 active:bg-[#10c1e4]   transition duration-150 ease-in-out 
                            ${theme !== "light" ? "bg-[#2f2b4f] text-white hover:bg-[#10c1e4] hover:text-white" : "text-[#10c1e4] hover:bg-[#10c1e4] hover:text-white bg-white border-[#10c1e4]" }`}>
                        <Link href={`${routes.OrderDetails}/${product.id}`}>Details</Link> 
                        </button>
                      </td>
                  </tr>
                        )
                      })

                  
                    )
                  })
                }
                
              </tbody>
          </table>
      </div>

               {/* {
                   allOrders != null && allOrders.length < 1 ? <div className="mt-3 text-center">No Available Products</div> : ''
                } */}

      <div className="lg:hidden">
            <Swiper
              spaceBetween={50}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper lg:hidden"
      >
       
        {/* {
            allOrders != null && allOrders.map((product: { lines: any[]; type: string; status: string; }) =>{
              return(
                product.lines.map((productDetail: { id: React.Key | null | undefined; modelInfo: { seriesInfo: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; str: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; variantInfo: { info: { color: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; }; sub_total: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) =>{
                  return(
                    <SwiperSlide className= {`${current == 'Buy Smart' ? product.type != 'buy' ? 'none' : '' : product.type != 'sell' ? 'none' : ''} ${orders == 'Pending Orders' ? product.status != 'pending' ? 'none' : '' :   orders == 'Completed Orders' ? product.status == 'pending' ? 'none' : '' : ''}`} key={productDetail.id}>
                    <div className={`max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center m-auto mb-11`}>
                    <h2>
                       {  
                         productDetail.modelInfo.seriesInfo.name
                         }
                    </h2>
            <h5 className={`mb-2 text-2xl font-bold tracking-tight  ${theme === "light" ? "text-gray-900" : "text-[#2f2b4f]" }`}> 
                         {
                           productDetail.modelInfo.str
                         }</h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
       
                         { productDetail.variantInfo.info.color } {productDetail.sub_total}$</p>
             <button type="button" className={`rounded-full font-extrabold 
                       inline-block px-6 py-2.5
                         text-sm leading-tight  
                          border focus:bg-[#10c1e4] focus:outline-none
                           focus:ring-0 active:bg-[#10c1e4]   transition duration-150 ease-in-out 
                           ${theme !== "light" ? "bg-[#2f2b4f] text-white hover:bg-[#10c1e4] hover:text-white" : "text-[#10c1e4] hover:bg-[#10c1e4] hover:text-white bg-white border-[#10c1e4]" }`}>
                       <Link href={`${routes.OrderDetails}/${productDetail.id}`}>Details</Link> </button>
     </div>
                    </SwiperSlide>
                  )
                 
                })
              )
            })
        } */}
        
       
        {/* <SwiperSlide>
        <div className={`max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center m-auto mb-11`}>
        <h2>Apple</h2>
        <h5 className={`mb-2 text-2xl font-bold tracking-tight  ${theme === "light" ? "text-gray-900" : "text-[#2f2b4f]" }`}>Apple MacBook Pro 17</h5>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Silver $2999</p>
    <button type="button" className={`rounded-full font-extrabold 
                        inline-block px-6 py-2.5
                          text-sm leading-tight  
                           border focus:bg-[#10c1e4] focus:outline-none
                            focus:ring-0 active:bg-[#10c1e4]   transition duration-150 ease-in-out 
                            ${theme !== "light" ? "bg-[#2f2b4f] text-white hover:bg-[#10c1e4] hover:text-white" : "text-[#10c1e4] hover:bg-[#10c1e4] hover:text-white bg-white border-[#10c1e4]" }`}>
                        <Link href={routes.OrderDetails}>Details</Link> </button>
      </div>
        </SwiperSlide> */}

      </Swiper>
      </div>

      

      
      </div>
    </section>
  ) 
}

export default Order;

