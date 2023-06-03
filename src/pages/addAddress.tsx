import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Profileimage from "@/images/web_profileimage.png";
import PhoneImage from "@/images/web_iphone13promax.png";
// local modules
import Layout from "@/components/forms/Layout";
import { NextPageWithLayout } from "./_app";
import { canAccess, GetServerSidePropsComponent, IPageProps } from "@/lib/auth";
import { toggleAuthForm } from "@/rtk/features/authFormSlice";
import { useAppDispatch, useAppSelector } from "@/rtk/hook";
import {BiLeftArrow} from "react-icons/bi";
import styles from "@/styles/pages/profile.module.scss"
import {FaRegSave} from "react-icons/fa"

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

const OrderPage: NextPageWithLayout<IPageProps> = (props)  => {
  const router = useRouter();
  const { theme }:any = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const [orderDetails, setOrderDetails] = useState<any>({});

  const [content, setContent] = useState("main");

  useEffect(() => {
    if (canAccess(props.status)) {
      getProfile();
    } else {
      router.push("/");
      dispatch(toggleAuthForm("login"));
    }
  }, [dispatch, props.status, router]);

  const getProfile = async () => {
    try {
      const repositories = getRepositories();
      const user = await repositories.user.getCurrentUserProfile();

      if (user) {
        setOrderDetails(user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setContentLocal = (title:string) => {
    localStorage.setItem("content",title);
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

  return orderDetails ? (
    <>
      <div className={`  w-full flex flex-row justify-between `}>
        <aside className={` w-3/12 pt-6 max-sm:w-fit  `} aria-label="Sidebar">
          <div
            className={`flex rounded-lg justify-center mb-5 py-5 max-sm:hidden flex-col items-center w-full ${
              theme !== "light"
                ? "bg-[#2f2b4f] text-white "
                : "bg-gray-100 text-black"
            }`}
          >
            <Image src={Profileimage} alt="Profile Image" />
            <h3 className="mt-3 text-ellipsis overflow-hidden w-10/12">exampleEmail@gmail.com</h3>
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
          <div className="w-full text-center flex justify-center mt-2 font-medium cursor-pointer">
            <div className=" max-sm:hidden">
            Sign Out
            </div>
            <BiLogOutCircle className={`visible sm:hidden ${tabIconClasses}`}  />
            </div>
          </div>
        </aside>
        {/* {getContent(content)} */}
        {/* Order Details */}
        <div className={`ml-24 mt-8 w-full  ${styles.address}`}>
                <div className={styles.title}>
                    <h1 className="font-medium text-2xl text-[#10c1e4]">My Address</h1><br />
                    <span className="text-[#10c1e4]">Add And Manage The Addresses You Use Regularly.</span><br /><br />
                    <span className="text-[#10c1e4]">. Add New Address</span><br /><br />
                </div>
                            
                <form className="w-[70%]">
                    <div className="flex ">
            
                    <label className="block mb-6 w-1/2 ">
                    <input
                    name="name"
                    type="text"
                    className=" w-full bg-inherit py-1 px-2 mt-1 outline outline-offset-2 outline-1 outline-gray-400 border-black shadow-sm"placeholder="Frist Name"/>
                </label>
                <label className="block mb-6  ml-6 w-1/2">
                    <input
                    name="name"
                    type="text"
                    className="w-full bg-inherit py-1 px-2 mt-1 outline outline-offset-2 outline-1 outline-gray-400 border-black shadow-sm"placeholder="Last Name"/>

                </label>
                    </div>
                <label className="block mb-6">
                    <input
                    name="address1"
                    type="text"
                    className="w-full bg-inherit py-1 px-2 mt-1 outline outline-offset-2 outline-1 outline-gray-400 border-black shadow-sm"placeholder="Street Address"/>

                </label>
               
               <div className="flex gap-6">
               <label className="block mb-6 ">
                    <input
                    name="zip"
                    type="text"
                    className="py-1 bg-inherit px-2 w-full mt-1 outline outline-offset-2 outline-1 outline-gray-400 border-black shadow-sm"placeholder="Zip Code"/>
                </label>
                <label className="block mb-6 ">
                    <input
                    name="city"
                    type="text"
                    className="py-1 bg-inherit px-2 w-full mt-1 outline outline-offset-2 outline-1 outline-gray-400 border-black shadow-sm"placeholder="City"/>

                </label>
                <label className="block mb-6">
                    <input
                    name="state"
                    type="text"
                    className="py-1 bg-inherit px-2 w-full mt-1 outline outline-offset-2 outline-1 outline-gray-400 border-black shadow-sm"placeholder="State"/>

                </label>
               </div>
                
               
                <label className="block mb-6">
                    <input
                    name="telephone"
                    type="text"
                    className="py-1 bg-inherit px-2 w-full mt-1 outline outline-offset-2 outline-1 outline-gray-400 border-black shadow-sm"placeholder="Phone Number"/>

                </label>
                <input type="checkbox" className="appearance-none checked:bg-blue-500" />
                <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" id="vehicle1" name="address1" value="address1" />
                <label className="text-[#10c1e4]" htmlFor="vehicle1"> default this address</label>
                <div className="mb-6 float-right flex gap-1">
                    <br />
                <button
                    type="submit"
                    className={styles.button}>
                    <BiLeftArrow />

                    Cancel
                    </button>
                    <button
                    type="submit"
                    className={styles.button}>
                      <FaRegSave />
                      Save
                    </button>
                   
                </div>
                
                </form>
            

            </div> 



       
      </div>
    </>
  ) : null
};
OrderPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export const getServerSideProps: GetServerSideProps = async (context) =>
  await GetServerSidePropsComponent(context);

export default OrderPage;
