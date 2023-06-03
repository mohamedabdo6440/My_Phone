import styles from '@/styles/components/admin/dataGrid.module.scss'
import { useEffect, useState } from 'react'

export interface DataColDef {
    field: string
    headerName: string
    width?: number | string
}

export type DataRowDef<T extends DataColDef[]> = Record<T[number]['field'], any>[]

interface DataGridProps<T extends DataColDef[]> {
    // rows: DataRowDef<T> | Record<T[number]['field'], any>[]
    rows: DataRowDef<T>
    columns: T
    checkboxSelection?: true
}

const objKeys = <Obj extends object>(obj: Obj): (keyof Obj)[] => {
    return Object.keys(obj) as (keyof Obj)[]
}

const DataGrid = <T extends DataColDef[]>({ columns, rows, checkboxSelection }: DataGridProps<T>) => {
    const [checkAll, setCheckAll] = useState(false)
    const [check, setCheck] = useState<string[]>([])

    const sortValues = columns.map((col) => col.field)

    useEffect(() => {
        if (checkAll) {
            setCheck(() => {
                return rows.map((_, index) => String(index))
            })
        } else {
            setCheck([])
        }
    }, [checkAll, rows])

    const handleCheckAll = () => {
        setCheckAll(!checkAll)
    }

    const handleCheckSingle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { id, checked } = e.target

        setCheck((checks) => {
            if (!checked) {
                return checks.filter((check) => check !== id)
            } else {
                return [...checks, id]
            }
        })
    }

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead className={styles.header}>
                    <tr
                        className={styles.row}
                        style={{
                            gridTemplateColumns: `${checkboxSelection ? '30px' : ''} repeat(${columns.length}, 1fr`,
                        }}
                    >
                        {checkboxSelection && (
                            <th className={styles.checkbox}>
                                <input type='checkbox' onChange={handleCheckAll} />
                            </th>
                        )}

                        {columns.map((column) => (
                            <th key={column.field} style={{ width: column.width }}>
                                {column.headerName}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={styles.body}>
                    {rows.map((row, index) => (
                        <tr
                            key={index}
                            className={styles.row}
                            style={{ gridTemplateColumns: `${checkboxSelection ? '30px' : ''} repeat(${columns.length}, 1fr)` }}
                        >
                            {checkboxSelection && (
                                <td className={styles.checkbox}>
                                    <input type='checkbox' id={String(index)} checked={check.includes(String(index))} onChange={handleCheckSingle} />
                                </td>
                            )}
                            {objKeys(row)
                                .sort((a, b) => sortValues.indexOf(a) - sortValues.indexOf(b))
                                .map((key, i) => (
                                    <td key={key} style={{ width: columns[i].width }}>
                                        {row[key]}
                                    </td>
                                ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DataGrid
