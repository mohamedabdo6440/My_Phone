import { FaUserCircle } from 'react-icons/fa'

// local modules
import styles from '@/styles/components/admin/appBar.module.scss'

interface AppbarProps {
    handleClick: () => void
}

const Appbar = ({ handleClick }: AppbarProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.burger} onClick={handleClick}>
                <span className={styles.line} />
                <span className={styles.line} />
                <span className={styles.line} />
            </div>
            <div className={styles.nav}>
                <div className={styles.profile}>
                    <FaUserCircle />
                </div>
            </div>
        </div>
    )
}

export default Appbar
