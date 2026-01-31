"use client";

import { MoveDownIcon, MoveUpIcon, MoveVerticalIcon } from "@icons/Move";
import {
  flexRender,
  RowData,
  SortingState,
  Table as TanStackTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { memo } from "react";

import styles from "./table.module.scss";

interface TableProps<TData extends RowData> {
  table: TanStackTable<TData>;
  sorting?: SortingState;
  isLoading?: boolean;
  skeletonRows?: number;
  emptyState?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  size?: "sm" | "md";
  onRowClick?: (row: TData) => void;
  dataLength?: number;
  searchQuery?: string;
}

export function Table<TData extends RowData>({
  table,
  sorting = [],
  isLoading = false,
  skeletonRows = 5,
  emptyState,
  className,
  containerClassName,
  size = "md",
  onRowClick,
}: TableProps<TData>) {
  const rows = table.getRowModel().rows;

  const renderEmptyState = () => {
    if (emptyState)
      return <div className={styles.emptyState}>{emptyState}</div>;
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateIcon}>📊</div>
        <p className={styles.emptyStateText}>No data available</p>
      </div>
    );
  };

  const renderSkeletonRows = () =>
    Array.from({ length: skeletonRows }).map((_, index) => (
      <tr key={`skeleton-${index}`} className={styles.skeletonRow}>
        {table.getAllColumns().map((column, colIndex) => (
          <td key={`skeleton-cell-${colIndex}`} className={styles.skeletonCell}>
            <div className={styles.skeletonLine} />
          </td>
        ))}
      </tr>
    ));

  if (!isLoading && rows.length === 0)
    return (
      <div className={clsx(styles.tableContainer, containerClassName)}>
        {renderEmptyState()}
      </div>
    );

  const getSortIcon = (columnId: string) => {
    const sortState = sorting.find((s) => s.id === columnId);
    if (!sortState) return <MoveVerticalIcon width={16} height={12} />;
    return sortState.desc ? (
      <MoveDownIcon width={16} height={12} />
    ) : (
      <MoveUpIcon width={16} height={12} />
    );
  };

  return (
    <div className={clsx(styles.tableContainer, containerClassName)}>
      <table
        className={clsx(styles.table, styles[`table--${size}`], className)}
      >
        <thead className={styles.tableHeader}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={clsx(
                    styles.tableHeaderCell,
                    header.column.getCanSort() && styles.sortable,
                  )}
                  style={{ width: header.getSize() }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className={styles.headerCellContent}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {header.column.getCanSort() && (
                      <span className={styles.sortIndicator}>
                        {getSortIcon(header.column.id)}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className={styles.tableBody}>
          {isLoading
            ? renderSkeletonRows()
            : rows.map((row) => (
                <tr
                  key={row.id}
                  className={clsx(
                    styles.tableRow,
                    onRowClick && styles.clickableRow,
                  )}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.tableCell}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export const MemoizedTable = memo(Table) as typeof Table;
