import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { MdReportGmailerrorred } from "react-icons/md"

import Layout from "@/components/forms/Layout"
import routes from "@/constants/routes"
import { useCountDown } from "@/hooks/useCountDown"
import useToast from "@/hooks/useToast"
import axios from "@/lib/axios"
import { useAppSelector } from "@/rtk/hook"
import styles from "@/styles/pages/reset.module.scss"
import { NextPageWithLayout } from "./_app"

interface TVerifyProps {
    status: 202 | 401
    message: "OK" | "UNAUTHORIZED"
    token?: string
}

const Reset: NextPageWithLayout<TVerifyProps> = ({ status, token }) => {
    const { theme }:any = useAppSelector((state) => state.theme)
    const [counter, start] = useCountDown(120, 1000)
    const toast = useToast()
    const router = useRouter()

    const handleResetPassword: React.FormEventHandler = async (e) => {
        e.preventDefault()

        const data = new FormData(e.target as HTMLFormElement)

        const { password, confirmPassword } = Object.fromEntries(data.entries())

        if (password !== confirmPassword) toast.error("Password must match")
        try {
            const result = await axios.put(
                "/auth/reset-password",
                { password },
                {
                    headers: {
                        Authorization: token!,
                    },
                }
            )

            if (result.status >= 200 && result.status <= 299) {
                toast.success("Sucess! You can now login")
                router.push(routes.HOME)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleResend: React.FormEventHandler = async (e) => {
        e.preventDefault()

        const data = new FormData(e.target as HTMLFormElement)
        const { email } = Object.fromEntries(data.entries())

        if (!email) return toast.error("Enter your email")
        start()

        try {
            const result = await axios(`/auth/send-verification?emailAddress=${email}&type=reset`)
            console.log(result)

            if (result.status >= 200 && result.status <= 299) return toast.success("Success! Check your email")
            else if (result.status === 409) return toast.error("Invalid email")
            else throw new Error(result.data)
        } catch (error) {
            toast.error("Error! Please try again later.")
        }
    }

    return (
        <div className={`${styles.container} ${theme === "light" ? null : styles.dark}`}>
            <div className={styles.wrapper}>
                {status === 202 ? (
                    <form className={styles.form} onSubmit={handleResetPassword}>
                        <h3>Reset your password</h3>
                        <p>Enter your new password</p>
                        <input type="password" placeholder="New Password" name="password" />
                        <input type="password" placeholder="Confirm New Password" name="confirmPassword" />
                        <button>Reset Password</button>
                    </form>
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
                            <p>
                                Oopss... Reset password cannot be continued. Looks like the verification link has expired. Not to worry, we can send
                                the link again.
                            </p>
                        </div>

                        <form className={styles.resend_form} onSubmit={handleResend}>
                            <input type="email" name="email" placeholder="Enter your email" />
                            <div className={styles.button_wrapper}>
                                <button type="submit">Resend password reset link</button>
                                {!!counter && <div>try again in {counter}s</div>}
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

Reset.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (!context.query.token) {
        return {
            notFound: true,
        }
    }

    const res = await fetch(`${process.env.server_uri}/v1/auth/verify`, {
        method: "put",
        headers: {
            Authorization: `Bearer ${context.query.token}`,
        },
        credentials: "same-origin",
    })

    const VERIFIED_TOKEN: TVerifyProps = {
        status: 202,
        message: "OK",
        token: `Bearer ${context.query.token}`,
    }

    const EXPIRED_TOKEN: TVerifyProps = {
        status: 401,
        message: "UNAUTHORIZED",
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

export default Reset
