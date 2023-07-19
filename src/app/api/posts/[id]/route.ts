import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

let result = null;
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const post = await prisma.post.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        published: true,
        author: {
          select: {
            name: true,
            image: true
          }
        },
        hearts_count: true,
        tags: true,
        createdAt: true
      }
    });

    if (post) {
      result = {
        status: "success",
        data: { ...post, tags: post.tags.map((tag) => tag.name) }
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
