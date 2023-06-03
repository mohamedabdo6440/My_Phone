import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import { GoGitBranch } from "react-icons/go";
import {
  MdAssignment,
  MdAssignmentTurnedIn,
  MdBook,
  MdCalendarViewMonth,
  MdPauseCircleOutline,
  MdTabletAndroid,
  MdToggleOff,
} from "react-icons/md";
// local modules
import AdminLayout from "@/components/admin/AdminLayout";
import styles from "@/styles/pages/admin/dashboard.module.scss";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
type AdminProps = InferGetServerSidePropsType<typeof getServerSideProps>;
type TAuth = boolean;

const Admin: NextPageWithLayout<AdminProps> = ({ auth }) => {
  const router = useRouter();

  if (!auth) router.push("/admin/signin");

  return (
    <div className={styles.container} style={{ display: "flex" }}>
      <div className={styles.title}>
        <h1>Dashboard</h1>
      </div>
      <div className={styles.card_list}>
        <div className={styles.card}>
          <div className={styles.header}>
            <strong>Orders</strong>
            <button>
              <p>+</p>
              <span>Add New</span>
            </button>
          </div>

          <div className={styles.content}>
            <div className={styles.wrapper}>
              <strong className={styles.subtitle}>Awaiting Orders</strong>
              <b className={styles.value}>1</b>
              <span className={styles.icon}>
                <MdPauseCircleOutline />
              </span>
            </div>
            <div className={styles.wrapper}>
              <strong className={styles.subtitle}>Completed</strong>
              <b className={styles.value}>1</b>
              <span className={styles.icon}>
                <MdAssignmentTurnedIn />
              </span>
            </div>
            <div className={styles.wrapper}>
              <strong className={styles.subtitle}>Unpaid Orders</strong>
              <b className={styles.value}>1</b>
              <span className={styles.icon}>
                <MdBook />
              </span>
            </div>
            <div className={styles.wrapper}>
              <strong className={styles.subtitle}>Archive Orders</strong>
              <b className={styles.value}>1</b>
              <span className={styles.icon}>
                <MdAssignment />
              </span>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.header}>
            <strong>Devices Info</strong>
            <button>
              <p>+</p>
              <span>Add New</span>
            </button>
          </div>
          <div className={styles.content}>
            <div className={styles.wrapper}>
              <strong className={styles.subtitle}>Models</strong>
              <b className={styles.value}>562</b>
              <span className={styles.icon}>
                <MdCalendarViewMonth />
              </span>
            </div>
            <div className={styles.wrapper}>
              <strong className={styles.subtitle}>Brands</strong>
              <b className={styles.value}>18</b>
            </div>
            <div className={styles.wrapper}>
              <strong className={styles.subtitle}>Devices</strong>
              <b className={styles.value}>14</b>
              <span className={styles.icon}>
                <MdTabletAndroid />
              </span>
            </div>
            <div className={styles.wrapper}>
              <strong className={styles.subtitle}>Categories</strong>
              <b className={styles.value}>14</b>
              <span className={styles.icon}>
                <GoGitBranch />
              </span>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.header}>
            <strong>Statistics</strong>
            <div className={styles.dateSelectContainer}>
              <select>
                <option>All time</option>
                <option>Last month</option>
                <option>3 months</option>
                <option>6 months</option>
                <option>9 months</option>
              </select>
              <input
                placeholder="Custom Date"
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.wrapper}>
              <strong className={styles.subtitle}>Total Paid</strong>
              <strong className={styles.value}>0</strong>
              <span className={styles.icon}>
                <FaEquals />
              </span>
            </div>
            <div className={styles.wrapper}>
              <strong className={styles.subtitle}>Devices Returned</strong>
              <strong className={styles.value}>0</strong>

              <span className={styles.icon}>
                <BsFillArrowLeftCircleFill />
              </span>
            </div>
            <div className={styles.wrapper}>
              <strong className={styles.subtitle}>Total Orders</strong>
              <strong className={styles.value}>0</strong>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.header}>
            <strong>Customers</strong>
            <button>
              <p>+</p>
              <span>Add New</span>
            </button>
          </div>
          <div className={styles.content}>
            <div className={styles.wrapper}>
              <strong className={styles.subtitle}>Published</strong>
              <strong className={styles.value}>2</strong>
              <span className={styles.icon}>
                <MdToggleOff />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Admin.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps<{
  auth?: TAuth;
}> = async () => {
  return {
    props: {
      auth: true,
    },
  };
};

export default Admin;
