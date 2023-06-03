import { GetServerSideProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
// local modules
import Layout from "@/components/forms/Layout"
import { NextPageWithLayout } from "./_app"
import routes from "@/constants/routes"
import useToast from "@/hooks/useToast"
import {canAccess, GetServerSidePropsComponent, IPageProps} from "@/lib/auth"
import axios from "@/lib/axios"
import { toggleAuthForm } from "@/rtk/features/authFormSlice"
import { useAppDispatch, useAppSelector } from "@/rtk/hook"
import { resetAuthInfo } from "@/rtk/features/authSlice"
import styles from "@/styles/pages/profile.module.scss"
import {BiLeftArrow} from "react-icons/bi"
import {FaRegSave} from "react-icons/fa"
import { FiEdit } from "react-icons/fi"
// local static files
import editWhite from "@/images/web_editwhite.png"
import profileImage from "@/images/web_profileimage.png"
import getRepositories from "@/lib/repositories";
import {TUserInput} from "@/interfaces";
import { toast } from "react-hot-toast"





const ProfileDetails: NextPageWithLayout<IPageProps> = ({profile , message}) => {
    const router = useRouter()
    const { theme }:any = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    const [myProfile, setProfile] = useState<TUserInput>()
    const [isDisabled, setIsDisabled] = useState(true)
    const userApp = useAppSelector((state)=> state.user)


    const signoutHandler = async () => {
        try {
            const result = await axios.delete("/auth/signout")

            if (result.status >= 200 && result.status <= 299) {
                dispatch(resetAuthInfo())
                router.push(routes.HOME)
                toast.success("Sign out")
            } else {
                throw new Error(result.data)
            }
        } catch (error) {
            toast.error("Error sign out")
            console.log(error)
        }
    }      
    
         const payload:any = {
        'email': userApp.userData.Email ,
        'first_name': userApp.userData.firstName,
        'last_name': userApp.userData.lastName,
        'birth_date': userApp.userData.birth,
        'phone': userApp.userData.phone,
        'gender':userApp.userData.gender,
          }

    const updatedObject = {
        'email': '' ,
        'first_name': '',
        'last_name': '',
        'birth_date': '',
        'phone': '',
        'gender': '',
      };

      const changedProperties:any = {};
    function getChangedProperties(originalObject:any, updatedObject:any , e:any) {
        e.preventDefault()
        for (let key in updatedObject) {
          if (originalObject[key] !== updatedObject[key]) {
            changedProperties[key] = updatedObject[key];
          }
        }
        return changedProperties
      }

    const updateProfileHandler: React.FormEventHandler = async (e) => {
        e.preventDefault()
        handleUpdate()     
        getChangedProperties(payload , updatedObject , e)
        if(JSON.stringify(changedProperties) === '{}'){
            toast.error('no updates made on your profile as you did not change the values')
        }else{
            try {
                const repositories = getRepositories()
                const editSuccess = await repositories.user.editCurrentUserProfile(profile.url , changedProperties)
                if (editSuccess.status == 200 || editSuccess.status == 201) {
                    toast.success("Profile Updated")
                    message()
                } else {
                    for(let key in editSuccess.data) { 
                        toast.error(key + ': ' + editSuccess.data[key]); 
                     }
                }
            } catch (error) {
                toast.error("we have an updates try later")
            }
        }
       
    }
    const handleUpdate = ()=> setIsDisabled(!isDisabled);
    const cancelEdit = ()=> {
        handleUpdate();
        document.getElementById("editForm");
    }

    
    return profile ? (
        
        <section className={`${styles.section} ${theme === "light" ? styles.light : styles.dark}`}>
            <div className={styles.profile}>
                <div className={styles.profile_header}>
                    <h3 className={styles.title}>My Profile</h3>
                    <span>View and edit your personal information below.</span>
                </div>
                <div className={styles.account_details}>
                    <div className={styles.detail_header}>
                        <div className={styles.image} >
                            <Image src={profileImage} alt="Profile image" />
                        </div>
                        <div className={styles.detail_text}>
                            <span className={styles.sub_title}>Account Email Address:</span>
                            <span>{profile.email}</span>
                            {/* <span className={styles.button_wrapper}>
                                <span onClick={() => dispatch(toggleAuthForm("updatePassword"))}>Update Password</span>            
                            </span> */}
                        </div>
                    </div>
                    <form className={styles.form} id="editForm" onSubmit={updateProfileHandler}>
                        <div>
                            <label htmlFor='name'>First Name</label>
                            <input type='text' className={` rounded-lg ${isDisabled ? "bg-gray-200" : " transition-all bg-transparent border-[.5px] border-b-[#10c1e4]"}`} name='name' id='name' defaultValue={profile.first_name}  placeholder={`${profile.first_name}`} disabled={isDisabled} 
                            onChange={(e)=>{
                                if(e.target.value != profile.first_Name){
                                    updatedObject.first_name = e.target.value
                                }
                            }}
                            />
                        </div>
                        <div>
                            <label htmlFor='name'>Last Name</label>
                            <input type='text' className={` rounded-lg ${isDisabled ? "bg-gray-200" : " transition-all bg-transparent border-[.5px] border-b-[#10c1e4]"}`} name='name' id='name' defaultValue={profile.last_name}  placeholder={`${profile.last_name}`} disabled={isDisabled} 
                             onChange={(e)=>{
                                if(e.target.value != profile.last_name){
                                    updatedObject.last_name = e.target.value
                                }
                            }}
                            />
                        </div>
                        <div>
                            <label htmlFor='birthDate'>Birthday</label>
                            <input type='date' className={` rounded-lg ${isDisabled ? "bg-gray-200" : " transition-all bg-transparent border-[.5px] border-b-[#10c1e4]"}`} name='birthDate' id='birthDate' defaultValue={profile.birth_date} placeholder={profile.birth_date} disabled={isDisabled} 
                            onChange={(e)=>{
                                if(e.target.value != profile.birth_date){
                                    updatedObject.birth_date = e.target.value
                                }
                            }}
                            />
                        </div>
                        <div>
                            <label htmlFor='phoneNumber'>Phone Number</label>
                            <input type='text' className={` rounded-lg ${isDisabled ? "bg-gray-200" : " transition-all bg-transparent border-[.5px] border-b-[#10c1e4]"}`} name='phoneNumber' id='phoneNumber' defaultValue={profile.phone} placeholder={profile.phone} disabled={isDisabled} 
                             onChange={(e)=>{
                                if(e.target.value != profile.phone){
                                    updatedObject.phone = e.target.value
                                }
                            }}
                            />
                        </div>
                        <div>
                            <label htmlFor='gender'>Gender</label>
                            <input type='text' className={` rounded-lg ${isDisabled ? "bg-gray-200" : " transition-all bg-transparent border-[.5px] border-b-[#10c1e4]"}`} name='gender' id='gender' defaultValue={profile.gender} placeholder={profile.gender} disabled={isDisabled} 
                            onChange={(e)=>{
                                if(e.target.value != profile.gender){
                                    updatedObject.gender = e.target.value
                                }
                            }}
                            />
                        </div>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input type='text' className={` rounded-lg ${isDisabled ? "bg-gray-200" : " transition-all bg-transparent border-[.5px] border-b-[#10c1e4]"}`} name='email' id='email' defaultValue={profile.email}  placeholder={profile.email} disabled={isDisabled} 
                            onChange={(e)=>{
                                if(e.target.value != profile.email){
                                    updatedObject.email = e.target.value
                                }
                            }}
                            />
                        </div>
                        {/* <div>
                            <label htmlFor='state'>State/City</label>
                            <input type='text' className={` rounded-lg ${isDisabled ? "bg-gray-200" : " transition-all bg-transparent border-[.5px] border-b-[#10c1e4]"}`} name='state' id='state' placeholder={myProfile.city} disabled={isDisabled} />
                        </div>
                        <div>
                            <label htmlFor='address'>Street Address</label>
                            <input type='text' className={` rounded-lg ${isDisabled ? "bg-gray-200" : " transition-all bg-transparent border-[.5px] border-b-[#10c1e4]"}`} name='address' id='address' placeholder={myProfile.address} disabled={isDisabled} />
                        </div> */}
                        <div className="justify-end">
                        {isDisabled ? 
                            (<button onClick={(e)=>{e.preventDefault();handleUpdate()}}>
                                <div className={styles.image}>
                                    <FiEdit />
                                </div>
                                Edit Profile
                            </button>):(
                            <>
                            <div className="flex" style={{flexDirection:"row"}}>
                                <button onClick={(e)=>{e.preventDefault();cancelEdit()}}>
                                    <div className={styles.image}>
                                        <BiLeftArrow />
                                    </div>
                                    Cancel
                                </button>
                                <button type="submit">
                                    <div className={styles.image}>
                                        <FaRegSave />
                                    </div>
                                    Save
                                </button>
                            </div>
                            </>
                            )
                        }
                        </div>

                    </form>
                </div>
            </div>
        </section>
    ) : null
}

ProfileDetails.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (context) => await GetServerSidePropsComponent(context)

export default ProfileDetails
