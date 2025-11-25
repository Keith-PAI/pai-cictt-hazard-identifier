import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { CategoryResult } from '../types';
import { CICTT_GROUPS } from '../services/cicttTaxonomy';

interface TaxonomyChartProps {
  data: CategoryResult[];
  showAll?: boolean;
}

interface ChartDataItem {
  name: string;
  code: string;
  score: number;
  riskLevel: string;
  group: string;
}

interface GroupedData {
  [key: string]: ChartDataItem[];
}

// Risk level color mapping
const getRiskColor = (score: number): string => {
  if (score >= 80) return '#ef4444'; // Critical - red
  if (score >= 51) return '#f97316'; // High - orange
  if (score >= 21) return '#eab308'; // Medium - yellow
  return '#22c55e'; // Low - green
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-slate-300 shadow-lg rounded-lg z-50">
        <p className="font-semibold text-slate-800 mb-1">{data.code}</p>
        <p className="text-sm text-slate-700 mb-2">{data.name}</p>
        <p className="text-sm font-medium" style={{ color: getRiskColor(data.score) }}>
          Score: {data.score}/100
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Risk Level: {data.riskLevel}
        </p>
      </div>
    );
  }
  return null;
};

export const TaxonomyChart: React.FC<TaxonomyChartProps> = ({ data, showAll = false }) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(CICTT_GROUPS)
  );

  // Filter data based on showAll flag
  const filteredData = showAll ? data : data.filter(d => d.isEnabled);

  // Group data by category group
  const groupedData: GroupedData = {};
  filteredData.forEach(item => {
    if (!groupedData[item.group]) {
      groupedData[item.group] = [];
    }
    groupedData[item.group].push({
      name: item.name,
      code: item.code,
      score: item.score,
      riskLevel: item.riskLevel,
      group: item.group
    });
  });

  // Sort categories within each group by score (descending)
  Object.keys(groupedData).forEach(group => {
    groupedData[group].sort((a, b) => b.score - a.score);
  });

  const toggleGroup = (group: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(group)) {
      newExpanded.delete(group);
    } else {
      newExpanded.add(group);
    }
    setExpandedGroups(newExpanded);
  };

  return (
    <div className="w-full space-y-6">
      {CICTT_GROUPS.map(group => {
        const categories = groupedData[group];
        if (!categories || categories.length === 0) return null;

        const isExpanded = expandedGroups.has(group);
        const maxScore = Math.max(...categories.map(c => c.score), 100);

        return (
          <div key={group} className="space-y-2">
            {/* Group Header - Collapsible */}
            <button
              onClick={() => toggleGroup(group)}
              className="w-full flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-left"
            >
              <span className="text-slate-700 font-semibold flex-1">
                {group}
              </span>
              <span className="text-slate-600 text-sm">
                {categories.length} categories
              </span>
              <span className={`text-slate-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {/* Group Content - Horizontal Bar Chart */}
            {isExpanded && (
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <ResponsiveContainer
                  width="100%"
                  height={Math.max(300, categories.length * 35)}
                >
                  <BarChart
                    data={categories}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      type="number"
                      domain={[0, maxScore]}
                      stroke="#94a3b8"
                      tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <YAxis
                      dataKey="code"
                      type="category"
                      stroke="#94a3b8"
                      tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }}
                      width={190}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="score"
                      fill="#3b82f6"
                      radius={[0, 4, 4, 0]}
                      isAnimationActive={true}
                    >
                      {categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getRiskColor(entry.score)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>

                {/* Legend for risk levels */}
                <div className="mt-4 flex flex-wrap gap-4 text-xs justify-center border-t border-slate-200 pt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: '#22c55e' }} />
                    <span className="text-slate-700">Low (0-20)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: '#eab308' }} />
                    <span className="text-slate-700">Medium (21-50)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: '#f97316' }} />
                    <span className="text-slate-700">High (51-79)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ef4444' }} />
                    <span className="text-slate-700">Critical (80-100)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {filteredData.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          <p>No categories to display</p>
        </div>
      )}
    </div>
  );
};