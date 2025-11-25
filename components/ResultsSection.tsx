import React, { useState } from 'react';
import { AnalysisResult, CategoryScore } from '../types';
import { TaxonomyChart } from './TaxonomyChart';
import { Download, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface ResultsSectionProps {
  result: AnalysisResult;
  onClear: () => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ result, onClear }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-red-700 bg-red-50 border-red-200';
      case 'High': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Medium': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-700 bg-green-50 border-green-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 50) return 'text-orange-500';
    if (score >= 20) return 'text-yellow-500';
    return 'text-green-500';
  };

  const toggleCategory = (name: string) => {
    setExpandedCategory(expandedCategory === name ? null : name);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(result, null, 2)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = "pai_hazard_report.json";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full animate-fadeIn">
      {/* Header Result */}
      <div className="p-6 border-b border-slate-100 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Risk Analysis Report</h2>
          <div className="flex items-center gap-2 mt-1">
             <span className={`text-2xl font-black ${getScoreColor(result.overallRiskScore)}`}>
               {result.overallRiskScore}
             </span>
             <span className="text-slate-400 text-sm uppercase font-semibold">/ 100 Overall Risk</span>
          </div>
        </div>
        <button 
          onClick={handleDownload}
          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          title="Download JSON Report"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>

      <div className="overflow-y-auto flex-grow custom-scrollbar">
        <div className="p-6 space-y-8">
          
          {/* Summary */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-500" /> Executive Summary
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              {result.summary}
            </p>
          </div>

          {/* Chart */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">CICTT Taxonomy Visualization</h3>
            <TaxonomyChart data={result.categories} />
          </div>

          {/* Categories Detail */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Detailed Factors</h3>
            <div className="space-y-3">
              {result.categories.map((category) => (
                <div 
                  key={category.name} 
                  className={`border rounded-lg transition-all duration-200 ${expandedCategory === category.name ? 'border-blue-300 ring-1 ring-blue-100' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <button 
                    onClick={() => toggleCategory(category.name)}
                    className="w-full flex items-center justify-between p-4 focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${getRiskColor(category.riskLevel)}`}>
                        {category.acronym}
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-slate-800">{category.name}</h4>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-500">Score: {category.score}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${getRiskColor(category.riskLevel)}`}>
                            {category.riskLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                    {expandedCategory === category.name ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>
                  
                  {expandedCategory === category.name && (
                    <div className="px-4 pb-4 border-t border-slate-100 pt-3">
                      <p className="text-xs font-semibold text-slate-500 mb-2 uppercase">Contributing Factors</p>
                      {category.factors.length > 0 ? (
                        <ul className="space-y-2">
                          {category.factors.map((factor, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                              <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                              <span>{factor}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-slate-400 italic flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" /> No significant hazards detected.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

           {/* Recommendations */}
           {result.recommendations && result.recommendations.length > 0 && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-5">
              <h3 className="text-emerald-900 font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Mitigation Recommendations
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-emerald-800">
                {result.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
      
      <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl flex justify-center">
        <button 
          onClick={onClear}
          className="text-sm text-slate-500 hover:text-blue-600 font-medium transition-colors"
        >
          Start New Analysis
        </button>
      </div>
    </div>
  );
};