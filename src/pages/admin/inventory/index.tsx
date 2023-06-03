import AdminLayout from "@/components/admin/AdminLayout";
import DataGrid, { DataRowDef } from "@/components/admin/DataGrid";
import { NextPageWithLayout } from "@/pages/_app";
import styles from "@/styles/pages/admin/inventory.module.scss";

const Inventory: NextPageWithLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <form className={styles.form}>
          {/* <select name="brand" id="brand">
            {brands.map((product) => (
              <option key={brand.value} value={brand.value}>
                {brand.name}
              </option>
            ))}
          </select> */}
          <select name="model" id="model">
            {models.map((model) => (
              <option key={model.value} value={model.value}>
                {model.name}
              </option>
            ))}
          </select>
          <select name="storage" id="storage">
            {storages.map((storage) => (
              <option key={storage.value} value={storage.value}>
                {storage.name}
              </option>
            ))}
          </select>
          <select name="carrier" id="carrier">
            {carriers.map((carrier) => (
              <option key={carrier.value} value={carrier.value}>
                {carrier.name}
              </option>
            ))}
          </select>
          <select name="esn" id="esn">
            {esn.map((esn) => (
              <option key={esn.value} value={esn.value}>
                {esn.name}
              </option>
            ))}
          </select>
        </form>
      </div>

      <DataGrid checkboxSelection columns={columns} rows={rows} />
    </div>
  );
};

const brands = [
  { name: "IPhone", value: "iphone" },
  { name: "Samsung", value: "samsung" },
  { name: "Macbook", value: "macbook" },
  { name: "Watch", value: "watch" },
  { name: "Airpod", value: "airpod" },
  { name: "iPad", value: "ipad" },
];

const models = [{ name: "IPhone", value: "iphone" }];
const storages = [{ name: "IPhone", value: "iphone" }];
const carriers = [{ name: "IPhone", value: "iphone" }];
const esn = [{ name: "IPhone", value: "iphone" }];

const columns = [
  {
    field: "id" as const,
    headerName: "ID",
  },
  {
    field: "orderID" as const,
    headerName: "Order ID",
  },
  {
    field: "brand" as const,
    headerName: "Brand",
  },
  {
    field: "model" as const,
    headerName: "Model",
  },
  {
    field: "condition" as const,
    headerName: "Condition",
  },
  {
    field: "paid" as const,
    headerName: "Paid",
  },
  {
    field: "bonus" as const,
    headerName: "Bonus",
  },
  {
    field: "action" as const,
    headerName: "Action",
  },
];

const rows: DataRowDef<typeof columns> = [
  {
    id: "1",
    orderID: "001",
    brand: "iPhone",
    model: "XS Max",
    condition: "Brand New",
    paid: "full",
    bonus: "",
    action: "Delete",
  },
];

Inventory.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Inventory;
