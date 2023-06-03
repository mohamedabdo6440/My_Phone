
// local modules
import {  useAppSelector } from "@/rtk/hook"
import styles from "@/styles/pages/profile.module.scss"





const BrandAmbassador = () =>  {
        const { theme }:any = useAppSelector((state) => state.theme)
        return (
        <section className={`${styles.section} ${theme === "light" ? styles.light : styles.dark}`}>
        <div className={styles.ambassador}>
                <div className={styles.title}>
                    <h3>Brand Ambassador</h3>
                </div>
                <div className={styles.content}>
                    <span>Invite your friends to make their transaction on my phone with your referral link.</span>
                    <span>1. Invite friends to register and complete my phone transaction to get $10 cash rewards.</span>
                    <span>2. If you have invited 2 or more users, you can upgrade to brand ambassador and will be eligible to earn more money.</span>
                    <span>3. When you become a brand ambassador we&lsquo;ll give you an extra $10 reward.</span>
                </div>

                <div className={styles.card}>
                    <div className={styles.header}>
                        <div className={styles.progress}>
                            <span>Your progress: 0%</span>
                            <span>Your progress: 50%</span>
                            <span>Your progress: 100%</span>
                        </div>
                        <div className={styles.slide}>
                            <span className={styles.circle} />
                            <span className={styles.circle} />
                            <span className={styles.circle} />
                        </div>
                        <div className={styles.progress}>
                            <span>Registered successfully</span>
                            <span>Invite 1 friend</span>
                            <span>Invite 2 friends</span>
                        </div>
                    </div>
                    <div className={styles.card_content}>
                        <div className={styles.input}>
                            <input type='checkbox' name='terms' id='terms' />
                            <label htmlFor='terms'>I agree to our Terms & Condition of Brand Ambassador.</label>
                        </div>
                        <button>Become A Brand Ambassador</button>

                        <p>
                            The $10 reward is only applicable when you become a brand ambassador for the first time. <br /> Subsequent exits and
                            re-entries will not have this bonus.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    ) 
}
export default BrandAmbassador
