"use client";

import { useState } from "react";
import { MessageSquare, ThumbsUp, Search, Plus } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import AddThreadModal from "./AddThreadModal";

interface Thread {
  id: number;
  title: string;
  author: string;
  likes: number;
  createdAt: string;
  tags: string;
  status: string | null;
  _count?: {
    replies: number;
  };
}

export default function BoardClient({ initialThreads }: { initialThreads: any[] }) {
  const [activeTab, setActiveTab] = useState("すべて");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredThreads = initialThreads.filter(thread => {
    const tagsArr = thread.tags.split(",");
    if (searchQuery && !thread.title.includes(searchQuery) && !tagsArr.some((t: string) => t.includes(searchQuery))) {
      return false;
    }
    if (activeTab === "すべて") return true;
    if (activeTab === "未解決") return thread.status === "未解決";
    return tagsArr.includes(activeTab);
  });

  const tabs = ["すべて", "未解決", "第2章", "第3章", "環境構築"];

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="質問を検索..." 
            className="w-full bg-gray-800 border border-gray-700 text-sm text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 rounded-lg flex items-center justify-center transition"
        >
          <Plus size={20} />
        </button>
      </div>

      <AddThreadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-xs border transition-colors ${
              activeTab === tab 
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-bold' 
                : 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredThreads.length > 0 ? (
          filteredThreads.map((thread) => (
            <div key={thread.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600 transition cursor-pointer">
              <div className="flex gap-2 mb-2">
                {thread.status === "未解決" && (
                  <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded border border-orange-500/30">未解決</span>
                )}
                {thread.tags.split(",").map((tag: string) => (
                  <span key={tag} className="text-[10px] bg-gray-900 text-gray-400 px-2 py-0.5 rounded border border-gray-700">{tag}</span>
                ))}
              </div>
              <h3 className="font-bold text-gray-100 text-sm mb-2">{thread.title}</h3>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center text-[10px] text-gray-300">
                    {thread.author[0]}
                  </div>
                  <span className="text-xs text-gray-400">
                    {thread.author}・{format(new Date(thread.createdAt), "MM/dd", { locale: ja })}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="flex items-center gap-1 text-xs">
                    <ThumbsUp size={14} />
                    <span>{thread.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <MessageSquare size={14} />
                    <span>{thread._count?.replies || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 text-sm">
            該当するスレッドが見つかりません
          </div>
        )}
      </div>
    </div>
  );
}
