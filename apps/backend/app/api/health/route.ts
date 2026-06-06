import { createHealthStatus } from "@repo/shared";
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(createHealthStatus("backend"));
}
