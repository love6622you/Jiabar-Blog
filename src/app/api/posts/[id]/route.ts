import prisma from "@/lib/db";
import { checkSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  let result = null;
  try {
    const id = params.id;
    const post = await prisma.post.findUnique({
      where: {
        id
      },
      include: {
        tags: true
      }
    });

    if (post) {
      result = {
        status: "success",
        data: post
      };
      return NextResponse.json(result, { status: 200 });
    } else {
      result = {
        status: "fail",
        message: "Not found any post"
      };
      return NextResponse.json(result, { status: 404 });
    }
  } catch (error) {
    result = {
      status: "fail",
      message: "Error has occurred while fetching post"
    };
    return NextResponse.json(result, { status: 403 });
  }
}