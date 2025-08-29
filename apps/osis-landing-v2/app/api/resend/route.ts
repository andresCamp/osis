// This route has been superseded by /api/waitlist. Keeping a minimal handler to avoid import/type errors.
import { NextResponse } from "next/server"

export async function POST(_request: Request) {
  return NextResponse.json({ error: "Use /api/waitlist instead" }, { status: 410 })
}
