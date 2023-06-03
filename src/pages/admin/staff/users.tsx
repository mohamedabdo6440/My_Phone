import AdminLayout from '@/components/admin/AdminLayout'
import DataGrid, { DataRowDef } from '@/components/admin/DataGrid'
import { NextPageWithLayout } from '@/pages/_app'
import styles from '@/styles/pages/admin/usersStaff.module.scss'
import { FaRegTrashAlt } from 'react-icons/fa'
import { MdAdd, MdEdit } from 'react-icons/md'

const Users: NextPageWithLayout = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Users Staff</h2>
                <button>
                    <MdAdd />
                    <span>Add new</span>
                </button>
            </div>
            <DataGrid columns={columns} rows={rows} />
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
    { field: 'username' as const, headerName: 'Username' },
    { field: 'email' as const, headerName: 'Email' },
    { field: 'group' as const, headerName: 'Staff' },
    { field: 'actions' as const, headerName: 'Actions' },
]

const rows: DataRowDef<typeof columns> = [
    {
        username: 'staff1',
        email: 'staff1@myphone.ai',
        actions: <Actions />,
        group: 'Staff',
    },
    {
        username: 'staff2',
        email: 'staff2@myphone.ai',
        actions: <Actions />,
        group: 'Staff',
    },
    {
        username: 'staff3',
        email: 'staff3@myphone.ai',
        actions: <Actions />,
        group: 'Staff',
    },
]

Users.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>
}

export default Users
