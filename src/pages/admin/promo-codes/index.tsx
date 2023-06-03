// local modules
import AdminLayout from '@/components/admin/AdminLayout'
import DataGrid, { DataRowDef } from '@/components/admin/DataGrid'
import { NextPageWithLayout } from '@/pages/_app'
import styles from '@/styles/pages/admin/promoCode.module.scss'
import { MdAdd } from 'react-icons/md'

const PromoCodes: NextPageWithLayout = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Promo Codes</h2>
                <button>
                    <MdAdd />
                    <span>Add new</span>
                </button>
            </div>
            <DataGrid checkboxSelection columns={columns} rows={rows} />
        </div>
    )
}

const columns = [
    {
        field: 'id' as const,
        headerName: 'Order ID',
    },
    {
        field: 'promoCode' as const,
        headerName: 'Promo Code',
    },
    {
        field: 'fromDate' as const,
        headerName: 'From Date',
    },
    {
        field: 'expireDate' as const,
        headerName: 'Expire Date',
    },
    {
        field: 'discount' as const,
        headerName: 'Discount',
    },
    {
        field: 'action' as const,
        headerName: 'Action',
    },
]

const rows: DataRowDef<typeof columns> = [
    {
        id: '1',
        promoCode: 'launch',
        fromDate: '10/22/2019',
        expireDate: '12/22/2019',
        discount: '10%',
        action: 'Delete',
    },
    {
        id: '2',
        promoCode: 'launch-two',
        fromDate: '10/22/2020',
        expireDate: '12/22/2020',
        discount: '10%',
        action: 'Delete',
    },
    {
        id: '3',
        promoCode: 'flat',
        fromDate: '10/27/2019',
        expireDate: '12/30/2019',
        discount: '10$',
        action: 'Delete',
    },
    {
        id: '9',
        promoCode: 'thanksgiving',
        fromDate: '11/26/2019',
        expireDate: '12/04/2019',
        discount: '11%',
        action: 'Delete',
    },
    {
        id: '11',
        promoCode: 'Get15',
        fromDate: '12/24/2019',
        expireDate: '12/30/2019',
        discount: '$15',
        action: 'Delete',
    },
    {
        id: '8',
        promoCode: 'PLUS15',
        fromDate: '12/04/2019',
        expireDate: '12/24/2019',
        discount: '$5',
        action: 'Delete',
    },
    {
        id: '10',
        promoCode: 'ChristmasTime',
        fromDate: '12/04/2019',
        expireDate: '12/30/2019',
        discount: '$10',
        action: 'Delete',
    },
    {
        id: '13',
        promoCode: 'Spring2020',
        fromDate: '12/24/2019',
        expireDate: '12/30/2019',
        discount: '$5',
        action: 'Delete',
    },
    {
        id: '6',
        promoCode: '15BUCKSNY',
        fromDate: '11/01/2019',
        expireDate: '01/02/2020',
        discount: '$15',
        action: 'Delete',
    },
    {
        id: '7',
        promoCode: '1ORDER5',
        fromDate: '12/03/2019',
        expireDate: '01/04/2020',
        discount: '$5',
        action: 'Delete',
    },
]

PromoCodes.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>
}

export default PromoCodes
