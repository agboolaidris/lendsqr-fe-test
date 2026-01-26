"use client";
import { User, Mail, Calendar } from "lucide-react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Table } from "@ui/table/table";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
}

const columnHelper = createColumnHelper<UserData>();

const data = [
  {
    id: "1",
    name: "Agboola Idris",
    email: "agboola@example.com",
    role: "Admin",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Editor",
    status: "pending",
    createdAt: "2024-03-10",
  },
];

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <User size={16} />
        <span>{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Mail size={16} />
        <span>{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => (
      <span
        style={{
          padding: "4px 8px",
          borderRadius: "4px",
          backgroundColor: "rgba(57, 205, 204, 0.1)",
          color: "#39cdcc",
          fontSize: "12px",
          fontWeight: "500",
        }}
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const colors = {
        active: { bg: "rgba(57, 205, 98, 0.1)", color: "#39cd62" },
        inactive: { bg: "rgba(228, 3, 59, 0.1)", color: "#e4033b" },
        pending: { bg: "rgba(233, 178, 0, 0.1)", color: "#e9b200" },
      };
      const { bg, color } = colors[status];

      return (
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            backgroundColor: bg,
            color,
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  }),
  columnHelper.accessor("createdAt", {
    header: "Joined",
    cell: (info) => (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Calendar size={16} />
        <span>{info.getValue()}</span>
      </div>
    ),
  }),
];

export default function Home() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const handleRefresh = () => {
    console.log("Refreshing data...");
    // Add your refresh logic here
  };

  const handleExport = () => {
    console.log("Exporting data...");
    // Add your export logic here
  };

  const handleRowClick = (row: UserData) => {
    console.log("Row clicked:", row);
    // Handle row click (e.g., navigate to detail page)
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Table
        table={table}
        size="md"
        // striped
        // bordered
        // hoverable
        onRowClick={handleRowClick}
      />

      {/* <TableActions
        table={table}
        onRefresh={handleRefresh}
        onExport={handleExport}
        showPageSize
        showPageNumbers
        showTotal
      /> */}
    </div>
  );
}
