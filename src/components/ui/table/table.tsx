"use client";

import React from "react";
import {
  Table as TanStackTable,
  flexRender,
  RowData,
} from "@tanstack/react-table";
import clsx from "clsx";
import styles from "./table.module.scss";
import { ChevronDown, ChevronRight, Loader2 } from "lucide-react";

interface TableProps<TData extends RowData> {
  table: TanStackTable<TData>;
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  size?: "sm" | "md" | "lg";
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  showHeader?: boolean;
  onRowClick?: (row: TData) => void;
}

export function Table<TData extends RowData>({
  table,
  isLoading = false,
  emptyState,
  className,
  containerClassName,
  size = "md",
  striped = true,
  bordered = true,
  hoverable = true,
  showHeader = true,
  onRowClick,
}: TableProps<TData>) {
  const rows = table.getRowModel().rows;

  const renderEmptyState = () => {
    if (emptyState) {
      return <div className={styles.emptyState}>{emptyState}</div>;
    }

    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateIcon}>📊</div>
        <p className={styles.emptyStateText}>No data available</p>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className={clsx(styles.tableContainer, containerClassName)}>
        <div className={styles.loadingState}>
          <Loader2 className={styles.loadingSpinner} />
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  if (rows.length === 0 && !isLoading) {
    return (
      <div className={clsx(styles.tableContainer, containerClassName)}>
        {renderEmptyState()}
      </div>
    );
  }

  return (
    <div className={clsx(styles.tableContainer, containerClassName)}>
      <table
        className={clsx(
          styles.table,
          styles[`table--${size}`],
          striped && styles.tableStriped,
          bordered && styles.tableBordered,
          hoverable && styles.tableHoverable,
          className,
        )}
      >
        {showHeader && (
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
                    style={{
                      width: header.getSize(),
                      minWidth: header.column.columnDef.minSize,
                      maxWidth: header.column.columnDef.maxSize,
                    }}
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
                          {{
                            asc: <ChevronDown className={styles.sortIcon} />,
                            desc: <ChevronDown className={styles.sortIcon} />,
                          }[header.column.getIsSorted() as string] ?? (
                            <div className={styles.sortPlaceholder} />
                          )}
                        </span>
                      )}
                    </div>
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={styles.resizer}
                        data-resizing={header.column.getIsResizing()}
                      />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        )}

        <tbody className={styles.tableBody}>
          {rows.map((row) => (
            <React.Fragment key={row.id}>
              <tr
                className={clsx(
                  styles.tableRow,
                  onRowClick && styles.clickableRow,
                )}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={styles.tableCell}
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>

              {/* Expanded sub-rows */}
              {row.getIsExpanded() && row.subRows.length > 0 && (
                <tr className={styles.expandedRow}>
                  <td colSpan={row.getVisibleCells().length}>
                    <div className={styles.expandedContent}>
                      {row.subRows.map((subRow) => (
                        <Table
                          key={subRow.id}
                          table={table}
                          size={size}
                          striped={striped}
                          bordered={bordered}
                          hoverable={hoverable}
                          showHeader={false}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
