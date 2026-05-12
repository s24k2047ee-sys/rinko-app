"use client";

import { useState, useRef } from "react";
import { UploadCloud } from "lucide-react";
import { addMaterial } from "../actions/materials";

export default function AddMaterialForm() {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB to be safe for base64 in Server Action)
    if (file.size > 5 * 1024 * 1024) {
      alert("ファイルサイズは5MB以下にしてください");
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result as string;
        
        // Determine type
        let type = 'other';
        if (file.type.includes('pdf')) type = 'pdf';
        else if (file.type.includes('presentation') || file.name.endsWith('.ppt') || file.name.endsWith('.pptx')) type = 'ppt';
        else if (file.type.includes('document') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) type = 'word';

        // Size string
        const sizeStr = file.size > 1024 * 1024 
          ? (file.size / (1024 * 1024)).toFixed(1) + 'MB'
          : Math.round(file.size / 1024) + 'KB';

        await addMaterial({
          name: file.name,
          size: sizeStr,
          user: "ユーザー", // In a real app, get from auth
          type,
          fileData: base64Data,
        });

        alert("アップロード完了しました");
        window.location.reload();
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
      alert("アップロードに失敗しました");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-700 bg-gray-800/50 rounded-xl p-8 flex flex-col items-center justify-center text-center">
      <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-3">
        <UploadCloud size={24} />
      </div>
      <h3 className="font-bold text-gray-200 mb-1">資料をアップロード</h3>
      <p className="text-xs text-gray-500 mb-4">PDF, Word, PowerPoint形式に対応 (最大5MB)</p>
      
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.ppt,.pptx"
      />
      <button 
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition disabled:opacity-50"
      >
        {isUploading ? "アップロード中..." : "ファイルを選択"}
      </button>
    </div>
  );
}
