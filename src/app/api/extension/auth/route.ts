import { NextResponse, type NextRequest } from "next/server";
import { api } from "~/trpc/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  if (!body) {
    console.log("No body");
    return NextResponse.json({ error: "Insufficient data" }, { status: 400 });
  }

  try {
    const { organization, email, password } = body;

    console.log(body)

    if (!organization || !email || !password) {
      console.log("All fields are required");
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
  
    const JWT = await api.extension.handleSignIn({ organization, email, password });
    const token = JWT!.token;

    return NextResponse.json({token}, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
