import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";
import BooksClient from "./BooksClient";

export default async function BooksPage() {
  const books = await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <BooksClient initialBooks={books} />;
}
