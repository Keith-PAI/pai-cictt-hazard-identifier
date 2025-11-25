import React, { useRef } from 'react';
import { Upload, Play, X } from 'lucide-react';

interface InputSectionProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ value, onChange, onAnalyze, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onChange(text);
      };
      reader.readAsText(file);
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="relative flex-grow">
        <textarea
          className="w-full h-96 p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-slate-700 text-sm font-mono bg-slate-50 transition-all duration-200 ease-in-out placeholder:text-slate-400"
          placeholder="Paste AI system prompts, technical documentation, incident reports, or model cards here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isLoading}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute top-4 right-4 p-1 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-600 transition-colors"
            title="Clear text"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".txt,.md,.json,.csv"
          />
          <button
            onClick={handleTriggerUpload}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <Upload className="w-4 h-4" />
            Upload File
          </button>
          <span className="text-xs text-slate-400 hidden sm:inline">.txt, .md, .json</span>
        </div>

        <button
          onClick={onAnalyze}
          disabled={isLoading || !value.trim()}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-white text-sm font-bold shadow-sm transition-all w-full sm:w-auto
            ${isLoading || !value.trim() 
              ? 'bg-slate-400 cursor-not-allowed opacity-70' 
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md active:transform active:scale-95'
            }`}
        >
          {isLoading ? (
            'Processing...'
          ) : (
            <>
              Run Analysis <Play className="w-4 h-4 fill-current" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};