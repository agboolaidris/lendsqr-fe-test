"use client";

import { useUsers } from "@hooks/useUsers";
import { DoubleUserIcon } from "@icons/DoubleUser";
import { LoanIcon } from "@icons/Loan";
import { SavingIcon } from "@icons/Saving";
import { SearchIcon } from "@icons/Search";
import { TrebleUserIcon } from "@icons/TrebleUser";
import {
  createColumnHelper,
  getCoreRowModel,
  OnChangeFn,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableFooter } from "@ui/Table";
import { TextField } from "@ui/TextField";
import { Typography } from "@ui/Typography";
import clsx from "clsx";
import { useCallback, useMemo, useState } from "react";
import { User, UserSortField, UsersQueryParams } from "src/@types/user";
import { useDebouncedCallback } from "use-debounce";

import { UserStatisticCard } from "./components/user-statistic-card";
import { UserActionMenu } from "./components/UserActionMenu";
import styles from "./page.module.scss";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("loan_company.name", {
    id: "loan_company.name",
    header: "organization",
    enableSorting: true,
  }),
  columnHelper.accessor("full_name", {
    header: "Username",
    enableSorting: true,
  }),
  columnHelper.accessor("email_address", {
    header: "Email",
    enableSorting: true,
  }),

  columnHelper.accessor("phone_number", {
    header: "Phone Number",
    enableSorting: true,
  }),

  columnHelper.accessor("created_at", {
    header: "Date joined",
    cell: (info) => {
      const dateValue = info.getValue();
      const formattedDate = dateValue
        ? new Date(dateValue).toLocaleDateString()
        : "N/A";
      return formattedDate;
    },
    enableSorting: true,
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue() || "unknown";
      return (
        <span
          className={clsx(
            styles.pill,
            styles[`pill${status.charAt(0).toUpperCase() + status.slice(1)}`],
          )}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
    enableSorting: true,
  }),

  columnHelper.display({
    header: "",
    id: "actions",
    cell: (info) => {
      return <UserActionMenu user={info.row.original} />;
    },
    enableSorting: false,
  }),
];

const coreRowModel = getCoreRowModel();

export default function UsersPage() {
  const [searchInput, setSearchInput] = useState("");
  const [sorting, setSorting] = useState<SortingState>([
    { id: "created_at", desc: true },
  ]);
  const [params, setParams] = useState<UsersQueryParams>({
    page: 1,
    limit: 100,
    q: "",
    sortBy: "created_at",
    sortOrder: "desc",
  });
  const { data, isLoading } = useUsers(params);
  const userData = useMemo(() => data?.data || [], [data?.data]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setParams((prev) => ({
      ...prev,
      q: value,
      page: 1,
    }));
  }, 300);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchInput(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  const handleSortingChange: OnChangeFn<SortingState> = useCallback(
    (updater) => {
      const nextSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(nextSorting);

      const sortBy: UserSortField = (nextSorting[0]?.id ??
        "created_at") as UserSortField;
      const sortOrder = nextSorting[0]?.desc ? "desc" : "asc";

      setParams((prev) => ({
        ...prev,
        sortBy,
        sortOrder,
        page: 1,
      }));
    },
    [sorting],
  );

  const tableState = useMemo(() => ({ sorting }), [sorting]);

  const table = useReactTable<User>({
    data: userData,
    columns,
    getCoreRowModel: coreRowModel,
    manualPagination: true,
    manualSorting: true,
    pageCount: data?.meta?.totalPages || 1,
    state: tableState,
    onSortingChange: handleSortingChange,
  });

  const tableKey = useMemo(() => {
    return `${params.page}-${params.limit}-${params.q}-${params.sortBy}-${params.sortOrder}`;
  }, [params]);

  return (
    <main className={styles.page}>
      <Typography weight="medium" size="2xl">
        Users
      </Typography>

      <section className={styles.stats}>
        <UserStatisticCard
          label="Users"
          value={data?.meta?.total?.toString() || "0"}
          icon={<DoubleUserIcon width={20} height={20} />}
          variant="purple"
        />
        <UserStatisticCard
          label="Active Users"
          value="2,450"
          icon={<TrebleUserIcon width={20} height={20} />}
          variant="indigo"
        />
        <UserStatisticCard
          label="Users with Loans"
          value="2,450"
          icon={<LoanIcon width={20} height={20} />}
          variant="orange"
        />
        <UserStatisticCard
          label="Users with Savings"
          value="2,450"
          icon={<SavingIcon width={20} height={20} />}
          variant="pink"
        />
      </section>

      <section className={styles.tableCard}>
        <div className={styles.toolbar}>
          <div>
            <Typography weight="medium" size="lg">
              Users List
            </Typography>
            {params.q && (
              <Typography size="sm" className="text-gray-500 mt-1">
                Showing results for &quot;{params.q}&quot;
              </Typography>
            )}
          </div>

          <div className={styles.toolbarLeft}>
            <div className={styles.search}>
              <TextField
                leftIcon={<SearchIcon width={16} height={16} />}
                placeholder="Search users"
                value={searchInput}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") debouncedSearch.flush();
                }}
              />
            </div>
          </div>
        </div>

        <Table
          key={tableKey}
          table={table}
          isLoading={isLoading}
          skeletonRows={params.limit}
          size="md"
          sorting={sorting}
        />

        <TableFooter
          totalItems={data?.meta?.total || 0}
          showingLabel="Showing"
          outOfLabel="out of"
          currentPage={params.page}
          pageSize={params.limit}
          pageCount={data?.meta?.totalPages || 0}
          onPageSizeChange={(pageSize) => {
            setParams((prev) => ({ ...prev, limit: pageSize, page: 1 }));
          }}
          onPageChange={(pageIndex) => {
            setParams((prev) => ({ ...prev, page: pageIndex }));
          }}
        />
      </section>
    </main>
  );
}
