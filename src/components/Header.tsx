"use client";

import { usePathname } from "next/navigation";

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
      <div className="flex items-center justify-center h-14 max-w-md mx-auto sm:max-w-3xl px-4">
        <h1 className="text-lg font-bold tracking-tight text-white">{title}</h1>
      </div>
    </header>
  );
}
