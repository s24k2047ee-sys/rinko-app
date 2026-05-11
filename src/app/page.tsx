import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { BookOpen, CheckSquare, Calendar, MessageSquare, PenTool, FileText, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

const quickLinks = [
  { name: "書籍", href: "/books", icon: BookOpen, desc: "輪講書籍の共有・登録", color: "text-blue-400", bg: "bg-blue-400/10" },
  { name: "進捗", href: "/progress", icon: CheckSquare, desc: "担当範囲と読了管理", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { name: "日程", href: "/schedule", icon: Calendar, desc: "ローテーションカレンダー", color: "text-purple-400", bg: "bg-purple-400/10" },
  { name: "Q&A", href: "/board", icon: MessageSquare, desc: "事前質問・スレッド", color: "text-orange-400", bg: "bg-orange-400/10" },
  { name: "メモ", href: "/editor", icon: PenTool, desc: "マークダウンエディタ", color: "text-pink-400", bg: "bg-pink-400/10" },
  { name: "資料", href: "/materials", icon: FileText, desc: "レジュメ・PDFアップロード", color: "text-cyan-400", bg: "bg-cyan-400/10" },
];

export default async function Home() {
  const nextEvent = await prisma.event.findFirst({
    where: { isNext: true },
  });

  const recentThreads = await prisma.thread.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 pb-6">
      {/* 次回の輪講情報 */}
      {nextEvent && (
        <section className="bg-gradient-to-br from-emerald-900/40 to-gray-800 rounded-2xl p-5 border border-emerald-500/20 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
              <Calendar size={16} /> 次回のゼミ輪講
            </h2>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full">予定</span>
          </div>
          <p className="text-xl font-bold text-white mb-1">
            {format(new Date(nextEvent.date), "M月d日(E)", { locale: ja })} {nextEvent.time}
          </p>
          <p className="text-sm text-gray-300 mb-4">発表担当: <span className="font-medium text-white">{nextEvent.members}</span></p>
          
          <div className="bg-gray-900/50 rounded-xl p-3 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gray-800 p-2 rounded-lg">
                <BookOpen size={16} className="text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">対象</p>
                <p className="text-sm font-medium text-gray-200">{nextEvent.target}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* クイックアクセス */}
      <section>
        <h2 className="text-lg font-bold text-white mb-3 pl-1">メニュー</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.name} href={link.href} className="block group">
                <div className="bg-gray-800 hover:bg-gray-750 transition border border-gray-700/50 hover:border-gray-600 rounded-xl p-4 h-full flex flex-col justify-between">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${link.bg}`}>
                    <Icon size={20} className={link.color} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-100 flex items-center justify-between">
                      {link.name}
                      <ChevronRight size={14} className="text-gray-500 group-hover:text-gray-300 transition-transform group-hover:translate-x-1" />
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">{link.desc}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 最近のアクティビティ */}
      <section>
        <h2 className="text-lg font-bold text-white mb-3 pl-1">最近の質問・投稿</h2>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700/50 space-y-4">
          {recentThreads.length > 0 ? (
            recentThreads.map((thread) => (
              <div key={thread.id} className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold shrink-0">
                  {thread.author[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-300">
                    <span className="font-bold text-gray-200">{thread.author}</span> が質問を投稿しました
                  </p>
                  <p className="text-sm font-medium text-emerald-400 mt-0.5 truncate">{thread.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{format(new Date(thread.createdAt), "MM/dd HH:mm", { locale: ja })}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm py-4">最近のアクティビティはありません</p>
          )}
        </div>
      </section>
    </div>
  );
}
