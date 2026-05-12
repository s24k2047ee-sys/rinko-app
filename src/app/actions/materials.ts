"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addMaterial(data: { name: string, size: string, user: string, type: string, fileData: string }) {
  try {
    await prisma.material.create({
      data: {
        name: data.name,
        size: data.size,
        user: data.user,
        type: data.type,
        fileData: data.fileData,
      },
    });
    revalidatePath("/materials");
  } catch (error) {
    console.error("Failed to add material:", error);
    throw new Error("Failed to add material");
  }
}
