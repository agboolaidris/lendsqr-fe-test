import users from "src/data/users.json";
import { NextResponse } from "next/server";
import { SortOrder } from "src/@types";

const getNestedValue = (obj: unknown, path: string): unknown => {
  return path.split(".").reduce((acc: unknown, key: string) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(Number(searchParams.get("page") ?? 1), 1);
    const limit = Math.max(Number(searchParams.get("limit") ?? 10), 1);
    const q = searchParams.get("q")?.trim().toLowerCase() || "";

    const sortBy = searchParams.get("sortBy") || "";
    const sortOrder = (searchParams.get("sortOrder") as SortOrder) || "asc";

    let result = [...users];

    /* ---------------- SEARCH ---------------- */
    if (q) {
      result = result.filter((u) =>
        [u.full_name, u.email_address, u.phone_number, u.reference_id]
          .filter(Boolean)
          .some((field) =>
            field.toString().toLowerCase().includes(q.toString().toLowerCase()),
          ),
      );
    }

    /* ---------------- SORT ---------------- */
    if (sortBy) {
      result.sort((a, b) => {
        const aVal = getNestedValue(a, sortBy);
        const bVal = getNestedValue(b, sortBy);

        if (aVal == null) return 1;
        if (bVal == null) return -1;

        // Date
        if (sortBy === "created_at") {
          return sortOrder === "asc"
            ? new Date(aVal).getTime() - new Date(bVal).getTime()
            : new Date(bVal).getTime() - new Date(aVal).getTime();
        }

        // Numbers
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
        }

        // Strings
        return sortOrder === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }

    /* ---------------- PAGINATION ---------------- */
    const total = result.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;

    return NextResponse.json({
      data: result.slice(start, start + limit),
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Users API error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
