import prisma from "@/lib/db";
import { checkSession } from "@/lib/session";
import { NextResponse, NextRequest } from "next/server";

let result = null;
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const searchText = searchParams.get("query") ?? "";

  try {
    let posts = await prisma.post.findMany({
      where: {
        OR: [{ title: { contains: searchText || "", mode: "insensitive" } }]
      },
      include: {
        user: true,
        hearts: true,
        comments: true,
        tags: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    let data = await posts.map((post) => {
      return {
        ...post,
        tags: post.tags.map((tag) => tag.name)
      };
    });

    result = {
      status: "success",
      data
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    result = {
      status: "fail",
      message: "Error has occurred while fetching posts"
    };
    return NextResponse.json(result, { status: 403 });
  }
}

export async function POST(req: NextRequest) {
  const session = await checkSession();
  if (session instanceof NextResponse) {
    return session;
  }

  const prismaUser = await prisma.user.findUnique({
    where: { email: session.email! }
  });

  try {
    const { title, content, image, category, tags } = await req.json();
    const post = await prisma.post.create({
      data: {
        title,
        content,
        image,
        published: true,
        user: {
          connect: { id: prismaUser?.id ?? "cljzcsn1t0007u2lu1yg5ukjo" }
        },
        categories: {
          connectOrCreate: {
            where: { name: category },
            create: { name: category }
          }
        },
        tags: {
          connectOrCreate: tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      },
      include: {
        categories: true,
        tags: true
      }
    });
    result = {
      status: "success",
      data: post
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
