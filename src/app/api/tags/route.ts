import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

let result = null;
export async function GET(req: NextRequest) {
  try {
    let tags = await prisma.tag.findMany();

    result = {
      status: "success",
      data: tags
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    result = {
      status: "fail",
      message: "Error has occurred while fetching tags"
    };
    return NextResponse.json(result, { status: 403 });
  }
}
