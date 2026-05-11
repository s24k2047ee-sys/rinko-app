import prisma from "@/lib/prisma";
import BoardClient from "./BoardClient";

export default async function BoardPage() {
  const threads = await prisma.thread.findMany({
    include: {
      _count: {
        select: { replies: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const serializedThreads = threads.map(t => ({
    ...t,
    createdAt: t.createdAt.toISOString(),
  }));

  return <BoardClient initialThreads={serializedThreads} />;
}
