import React, { useState, useMemo } from 'react';
import { AnalysisResult, CategoryResult, RiskLevel } from '../types';
import { TaxonomyChart } from './TaxonomyChart';
import {
  Download, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Info,
  Search, Plus, X
} from 'lucide-react';
import {
  getAllCategories,
  recalculateOverallScore,
  createManualCategory,
  getAllGroups
} from '../services/keywordService';

interface ResultsSectionProps {
  result: AnalysisResult;
  onClear: () => void;
  onUpdateCategories?: (categories: CategoryResult[]) => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ result, onClear, onUpdateCategories }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'detected' | 'manual'>('detected');
  const [sortBy, setSortBy] = useState<'score' | 'name' | 'group'>('score');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<CategoryResult[]>(result.categories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addSearchTerm, setAddSearchTerm] = useState('');

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'Critical': return 'text-red-700 bg-red-50 border-red-200';
      case 'High': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Medium': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-700 bg-green-50 border-green-200';
    }
  };

  const getRiskBgColor = (level: RiskLevel) => {
    switch (level) {
      case 'Critical': return 'bg-red-100';
      case 'High': return 'bg-orange-100';
      case 'Medium': return 'bg-yellow-100';
      case 'Low': return 'bg-green-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 50) return 'text-orange-500';
    if (score >= 20) return 'text-yellow-500';
    return 'text-green-500';
  };

  // Calculate overall score when categories change
  const overallScore = useMemo(() => {
    return recalculateOverallScore(categories);
  }, [categories]);

  // Filter and sort categories
  const filteredCategories = useMemo(() => {
    let filtered = categories;

    // Apply filter mode
    if (filterMode === 'detected') {
      filtered = filtered.filter(c => c.score > 0);
    } else if (filterMode === 'manual') {
      filtered = filtered.filter(c => c.isManuallyAdded);
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(term) ||
        c.code.toLowerCase().includes(term) ||
        c.group.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    const sorted = [...filtered];
    if (sortBy === 'score') {
      sorted.sort((a, b) => b.score - a.score);
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'group') {
      sorted.sort((a, b) => a.group.localeCompare(b.group));
    }

    return sorted;
  }, [categories, filterMode, sortBy, searchTerm]);

  // Group categories by group
  const groupedCategories = useMemo(() => {
    const groups: { [key: string]: CategoryResult[] } = {};
    filteredCategories.forEach(cat => {
      if (!groups[cat.group]) {
        groups[cat.group] = [];
      }
      groups[cat.group].push(cat);
    });
    return groups;
  }, [filteredCategories]);

  const toggleCategory = (code: string) => {
    setExpandedCategory(expandedCategory === code ? null : code);
  };

  const toggleCategoryEnabled = (code: string) => {
    const updated = categories.map(c =>
      c.code === code ? { ...c, isEnabled: !c.isEnabled } : c
    );
    setCategories(updated);
    onUpdateCategories?.(updated);
  };

  const updateCategoryWeight = (code: string, weight: number) => {
    const updated = categories.map(c =>
      c.code === code ? { ...c, userWeight: weight } : c
    );
    setCategories(updated);
    onUpdateCategories?.(updated);
  };

  const addManualCategory = (code: string) => {
    const existing = categories.find(c => c.code === code);
    if (!existing) {
      const manualCat = createManualCategory(code);
      if (manualCat) {
        const updated = [...categories, manualCat];
        setCategories(updated);
        onUpdateCategories?.(updated);
      }
    }
    setShowAddModal(false);
    setAddSearchTerm('');
  };

  const removeManualCategory = (code: string) => {
    const updated = categories.filter(c => c.code !== code || !c.isManuallyAdded);
    setCategories(updated);
    onUpdateCategories?.(updated);
  };

  // Get undetected categories for manual add
  const undetectedCategories = useMemo(() => {
    const allCats = getAllCategories();
    return allCats.filter(cat => !categories.some(c => c.code === cat.code));
  }, [categories]);

  const filteredUndetectedCategories = useMemo(() => {
    if (!addSearchTerm) return undetectedCategories;
    const term = addSearchTerm.toLowerCase();
    return undetectedCategories.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.code.toLowerCase().includes(term)
    );
  }, [undetectedCategories, addSearchTerm]);

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify({
      ...result,
      categories,
      overallRiskScore: overallScore.score,
      overallRiskLevel: overallScore.level
    }, null, 2)], { type: 'application/json' });
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
            <span className={`text-2xl font-black ${getScoreColor(overallScore.score)}`}>
              {overallScore.score}
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
        <div className="p-6 space-y-6">

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
            <TaxonomyChart data={categories} />
          </div>

          {/* Filter and Sort Controls */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {/* Filter buttons */}
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterMode === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterMode('detected')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterMode === 'detected'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Detected
              </button>
              <button
                onClick={() => setFilterMode('manual')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterMode === 'manual'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Manual
              </button>

              {/* Sort dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'score' | 'name' | 'group')}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <option value="score">Sort: By Score</option>
                <option value="name">Sort: By Name</option>
                <option value="group">Sort: By Group</option>
              </select>
            </div>

            {/* Search box */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Categories Detail - Grouped */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Detailed Factors ({filteredCategories.length} shown)
              </h3>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Category
              </button>
            </div>

            <div className="space-y-6">
              {Object.entries(groupedCategories).length > 0 ? (
                Object.entries(groupedCategories).map(([group, groupCats]: [string, CategoryResult[]]) => (
                  <div key={group} className="space-y-2">
                    <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-2">
                      {group}
                    </h4>
                    <div className="space-y-2">
                      {groupCats.map((category) => (
                        <div
                          key={category.code}
                          className={`border rounded-lg transition-all duration-200 ${
                            expandedCategory === category.code
                              ? 'border-blue-300 ring-1 ring-blue-100'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <button
                            onClick={() => toggleCategory(category.code)}
                            className="w-full flex items-center justify-between p-4 focus:outline-none"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              {/* Checkbox */}
                              <input
                                type="checkbox"
                                checked={category.isEnabled}
                                onChange={() => toggleCategoryEnabled(category.code)}
                                onClick={(e) => e.stopPropagation()}
                                className="w-4 h-4 cursor-pointer accent-blue-600"
                              />

                              {/* Category Badge */}
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white ${getRiskBgColor(
                                  category.riskLevel
                                )}`}
                              >
                                {category.code.split('-')[0]}
                              </div>

                              {/* Category Info */}
                              <div className="text-left flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-slate-800">
                                    {category.code} - {category.name}
                                  </h4>
                                  {category.isManuallyAdded && (
                                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">
                                      MANUAL
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-xs mt-1">
                                  <span className={`px-2 py-0.5 rounded font-bold text-white ${
                                    category.riskLevel === 'Critical'
                                      ? 'bg-red-600'
                                      : category.riskLevel === 'High'
                                      ? 'bg-orange-600'
                                      : category.riskLevel === 'Medium'
                                      ? 'bg-yellow-600'
                                      : 'bg-green-600'
                                  }`}>
                                    {category.riskLevel}
                                  </span>
                                  <span className={`font-bold ${getScoreColor(category.score)}`}>
                                    Score: {category.score}
                                  </span>
                                  {category.userWeight !== 1.0 && (
                                    <span className="text-slate-500">
                                      Weight: {category.userWeight.toFixed(1)}x
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {expandedCategory === category.code ? (
                              <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                            )}
                          </button>

                          {/* Expanded Details */}
                          {expandedCategory === category.code && (
                            <div className="px-4 pb-4 border-t border-slate-100 pt-4 space-y-4">
                              {/* Matched Keywords */}
                              {category.matchedKeywords.length > 0 && (
                                <div>
                                  <p className="text-xs font-semibold text-slate-500 mb-2 uppercase">
                                    Matched Keywords
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {category.matchedKeywords.map((kw, idx) => (
                                      <span
                                        key={idx}
                                        className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded border border-slate-200"
                                      >
                                        {kw.word} <span className="text-slate-500">({kw.count})</span>
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Weight Slider */}
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-xs font-semibold text-slate-500 uppercase">
                                    Weight Multiplier
                                  </p>
                                  <span className="text-sm font-bold text-slate-700">
                                    {category.userWeight.toFixed(1)}x
                                  </span>
                                </div>
                                <input
                                  type="range"
                                  min="0.5"
                                  max="2.0"
                                  step="0.1"
                                  value={category.userWeight}
                                  onChange={(e) =>
                                    updateCategoryWeight(category.code, parseFloat(e.target.value))
                                  }
                                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between text-xs text-slate-500 mt-1">
                                  <span>0.5x</span>
                                  <span>1.0x</span>
                                  <span>2.0x</span>
                                </div>
                              </div>

                              {/* Remove button for manual categories */}
                              {category.isManuallyAdded && (
                                <button
                                  onClick={() => removeManualCategory(category.code)}
                                  className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                  <X className="w-4 h-4" /> Remove Category
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 italic text-center py-8">
                  No categories match your search and filters.
                </p>
              )}
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

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Add Category</h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setAddSearchTerm('');
                }}
                className="p-1 hover:bg-slate-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="p-4 border-b border-slate-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={addSearchTerm}
                  onChange={(e) => setAddSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>

            <div className="overflow-y-auto flex-grow custom-scrollbar">
              <div className="p-4 space-y-2">
                {filteredUndetectedCategories.length > 0 ? (
                  filteredUndetectedCategories.map((cat) => (
                    <button
                      key={cat.code}
                      onClick={() => addManualCategory(cat.code)}
                      className="w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-slate-800">
                          {cat.code} - {cat.name}
                        </p>
                        <p className="text-xs text-slate-500">{cat.group}</p>
                      </div>
                      <Plus className="w-4 h-4 text-slate-400" />
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 italic text-center py-8">
                    All categories are already added.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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