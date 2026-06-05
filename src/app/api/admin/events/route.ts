import { NextResponse } from "next/server";
import {
  adminDeleteEvent,
  adminGetEvents,
  adminUpsertEvent,
} from "@/lib/admin-data";
import { isAdminAuthenticated } from "@/lib/require-admin";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const events = await adminGetEvents();
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const event = await adminUpsertEvent(body);
    return NextResponse.json(event);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to save event" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  await adminDeleteEvent(id);
  return NextResponse.json({ success: true });
}
