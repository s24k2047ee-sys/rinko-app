import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";
import ScheduleClient from "./ScheduleClient";

export default async function SchedulePage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
  });

  // Prisma returns plain objects, but Date needs to be handled
  const serializedEvents = events.map(e => ({
    ...e,
    date: e.date.toISOString() as any
  }));

  return <ScheduleClient events={serializedEvents} />;
}
