import Image from 'next/image'
import Link from 'next/link'

// local modules
import Layout from '@/components/forms/Layout'
import routes from '@/constants/routes'
import { useAppSelector } from '@/rtk/hook'
import styles from '@/styles/pages/404.module.scss'
import { NextPageWithLayout } from './_app'

// local static files
import notFound from '@/images/web_404.png'

const NotFound: NextPageWithLayout = () => {
    const { theme }:any = useAppSelector((state) => state.theme)

    return (
        <div className={`${styles.container} ${theme === 'light' ? styles.light : styles.dark}`}>
            <div className={styles.image}>
                <Image src={notFound} alt='404 not found' />
            </div>
            <h1>Page Not Found</h1>
            <p>
                We&lsquo;re sorry, the page you requested could not be found. <br /> Please go back to the homepage.
            </p>
            <Link href={routes.HOME}>
                <button>GO HOME</button>
            </Link>
        </div>
    )
}

NotFound.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export default NotFound
