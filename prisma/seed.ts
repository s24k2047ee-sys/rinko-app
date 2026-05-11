import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.chapter.deleteMany();
  await prisma.book.deleteMany();
  await prisma.thread.deleteMany();
  await prisma.reply.deleteMany();
  await prisma.material.deleteMany();
  await prisma.event.deleteMany();

  // Seed Books
  const book1 = await prisma.book.create({
    data: {
      title: "ゼロから作るDeep Learning",
      author: "斎藤 康毅",
      publisher: "オライリー・ジャパン",
      status: "進行中",
      coverColor: "from-blue-600 to-indigo-900",
      chapters: {
        create: [
          { title: "第1章 Python入門", pages: "p.1 - p.20", assignedTo: "佐藤", completed: true },
          { title: "第2章 パーセプトロン", pages: "p.21 - p.38", assignedTo: "鈴木", completed: true },
          { title: "第3章 ニューラルネットワーク", pages: "p.39 - p.82", assignedTo: "田中", completed: false },
        ],
      },
    },
  });

  // Seed Threads
  await prisma.thread.create({
    data: {
      title: "活性化関数の使い分けについて",
      author: "田中",
      likes: 2,
      tags: "第3章,質問",
      status: "解決済み",
    },
  });

  // Seed Events
  await prisma.event.create({
    data: {
      date: new Date("2026-05-14T14:40:00"),
      time: "14:40 - 16:10",
      location: "3号館 312教室",
      members: "佐藤,鈴木",
      target: "第2章",
      isNext: true,
    },
  });

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
