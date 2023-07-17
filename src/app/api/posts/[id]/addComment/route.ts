import prisma from "@/lib/db";
import { checkSession } from "@/lib/session";
import { NextResponse } from "next/server";

let result = null;

export async function POST(req: Request) {
  const session = await checkSession();
  if (session instanceof NextResponse) {
    return session;
  }

  const { content, id } = await req.json();

  // 未輸入資料
  if (!content.length) {
    result = {
      status: "fail",
      message: "Please enter some text"
    };
    return NextResponse.json(result, { status: 404 });
  }

  const prismaUser = await prisma.user.findUnique({
    where: { email: session.email! }
  });

  const post = await prisma.post.findUnique({
    where: { id }
  });

  try {
    await prisma.comment.create({
      data: {
        title: post?.title,
        content,
        userId: prismaUser?.id!,
        postId: post?.id!
      }
    });
    result = {
      status: "success"
    };
    return NextResponse.json(result);
  } catch (error) {
    result = {
      status: "fail",
      message: "Error has occurred while making a post"
    };
    return NextResponse.json(result, { status: 403 });
  }
}
