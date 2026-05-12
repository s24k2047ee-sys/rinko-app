import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";
import ProgressClient from "./ProgressClient";

export default async function ProgressPage() {
  const books = await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
  });

  let book = await prisma.book.findFirst({
    where: { status: "進行中" },
    include: { chapters: true },
  });

  // If no "進行中" book exists, just pick the first one
  if (!book && books.length > 0) {
    book = await prisma.book.findFirst({
      include: { chapters: true },
    });
  }

  if (!book) {
    return <div className="text-center py-20 text-gray-500">書籍が見つかりません。先に書籍を登録してください。</div>;
  }

  return <ProgressClient initialChapters={book.chapters} bookTitle={book.title} bookId={book.id} allBooks={books} />;
}
