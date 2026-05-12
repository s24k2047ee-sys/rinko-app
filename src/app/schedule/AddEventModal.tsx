"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { addEvent } from "../actions/schedule";

export default function AddEventModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "14:40-16:10",
    location: "未定",
    members: "",
    target: "",
    isNext: false,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addEvent({
        ...formData,
        date: new Date(formData.date),
      });
      onClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("日程の追加に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-850">
          <h2 className="font-bold text-white text-lg">日程を追加</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">日付</label>
            <input 
              required
              type="date" 
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">時間</label>
            <input 
              required
              type="text" 
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
              placeholder="例: 14:40-16:10"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">場所</label>
            <input 
              required
              type="text" 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
              placeholder="例: 12号館 3階 演習室"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">担当者</label>
            <input 
              required
              type="text" 
              value={formData.members}
              onChange={(e) => setFormData({...formData, members: e.target.value})}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
              placeholder="例: 山田、佐藤"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">内容・対象</label>
            <input 
              required
              type="text" 
              value={formData.target}
              onChange={(e) => setFormData({...formData, target: e.target.value})}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
              placeholder="例: 第1章 発表"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer mt-2">
            <input 
              type="checkbox" 
              checked={formData.isNext}
              onChange={(e) => setFormData({...formData, isNext: e.target.checked})}
              className="w-4 h-4 text-emerald-500 bg-gray-900 border-gray-700 rounded focus:ring-emerald-500 focus:ring-2"
            />
            <span className="text-sm text-gray-300">次回のゼミとしてハイライトする</span>
          </label>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl mt-4 shadow-lg shadow-emerald-900/20 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "追加中..." : "日程を追加する"}
          </button>
        </form>
      </div>
    </div>
  );
}
