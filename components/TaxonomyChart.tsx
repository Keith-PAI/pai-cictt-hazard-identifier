import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { CategoryScore } from '../types';

interface TaxonomyChartProps {
  data: CategoryScore[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg">
        <p className="font-semibold text-slate-800 mb-1">{label}</p>
        <p className="text-sm text-blue-600 font-medium">
          Score: {payload[0].value}/100
        </p>
        <p className="text-xs text-slate-500 mt-1">
          {payload[0].payload.riskLevel} Risk
        </p>
      </div>
    );
  }
  return null;
};

export const TaxonomyChart: React.FC<TaxonomyChartProps> = ({ data }) => {
  // Transform data slightly if needed, but Recharts handles array of objects well
  const chartData = data.map(d => ({
    subject: d.name,
    score: d.score,
    fullData: d
  }));

  return (
    <div className="w-full h-64 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="#cbd5e1" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fontSize: 10 }}
            tickCount={5}
            stroke="#94a3b8"
          />
          <Radar
            name="Risk Score"
            dataKey="score"
            stroke="#2563eb"
            strokeWidth={2}
            fill="#3b82f6"
            fillOpacity={0.4}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};