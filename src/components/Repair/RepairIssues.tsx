import React , {useState , useEffect} from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'


// local modules
import { nextStep, setStep } from '@/rtk/features/repairSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/repairIssues.module.scss'
import { toast } from 'react-hot-toast'
import getRepositories from '@/lib/repositories'
import { useRouter } from 'next/router'
import routes from '@/constants/routes'
import { toggleAuthForm } from '@/rtk/features/authFormSlice'
import Cookies from 'universal-cookie'




// const issues = [
//     'Screen Damage',
//     'Battery Drains Fast',
//     'Charging Issue',
//     'Rear Camera Issue',
//     'Front Camera Issue',
//     'Rear Camera Lens Damage',
//     'Glass Damage',
//     'Rear Camera Lens Damage',
//     'Rear Camera Lens Damage',
//     'Water/Liquid Damage',
//     'Battery Drains Fast',
//     'Charging Issue',
//     'Rear Camera Issue',
//     'Front Camera Issue',
//     'Screen Damage',
//     'Screen Damage',
//     'Screen Damage',
//     'Screen Damage',
// ]








const RepairIssues = () => {
    const { theme }:any = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    const selector = useAppSelector((state) => state.repair)
    const [loader, setLoader] = useState(false)
    const { page } = useAppSelector((state) => state.home)
    const cookie = new Cookies()
    let btn =''
    var issuesToRepair:any = []
    var issuesUrl:any = []
    const [issues, setIssues] = useState([])



    function addTORepair(e:any , issue:any , price:any , currency:any , url:any){
        const index:any = issuesToRepair.findIndex((item : any) => item.issue  === issue );
        const indexUrl:any = issuesUrl.findIndex((item : any) => item.issueUrl  === url );
        let container:any = document.getElementById(e)
        if (index !== -1) {
            theme === 'light' ?  container.style.background = 'white' : container.style.background = 'hsl(0deg, 0%, 19%)'
            issuesToRepair.splice(index, 1);
            issuesUrl.splice(indexUrl, 1)
        } else {
            container.style.background = '#adebf7'
            issuesToRepair.push({
                issue : issue,
                price : price,
                currency : currency,
                issueUrl:url
            });
            issuesUrl.push(url)

        }
    }


    const addtoCart = async (e:any) => {
        e.preventDefault()
           setLoader(true)
           const repositories = getRepositories('production')
           const model = await repositories.order.createCart(page , 'web')
           if(model.status === 500){
               toast.error('we have an updates try later on')
           }else{
               toast.success('your cart made succecfully')
               addItemsToCart(e) 
               setLoader(false)
           } 
   }

   const addItemsToCart = async (e:any)=>{
       e.preventDefault()
       const repositories = getRepositories('production')
       const model = await repositories.order.addRepairOrder(issuesUrl)
       if(model.status === 200 || model.status === 201){
           toast.success('items added') 
           setLoader(false)
       }else{
           setLoader(false)
           toast.error('items not added')
       }
   }

   
  async  function checkCart(e:any){
    const repositories = getRepositories('production')
    const active = await repositories.order.getCart()
    if(active.status === 204){
        addtoCart(e)
        if(btn === 'Add'){
            dispatch(setStep(1))
           
        }else{
            const uniqueIssues:any = Array.from(new Set(issuesToRepair));
            dispatch(nextStep({
                device_issue : uniqueIssues
            }))
        }
    }else{
        if(active.data.type === page){
            addItemsToCart(e)
            if(btn == 'Add'){
                dispatch(setStep(1))
            }else{
            const uniqueIssues:any = Array.from(new Set(issuesToRepair));
            dispatch(nextStep({
                device_issue : uniqueIssues
            }))
            }
        }else{
            toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                  } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                         You Are Going to Delete The Active Cart Are you Sure TO Do This Action ? 
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-l border-gray-200">
                  <button
                      onClick={(e) =>{
                        if(btn === 'Add'){
                            dispatch(setStep(1))          
                            addtoCart(e)
                        }else{
                            const uniqueIssues:any = Array.from(new Set(issuesToRepair));
                            dispatch(nextStep({
                                device_issue : uniqueIssues
                            }))
                            addtoCart(e)
                        }
  
                      }}
                      className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      yes
                    </button>
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      No
                    </button>
                   
                  </div>
                </div>
              ))
        }
    }
}


  async  function getRepairIssus(){
        const repositories = getRepositories('production')
        const issues = await repositories.device.getDeviceRepairs(selector.payload.issueUrl)
        setIssues(issues)
    }

    useEffect(() => {
        getRepairIssus()
    }, [])
    


    return (issues.length != 0) ? (
        <section className={styles.section}>
            <h1>What&rsquo;s Wrong With Your Smartphone</h1>
            <div className={styles.issue_wrapper} id="issue">
                {issues.map((issue:any, index:any) => (
                    <div
                        key={index}
                        id={index}
                        className={`${styles.issue} tooltip max-[700px]:col-span-3 ${theme === 'light' ? styles.light : styles.dark}`}
                        onClick={()=>{
                            addTORepair(index , issue.typeInfo.str , issue.price, issue.price_currency , issue.url) 
                        }}
                        
                    >
                        <strong >{issue.typeInfo.str}</strong>
                        <span className="tooltip-text">{issue.typeInfo.str}</span>
                        <span className={styles.price} >price: {issue.price}{issue.price_currency}</span>
                    </div>
                ))}

                
                 <div className={`${styles.issue} tooltip bg-slate-300 max-[700px]:col-span-3 ${theme === 'light' ? styles.light : styles.dark}`} 
                 onClick={()=>{
                    dispatch(toggleAuthForm('dunno'))
                 }}
                 >
                        <strong >I Don't Know</strong>
                        <span className="tooltip-text">I Don't Know</span>
                        <span className={styles.price} >price: 100</span>
                    </div>



                <div className='flex items-center col-span-3 max-[700px]:flex-col max-[700px]:gap-5'>
                    {
                        loader == false ? 
                        <button onClick={(e)=>{
                            if(cookie.get('token')){
                               btn = 'Add'
                               checkCart(e)
                            }else{
                               toast.error('Kindly Log in first')
                               dispatch(toggleAuthForm('login'))
                            }
                           
                           }} className='w-[35%] m-auto border-solid border-[1px] border-sky-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center max-[700px]:w-[50%]'>
                            Add Another item
                            </button>
                        : ''
                    }

                    {
                       loader == false ?
                       <button className='w-[35%] m-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={(e) => {
                        // if(cookie.get('token')){
                        //     if(issuesToRepair.length === 0){
                        //         toast.error('Kindly choose your issues first')
                        //     }else{
                        //         btn = 'Continue'
                        //         checkCart(e)
                        //     }
                        // }else{
                        //     toast.error('Kindly Log in first')
                        //     dispatch(toggleAuthForm('login'))
                        // }

                        checkCart(e)
    
                        }}
                        
                        >continue</button>
                       : '' 
                    }
                
                    </div>
            </div>
        </section>
    ) : null
}

export default RepairIssues
