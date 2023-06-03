import styles from '@/styles/components/admin/list.module.scss'
import { CSSProperties } from 'react'

interface ListItemProps {
    children: React.ReactNode
    style?: CSSProperties
    onClick?: () => void
}

const List = ({ children }: ListItemProps) => {
    return <ul className={styles.container}>{children}</ul>
}

export const ListItem = ({ children, style, onClick }: ListItemProps) => {
    return (
        <li className={styles.list} style={style} onClick={onClick}>
            {children}
        </li>
    )
}

export default List
