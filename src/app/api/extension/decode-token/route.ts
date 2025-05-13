import { NextResponse, type NextRequest } from "next/server";
import { api } from "~/trpc/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  if (!body) {
    console.log("No body");
    return NextResponse.json({ error: "Insufficient data" }, { status: 400 });
  }

  try {
    const { token } = body;

    const decoded = await api.test.decodeToken({ token });

    return NextResponse.json({decoded}, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
