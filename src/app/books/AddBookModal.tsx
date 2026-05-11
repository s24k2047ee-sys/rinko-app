"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { addBook } from "../actions/books";

export default function AddBookModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    coverColor: "from-blue-600 to-indigo-900",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addBook(formData);
      onClose();
      // Ideally, trigger a refresh or use optimistic updates
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("書籍の追加に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const colors = [
    { label: "ブルー", value: "from-blue-600 to-indigo-900" },
    { label: "グリーン", value: "from-emerald-600 to-teal-900" },
    { label: "オレンジ", value: "from-orange-500 to-red-800" },
    { label: "パープル", value: "from-purple-600 to-fuchsia-900" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-850">
          <h2 className="font-bold text-white text-lg">書籍を追加</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">タイトル</label>
            <input 
              required
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
              placeholder="例: ゼロから作るDeep Learning"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">著者</label>
            <input 
              required
              type="text" 
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
              placeholder="例: 斎藤 康毅"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">出版社</label>
            <input 
              required
              type="text" 
              value={formData.publisher}
              onChange={(e) => setFormData({...formData, publisher: e.target.value})}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
              placeholder="例: オライリー・ジャパン"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">カバーカラー</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {colors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setFormData({...formData, coverColor: c.value})}
                  className={`h-10 rounded-lg bg-gradient-to-br ${c.value} border-2 transition-all ${
                    formData.coverColor === c.value ? "border-white scale-105 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl mt-4 shadow-lg shadow-emerald-900/20 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "追加中..." : "書籍を登録する"}
          </button>
        </form>
      </div>
    </div>
  );
}
