"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { addThread } from "../actions/board";

export default function AddThreadModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    tags: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addThread(formData);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("質問の追加に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-850">
          <h2 className="font-bold text-white text-lg">質問を投稿</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">タイトル（質問内容）</label>
            <input 
              required
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
              placeholder="例: パーセプトロンの実装でエラーが出ます"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">投稿者</label>
            <input 
              required
              type="text" 
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
              placeholder="例: 山田"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">タグ（カンマ区切り）</label>
            <input 
              required
              type="text" 
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors" 
              placeholder="例: 第2章,環境構築"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl mt-4 shadow-lg shadow-emerald-900/20 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "投稿中..." : "投稿する"}
          </button>
        </form>
      </div>
    </div>
  );
}
