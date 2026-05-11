"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, CheckSquare, Calendar, MessageSquare, PenTool } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "ホーム", href: "/", icon: Home },
  { name: "書籍", href: "/books", icon: BookOpen },
  { name: "進捗", href: "/progress", icon: CheckSquare },
  { name: "日程", href: "/schedule", icon: Calendar },
  { name: "Q&A", href: "/board", icon: MessageSquare },
  { name: "メモ", href: "/editor", icon: PenTool },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 z-50 sm:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-emerald-500" : "text-gray-400 hover:text-gray-200"
              )}
            >
              <Icon size={20} className={isActive ? "fill-emerald-500/20" : ""} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
