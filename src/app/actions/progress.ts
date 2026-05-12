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
