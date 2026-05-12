"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addChapter(data: { bookId: number, title: string, pages: string, assignedTo: string }) {
  try {
    await prisma.chapter.create({
      data: {
        title: data.title,
        pages: data.pages,
        assignedTo: data.assignedTo,
        bookId: data.bookId,
        completed: false,
      },
    });
    revalidatePath("/progress");
  } catch (error) {
    console.error("Failed to add chapter:", error);
    throw new Error("Failed to add chapter");
  }
}

export async function toggleChapterComplete(id: number, completed: boolean) {
  try {
    await prisma.chapter.update({
      where: { id },
      data: { completed },
    });
    revalidatePath("/progress");
  } catch (error) {
    console.error("Failed to update chapter:", error);
    throw new Error("Failed to update chapter");
  }
}

export async function setTargetBook(bookId: number) {
  try {
    // 現在「進行中」のものを「未着手」に戻す（必要であれば）
    await prisma.book.updateMany({
      where: { status: "進行中", id: { not: bookId } },
      data: { status: "未着手" },
    });

    // 選択された書籍を「進行中」にする
    await prisma.book.update({
      where: { id: bookId },
      data: { status: "進行中" },
    });

    revalidatePath("/progress");
    revalidatePath("/books");
  } catch (error) {
    console.error("Failed to set target book:", error);
    throw new Error("Failed to set target book");
  }
}
