export interface CategoryScore {
  name: string; // The "C", "I", "C", "T", "T" full names
  acronym: string; // C, I, C, T, T
  score: number; // 0-100
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  factors: string[];
}

export interface AnalysisResult {
  summary: string;
  overallRiskScore: number;
  overallRiskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  categories: CategoryScore[];
  recommendations: string[];
}
