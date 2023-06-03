import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Profileimage from "@/images/web_profileimage.png";
// local modules
import Layout from "@/components/forms/Layout";
import { NextPageWithLayout } from "./_app";
import { canAccess, GetServerSidePropsComponent, IPageProps } from "@/lib/auth";
import { toggleAuthForm } from "@/rtk/features/authFormSlice";
import { useAppDispatch, useAppSelector } from "@/rtk/hook";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart, FiUserPlus, FiClipboard } from "react-icons/fi";
import { BiMap } from "react-icons/bi";
import { BsCreditCard2Back } from "react-icons/bs";
import { TbDiscount2 } from "react-icons/tb";
import { RiCoinsLine } from "react-icons/ri"; 
import { MdOutlineMessage } from "react-icons/md"
// local static files
import getRepositories from "@/lib/repositories";
import Order from "../components/profile/Order";
import Invite from "../components/profile/Invite";
import ProfileDetails from "./ProfileDetails";
import Address from "../components/profile/address";
import Payment from "../components/profile/payment";
import Coupon from "../components/profile/Coupon";
import Commission from "../components/profile/Commission";
import BrandAmbassador from "../components/profile/brandAmbassador";
import Cookies from 'universal-cookie'
import {TUserInput} from "@/interfaces";
import { toast } from "react-hot-toast";
import { setUserData } from "@/rtk/features/userSlice";








const Profile: NextPageWithLayout<any> = (props) => {
  const router = useRouter();
  const { theme }:any = useAppSelector((state:any) => state.theme);
  const dispatch = useAppDispatch();
  const [profile, setProfile] = useState<TUserInput>();
  const [content, setContent] = useState("main");
  const cookie = new Cookies()

  let localContent = localStorage.getItem("content");
  useEffect(()=>{
    if(localContent  && localContent != null){
      setContent(localContent);
    }else{
      setContent("main");
    }
  },[localContent])  

  useEffect(()=>{
    if (localContent && localContent === content) {
      localStorage.removeItem("content");
    }
  },[content]);


  useEffect(() => {
    if (cookie.get('token')) {
      getProfile();
    } else {
      router.push("/");
      dispatch(toggleAuthForm("login"));
    }
  }, [dispatch, props.status, router]);

  const getProfile = async () => {
    try {
      const repositories = getRepositories();
      const user:any = await repositories.user.getCurrentUserProfile();
      if(user.detail){
      cookie.remove('token')
      router.push('/')
      toast.error('Kindly log in Again')
      }else{
        setProfile(user);
        dispatch(setUserData({
          url: user.url
        }))
      }
    } catch (error) {
      cookie.remove('token')
      router.push('/')
      toast.error('Kindly log in Again')
    }
  };

  const signOut = ()=>{
    cookie.remove('token')
    router.push('/')
  }


  const getContent = (content: string) => {
    switch (content) {
      case "main":
        return <Order id={profile?.id}/>;
      case "invite":
        return <Invite />;
      case "profileDetails":
        return <ProfileDetails profile={profile} status={0} message={getProfile} />;
      case "address":
        return <Address />;
      case "payment":
        return <Payment />;
      case "coupon":
        return <Coupon />;
      case "commission":
        return <Commission />;
      case "ambassador":
        return <BrandAmbassador />;
    }
  };

  const Tab = (props: { contentName: string; tile: string; icon: any }) => {
    return (
      <button
        onClick={() => setContent(props.contentName)}
        className={`flex items-center p-2 
                text-sm font-bold rounded-lg w-full  transition-all
                max-sm:justify-center sideBar
                ${
          content === props.contentName
            ? "bg-[#10c1e4] text-white hover:bg-[#10c1e4]"
            : theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-700"
        } `}
      >
        {props.icon}
        <span className="max-sm:hidden capitalize ml-3 whitespace-nowrap titleAnimate" id="titleAnimate">
          {props.tile}
        </span>
      </button>
    );
  };

  const tabIconClasses = `flex-shrink-0 w-6 h-6 transition duration-75`;

  return profile ? (
    <>
      <div className={`w-full flex flex-row `}>
        <aside className={`w-64 pt-6 max-sm:w-fit  `} aria-label="Sidebar">
          <div
            className={`flex rounded-lg justify-center mb-5 py-5 max-sm:hidden flex-col items-center w-full ${
              theme !== "light"
                ? "bg-[#2f2b4f] text-white "
                : "bg-gray-100 text-black"
            }`}
          >
            <span className="w-32">
            <Image src={Profileimage} alt="Profile Image" className="w-full rounded-full"/>
            </span>
            <h3 className="mt-3 text-center overflow-hidden w-10/12">{profile.first_name} {profile.last_name}</h3>
          </div>
          <div
            className={`py-5 p-[5px] rounded-lg overflow-y-auto max-sm:hover:absolute  z-10 ${
              theme !== "light"
                ? "bg-[#2f2b4f] text-white "
                : "bg-gray-100 text-black"
            } `}
          >
            <ul className="space-y-2 mb-2 buttons">
              <li>
                <Tab
                  contentName={"main"}
                  tile={"My Orders"}
                  icon={<FiShoppingCart className={tabIconClasses} />}
                />
              </li>
              <li>
                <Tab
                  contentName={"profileDetails"}
                  tile={"My Profile"}
                  icon={<AiOutlineUser className={tabIconClasses} />}
                />
              </li>
              <li>
                <Tab
                  contentName={"address"}
                  tile={"My Address"}
                  icon={<BiMap className={tabIconClasses} />}
                />
              </li>
              <li>
                <Tab
                  contentName={"payment"}
                  tile={"My Payment Type"}
                  icon={<BsCreditCard2Back className={tabIconClasses} />}
                />
              </li>
              <li>
                <Tab
                  contentName={"coupon"}
                  tile={"my coupon"}
                  icon={<TbDiscount2 className={tabIconClasses} />}
                />
              </li>
              <li>
                <Tab
                  contentName={"commission"}
                  tile={"my commission"}
                  icon={<RiCoinsLine className={tabIconClasses} />}
                />
              </li>
              <li>
                <Tab
                  contentName={"invite"}
                  tile={"individual invite center"}
                  icon={<FiUserPlus className={tabIconClasses} />}
                />
              </li>
              <li>
                <Tab
                  contentName={"ambassador"}
                  tile={"brand ambassador"}
                  icon={<FiClipboard className={tabIconClasses} />}
                />
              </li>
              <li>
                <Tab
                  contentName={"customer"}
                  tile={"customer service"}
                  icon={<MdOutlineMessage className={tabIconClasses} />}
                />
              </li>
            </ul>
            <hr />
          <div className="w-full text-center mt-2 font-medium cursor-pointer" onClick={signOut}>Sign Out</div>
          </div>
        </aside>
        {getContent(content)}
      </div>
    </>
  ) : null;
};
Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// export const getServerSideProps: GetServerSideProps = async (context) =>
//   await GetServerSidePropsComponent(context);

export default Profile;
