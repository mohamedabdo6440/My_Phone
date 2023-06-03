import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { NextPageWithLayout } from '../_app'
import Image from 'next/image'

// local modules
import { useAppSelector } from '@/rtk/hook'
import { IOrderProducts } from '@/interfaces'
import styles from '@/styles/pages/orderDetails.module.scss'

// local static files
import Layout from '@/components/forms/Layout'
import box from '@/images/web_box.png'
import checkmark from '@/images/web_checkmark.png'
import clipboard from '@/images/web_clipboard.png'
import truck from '@/images/web_deliverytruck.png'
import process from '@/images/web_process.png'
import getRepositories from "@/lib/repositories";

const OrderDetails: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ order }) => {
    const { theme }:any = useAppSelector((state) => state.theme)

    return (
        <section className={`${styles.container} ${theme === 'light' ? styles.light : styles.dark}`}>
            <div className={styles.wrapper}>
                <h3>Order Details</h3>
                <div>
                    <span>
                        Sales Order No: <span>{order?._id}</span>
                    </span>
                    <span>
                        Order Submitted on: <span>{new Date(order?.createdAt!).toUTCString()}</span>
                    </span>
                </div>
            </div>
            <div className={styles.wrapper}>
                <h3>Order Status: {order?.status}</h3>
                <div>
                    <span>You have made a successful reservation, please wait for the express delivery.</span>
                </div>
                <div className={styles.steppers}>
                    <div className={`${styles.step} ${styles.done}`}>
                        <div className={styles.image}>
                            <Image src={clipboard} alt='Board' />
                        </div>
                        <span className={styles.text}>Order Placed</span>
                    </div>
                    <span className={styles.divider} />
                    <div className={styles.step}>
                        <div className={styles.image}>
                            <Image src={truck} alt='Truck' />
                        </div>
                        <span className={styles.text}>Package Sent</span>
                    </div>
                    <span className={styles.divider} />
                    <div className={styles.step}>
                        <div className={styles.image}>
                            <Image src={box} alt='Box' />
                        </div>
                        <span className={styles.text}>Package Received</span>
                    </div>
                    <span className={styles.divider} />
                    <div className={styles.step}>
                        <div className={styles.image}>
                            <Image src={process} alt='Process' />
                        </div>
                        <span className={styles.text}>Processing</span>
                    </div>
                    <span className={styles.divider} />
                    <div className={styles.step}>
                        <div className={styles.image}>
                            <Image src={checkmark} alt='Check Mark' />
                        </div>
                        <span className={styles.text}>Completed</span>
                    </div>
                </div>
            </div>
            <div className={styles.wrapper}>
                <h3>Shipping Carrier: Ups</h3>
                <div>
                    <span>
                        Track Number: <span>1zdsw2dx3265asd2fycky0</span>
                    </span>
                    <span>
                        Logistics Information: <span>Mar 31, 2022 16:47 Shipper created a label, Ups has not received the package yet.</span>
                    </span>
                </div>
            </div>
            <div className={styles.wrapper}>
                <h3>Shipping Carrier: Ups</h3>
                <div>
                    <span>
                        Payment Method: <span>{order?.paymentProcessor}</span>
                    </span>
                    <span>
                        Payment Delivery Account: <span>{order?.userId?.emailAddress}</span>
                    </span>
                </div>
            </div>
            <div className={styles.device_wrapper}>
                <h3 className={styles.title}>My Order</h3>
                <table>
                    <thead>
                        <tr className={styles.table_row}>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Quote</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.productIds?.map(({ product, qty }: IOrderProducts) => (
                            <tr className={styles.table_row} key={product._id}>
                                <td className={styles.product}>
                                    <strong className={styles.content_title}>{product.brand} {product.model}</strong>
                                    <div className={styles.content_wrapper}>
                                        <div className={styles.image}>
                                            <Image
                                                src={product.imageUrl}
                                                width='100%'
                                                height='100%'
                                                objectFit='contain'
                                                layout='responsive'
                                                alt={product.metaData}
                                            />
                                        </div>
                                        <strong>{product.brand} {product.model}</strong>
                                        <div className={styles.details}>
                                            <div>
                                                <strong>Condition: </strong>
                                                {/* <span>{generateCondition(product.condition)}</span> */}
                                            </div>
                                            <div>
                                                <strong>Carrier: </strong>
                                                <span>{product.carrier}</span>
                                            </div>
                                            <div>
                                                <strong>Storage </strong>
                                                <span>{product.storage}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span>{qty}</span>
                                </td>
                                <td>
                                    <span>Waiting for drop off</span>
                                </td>
                                <td className={styles.price}>
                                    <span>{order?.amount}$</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className={styles.footer}>
                    <div className={styles.total_wrapper}>
                        <div className={styles.subtotal}>
                            <strong>Subtotal</strong>
                            <span>{order?.amount}$</span>
                            <strong>Shipping</strong>
                            <span>0.5%</span>
                        </div>
                        <div className={styles.total}>
                            <strong>Total</strong>
                            <span>{order?.amount}$</span>
                        </div>
                    </div>

                    <button className={styles.button}>CANCEL ORDER</button>
                </div>
            </div>
        </section>
    )
}

OrderDetails.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query?.id?.toString()
    const repositories = getRepositories("test")
    const order = await repositories.order.getOrderById(id ?? "")

    return {
        props: {
            order
        }
    }
}

export default OrderDetails
