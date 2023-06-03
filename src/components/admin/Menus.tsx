import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { IconType } from 'react-icons/lib'
import {
    MdKeyboardArrowRight,
    MdMenuOpen,
    MdOutlineCategory,
    MdOutlineDevicesOther,
    MdOutlineFindInPage,
    MdOutlineFormatListNumberedRtl,
    MdOutlineHome,
    MdOutlineImportantDevices,
    MdOutlineInventory2,
    MdOutlineMail,
    MdOutlinePeople,
    MdOutlinePermDeviceInformation,
    MdOutlinePersonSearch,
    MdOutlineQrCode2,
    MdOutlineQuestionAnswer,
    MdOutlineSearch,
    MdOutlineSettings,
    MdOutlineShoppingBasket,
    MdOutlineSms,
    MdOutlineStickyNote2,
} from 'react-icons/md'
// local modules
import Collapse from '@/components/admin/Collapse'
import List, { ListItem } from '@/components/admin/List'
import styles from '@/styles/components/admin/menus.module.scss'

// local static files
import logo from '@/images/web_dark_myphone.png'

interface MenuItem {
    logo: IconType
    title: string
    collapse?: true
    open?: boolean
    href?: string
    submenus?: { title: string; href: string }[]
    id: any
}

const Menus = () => {
    const [items, setItems] = useState(menus)
    const router = useRouter()

    const handleItems = (payload: MenuItem) => {
        setItems(() => menus.map((item) => (item.id === payload.id ? { ...item, open: !payload.open } : item)))
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Image src={logo} alt='Logo' />
            </div>
            <div className={styles.search}>
                <MdOutlineSearch />
                <input type='text' placeholder='Search' />
            </div>
            <List>
                {items.map((item) =>
                    item.collapse ? (
                        <Collapse
                            key={item.id}
                            open={item.open}
                            onClose={() => handleItems(item)}
                            style={{ padding: 0 }}
                            header={
                                <div className={`${styles.menu} ${item.open ? styles.active : null}`}>
                                    <div className={styles.icon}>
                                        <item.logo />
                                    </div>
                                    <div className={styles.title}>{item.title}</div>
                                    <div className={styles.arrow}>
                                        <MdKeyboardArrowRight fontSize='1.2em' />
                                    </div>
                                </div>
                            }
                        >
                            <List>
                                {item.submenus?.map((sub) => (
                                    <ListItem style={{ padding: 0 }} key={sub.title} onClick={() => router.push(sub.href)}>
                                        <div className={styles.menu}>
                                            <div className={styles.title} style={{ fontSize: '0.75rem', paddingLeft: '2rem' }}>
                                                {sub.title}
                                            </div>
                                        </div>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    ) : (
                        <ListItem style={{ padding: 0 }} key={item.id} onClick={() => router.push(item.href!)}>
                            <div className={styles.menu}>
                                <div className={styles.icon}>
                                    <item.logo />
                                </div>
                                <div className={styles.title}>{item.title}</div>
                            </div>
                        </ListItem>
                    )
                )}
            </List>
        </div>
    )
}

const menus: MenuItem[] = [
    { logo: MdOutlineHome, title: 'Dashboard', id: '1', href: '/admin' },
    {
        logo: MdOutlineShoppingBasket,
        title: 'Orders',
        id: '2',
        collapse: true,
        open: false,
        submenus: [
            { title: 'Awaiting Orders', href: '/admin/orders/awaiting' },
            { title: 'Completed Orders', href: '/admin/orders/completed' },
            { title: 'Archived Orders', href: '/admin/orders/archived' },
            { title: 'Abandoned Orders', href: '/admin/orders/abandoned' },
        ],
    },
    { logo: MdOutlinePeople, title: 'Customers', id: '3', href: '/admin/customers' },
    { logo: MdOutlineInventory2, title: 'Inventory', id: '4', href: '/admin/inventory' },
    { logo: MdOutlineQrCode2, title: 'Promo Codes', id: '5', href: '/admin/promo-codes' },
    { logo: MdOutlineDevicesOther, title: 'Models', id: '6', href: '/admin/models' },
    { logo: MdOutlinePermDeviceInformation, title: 'Devices', id: '7', href: '/admin/devices' },
    { logo: MdOutlineImportantDevices, title: 'Brands', id: '8', href: '/admin/products' },
    { logo: MdOutlineCategory, title: 'Categories', id: '9', href: '/admin/categories' },
    {
        logo: MdOutlinePersonSearch,
        title: 'Staff Users',
        id: '10',
        collapse: true,
        open: false,
        submenus: [
            { title: 'Staff User(s)', href: '/admin/staff/users' },
            { title: 'Staff Group(s)', href: '/admin/staff/groups' },
        ],
    },
    {
        logo: MdOutlineQuestionAnswer,
        title: 'FAQS',
        id: '11',
        collapse: true,
        open: false,
        submenus: [
            { title: 'FAQs Groups', href: '/admin/faq/groups' },
            { title: 'FAQs', href: '/admin/faq' },
        ],
    },
    {
        logo: MdOutlineStickyNote2,
        title: 'Blog',
        id: '12',
        collapse: true,
        open: false,
        submenus: [
            { title: 'Blog', href: '/admin/blog' },
            { title: 'Categories', href: '/admin/categories' },
        ],
    },
    {
        logo: MdOutlineFormatListNumberedRtl,
        title: 'Forms',
        id: '13',
        collapse: true,
        open: false,
        submenus: [
            { title: 'Contacts', href: '/admin/forms/contacts' },
            { title: 'Reviews', href: '/admin/forms/reviews' },
            { title: 'Bulk Orders', href: '/admin/forms/bulk' },
            { title: 'Newsletters', href: '/admin/forms/newsletter' },
            { title: 'Quick Quotes', href: '/admin/forms/quotes' },
        ],
    },
    {
        logo: MdOutlineFindInPage,
        title: 'Pages',
        id: '14',
        collapse: true,
        open: false,
        submenus: [
            { title: 'System Page', href: '/admin/pages/system' },
            { title: 'Custom Page', href: '/admin/pages/custom' },
        ],
    },
    { logo: MdOutlineMail, title: 'Email Templates', id: '15', href: '/admin/email' },
    { logo: MdOutlineSms, title: 'Email/SMS History', id: '16', href: '/admin/sms' },
    { logo: MdMenuOpen, title: 'Menus', id: '17', href: '/admin/customers' },
    {
        logo: MdOutlineSettings,
        title: 'Settings',
        id: '18',
        collapse: true,
        open: false,
        submenus: [
            { title: 'General', href: '/admin/settings/general' },
            { title: 'Home Page', href: '/admin/settings/home' },
            { title: 'Order Status', href: '/admin/settings/status' },
            { title: 'Order Item Status', href: '/admin/settings/item' },
            { title: 'Store Locations', href: '/admin/settings/store' },
            { title: 'Order Complete Pages', href: '/admin/settings/complete' },
        ],
    },
]

export default Menus
