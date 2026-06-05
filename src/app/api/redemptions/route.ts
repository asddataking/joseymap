import { NextResponse } from "next/server";
import { recordRedemption } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventStopId, visitorCode } = body;

    if (!eventStopId || !visitorCode) {
      return NextResponse.json(
        { error: "eventStopId and visitorCode are required" },
        { status: 400 }
      );
    }

    const result = await recordRedemption(eventStopId, visitorCode);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to record redemption" }, { status: 500 });
  }
}
