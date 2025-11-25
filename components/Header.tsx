import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">Aviation Hazard ID</h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide">CAST/ICAO CICTT CLASSIFIER</p>
          </div>
        </div>
        <div className="hidden sm:block">
           <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            v1.0.0
          </span>
        </div>
      </div>
    </header>
  );
};