import React from "react";

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { MdDelete } from "react-icons/md";
import styles from "./edit-table.module.scss";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

function EditTable({ data }: { data: any }) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<any, any>[]>(
    () => [
      {
        header: () => <span className={styles.header}>Item ID</span>,
        accessorKey: "orderID",
        cell: (info) => (
          <div className={styles.textData}>{info.getValue()}</div>
        ),
      },
      {
        header: () => <span className={styles.header}>Item(s)</span>,
        accessorKey: "customerName",
        cell: (info) => (
          <div className={styles.textData}>
            {info.getValue()}

            <div className={styles.actionsContainer}>
              <button className={styles.editButton}>Edit</button>
              &nbsp;
              <button className={styles.printLabelButton}>Print Label</button>
            </div>
          </div>
        ),
      },
      {
        header: () => <span className={styles.header}>IMEI / SN</span>,
        accessorKey: "fromDate",
        cell: () => (
          <div className={styles.textData}>
            <input />
            <button className={styles.checkButton}>Check</button>
          </div>
        ),
      },
      {
        enableColumnFilter: false,
        header: () => <span className={styles.header}>Image</span>,
        accessorKey: "actions",
        cell: () => (
          <div className={styles.actionsContainer}>
            <button className={styles.addMediaButton}>Add Media</button>
            &nbsp;
            <button className={styles.checkDeviceButton}>Check Device</button>
          </div>
        ),
      },

      {
        header: () => <span className={styles.header}>Item Status</span>,
        accessorKey: "status",
        cell: () => (
          <div className={styles.selectContainer}>
            <select className={styles.select}>
              <option>Awaiting Item(s)</option>
              <option>Checked</option>
              <option>Absent</option>
              <option>Price is reduced</option>
              <option>Price is declined</option>
              <option>Price is accepted</option>
              <option>Returned</option>
              <option>Paid</option>
            </select>
          </div>
        ),
      },
      {
        header: () => <span className={styles.header}>Price</span>,
        accessorKey: "price",
        cell: (info) => (
          <div className={styles.textData}>{info.getValue()}</div>
        ),

        enableColumnFilter: false,
      },
      {
        enableColumnFilter: false,
        header: () => <span className={styles.header}>Actions</span>,
        accessorKey: "actions",
        cell: () => (
          <div className={styles.actions}>
            <MdDelete size={20} className={styles.action} />
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            <div className={styles.tableHeader}>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>

                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <div className={styles.amount}>
          <strong style={{ textAlign: "right" }}>
            Sell Order Total: &emsp; &emsp; &emsp; Php 230
          </strong>
          <button className={styles.updateButton}>Update</button>
        </div>
        <small className={styles.reminder}>
          Updates item status, does not email customer
        </small>
      </div>
    </div>
  );
}

export default EditTable;
