import { NextResponse } from "next/server";
import {
  adminDeleteDispensary,
  adminGetDispensaries,
  adminUpsertDispensary,
} from "@/lib/admin-data";
import { isAdminAuthenticated } from "@/lib/require-admin";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await adminGetDispensaries());
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const dispensary = await adminUpsertDispensary(body);
    return NextResponse.json(dispensary);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to save dispensary" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  await adminDeleteDispensary(id);
  return NextResponse.json({ success: true });
}
