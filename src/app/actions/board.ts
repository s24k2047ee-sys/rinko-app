"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addThread(data: { title: string, author: string, tags: string }) {
  try {
    await prisma.thread.create({
      data: {
        title: data.title,
        author: data.author,
        tags: data.tags,
        status: "未解決",
      },
    });
    revalidatePath("/board");
  } catch (error) {
    console.error("Failed to add thread:", error);
    throw new Error("Failed to add thread");
  }
}
