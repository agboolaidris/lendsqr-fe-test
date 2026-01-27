"use client";

import { UserIcon, Mail, Calendar, SearchIcon } from "lucide-react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { Table } from "@ui/table/table";
import { TableFooter } from "@ui/table/table-footer";
import { UserStatisticCard } from "./components/user-statistic-card";
import { Typography } from "@ui/typography";
import { TextField } from "@ui/text-field";
import { Button } from "@ui/button";

import clsx from "clsx";
import styles from "./users-page.module.scss";
import { useUsers } from "@hooks/useUsers";
import { useMemo, useState } from "react";
import { User, UsersQueryParams } from "src/@types/user";
import { useDebouncedCallback } from "use-debounce";
const columnHelper = createColumnHelper<User>();

export default function UsersPage() {
  const [params, setParams] = useState<UsersQueryParams>({
    page: 1,
    limit: 100,
    q: "",
    sortBy: "created_at",
    sortOrder: "desc",
  });

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setParams((prev) => ({ ...prev, q: value, page: 1 }));
  }, 1000);

  const { data, isLoading } = useUsers(params);

  const userData = useMemo(() => data?.data || [], [data?.data]);

  console.log({ data, isLoading, userData });

  const columns = useMemo(
    () => [
      columnHelper.accessor("full_name", {
        header: "Name",
        cell: (info) => (
          <div className={styles.cell}>
            <UserIcon size={16} />
            <span>{info.getValue()}</span>
          </div>
        ),
      }),
      columnHelper.accessor("email_address", {
        header: "Email",
        cell: (info) => (
          <div className={styles.cell}>
            <Mail size={16} />
            <span>{info.getValue()}</span>
          </div>
        ),
      }),
      // columnHelper.accessor("status", {
      //   header: "Role",
      //   cell: (info) => (
      //     <span className={clsx(styles.pill, styles.pillRole)}>
      //       {info.getValue()}
      //     </span>
      //   ),
      // }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue();
          return (
            <span
              className={clsx(
                styles.pill,
                styles[
                  `pill${status.charAt(0).toUpperCase() + status.slice(1)}`
                ],
              )}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          );
        },
      }),
      columnHelper.accessor("created_at", {
        header: "Joined",
        cell: (info) => (
          <div className={styles.cell}>
            <Calendar size={16} />
            <span>{info.getValue()}</span>
          </div>
        ),
      }),
    ],
    [],
  );

  const table = useReactTable<User>({
    columns,
    data: userData,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: data?.meta?.totalPages,
  });

  return (
    <main className={styles.page}>
      <Typography weight="medium" size="2xl">
        Users
      </Typography>

      <section className={styles.stats}>
        <UserStatisticCard
          label="Users"
          value="2,450"
          icon={<UserIcon size={20} />}
          variant="purple"
        />
        <UserStatisticCard
          label="Active Users"
          value="2,450"
          icon={<UserIcon size={20} />}
          variant="indigo"
        />
        <UserStatisticCard
          label="Users with Loans"
          value="2,450"
          icon={<UserIcon size={20} />}
          variant="orange"
        />
        <UserStatisticCard
          label="Users with Savings"
          value="2,450"
          icon={<UserIcon size={20} />}
          variant="pink"
        />
      </section>

      <section className={styles.tableCard}>
        <div className={styles.toolbar}>
          <div>
            <Typography weight="medium" size="lg">
              Users List
            </Typography>
          </div>
          <div className={styles.toolbarLeft}>
            <div className={styles.search}>
              <TextField
                leftIcon={<SearchIcon size={16} />}
                placeholder="Search users"
                onChange={(e) => debouncedSearch(e.target.value)}
              />
            </div>
            <Button>Filter</Button>
          </div>
        </div>

        <Table
          table={table}
          isLoading={isLoading}
          skeletonRows={params.limit}
          size="md"
        />

        <TableFooter
          totalItems={data?.meta?.total || 0}
          showingLabel="Showing"
          outOfLabel="out of"
          currentPage={params.page}
          pageSize={params.limit}
          pageCount={data?.meta?.totalPages || 0}
          onPageSizeChange={(pageSize) =>
            setParams((prev) => ({ ...prev, limit: pageSize }))
          }
          onPageChange={(pageIndex) =>
            setParams((prev) => ({ ...prev, page: pageIndex }))
          }
        />
      </section>
    </main>
  );
}
