"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@icons/Chevron";
import { Button } from "@ui/Button";
import clsx from "clsx";

import styles from "./table.module.scss";

interface TableFooterProps {
  /** Total number of items */
  totalItems?: number;
  /** Total number of pages */
  pageCount?: number;
  /** Current page number (1-indexed) */
  currentPage?: number;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Callback when page size changes */
  onPageSizeChange?: (size: number) => void;
  /** How many pages to show around current page */
  siblingCount?: number;
  /** Page size options */
  pageSizeOptions?: number[];
  /** Current page size */
  pageSize?: number;
  /** Custom class name */
  className?: string;
  /** Show page size selector */
  showPageSize?: boolean;
  /** Show pagination */
  showPagination?: boolean;
  /** Custom label for showing entries */
  showingLabel?: string;
  /** Custom label for out of total */
  outOfLabel?: string;
  /** Show first and last page buttons */
  showBoundaryButtons?: boolean;
  /** Show previous/next page buttons */
  showNavigationButtons?: boolean;
  /** Disable pagination */
  disabled?: boolean;
}

export function TableFooter({
  totalItems = 0,
  pageCount = 1,
  currentPage = 1,
  onPageChange,
  onPageSizeChange,
  siblingCount = 1,
  pageSizeOptions = [10, 20, 50, 100, 200, 500],
  pageSize = 10,
  className,
  showPageSize = true,
  showPagination = true,
  showingLabel = "Showing",
  outOfLabel = "out of",
  showBoundaryButtons = false,
  showNavigationButtons = true,
  disabled = false,
}: TableFooterProps) {
  // Ensure currentPage is within valid range
  const safeCurrentPage = Math.max(1, Math.min(currentPage, pageCount));

  // Calculate showing range
  const startItem = totalItems > 0 ? (safeCurrentPage - 1) * pageSize + 1 : 0;
  const endItem = Math.min(safeCurrentPage * pageSize, totalItems);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    if (pageCount <= 1) return [];

    const totalPageNumbers = siblingCount * 2 + 5; // siblings + first/last + current + 2 ellipsis

    if (pageCount <= totalPageNumbers) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(safeCurrentPage - siblingCount, 2);
    const rightSiblingIndex = Math.min(
      safeCurrentPage + siblingCount,
      pageCount - 1,
    );

    const shouldShowLeftEllipsis = leftSiblingIndex > 2;
    const shouldShowRightEllipsis = rightSiblingIndex < pageCount - 1;

    const pages: (number | string)[] = [1];

    if (shouldShowLeftEllipsis) {
      pages.push("left-ellipsis");
    } else if (pageCount > 2) {
      // Add pages between 1 and left sibling
      for (let i = 2; i < leftSiblingIndex; i++) {
        pages.push(i);
      }
    }

    // Add siblings around current page
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== pageCount) {
        pages.push(i);
      }
    }

    if (shouldShowRightEllipsis) {
      pages.push("right-ellipsis");
    } else if (pageCount > 2) {
      // Add pages between right sibling and last page
      for (let i = rightSiblingIndex + 1; i < pageCount; i++) {
        pages.push(i);
      }
    }

    if (pageCount > 1) {
      pages.push(pageCount);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (!disabled && onPageChange && page >= 1 && page <= pageCount) {
      onPageChange(page);
    }
  };

  const handlePageSizeChange = (size: number) => {
    if (!disabled && onPageSizeChange) {
      onPageSizeChange(size);

      // When page size changes, reset to first page
      if (onPageChange) {
        onPageChange(1);
      }
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={clsx(styles.tableFooter, className)}>
      {/* Left side: Showing X out of Y and page size selector */}
      {showPageSize && totalItems > 0 && (
        <div className={styles.leftSection}>
          <span className={styles.showingText}>{showingLabel}</span>

          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className={styles.pageSizeSelect}
            aria-label="Select page size"
            disabled={disabled}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <span className={styles.showingText}>
            {outOfLabel} {totalItems}
          </span>

          {totalItems > 0 && (
            <span className={styles.rangeText}>
              ({startItem}-{endItem} of {totalItems})
            </span>
          )}
        </div>
      )}

      {/* Right side: Pagination */}
      {showPagination && pageCount > 1 && (
        <div className={styles.rightSection}>
          <div className={styles.pagination}>
            {/* First page button */}
            {showBoundaryButtons && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={disabled || safeCurrentPage === 1}
                className={styles.paginationButton}
                aria-label="Go to first page"
              >
                First
              </Button>
            )}

            {/* Previous button */}
            {showNavigationButtons && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(safeCurrentPage - 1)}
                disabled={disabled || safeCurrentPage === 1}
                className={styles.paginationButton}
                aria-label="Previous page"
              >
                <ChevronLeftIcon className={styles.paginationIcon} />
              </Button>
            )}

            {/* Page numbers */}
            <div className={styles.pageNumbers}>
              {pageNumbers.map((page, index) => {
                if (page === "left-ellipsis" || page === "right-ellipsis") {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className={styles.pageEllipsis}
                    >
                      ...
                    </span>
                  );
                }

                const pageNumber = page as number;
                const isActive = safeCurrentPage === pageNumber;

                return (
                  <Button
                    key={`page-${pageNumber}`}
                    variant={isActive ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => handlePageChange(pageNumber)}
                    className={clsx(
                      styles.pageNumberButton,
                      isActive && styles.pageNumberActive,
                    )}
                    disabled={disabled}
                    aria-label={`Go to page ${pageNumber}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>

            {/* Next button */}
            {showNavigationButtons && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(safeCurrentPage + 1)}
                disabled={disabled || safeCurrentPage === pageCount}
                className={styles.paginationButton}
                aria-label="Next page"
              >
                <ChevronRightIcon className={styles.paginationIcon} />
              </Button>
            )}

            {/* Last page button */}
            {showBoundaryButtons && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(pageCount)}
                disabled={disabled || safeCurrentPage === pageCount}
                className={styles.paginationButton}
                aria-label="Go to last page"
              >
                Last
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
