import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ResultsSection } from './components/ResultsSection';
import { analyzeIncident, recalculateOverallScore } from './services/keywordService';
import { AnalysisResult, CategoryResult } from './types';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useEffect } from 'react';

export default function App() {
  const [inputText, setInputText] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 👇 AUTO-HEIGHT IFRAME RESIZE LOGIC
  useEffect(() => {
    const sendHeight = () => {
      const height =
        document.documentElement.scrollHeight ||
        document.body.scrollHeight;

      if (window.parent) {
        window.parent.postMessage(
          {
            type: 'pai-hazard-resize',
            height,
          },
          '*'
        );
      }
    };

    // Send height initially
    sendHeight();

    // Update height when window resizes
    window.addEventListener('resize', sendHeight);

    // Optional: keep sending height periodically (helps when content expands)
    const intervalId = setInterval(sendHeight, 600);

    return () => {
      window.removeEventListener('resize', sendHeight);
      clearInterval(intervalId);
    };
  }, []);

  const handleAnalysis = useCallback(async () => {
    if (!inputText.trim()) {
      setError("Please enter or upload text to analyze.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysis = await analyzeIncident(inputText);
      setResult(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred during analysis.");
    } finally {
      setLoading(false);
    }
  }, [inputText]);

  const handleUpdateCategories = useCallback((updatedCategories: CategoryResult[]) => {
    if (result) {
      const { score, level } = recalculateOverallScore(updatedCategories);
      setResult({
        ...result,
        categories: updatedCategories,
        overallRiskScore: score,
        overallRiskLevel: level,
      });
    }
  }, [result]);

  const handleClear = useCallback(() => {
    setInputText('');
    setResult(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          
          {/* Left Column: Input */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                1. Input Hazard Data
              </h2>
              <InputSection 
                value={inputText} 
                onChange={setInputText} 
                onAnalyze={handleAnalysis}
                isLoading={loading}
              />
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-2">About CICTT Taxonomy</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                The CICTT (Contribution to Inadequacy and Contribution to Threat) taxonomy is the official
                <span className="font-semibold"> CAST/ICAO occurrence classification system</span> used in aviation safety analysis.
                Use this tool to rapidly classify aviation incidents and hazards using the standard CICTT framework
                to identify contributing factors and safety patterns.
              </p>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="flex flex-col h-full min-h-[400px]">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-slate-400">
                <Loader2 className="w-12 h-12 animate-spin mb-4 text-blue-600" />
                <p className="text-lg font-medium text-slate-600">Analyzing Incident...</p>
                <p className="text-sm text-slate-500 mt-2">Analyzing incident text...</p>
              </div>
            ) : result ? (
              <ResultsSection result={result} onClear={handleClear} onUpdateCategories={handleUpdateCategories} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-slate-100/50 rounded-xl border-2 border-dashed border-slate-300 p-12 text-slate-400">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🛡️</span>
                </div>
                <p className="text-lg font-medium text-slate-500">Ready to Analyze</p>
                <p className="text-sm text-slate-400 text-center max-w-xs mt-2">
                  Paste system prompts, model cards, or incident reports on the left to generate a risk report.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} PAI Hazard Identification Applet. Using CAST/ICAO CICTT Taxonomy.</p>
        </div>
      </footer>
    </div>
  );
}