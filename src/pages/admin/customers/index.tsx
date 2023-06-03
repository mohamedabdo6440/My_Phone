import AdminLayout from '@/components/admin/AdminLayout'
import DataGrid, { DataRowDef } from '@/components/admin/DataGrid'
import { NextPageWithLayout } from '@/pages/_app'
import styles from '@/styles/pages/admin/customers.module.scss'
import { FaRegTrashAlt } from 'react-icons/fa'
import { MdAdd, MdEdit, MdSearch } from 'react-icons/md'

const Customers: NextPageWithLayout = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Customers</h2>
                <button>
                    <MdAdd />
                    <span>Add new</span>
                </button>
            </div>
            <form className={styles.form}>
                <input type='text' placeholder='Name or Email' />
                <button>
                    <span>Search</span>
                    <MdSearch />
                </button>
            </form>
            <DataGrid checkboxSelection {...{ columns, rows }} />
        </div>
    )
}

const Actions = () => {
    return (
        <div className={styles.actions}>
            <button>Active</button>
            <MdEdit className={styles.edit} />
            <FaRegTrashAlt className={styles.trash} />
        </div>
    )
}

const columns = [
    {
        field: 'firstName' as const,
        headerName: 'First Name',
    },
    {
        field: 'lastName' as const,
        headerName: 'Last Name',
    },
    {
        field: 'email' as const,
        headerName: 'Email',
    },
    {
        field: 'totalTradeIn' as const,
        headerName: 'Total Trade-In',
    },
    {
        field: 'phone' as const,
        headerName: 'Phone',
    },
    {
        field: 'date' as const,
        headerName: 'Date',
    },
    {
        field: 'type' as const,
        headerName: 'Type',
    },
    {
        field: 'actions' as const,
        headerName: 'Actions',
    },
]

const rows: DataRowDef<typeof columns> = [
    {
        firstName: 'JJ',
        lastName: 'Brown',
        email: 'gjbism@gmail.com',
        totalTradeIn: '',
        phone: '09123456789',
        date: '11/02/2022',
        type: 'User',
        actions: <Actions />,
    },
]

Customers.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>
}

export default Customers
