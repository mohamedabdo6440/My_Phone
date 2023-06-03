// local modules
import styles from '@/styles/components/admin/drawer.module.scss'
import { NextPage } from 'next'
import React from 'react'

interface DrawerProps {
    open?: boolean
    children: React.ReactNode
    ref: React.ForwardedRef<HTMLDivElement>
    handleOpen?: () => void
}

// eslint-disable-next-line react/display-name
const Drawer: NextPage<DrawerProps> = React.forwardRef(({ open, children, handleOpen }, ref) => {
    return (
        <div className={`${styles.container} ${open ? styles.drawer_open : null}`}>
            <div ref={ref} className={styles.drawer}>
                <div className={styles.close} onClick={handleOpen} />
                {children}
            </div>
        </div>
    )
})

export default Drawer
