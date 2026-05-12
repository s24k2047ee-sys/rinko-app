"use client";

import { useState } from "react";
import { Save, Eye, Edit3, Image as ImageIcon, Code, List } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { saveMemo } from "../actions/editor";

export default function EditorClient({ initialMemo }: { initialMemo: any }) {
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const defaultContent = "# 第2章 パーセプトロンのまとめ\n\nパーセプトロンは複数の信号を入力として受け取り、一つの信号を出力する。\n\n## ANDゲートの実装\n\n```python\ndef AND(x1, x2):\n    w1, w2, theta = 0.5, 0.5, 0.7\n    tmp = x1*w1 + x2*w2\n    if tmp <= theta:\n        return 0\n    elif tmp > theta:\n        return 1\n```\n\n### 重要なポイント\n- パーセプトロンは線形分離可能な問題しか解けない\n- XORゲートは単層パーセプトロンでは実現できない";
  
  const [content, setContent] = useState(initialMemo?.content || defaultContent);
  const [title, setTitle] = useState(initialMemo?.title || "パーセプトロンのまとめ");

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveMemo({ id: initialMemo?.id, title, content });
      alert("保存しました");
    } catch (error) {
      console.error(error);
      alert("保存に失敗しました");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] sm:h-[calc(100vh-80px)]">
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-2 items-center flex-1 mr-4">
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-800 text-white font-bold px-3 py-1.5 rounded-lg border border-gray-700 focus:outline-none focus:border-emerald-500 w-full max-w-sm"
            placeholder="メモのタイトル"
          />
          <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700 shrink-0">
            <button 
              onClick={() => setIsPreview(false)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition ${!isPreview ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
            >
              <Edit3 size={14} /> 編集
            </button>
            <button 
              onClick={() => setIsPreview(true)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition ${isPreview ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
            >
              <Eye size={14} /> プレビュー
            </button>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition disabled:opacity-50"
        >
          <Save size={14} /> {isSaving ? "保存中..." : "保存"}
        </button>
      </div>

      {!isPreview && (
        <div className="bg-gray-800 border-x border-t border-gray-700 rounded-t-lg p-2 flex gap-2 overflow-x-auto">
          <button className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded"><span className="font-bold font-serif">B</span></button>
          <button className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded"><span className="italic font-serif">I</span></button>
          <div className="w-px h-5 bg-gray-700 my-auto mx-1"></div>
          <button className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded"><List size={16} /></button>
          <button className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded"><Code size={16} /></button>
          <button className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded"><ImageIcon size={16} /></button>
        </div>
      )}

      <div className={`flex-1 border border-gray-700 overflow-hidden ${!isPreview ? 'rounded-b-lg' : 'rounded-lg bg-gray-900'} relative flex flex-col`}>
        {!isPreview ? (
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 w-full bg-gray-900 text-gray-200 p-4 resize-none focus:outline-none focus:ring-1 focus:ring-emerald-500/50 font-mono text-sm leading-relaxed"
            placeholder="マークダウンでメモを入力..."
          ></textarea>
        ) : (
          <div className="flex-1 p-5 overflow-y-auto prose prose-invert prose-emerald prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code(props) {
                  const {children, className, node, ...rest} = props
                  const match = /language-(\w+)/.exec(className || '')
                  const Highlighter = SyntaxHighlighter as any;
                  return match ? (
                    <Highlighter
                      {...rest}
                      PreTag="div"
                      children={String(children).replace(/\n$/, '')}
                      language={match[1]}
                      style={vscDarkPlus as any}
                    />
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
