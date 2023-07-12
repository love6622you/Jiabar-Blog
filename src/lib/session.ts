import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function getCurrentUserForServer() {
  const session = await getServerSession(authOptions);

  return session?.user;
}
