"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Plus } from "lucide-react";
import { toggleChapterComplete } from "../actions/progress";
import AddChapterModal from "./AddChapterModal";

interface Chapter {
  id: number;
  title: string;
  pages: string;
  assignedTo: string;
  completed: boolean;
}

export default function ProgressClient({ initialChapters, bookTitle, bookId }: { initialChapters: Chapter[], bookTitle: string, bookId: number }) {
  const [chapters, setChapters] = useState(initialChapters);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleComplete = async (id: number) => {
    const chapter = chapters.find(c => c.id === id);
    if (!chapter) return;

    // Optimistic update
    setChapters(chapters.map(ch => 
      ch.id === id ? { ...ch, completed: !ch.completed } : ch
    ));
    
    try {
      await toggleChapterComplete(id, !chapter.completed);
    } catch (e) {
      console.error(e);
      // Revert on failure
      setChapters(chapters.map(ch => 
        ch.id === id ? { ...ch, completed: chapter.completed } : ch
      ));
    }
  };

  const totalCompleted = chapters.filter(c => c.completed).length;
  const progressPercent = Math.round((totalCompleted / chapters.length) * 100) || 0;

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700/50">
        <h2 className="text-sm font-semibold text-gray-400 mb-2">現在の対象書籍</h2>
        <h1 className="text-lg font-bold text-white mb-4">{bookTitle}</h1>
        
        <div className="mb-2 flex justify-between items-end transition-all">
          <span className="text-2xl font-bold text-emerald-400 transition-all">{progressPercent}%</span>
          <span className="text-xs text-gray-400">{totalCompleted} / {chapters.length} 章 完了</span>
        </div>
        <div className="w-full bg-gray-900 rounded-full h-2.5 mb-2 overflow-hidden">
          <div className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <AddChapterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} bookId={bookId} />

      <div className="space-y-3">
        <div className="flex justify-between items-center pl-1">
          <h3 className="text-sm font-bold text-gray-300">担当範囲と進捗</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <Plus size={14} />
            <span>章を追加</span>
          </button>
        </div>
        {chapters.map((chapter) => (
          <div key={chapter.id} className="bg-gray-800 rounded-xl p-4 flex items-center gap-4 border border-gray-700/30 transition-all hover:border-gray-600">
            <button 
              onClick={() => toggleComplete(chapter.id)}
              className="flex-shrink-0 text-gray-400 hover:text-emerald-500 transition-colors"
            >
              {chapter.completed ? (
                <CheckCircle2 size={24} className="text-emerald-500" />
              ) : (
                <Circle size={24} />
              )}
            </button>
            <div className="flex-1">
              <h4 className={`text-sm font-bold transition-colors ${chapter.completed ? 'text-gray-400 line-through' : 'text-gray-100'}`}>
                {chapter.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">{chapter.pages}</p>
            </div>
            <div className="flex-shrink-0">
              <span className={`text-xs px-2 py-1 rounded transition-colors ${
                chapter.assignedTo === '未定' ? 'bg-gray-700 text-gray-400' : 'bg-blue-500/20 text-blue-300'
              }`}>
                担当: {chapter.assignedTo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
