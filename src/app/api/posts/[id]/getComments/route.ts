import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

let result = null;
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;
    const comments = await prisma.comment.findMany({
      where: {
        postId
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            image: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    if (comments) {
      result = {
        status: "success",
        data: comments
      };
      return NextResponse.json(result, { status: 200 });
    } else {
      result = {
        status: "fail",
        message: "Not found any comments"
      };
      return NextResponse.json(result, { status: 404 });
    }
  } catch (error) {
    result = {
      status: "fail",
      message: "Error has occurred while fetching comments"
    };
    return NextResponse.json(result, { status: 403 });
  }
}
