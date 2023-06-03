import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

// Local modules
import Layout from '@/components/forms/Layout'
import { NextPageWithLayout } from '../_app'
import { useAppSelector } from '@/rtk/hook'
import styles from '@/styles/pages/cancel.module.scss'
import getRepositories from "@/lib/repositories";

const Error: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ order }) => {
    const { theme }:any = useAppSelector((state) => state.theme)

    return (
        <section className={`${styles.section} ${theme === 'light' ? styles.light : styles.dark}`}>
            <h4 className={styles.header}>Payment Error</h4>
            <p className={styles.body}>
                Your order has been canceled due to an error, Please contact an administrator or <a href={`/orders/${order?._id}`}>click here</a> to go to the order details page
            </p>
        </section>
    )
}

Error.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const identifier = context.query?.token ? context.query?.token : context.query?.payment_intent
    const repositories = getRepositories()
    const order = await repositories.order.updateOrderByIdentifier(
        identifier?.toString() ?? "", "error"
    )

    return {
        props: {
            order
        }
    }
}

export default Error
