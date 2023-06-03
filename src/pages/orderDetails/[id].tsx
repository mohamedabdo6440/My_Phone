import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState,useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Profileimage from "@/images/web_profileimage.png";
import PhoneImage from "@/images/web_iphone13promax.png";
// local modules
import Layout from "@/components/forms/Layout";
import { NextPageWithLayout } from "../_app";
import { canAccess, GetServerSidePropsComponent, IPageProps } from "@/lib/auth";
import { toggleAuthForm } from "@/rtk/features/authFormSlice";
import { useAppDispatch, useAppSelector } from "@/rtk/hook";
import {BiLeftArrow} from "react-icons/bi";
import { AiOutlineUser,AiOutlineCheckCircle } from "react-icons/ai";
import { FiShoppingCart, FiUserPlus, FiClipboard } from "react-icons/fi";
import { BiMap,BiLogOutCircle } from "react-icons/bi";
import { BsCreditCard2Back , BsCalendar2Check, BsBoxSeam } from "react-icons/bs";
import { TbDiscount2, TbTruckDelivery,TbRotateClockwise2 } from "react-icons/tb";
import { RiCoinsLine } from "react-icons/ri"; 
import {MdOutlineMessage} from "react-icons/md"
// local static files
import getRepositories from "@/lib/repositories";
import routes from "@/constants/routes";
import {TSpecifcOrder} from '@/interfaces/index'
import Spinner from "@/components/loaders/Spinner";
import Loader from "@/components/loaders/Loader";
import Cookies from "universal-cookie";






