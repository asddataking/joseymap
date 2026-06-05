import { NextResponse } from "next/server";
import { recordReviewClick } from "@/lib/data";

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

    const result = await recordReviewClick(eventStopId, visitorCode);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to record review click" },
      { status: 500 }
    );
  }
}
