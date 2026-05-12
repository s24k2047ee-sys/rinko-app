import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";
import { FileText, Download, Folder } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import AddMaterialForm from "./AddMaterialForm";

export default async function MaterialsPage() {
  const materials = await prisma.material.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <AddMaterialForm />

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
                {file.fileData ? (
                  <a 
                    href={file.fileData} 
                    download={file.name}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-gray-700 rounded-full transition shrink-0"
                  >
                    <Download size={16} />
                  </a>
                ) : (
                  <button className="w-8 h-8 flex items-center justify-center text-gray-400 opacity-50 cursor-not-allowed rounded-full transition shrink-0">
                    <Download size={16} />
                  </button>
                )}
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
