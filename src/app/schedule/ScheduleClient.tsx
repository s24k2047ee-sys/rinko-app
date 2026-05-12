"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, User, Plus } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import AddEventModal from "./AddEventModal";

interface Event {
  id: number;
  date: Date;
  time: string;
  location: string;
  members: string;
  target: string;
  isNext: boolean;
}

export default function ScheduleClient({ events }: { events: Event[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
            <CalendarIcon size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">定例ゼミ</p>
            <p className="text-xs text-gray-400">毎週金曜日 3限 (14:40-16:10)</p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-105 active:scale-95"
        >
          <Plus size={20} />
        </button>
      </div>

      <AddEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="relative border-l border-gray-700 ml-4 space-y-8 pb-4">
        {events.map((item) => (
          <div key={item.id} className="relative pl-6">
            {item.isNext ? (
              <span className="absolute -left-2.5 top-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-gray-950 shadow-sm shadow-emerald-500/50 flex items-center justify-center"></span>
            ) : (
              <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-gray-600 border-2 border-gray-950"></span>
            )}
            
            <div className={`bg-gray-800 rounded-xl p-4 border ${item.isNext ? 'border-emerald-500/50 shadow-md shadow-emerald-900/20' : 'border-gray-700/50'}`}>
              {item.isNext && (
                <span className="text-[10px] font-bold bg-emerald-500 text-gray-900 px-2 py-0.5 rounded-full mb-2 inline-block">次回のゼミ</span>
              )}
              <h3 className={`font-bold text-lg mb-2 ${item.isNext ? 'text-emerald-400' : 'text-gray-200'}`}>
                {format(new Date(item.date), "M月d日(E)", { locale: ja })}
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock size={14} />
                  <span>{item.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin size={14} />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200 mt-2 bg-gray-900/50 p-2 rounded-lg">
                  <User size={14} className="text-blue-400" />
                  <span className="font-medium">担当: {item.members}</span>
                  <span className="text-gray-500 ml-auto text-xs">{item.target}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
