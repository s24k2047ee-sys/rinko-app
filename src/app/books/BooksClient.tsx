"use client";

import { useState } from "react";
import { Book as BookIcon, Plus, Search, MoreVertical } from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  status: string;
  coverColor: string;
}

export default function BooksClient({ initialBooks }: { initialBooks: Book[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredBooks = initialBooks.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 mr-4">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="書籍を検索..." 
            className="w-full bg-gray-800 border border-gray-700 text-sm text-white rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-105 active:scale-95">
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="bg-gray-800 rounded-xl p-3 flex gap-4 border border-gray-700/50 shadow-sm relative overflow-hidden transition-colors hover:border-gray-600 cursor-pointer group">
              <div className={`w-20 h-28 rounded shadow-md flex-shrink-0 bg-gradient-to-br ${book.coverColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                <BookIcon size={24} className="text-white/30" />
              </div>
              <div className="flex-1 py-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-100 text-sm mb-1 leading-tight group-hover:text-emerald-400 transition-colors">{book.title}</h3>
                  <button className="text-gray-500 hover:text-gray-300 transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mb-2">{book.author} / {book.publisher}</p>
                
                <div className="mt-auto">
                  <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                    book.status === "進行中" ? "bg-emerald-500/20 text-emerald-400" :
                    book.status === "読了" ? "bg-gray-700 text-gray-300" : "bg-orange-500/20 text-orange-400"
                  }`}>
                    {book.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 text-sm">
            書籍が見つかりません
          </div>
        )}
      </div>
    </div>
  );
}
