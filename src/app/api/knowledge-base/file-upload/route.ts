import type { NextRequest } from "next/server";

export async function PUT(req: NextRequest,) {
  const arrayBuffer = await req.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  console.log(req.body);
}