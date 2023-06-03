import Image from 'next/image'

// local modules
import styles from '@/styles/pages/admin/login.module.scss'

// local static files
import logo from '@/images/web_light_myphone.png'

const Signin = () => {
    return (
        <div className={styles.container}>
            <form>
                <div className={styles.logo}>
                    <Image src={logo} alt='Logo' />
                </div>
                <div className={styles.inputs}>
                    <input type='text' name='email' placeholder='Enter your email' />
                    <input type='password' name='password' placeholder='Enter your password' />
                </div>
                <button type='submit'>LOGIN</button>
                <div className={styles.footer}>
                    <strong>Don&lsquo;t have an account?</strong>
                    <strong>Forgot Password?</strong>
                </div>
            </form>
            <div className={`${styles.box} ${styles.box1}`} />
            <div className={`${styles.box} ${styles.box2}`} />
            <div className={`${styles.box} ${styles.box3}`} />
        </div>
    )
}

export default Signin