const OrderPage: NextPageWithLayout<IPageProps> = (props)  => {
  const router = useRouter();
  const { theme }:any = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const cookie = new Cookies()
  var [orderDetails, setOrderDetails] = useState<TSpecifcOrder>();

  const [content, setContent] = useState("main");

 


  // useEffect(() => {
  //   console.log(router.query.id)
  //   if (canAccess(props.status)) {
  //     getProfile();
  //   } else {
  //     router.push("/");
  //     dispatch(toggleAuthForm("login"));
  //   }
  // }, [dispatch, props.status, router]);

  const getOrderData = async () => {
    const repositories = getRepositories('production')
    const order:any = await repositories.device.getSpecifcOrder(router.query.id)
    setOrderDetails(order)
}


useLayoutEffect(() => {
  if (cookie.get('token')) {
         getOrderData()
      } else {
        router.push("/");
        dispatch(toggleAuthForm("login"));
      }
}, [])


  const getProfile = async () => {
    try {
      const repositories = getRepositories();
      const user = await repositories.user.getCurrentUserProfile();

      if (user) {
        // setOrderDetails(user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const setContentLocal = (title:string) => {
    localStorage.setItem("content",title);
  }

  const signOut = ()=>{
    localStorage.clear()
    router.push('/')
  }

  const Tab = (props: { contentName: string; title: string; icon: any }) => {
    return (
      <button 
        onClick={() => setContentLocal(props.contentName)}
        className={`flex items-center p-2 
                text-sm font-bold rounded-lg max-sm:w-fit w-full gap-2
                ${
          content === props.contentName
            ? "bg-[#10c1e4] text-white hover:bg-[#10c1e4]"
            : theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-700" 
        }
        capitalize
        `}
      >
        <Link href="/profile" className={`   whitespace-nowrap  `}>
          <a className="w-full h-full text-left flex gap-3 ">
          {props.icon}
          <span className="max-sm:hidden">
          {props.title}
          </span>
          </a>
        </Link>
        </button>
    );
  };

  const tabIconClasses = `flex-shrink-0 w-6 h-6 transition duration-75`;

  return orderDetails ?  (
    <>
    {
    orderDetails.detail ? <div className="text-center mb-32 mt-32 text-4xl md:text-base">No Order Available with the id provided</div> : 
    <div className={`  w-full flex flex-row justify-around  `}>
        {/* <aside className={` w-3/12 pt-6 max-sm:w-fit  `} aria-label="Sidebar">
          <div
            className={`flex rounded-lg justify-center mb-5 py-5 max-sm:hidden flex-col items-center w-full ${
              theme !== "light"
                ? "bg-[#2f2b4f] text-white "
                : "bg-gray-100 text-black"
            }`}
          >
            <span className="w-48">
            <Image src={Profileimage} alt="Profile Image" className="rounded-full"/>
            </span>
            <h3 className="mt-3 text-ellipsis overflow-hidden w-10/12 text-center">exampleEmail@gmail.com</h3>
          </div>
          <div
            className={`py-5 p-[5px] rounded-lg overflow-y-auto ${
              theme !== "light"
                ? "bg-[#2f2b4f] text-white "
                : "bg-gray-100 text-black"
            } `}
          >
            <ul className="space-y-2 mb-2">
              <li>
                <Tab
                  contentName={"main"}
                  title={"My Orders"}
                  icon={<FiShoppingCart className={tabIconClasses} />}
                />
              </li>
              <li>
                <Tab
                  contentName={"profileDetails"}
                  title={"My Profile"}
                  icon={<AiOutlineUser className={tabIconClasses} />}
                />
              </li>
              <li>
                <Tab
                  contentName={"address"}
                  title={"My Address"}
                  icon={<BiMap className={tabIconClasses} />}
                />
              </li>
              <li>
                <Tab
                  contentName={"payment"}
                  title={"My Payment Type"}
                  icon={<BsCreditCard2Back className={tabIconClasses} />}
                />
              </li>
              <li>
                <Tab
                  contentName={"coupon"}
                  title={"my coupon"}
                  icon={<TbDiscount2 className={tabIconClasses} />}
                />
              </li>
              <li>
                <Tab
                  contentName={"commission"}
                  title={"my commission"}
                  icon={<RiCoinsLine className={tabIconClasses} />}
                />
              </li>
              <li>
                <Tab
                  contentName={"invite"}
                  title={"individual invite center"}
                  icon={<FiUserPlus className={tabIconClasses} />}
                />
              </li>
              <li>
                <Tab
                  contentName={"ambassador"}
                  title={"brand ambassador"}
                  icon={<FiClipboard className={tabIconClasses} />}
                />
              </li>
              <li>
                <Tab
                  contentName={"customer"}
                  title={"customer service"}
                  icon={<MdOutlineMessage className={tabIconClasses} />}
                />
              </li>
            </ul>
            <hr />
          <div className="w-full text-center flex justify-center mt-2 font-medium cursor-pointer" onClick={signOut}>
            <div className=" max-sm:hidden">
            Sign Out
            </div>
            <BiLogOutCircle className={`visible sm:hidden ${tabIconClasses}`}  />
            </div>
          </div>
        </aside> */}
        {/* {getContent(content)} */}
        {/* Order Details */}
        <div className={`${theme === "light" ? " bg-gray-100" : "bg-[#2f2b4f] text-[#10c1e4]" } mt-6 p-4 mx-4 max-lg:w-[85%]`}>
            <div className="w-full">
              <h2 className="text-3xl max-sm:text-2xl font-semibold">My Order</h2>
              <p className="font-medium text-base max-sm:text-sm">Check the status of orders or browse through your past purchases</p>
            </div>
            <div className="w-full mt-3 pt-3 border-t">
              <div className="flex justify-between">
                <h3 className="text-xl max-sm:text-lg font-semibold">Order Detils</h3>
                <div className="flex items-center text-[#10c1e4]">
                  <BiLeftArrow />
                  <span className="ml-1"><Link href={routes.PROFILE}>Back</Link></span>
                </div>
              </div>
              <div className={`${theme === "light" ? " bg-gray-300" : "bg-gray-800 text-[#10c1e4]" } max-[600px]:flex-col max-sm:text-xs font-medium mt-2 flex rounded py-1 px-4  w-full justify-between`} >
                <p>Order {orderDetails.id}</p>
                <p className="max-[600px]:mt-2">Ordered submitted on Jan 12,2023 22:41</p>
              </div>
            </div>
            <div className="w-full mt-3 pt-3 border-t">
              <h2 className="text-xl max-sm:text-lg font-semibold">Order Status: {orderDetails.status}</h2>
              <p className="font-medium text-base max-sm:text-sm">Your device is still in transit, we haven&apos;t recieved your device, Please wait patiently. </p>
            </div>
            <div className="flex my-4 justify-center  ">
              <div className="flex flex-col items-center w-[20%]">
                <span className=" w-fit rounded-full p-3  max-[500px]:p-2 max-[450px]:p-1 bg-[#10c1e4] after:bg-gray-300 after:w-[300%] after:content-[' '] relative after:absolute after:right-0 after:h-[3px] after:top-2/4 after:translate-x-[100%] ">
                <BsCalendar2Check className=" text-xl max-sm:text-lg max-[450px]:text-sm text-white" />
                </span>
                <p className="mt-2 font-medium text-sm max-md:text-xs max-[500px]:text-[8px] text-center text-[#10c1e4]">Order Placed</p>
              </div>
              <div className="flex flex-col items-center w-[20%]">
              <span className=" w-fit rounded-full p-3  max-[500px]:p-2 max-[450px]:p-1 bg-gray-300 after:w-[300%] max-[450px]:after:w-[200%] after:content-[' '] relative after:absolute after:right-0 after:bg-gray-300 after:h-[3px] after:top-2/4 after:translate-x-[100%] ">
              <TbTruckDelivery className=" text-xl max-sm:text-lg max-[450px]:text-sm text-white" />
                </span>
                <p className="mt-2 font-medium text-sm max-md:text-xs max-[500px]:text-[8px] text-center text-gray-300">Package Sent</p>
              </div>
              <div className="flex flex-col items-center w-[20%]">
              <span className=" w-fit rounded-full p-3  max-[500px]:p-2 max-[450px]:p-1 bg-gray-300 after:w-[300%] max-[450px]:after:w-[200%] after:content-[' '] relative after:absolute after:right-0 after:bg-gray-300 after:h-[3px] after:top-2/4 after:translate-x-[100%] ">
              <BsBoxSeam className=" text-xl max-sm:text-lg max-[450px]:text-sm text-white" />
                </span>
                <p className="mt-2 font-medium text-sm max-md:text-xs max-[500px]:text-[8px] text-center text-gray-300">Package Received</p>
              </div>
              <div className="flex flex-col items-center w-[20%]">
              <span className=" w-fit rounded-full p-3  max-[500px]:p-2 max-[450px]:p-1 bg-gray-300 relative z-[1] ">
              <TbRotateClockwise2 className=" text-xl max-sm:text-lg max-[450px]:text-sm text-white" />
                </span>
                <p className="mt-2 font-medium text-sm max-md:text-xs max-[500px]:text-[8px] text-center text-gray-300">Processing</p>
              </div>
              <div className="flex flex-col items-center w-[20%]">
              <span className=" w-fit rounded-full p-3  max-[500px]:p-2 max-[450px]:p-1 bg-gray-300 relative after:w-[300%] max-[450px]:after:w-[200%] after:content-[' '] relative after:absolute after:left-0 after:-translate-x-full after:bg-gray-300 after:h-[3px] after:top-2/4  ">
              <AiOutlineCheckCircle className=" text-xl max-sm:text-lg max-[450px]:text-sm text-white" />
                </span>
                <p className="mt-2 font-medium text-sm max-md:text-xs max-[500px]:text-[8px] text-center text-gray-300">Completed</p>
              </div>
            </div>



            <div className="w-full mt-3 pt-3 border-t">
              <h2 className="text-xl max-sm:text-lg font-semibold">
                Shipping Carrier</h2>
              <p className="font-medium text-base max-sm:text-sm mt-3">Track Number : {
                orderDetails.reference
              }</p>
              <p className="font-medium text-base max-sm:text-sm mt-3">Logistics information : Jan 13, 2023 03:00 Pre-Shipment info Sent to USPS , USPS Awaiting Item</p>
              <div className="flex mt-3 justify-between">
                <span className={`rounded-full border-[1px] leading-snug px-2  h-fit ${theme === "light" ? "border-black" : "border-[#10c1e4]"} `}>1</span>
                <p className=" max-[800px]:pl-2">Jan 13, 2023 03:00</p>
                {/* <p>Pre-Shipment info Sent to USPS , USPS Awaiting Item</p> */}
              </div>
            </div>
            <div className="w-full mt-3 pt-3 border-t">
              <h2 className="text-xl max-sm:text-lg font-semibold">Payment Selection: Check</h2>
              <p className="font-medium text-base max-sm:text-sm mt-1">Payment method selected: Check</p>
              <p className="font-medium text-base max-sm:text-sm mt-1">Payment Delivary Account:bashar Khalil 2701 n broad st Philadelphia Pennsylvania 19122</p>
            </div>
            <div className="w-full mt-3 pt-3 border-t">
              <h3 className="text-xl max-sm:text-lg font-semibold">My Device</h3>
              <div className="relative overflow-x-auto">
                  <table className={`w-full text-sm text-left ${theme === "light" ? "text-gray-500" : "text-[#10c1e4]"} `} >
                      <thead className={`text-xs  uppercase ${theme === "light" ? "text-gray-700" : "text-[#10c1e4]"} `}>
                          <tr>
                              <th scope="col" className="px-6 py-3">
                                  Product Details
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Item ID
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Item Status
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Quote
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Quantity
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <th scope="row" className={`flex flex-col px-6 py-4 font-medium ${theme === "light" ? "text-gray-900" : "text-[#10c1e4]"} whitespace-nowrap`}>
                                <div className="flex mb-2">
                                  <div className="ml-2 mr-4 w-14">
                                    <img src={orderDetails.lines[0].modelInfo.imageUrl} width="65%"   className="m-auto" alt={"Item image"} />
                                  </div>
                                  <div>
                                    <h4>{orderDetails.lines[0].modelInfo.name}</h4>
                                    <p>Catagory: {orderDetails.lines[0].modelInfo.seriesInfo.name}</p>
                                    <p>Type: {orderDetails.type}</p>
                                  </div>
                                </div>
                                <div className="flex flex-wrap">
                                  <span className="border mr-[2px] p-[3px] text-xs rounded">{orderDetails.lines[0].variantInfo.info.carrier}</span>
                                  <span className="border mr-[2px] p-[3px] text-xs rounded">{orderDetails.lines[0].variantInfo.info.storage}</span>
                                  {/* <span className="border mr-[2px] p-[3px] text-xs rounded">{orderDetails.lines[0].variantInfo.info.state}</span> */}
                                  {/* <span className={`border  text-xs w-[25px] h-[25px] rounded-full bg-${orderDetails.lines[0].variantInfo.info.color.toLowerCase()}-500 `}></span> */}
                                </div>
                                {/* <p>Is the Apple ID signed out? <mark className={` bg-transparent font-semibold ${theme === "light" ? "text-black" : "text-[#10c1e4]"}`}>Yes</mark></p> */}
                              </th>
                              <td className={`px-6 py-4  text-xl max-sm:text-lg text-center ${theme === "light" ? "text-black" : "text-[#10c1e4]"}`}>
                                  -
                              </td>
                              <td className={`px-6 py-4 font-medium ${theme === "light" ? "text-black" : "text-[#10c1e4]"}`}  >
                                  {orderDetails.status}
                              </td>
                              <td className="px-6 py-4 font-medium">
                                  ${orderDetails.lines[0].variantInfo.price}
                              </td>
                              <td className={`px-6 py-4text-xl max-sm:text-lg text-center  ${theme === "light" ? "text-black" : "text-[#10c1e4]"}`}>
                              {orderDetails.lines[0].quantity}
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
                    <div className="w-full mt-4 pt-4 border-t">
                      <div className=" w-2/4 float-right max-[600px]:w-full">
                        <div className=" mb-3 font-medium flex justify-between">
                          <p>Items Total:</p>
                          <p>${orderDetails.price}</p>
                        </div>
                        <div className=" mb-3 font-medium flex justify-between items-center">
                          <p>Promo Code/Coupon:</p>
                          <p>+$0.00</p>
                        </div>
                        <div className=" mb-3 font-medium flex justify-between">
                          <p>Invitation Code:</p>
                          <p>+$0.00</p>
                        </div>
                        <hr />
                        <div className=" mt-3 mb-3 font-medium flex justify-between">
                          <p>Shipping:</p>
                          <p className="uppercase">free</p>
                        </div>
                        <hr />
                        <div className=" items-center mt-3 mb-3 font-medium flex justify-between">
                          <p>Total Payout:</p>
                          <p className=" font-bold text-xl max-sm:text-lg">${orderDetails.price}</p>
                        </div>
                      </div>
                    </div>

            </div>



        </div>
      </div>
    }
      
    </>
  )
  : <div className="flex justify-center"><Loader /> </div> 
};
OrderPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};


// export const getServerSideProps: GetServerSideProps = async (context) =>
//   await GetServerSidePropsComponent(context);

export default OrderPage;
