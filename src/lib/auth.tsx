import axios from 'axios'
import * as process from "process";
import Cookies from 'universal-cookie'




const cookie = new Cookies()


export interface PageContext {
    id?: string
    token?: string
    payment_intent?: string
}

export interface IPageProps {
    status: number
    message: any
    query?: PageContext | null
    profile:any
}

export const canAccess = (status: Number) => {
    if (cookie.get('token'))
        return true
    if (status === 200)
        return true
    if (status === 401)
        return false
    // throw new Error(`Can determine if can access, status: ${status}`)
}

export const GetServerSidePropsComponent = async (context: any) => {
    const cookies = context.req.cookies

    const authorizedProps: IPageProps = {
        status: 200,
        message: 'OK',
        query: context.query || null,
        profile: undefined
    }

    const unAuthorizedProps: IPageProps = {
        status: 401,
        message: 'UNAUTHORIZED',
        profile: undefined
    }

    const unknownErrorProps: IPageProps = {
        status: 500,
        message: 'INTERNAL_SERVER_ERROR',
        profile: undefined
    }

    if (cookies.persist || cookies.auth) {
        // console.log('#7') // Persist token is existing.

        try {
            if (cookies.auth) {
                await axios.get(`${process.env.server_uri}/v1/auth/validate`, {
                    headers: {
                        Cookie: context.req.headers.cookie,
                    },
                })

                // console.log('#17') // Auth token is valid.

                return {
                    props: {
                        ...authorizedProps,
                    },
                }
            } else {
                const refresh = await axios.get(`${process.env.server_uri}/v1/auth/refresh`, {
                    headers: {
                        Cookie: context.req.headers.cookie,
                    },
                })

                context.res.setHeader('set-cookie', refresh.headers['set-cookie'])

                if (refresh.status === 200) {
                    // console.log('#35') // Auth token is refreshed.

                    return {
                        props: {
                            ...authorizedProps,
                        },
                    }
                } else {
                    // console.log('#44') // Persist token is expired.

                    return {
                        props: {
                            ...unAuthorizedProps,
                        },
                    }
                }
            }
        } catch (error) {
            // console.log('#55') // Catch possible error during request.

            return {
                props: {
                    ...unknownErrorProps,
                },
            }
        }
    } else {
        // console.log('#65') // Persist token is not existing.

        return {
            props: {
                ...unAuthorizedProps,
            },
        }
    }
}

/**
 ** Example Implementation from a page.

    import type { NextPage, GetServerSideProps } from 'next'
    import { useRouter } from 'next/router'
    import { useEffect } from 'react'

    import { GetServerSidePropsComponent, PageProps } from '@/lib/auth'

    const Private: NextPage<PageProps> = (props) => {
        useEffect(() => {
            console.log(props)
        }, [])

        if (props.status === 200) {
            return <h1>Page content</h1>
        } else {
            return null
        }
    }

    export default Private

    export const getServerSideProps: GetServerSideProps = async (context) => await GetServerSidePropsComponent(context)

*/
