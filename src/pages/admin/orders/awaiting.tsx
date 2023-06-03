import AdminLayout from "@/components/admin/AdminLayout";
import AwaitingTable from "@/components/common/orders/table/awaiting/AwaitingTable";
import PageTitle from "@/components/common/PageTitle";
import MOCK_DATA from "@/mock";
import { NextPageWithLayout } from "@/pages/_app";
import styles from "@/styles/components/admin/orders/awaiting-orders.module.scss";
import moment from "moment";
import { useState } from "react";
import { MdClear, MdSearch } from "react-icons/md";

const AwaitingOrders: NextPageWithLayout = () => {
  const [filterByText, setFilterByText] = useState<string>("");
  const [filterByDate, setFilterByDate] = useState("");
  const [filteredData, setFilteredData] = useState<any>(MOCK_DATA);
  const handleFilterData = () => {
    const FILTERED_DATE = moment(filterByDate).format("YYYY-DD-MM");
    if (filterByDate) {
      setFilteredData(
        MOCK_DATA.filter(
          (data) =>
            moment(data.fromDate).format("YYYY-DD-MM") === FILTERED_DATE ||
            moment(data.toDate).format("YYYY-DD-MM") === FILTERED_DATE
        )
      );
    } else {
      setFilteredData(
        MOCK_DATA.filter(
          (data) =>
            data.orderID.toLowerCase().includes(filterByText?.toLowerCase()) ||
            data.customerName
              .toLowerCase()
              .includes(filterByText?.toLowerCase())
        )
      );
    }
  };
  return (
    <>
      <PageTitle title="Awaiting orders | Admin Panel" />
      <main className={styles.container}>
        <div className={styles.header}>
          <h4>Awaiting Orders</h4>
          <button>+ Add New</button>
        </div>

        <div className={styles.fieldContainer}>
          <input
            className={styles.inputContainer}
            placeholder="Order ID, Username"
            onChange={(e) => setFilterByText(e.target.value)}
          />
          <input
            className={styles.inputContainer}
            type="date"
            onChange={(e) => setFilterByDate(e.target.value)}
          />
          <input
            className={styles.inputContainer}
            type="date"
            onChange={(e) => setFilterByDate(e.target.value)}
          />
          <select className={styles.inputContainer}>
            <option>- Shipping Method -</option>
            <option>Meet @ Phone Store</option>
            <option>Print a Prepaid Label</option>
          </select>
          <div className={styles.buttonsContainer}>
            <button onClick={handleFilterData} className={styles.searchButton}>
              Search
              <MdSearch size={20} />
            </button>
            <button
              onClick={handleFilterData}
              className={styles.bulkArchiveButton}
            >
              Bulk Archive
            </button>
            {filterByText && (
              <button onClick={handleFilterData} className={styles.clearButton}>
                Clear
                <MdClear size={20} />
              </button>
            )}
          </div>
        </div>
        <div className={styles.dataGridContainer}>
          <AwaitingTable data={filteredData} />
        </div>
      </main>
    </>
  );
};

AwaitingOrders.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AwaitingOrders;
