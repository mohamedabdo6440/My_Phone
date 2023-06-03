import AdminLayout from "@/components/admin/AdminLayout";
import EditTable from "@/components/common/orders/table/edit-table/EditTable";
import PageTitle from "@/components/common/PageTitle";
import MOCK_DATA from "@/mock";
import { NextPageWithLayout } from "@/pages/_app";
import styles from "@/styles/components/admin/orders/edit-order.module.scss";
import { MdDownload, MdPrint } from "react-icons/md";

const AwaitingOrders: NextPageWithLayout = () => {
  return (
    <>
      <PageTitle title="Edit Order | Admin Panel" />
      <main className={styles.container}>
        <div className={styles.header}>
          <h3>Order #</h3>
          <div className={styles.buttonsContainer}>
            <button>
              Delivery Note <MdPrint size={20} />
            </button>
            <button>
              Order Form <MdDownload size={20} />
            </button>
            <button>
              Order Instructions <MdDownload size={20} />
            </button>
          </div>
        </div>

        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.customerInfoContainer}>
              <h3>Customer Info</h3>
              <div className={styles.customerInfo}>
                <p className={styles.customerName}>JJ Brown</p>
                <p className={styles.customerNumber}>(541) 350-4896</p>
              </div>
            </div>
            <div className={styles.shippingInfoContainer}>
              <h3>Shipping Info</h3>
              <div className={styles.shippingInfo}>
                <button className={styles.editButton}>Edit</button>
                <p className={styles.customerName}>JJ Brown</p>
                <address className={styles.addressContainer}>
                  3126 west thomas road suite 104 phoenix az 85017 us
                  <p className={styles.customerNumber}>(541) 350-4896</p>
                </address>
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <h3>Billing Info</h3>
            <div className={styles.detailsContainer}>
              <strong className={styles.label}>Total Amount: </strong>
              <span className={styles.value}>123</span>
            </div>
            <div className={styles.detailsContainer}>
              <strong className={styles.label}>Order Status: </strong>
              <span className={styles.value}>Waiting Shipment</span>
            </div>
            <div className={styles.detailsContainer}>
              <strong className={styles.label}>Order Date: </strong>
              <span className={styles.value}>Nov/23/2022 11:10pm</span>
            </div>
            <div className={styles.detailsContainer}>
              <strong className={styles.label}>Due Date: </strong>
              <span className={styles.value}>Dec/23/2022 12:10pm</span>
            </div>
          </div>
          <div className={styles.card}>
            <h3>Payment Info</h3>
            <button className={styles.editButton}>Edit</button>
            <div className={styles.detailsContainer}>
              <strong className={styles.label}>Payment Method: </strong>
              <span className={styles.value}>Cash App</span>
            </div>
            <div className={styles.detailsContainer}>
              <strong className={styles.label}>Cash App Address: </strong>
              <span className={styles.value}>123</span>
            </div>
          </div>
          <div className={styles.card}>
            <h3>Shipping Label</h3>
            <span>
              <label>Select Option:</label>
              <div className={styles.shippingLabelContainer}>
                <select className={styles.selectContainer}>
                  <option>Print A Prepaid Label</option>
                  <option>Send Me A Box and Label</option>
                  <option>I will ship and send you tracking</option>
                  <option>We come to you</option>
                  <option>Meet @ Phone Store</option>
                  <option>Meet @ Coffee Shop</option>
                </select>
                <button className={styles.saveButton}>Save</button>
              </div>
            </span>
            <div className={styles.containerButton}>
              <button className={styles.createShipmentButton}>
                Create Shipment
              </button>
              <button className={styles.shippingInfoButton}>
                Shipping Info
              </button>
            </div>
          </div>
        </div>
      </main>

      <main className={styles.container}>
        <div className={styles.header}>
          <h3>Order Item(s)</h3>
        </div>
        <div className={styles.orderItemContainer}>
          <div>
            <EditTable data={MOCK_DATA} />
          </div>
        </div>
      </main>
      <main className={styles.container}>
        <div className={styles.header}>
          <h3>Order Status</h3>
        </div>
        <div className={styles.orderStatusContainer}>
          <div className={styles.selectStatusContainer}>
            <label>Order Status</label>
            <select className={styles.selectStatus}>
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
          </div>
          <div className={styles.selectTemplateContainer}>
            <label>Email Template:</label>
            <select className={styles.selectTemplate}>
              <option>Choose Template</option>
              <option>Awaiting Shipment</option>
            </select>
          </div>
        </div>
      </main>
      <main className={styles.container}>
        <div className={styles.header}>
          <h3>Order notes & Order Status History</h3>
        </div>
        <div className={styles.orderNotesContainer}>
          <h3>Order Notes</h3>
          <textarea className={styles.textArea} rows={10} />
          <button className={styles.saveButton}>Save</button>

          <div>
            <h3>Order Status History</h3>
            <p>Nov/23/2022 - Your order has been created.</p>
            <p>
              There may be a problem with tracking number # 391017552352, please
              check and contact us to see if we can assist.
            </p>
            <p>Nov/22/2022 - Your order has been created.</p>
          </div>
        </div>
      </main>
    </>
  );
};

AwaitingOrders.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AwaitingOrders;
