import prisma from "@/lib/prisma";
import { FileText, Download, UploadCloud, Folder } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export default async function MaterialsPage() {
  const materials = await prisma.material.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-gray-700 bg-gray-800/50 rounded-xl p-8 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-3">
          <UploadCloud size={24} />
        </div>
        <h3 className="font-bold text-gray-200 mb-1">資料をアップロード</h3>
        <p className="text-xs text-gray-500 mb-4">PDF, Word, PowerPoint形式に対応 (最大10MB)</p>
        <button className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
          ファイルを選択
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-300 flex items-center gap-2">
            <Folder size={16} className="text-emerald-400" /> アップロード済み資料
          </h2>
        </div>

        <div className="space-y-3">
          {materials.length > 0 ? (
            materials.map((file) => (
              <div key={file.id} className="bg-gray-800 rounded-xl p-3 border border-gray-700/50 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center shrink-0">
                  <FileText size={20} className={
                    file.type === 'pdf' ? 'text-red-400' : 
                    file.type === 'ppt' ? 'text-orange-400' : 'text-blue-400'
                  } />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-200 text-sm truncate">{file.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-gray-500">{file.size}</span>
                    <span className="text-[10px] text-gray-500">•</span>
                    <span className="text-[10px] text-gray-400">{file.user}</span>
                    <span className="text-[10px] text-gray-500">•</span>
                    <span className="text-[10px] text-gray-500">{format(new Date(file.createdAt), "M月d日", { locale: ja })}</span>
                  </div>
                </div>
                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-gray-700 rounded-full transition shrink-0">
                  <Download size={16} />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500 text-sm">
              資料がありません
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
