import prisma from "@/lib/db";
import { checkSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const posts = await prisma.post.findMany({
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
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error has occurred while fetching posts"
      },
      { status: 403 }
    );
  }
}

export async function POST(req: Request) {
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
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Error has occurred while making a post" },
      { status: 403 }
    );
  }
}
