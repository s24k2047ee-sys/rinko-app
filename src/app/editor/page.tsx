import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";
import EditorClient from "./EditorClient";

export default async function EditorPage() {
  const memo = await prisma.memo.findFirst({
    orderBy: { updatedAt: "desc" },
  });

  return <EditorClient initialMemo={memo} />;
}
