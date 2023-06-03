import React, { CSSProperties } from 'react'

// local modules

import styles from '@/styles/components/admin/collapse.module.scss'

interface CollapseProps {
    style?: CSSProperties
    open?: boolean
    children: React.ReactNode
    header: React.ReactNode | string
    onClose: () => void
}

const Collapse = ({ children, header, open, onClose, style }: CollapseProps) => {
    // const [isOpen, setIsOpen] = useState(false)

    // const handleOpen = () => {
    //     setIsOpen(!isOpen)
    // }

    return (
        <React.Fragment>
            <li className={styles.title} style={style} onClick={onClose}>
                {header}
            </li>
            <div className={`${styles.content} ${open ? styles.open : null}`}>{children}</div>
        </React.Fragment>
    )
}

export default Collapse
