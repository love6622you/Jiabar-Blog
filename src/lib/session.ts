import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function getCurrentUserForServer() {
  const session = await getServerSession(authOptions);

  return session?.user;
}

export async function checkSession() {
  const session = await getCurrentUserForServer();
  if (!session) {
    const result = {
      status: "fail",
      message: "Unauthorized. Please login"
    };
    return NextResponse.json(result, { status: 401 });
  }
  return session;
}
