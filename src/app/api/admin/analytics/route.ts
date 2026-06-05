import { NextResponse } from "next/server";
import { getAdminAnalytics } from "@/lib/data";

export async function GET() {
  try {
    const analytics = await getAdminAnalytics();
    return NextResponse.json(analytics);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
