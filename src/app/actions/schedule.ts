"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addEvent(data: { date: Date, time: string, location: string, members: string, target: string, isNext: boolean }) {
  try {
    if (data.isNext) {
      await prisma.event.updateMany({
        where: { isNext: true },
        data: { isNext: false },
      });
    }

    await prisma.event.create({
      data: {
        date: data.date,
        time: data.time,
        location: data.location,
        members: data.members,
        target: data.target,
        isNext: data.isNext,
      },
    });
    revalidatePath("/schedule");
  } catch (error) {
    console.error("Failed to add event:", error);
    throw new Error("Failed to add event");
  }
}
