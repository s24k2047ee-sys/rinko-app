"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addBook(data: { title: string, author: string, publisher: string, coverColor: string }) {
  try {
    await prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        publisher: data.publisher,
        coverColor: data.coverColor,
        status: "未着手",
      },
    });
    revalidatePath("/books");
  } catch (error) {
    console.error("Failed to add book:", error);
    throw new Error("Failed to add book");
  }
}
