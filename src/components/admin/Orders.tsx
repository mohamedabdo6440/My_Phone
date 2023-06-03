// local modules
import AdminLayout from '@/components/admin/AdminLayout'
import DataGrid, { DataRowDef } from '@/components/admin/DataGrid'
import { NextPageWithLayout } from '@/pages/_app'
import styles from '@/styles/components/admin/orders.module.scss'
import { FaRegTrashAlt } from 'react-icons/fa'
import { MdAdd, MdEdit, MdSearch } from 'react-icons/md'

interface OrdersProps {
    title: string
}

const Orders: NextPageWithLayout<OrdersProps> = ({ title }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>{title}</h2>
                <button>
                    <MdAdd />
                    <span>Add new</span>
                </button>
            </div>
            <form className={styles.form}>
                <input type='text' placeholder='Order Id' />
                <input type='text' placeholder='Customer Name' />
                <div className={styles.date}>
                    <label htmlFor='fromDate'>From Date</label>
                    <input type='date' placeholder='From Date' />
                </div>
                <div className={styles.date}>
                    <label htmlFor='toDate'>To Date</label>
                    <input type='date' placeholder='To Date' />
                </div>
                <select name='status'>
                    <option value=''>Status</option>
                    <option value=''>Awaiting</option>
                    <option value=''>Completed</option>
                    <option value=''>Archived</option>
                    <option value=''>Abandoned</option>
                </select>
                <button>
                    <span>Search</span>
                    <MdSearch />
                </button>
            </form>

            <DataGrid checkboxSelection columns={columns} rows={rows} />
        </div>
    )
}

const Actions = () => {
    return (
        <div className={styles.actions}>
            <MdEdit className={styles.edit} />
            <FaRegTrashAlt className={styles.trash} />
        </div>
    )
}

const columns = [
    {
        field: 'id' as const,
        headerName: 'Order ID',
    },
    {
        field: 'customer' as const,
        headerName: 'Customer',
    },
    {
        field: 'date' as const,
        headerName: 'Date',
    },
    {
        field: 'qty' as const,
        headerName: 'QTY',
    },
    {
        field: 'price' as const,
        headerName: 'Price',
    },
    {
        field: 'paymentMethod' as const,
        headerName: 'Payment Method',
    },
    {
        field: 'status' as const,
        headerName: 'Status',
    },
    {
        field: 'actions' as const,
        headerName: 'Actions',
    },
]

const rows: DataRowDef<typeof columns> = [
    {
        status: 'completed',
        id: 'qrlvlqc4',
        customer: 'JJ Brown',
        date: 'Oct 20, 2022',
        price: 560,
        paymentMethod: 'Cash',
        actions: <Actions />,
        qty: 2,
    },
    {
        id: 'qrlvlqc4',
        customer: 'JJ Brown',
        date: 'Oct 20, 2022',
        qty: 2,
        price: 560,
        paymentMethod: 'Cash',
        status: 'completed',
        actions: <Actions />,
    },
]

Orders.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>
}

export default Orders
