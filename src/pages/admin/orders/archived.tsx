import AdminLayout from "@/components/admin/AdminLayout";
import ArchiveTable from "@/components/common/orders/table/archive/ArchiveTable";
import PageTitle from "@/components/common/PageTitle";
import MOCK_DATA from "@/mock";
import { NextPageWithLayout } from "@/pages/_app";
import styles from "@/styles/components/admin/orders/archived-orders.module.scss";
import { MdClose, MdSearch } from "react-icons/md";

const ArchivedOrders: NextPageWithLayout = () => {
  return (
    <>
      <PageTitle title="Archive Orders | Admin Panel" />
      <main className={styles.container}>
        <div className={styles.header}>
          <h4>Archive Orders</h4>
          <button>+ Add New</button>
        </div>

        <div className={styles.fieldContainer}>
          <input
            className={styles.inputContainer}
            placeholder="Order ID, Username"
          />
          <input className={styles.inputContainer} type="date" />
          <input className={styles.inputContainer} type="date" />
          <select className={styles.inputContainer}>
            <option>- Status -</option>
            <option>Waiting Shipment</option>
            <option>Shipped</option>
            <option>Shipment Problem</option>
            <option>Returned to Sender</option>
            <option>Delivered</option>
            <option>Processing</option>
            <option>Approved</option>
            <option>Completed</option>
            <option>Expired</option>
            <option>Cancelled</option>
          </select>
          <select className={styles.inputContainer}>
            <option>- Shipping Method -</option>
            <option>Meet @ Phone Store</option>
            <option>Print a Prepaid Label</option>
          </select>
          <select className={styles.inputContainer}>
            <option>- Payment Method -</option>
            <option>Paid</option>
            <option>Unpaid</option>
          </select>
          <div className={styles.actionsContainer}>
            <button className={styles.searchButton}>
              Search
              <MdSearch size={20} />
            </button>
            <button className={styles.bulkArchiveButton}>
              <MdClose size={20} />
              Bulk Remove
            </button>
            <button className={styles.bulkUndoButton}>Bulk Undo</button>
          </div>
        </div>

        <div className={styles.dataGridContainer}>
          <ArchiveTable data={MOCK_DATA} />
        </div>
      </main>
    </>
  );
};
ArchivedOrders.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default ArchivedOrders;
