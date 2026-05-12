"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveMemo(data: { id?: number, title: string, content: string }) {
  try {
    if (data.id) {
      await prisma.memo.update({
        where: { id: data.id },
        data: { title: data.title, content: data.content },
      });
    } else {
      await prisma.memo.create({
        data: { title: data.title, content: data.content },
      });
    }
    revalidatePath("/editor");
  } catch (error) {
    console.error("Failed to save memo:", error);
    throw new Error("Failed to save memo");
  }
}
