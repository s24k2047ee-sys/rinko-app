"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/": "Rinko ダッシュボード",
  "/books": "輪講書籍一覧",
  "/progress": "進捗管理",
  "/schedule": "ローテーション・日程",
  "/board": "Q&A掲示板",
  "/editor": "マークダウンメモ",
  "/materials": "資料管理",
};

export default function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Rinko";

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="flex items-center justify-between h-14 max-w-md mx-auto sm:max-w-3xl px-4">
        {pathname !== "/" ? (
          <Link href="/" className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors" title="ホームに戻る">
            <Home size={20} />
          </Link>
        ) : (
          <div className="w-9" />
        )}
        <h1 className="text-lg font-bold tracking-tight text-white">{title}</h1>
        <div className="w-9" />
      </div>
    </header>
  );
}
