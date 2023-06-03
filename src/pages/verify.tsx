import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { MdOutlineMarkEmailRead, MdReportGmailerrorred } from 'react-icons/md'

// local modules
import Layout from '@/components/forms/Layout'
import { useCountDown } from '@/hooks/useCountDown'
import useToast from '@/hooks/useToast'
import axios from '@/lib/axios'
import { toggleAuthForm } from '@/rtk/features/authFormSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/pages/verify.module.scss'
import { NextPageWithLayout } from './_app'

interface TVerifyProps {
    status: 202 | 401
    message: 'OK' | 'UNAUTHORIZED'
}

const Verify: NextPageWithLayout<TVerifyProps> = ({ status }) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [counter, start] = useCountDown(120, 1000)
    const toast = useToast()
    const { theme }:any = useAppSelector((state) => state.theme)

    const handleResend: React.FormEventHandler = async (e) => {
        e.preventDefault()

        const data = new FormData(e.target as HTMLFormElement)

        const { email } = Object.fromEntries(data.entries())

        if (!email) return toast.error('Enter your email')
        start()

        try {
            const result = await axios(`/auth/send-verification?emailAddress=${email}&type=verify`)

            if (result.status >= 200 && result.status <= 299) return toast.success('Success! Check your email')
            else if (result.status === 409) return toast.error('Invalid email')
            else throw new Error(result.data)
        } catch (error) {
            toast.error('Error! Please try again later.')
        }
    }

    return (
        <div className={`${styles.container} ${theme === 'light' ? null : styles.dark}`}>
            <div className={styles.wrapper}>
                {status === 202 ? (
                    <div className={styles.header}>
                        <div className={`${styles.icon} ${styles.icon_success}`}>
                            <MdOutlineMarkEmailRead />
                        </div>
                        <div className={styles.title}>
                            Your email address <br /> has been verified.
                        </div>
                        <div className={styles.content}>
                            <p>You have successfully verified your email address. You can now sign in with your new account.</p>
                        </div>
                        <div className={styles.button_wrapper}>
                            <button onClick={() => dispatch(toggleAuthForm('login'))}>Sign in now</button>
                            <button onClick={() => router.push('/')}>Go to homepage</button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.header}>
                        <div className={`${styles.icon} ${styles.icon_error}`}>
                            <MdReportGmailerrorred />
                        </div>
                        <div className={styles.title}>
                            Email verification link <br />
                            modified or expired.
                        </div>
                        <div className={styles.content}>
                            <p>Looks like the verification link has expired. Not to worry, we can send the link again.</p>
                        </div>

                        <form onSubmit={handleResend}>
                            <input type='email' name='email' placeholder='Enter your email' />
                            <div className={styles.button_wrapper}>
                                <button disabled={!!counter} type='submit'>
                                    Resend verification link
                                </button>
                                {!!counter && <div>try again in {counter}s</div>}
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

Verify.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (!context.query.token) {
        return {
            notFound: true,
        }
    }

    const res = await fetch(`${process.env.server_uri}/v1/auth/verify`, {
        method: 'put',
        headers: {
            Authorization: `Bearer ${context.query.token}`,
        },
        credentials: 'same-origin',
    })

    const VERIFIED_TOKEN: TVerifyProps = {
        status: 202,
        message: 'OK',
    }

    const EXPIRED_TOKEN: TVerifyProps = {
        status: 401,
        message: 'UNAUTHORIZED',
    }

    if (res.status === 202) {
        return {
            props: VERIFIED_TOKEN,
        }
    } else {
        return {
            props: EXPIRED_TOKEN,
        }
    }
}

export default Verify
