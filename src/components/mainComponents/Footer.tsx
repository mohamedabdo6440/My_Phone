import Image from "next/image"
import Link from "next/link"
import { FunctionComponent } from "react"

// local modules
import routes from "@/constants/routes"
import { useAppSelector } from "@/rtk/hook"
import styles from "@/styles/components/footer.module.scss"

// local static files
import myphonelogodark from "@/images/web_dark_myphone.png"
import fb from "@/images/web_fb.png"
import iheart from "@/images/web_iloveheart.png"
import instagram from "@/images/web_instagram.png"
import myphonelogo from "@/images/web_light_myphone.png"

const Footer: FunctionComponent = () => {
    const { theme }:any = useAppSelector((state) => state.theme)

    return (
        <footer className={`${theme === "light" ? styles.light : styles.dark}`}>
            <div className={`${styles.footer} container`}>
                <div className={styles.icon}>
                    <Image src={iheart} alt="I love Myphone" />
                </div>
                <div className={styles.logo}>
                    <Image src={theme === "light" ? myphonelogo : myphonelogodark} alt="I love Myphone" />
                </div>
                <ul className={styles.links}>
                    <li>
                        <Link href={routes.HOME}>
                            <a className={styles.green}>HOME</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={routes.BUY}>
                            <a className={styles.green}>BUY</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={routes.SELL} className="green">
                            <a className={styles.green}>SELL</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={routes.REPAIR} className="green">
                            <a className={styles.green}>REPAIR</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={routes.HELP} className="grey">
                            <a className={styles.grey}>HELP</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={routes.CONTACT} className="grey">
                            <a className={styles.grey}>CONTACT</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={routes.ACCOUNT} className="grey">
                            <a className={styles.grey}>ACCOUNT</a>
                        </Link>
                    </li>
                </ul>
                <div className={styles.socmed}>
                    <Image src={fb} alt="Facebook Logo" />
                    <Image src={instagram} alt="Instagram Logo" />
                </div>
            </div>
        </footer>
    )
}

export default Footer
