import { NextResponse } from "next/server";
import users from "src/data/users.json";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }, // 1. Define params as a Promise
) {
  try {
    // 2. Await the params promise
    const { id } = await params;

    const user = users.find((u) => u.id === id);

    if (!user) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
