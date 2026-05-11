import prisma from "@/lib/prisma";
import ProgressClient from "./ProgressClient";

export default async function ProgressPage() {
  const book = await prisma.book.findFirst({
    where: { status: "進行中" },
    include: { chapters: true },
  });

  if (!book) {
    return <div className="text-center py-20 text-gray-500">進行中の書籍が見つかりません</div>;
  }

  return <ProgressClient initialChapters={book.chapters} bookTitle={book.title} />;
}
