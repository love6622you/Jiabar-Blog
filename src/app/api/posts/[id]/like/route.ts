import prisma from "@/lib/db";
import { checkSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

let result = null;

export async function POST(req: NextRequest) {
  const session = await checkSession();
  if (session instanceof NextResponse) {
    return session;
  }

  const { postId } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.email! }
  });

  const heart = await prisma.heart.findFirst({
    where: {
      userId: user?.id!,
      postId: postId
    }
  });

  try {
    if (!heart) {
      // 新增按讚
      await prisma.heart.create({
        data: {
          userId: user?.id!,
          postId: postId
        }
      });
    } else {
      // 取消按讚
      await prisma.heart.delete({
        where: {
          id: heart.id
        }
      });
    }

    // 更新文章按讚數
    const heartCount = await prisma.heart.count({
      where: {
        postId
      }
    });

    await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        hearts_count: heartCount
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
