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
    return NextResponse.json(
      { error: "Unauthorized. Please login" },
      { status: 401 }
    );
  }
  return session;
}
