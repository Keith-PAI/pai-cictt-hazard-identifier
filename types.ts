// Risk level type for reuse
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

// Matched keyword information
export interface MatchedKeyword {
  word: string;      // The keyword that was matched
  count: number;     // How many times it appeared
  weight: number;    // The severity weight (1-10)
}

// Individual category result
export interface CategoryResult {
  code: string;                    // CICTT code (e.g., "LOC-I")
  name: string;                    // Full name
  group: string;                   // Category group for UI grouping
  score: number;                   // 0-100 calculated score
  riskLevel: RiskLevel;
  matchedKeywords: MatchedKeyword[];  // Keywords found in text
  userWeight: number;              // User adjustment multiplier (0.5-2.0), default 1.0
  isManuallyAdded: boolean;        // True if user added manually
  isEnabled: boolean;              // User can toggle categories on/off
}

// Legacy compatibility: CategoryScore for Gemini service
export interface CategoryScore {
  name: string;                    // The "C", "I", "C", "T", "T" full names
  acronym: string;                 // C, I, C, T, T
  score: number;                   // 0-100
  riskLevel: RiskLevel;
  factors: string[];               // Contributing factors
}

// Full analysis result
export interface AnalysisResult {
  summary: string;                 // Generated summary text
  overallRiskScore: number;        // 0-100
  overallRiskLevel: RiskLevel;
  categories: CategoryResult[];    // All detected + manually added categories
  detectedCount: number;           // Count of auto-detected categories
  totalCategories: number;         // Total CICTT categories (34)
  recommendations?: string[];      // Optional recommendations (for Gemini compatibility)
}

// Helper function for risk level determination
export function getRiskLevel(score: number): RiskLevel {
  if (score >= 80) return 'Critical';
  if (score >= 51) return 'High';
  if (score >= 21) return 'Medium';
  return 'Low';
}
