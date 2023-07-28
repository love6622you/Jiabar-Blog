import prisma from "@/lib/db";
import { checkSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

let result = null;

export async function POST(req: NextRequest) {
  const sessionResponse = await checkSession();
  if (sessionResponse instanceof NextResponse) {
    return sessionResponse;
  }

  const user = await prisma.user.findUnique({
    where: { email: sessionResponse.email! }
  });

  if (!user) {
    return sessionResponse;
  }

  const { content, postId } = await req.json();

  // 未輸入資料
  if (!content.length) {
    result = {
      status: "fail",
      message: "Please enter some text"
    };
    return NextResponse.json(result, { status: 404 });
  }

  const post = await prisma.post.findUnique({
    where: { id: postId }
  });

  try {
    await prisma.comment.create({
      data: {
        title: post?.title,
        content,
        userId: user.id,
        postId: postId
      }
    });
    result = {
      status: "success"
    };
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    result = {
      status: "fail",
      message: "Error has occurred while making a post"
    };
    return NextResponse.json(result, { status: 403 });
  }
}
