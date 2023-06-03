import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MdStar } from 'react-icons/md'

// local modules
import useMediaQuery from '@/hooks/useMediaQueries'
import axios from '@/lib/axios'
import { TProduct } from '@/rtk/features/commonSlice'
import { setFilter, setPageNum, setProducts, setTotalPages } from '@/rtk/features/searchSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/pages/search.module.scss'

// local static files
import Layout from '@/components/forms/Layout'
import useDebounce from '@/hooks/useDebounce'
import searchWhite from '@/images/web_searchicon.png'
import { NextPageWithLayout } from './_app'
import getRepositories from '@/lib/repositories'
import {TSearchData} from '@/interfaces/index'
import InputColor from '@/components/buttons/InputColor'
import Pagination from '@/components/mainComponents/Pagination'
import { sanitizeKeywords } from '@/utils/search'



type Product = TProduct & {
    color: string
    condition: string
}

interface TPayload {
    query: string
    filters: string[]
    settings: {
        sortColumn: string
        sortOrder: string
        totalProductsPerPage: number
        page: number
    }
}

const Search: NextPageWithLayout = () => {
    const router:any = useRouter()
    const { theme }:any = useAppSelector((state) => state.theme)
    const { pageNum, totalPages, products, filter } = useAppSelector((state) => state.search)
    const inputRef = useRef<HTMLInputElement>(null)
    const mobile = useMediaQuery('(max-width: 600px)')
    const dispatch = useAppDispatch()
    const debounceValue = useDebounce(router.query.params)
    let search:any = router.query.search
    let replacedString:any  = search ? search.replace(/\s+/g, "+") : '';
    let [data , setData] = useState<TSearchData>()


    const getData = async (e:any) => {
        const repositories = getRepositories('production')
        const searchData = await repositories.device.serachData(e)
         setData(searchData)
    }
   
    



    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    useEffect(() => {
      getData(replacedString)
    }, [mobile, pageNum, filter])

    return (
        <section className={`${styles.section} ${theme === 'light' ? styles.light : styles.dark}`}>
            <div className={styles.search}>
                <form
                    onSubmit={(e:any) => {
                           e.preventDefault()
                    }}
                >
                    <input
                        ref={inputRef}
                        defaultValue={router.query.search}
                        type='text'
                        placeholder='Search ...'
                        onChange={(e:any) =>{
                            router.push(`/search?search=${e.target.value}`)
                            let replacedString:any  = sanitizeKeywords(e.target.value)
                            getData(replacedString)
                        }}
                    />
                    <button type='submit'>
                        <div className={styles.image}>
                            <Image src={searchWhite} alt='Search Icon' />
                        </div>
                    </button>
                </form>
            </div>

            <div className={styles.product_list}>
                <div className={styles.list_header}>
                    <strong>Search result for &#8220;{router.query.search}&#8221;</strong>
                    {/* <div className={styles.filter}>
                        <select name='filter' value={filter} onChange={(e) => dispatch(setFilter(e.target.value))}>
                            <option value=''>Filter</option>
                            <option value='product'>Brand</option>
                            <option value='model'>Model</option>
                        </select>
                    </div> */}
                </div>
                <ul className={styles.product_container}>
                    {data?.results.length ? (
                        data.results.map((product, index) => {
                            if (mobile) {
                                return (
                                    <div key={index} className={styles.card}>
                                        <div className={styles.product_image}>
                                            <Image
                                                src={product.imageUrl}
                                                width='80%'
                                                height='100%'
                                                objectFit='contain'
                                                alt={product.str}
                                            />
                                        </div>
                                        <div className={styles.product_details}>
                                            <h3>{`${product.product} ${product.model}  ${product.model}`}</h3>
                                            <span>
                                                <MdStar />
                                                <MdStar />
                                                <MdStar />
                                                <MdStar />
                                                <MdStar />
                                            </span>
                                            <p>
                                                Storage: {product.variantInfo.storage} <span />
                                            </p>
                                            <p>carrier: {product.variantInfo.carrier}</p>
                                            {/* <p>Color : <InputColor event={`${product.variantInfo.color.toLowerCase()}`} extra={'w-4 h-4'} text={''} name='color'  value={product.variantInfo.color}/></p> */}
                                        </div>
                                        <div className={styles.product_actions}>
                                            <strong>${product.price.buy} </strong>
                                            <span>Free shipping</span>
                                            <button>Buy now</button>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    index < 6 && (
                                        <div key={index} className={styles.card}>
                                            <div className={styles.product_image}>
                                                <Image
                                                    src={product.imageUrl}
                                                    width='80%'
                                                    height='100%'
                                                    objectFit='contain'
                                                    alt={`${product.str}`}
                                                />
                                            </div>
                                            <div className={styles.product_details}>
                                                <h3>{`${product.company} ${product.product} ${product.model}`}</h3>
                                                <span>
                                                    <MdStar />
                                                    <MdStar />
                                                    <MdStar />
                                                    <MdStar />
                                                    <MdStar />
                                                </span>
                                                <p>
                                                Storage: {product.variantInfo.storage} <span />
                                            </p>
                                            <p>carrier: {product.variantInfo.carrier}</p>
                                           {/* <p>Color :<InputColor event={`${product.variantInfo.color.toLowerCase()}`} extra={'w-5 h-5'}  text={''} name='color'  value={product.variantInfo.color}/></p>  */}
                                            </div>
                                            <div className={styles.product_actions}>
                                                <strong>${product.price.buy }</strong>
                                                <span>Free shipping</span>
                                                <button>Buy now</button>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        })
                    ) : (
                        <div className={styles.empty_wrapper}>No products found.</div>
                    )}
                </ul>
            </div>

            <Pagination next={data?.next} prev={data?.previous} setData={setData}/>
        </section>
    )
}

Search.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export default Search
