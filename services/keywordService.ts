/**
 * Keyword-based CICTT Hazard Identification Service
 * Analyzes text against CICTT taxonomy without external AI APIs
 */

import { CICTT_TAXONOMY, CICTTCategory } from './cicttTaxonomy';
import {
  AnalysisResult,
  CategoryResult,
  MatchedKeyword,
  RiskLevel,
  getRiskLevel,
} from '../types';

/**
 * Normalize text for keyword matching:
 * - Convert to lowercase
 * - Remove extra whitespace
 * - Keep basic punctuation for word boundary detection
 */
function normalizeText(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

/**
 * Extract all words from text (for word boundary matching)
 */
function getTextWords(text: string): string[] {
  return text.match(/\b\w+(?:[-_]?\w+)*\b/g) || [];
}

/**
 * Check if a keyword exists in text with word boundary matching
 * Returns: { found: boolean, count: number }
 */
function findKeywordOccurrences(
  text: string,
  keyword: string
): { found: boolean; count: number } {
  const normalizedKeyword = keyword.toLowerCase();
  const words = getTextWords(text);

  // Handle multi-word keywords (e.g., "human-in-the-loop")
  const keywordParts = normalizedKeyword.split(/[-\s]+/).filter(p => p.length > 0);

  if (keywordParts.length === 1) {
    // Single word - exact match with word boundaries
    const regex = new RegExp(`\\b${normalizedKeyword}\\b`, 'g');
    const matches = text.match(regex) || [];
    return { found: matches.length > 0, count: matches.length };
  } else {
    // Multi-word keyword - look for consecutive or nearby words
    let count = 0;
    for (let i = 0; i <= words.length - keywordParts.length; i++) {
      const sequenceMatches = keywordParts.every(
        (part, idx) => words[i + idx].includes(part)
      );
      if (sequenceMatches) {
        count++;
      }
    }
    return { found: count > 0, count };
  }
}

/**
 * Analyze a single category against text
 */
function analyzeCategory(text: string, category: CICTTCategory): CategoryResult {
  const normalizedText = normalizeText(text);
  const matchedKeywords: MatchedKeyword[] = [];
  let totalCategoryWeight = 0;
  let totalMatchedWeight = 0;

  // Calculate total category weight and find matched keywords
  // category.keywords is Record<string, number> where key=word, value=weight
  for (const [word, weight] of Object.entries(category.keywords)) {
    totalCategoryWeight += weight;

    const { found, count } = findKeywordOccurrences(normalizedText, word);
    if (found) {
      matchedKeywords.push({
        word,
        count,
        weight,
      });
      totalMatchedWeight += weight * Math.min(count, 3); // Cap count multiplier at 3
    }
  }

  // Calculate score using formula:
  // baseScore = (sum of matched keyword weights) / (sum of all category keyword weights) * 100
  // frequencyBonus = min(20, unique_keywords_matched * 2)
  // rawScore = min(100, baseScore + frequencyBonus)
  const baseScore =
    totalCategoryWeight > 0 ? (totalMatchedWeight / totalCategoryWeight) * 100 : 0;
  const frequencyBonus = Math.min(20, matchedKeywords.length * 2);
  const rawScore = Math.min(100, baseScore + frequencyBonus);

  // Round to nearest integer
  const score = Math.round(rawScore);
  const riskLevel = getRiskLevel(score);

  return {
    code: category.code,
    name: category.name,
    group: category.group,
    score,
    riskLevel,
    matchedKeywords,
    userWeight: 1.0,
    isManuallyAdded: false,
    isEnabled: true,
  };
}

/**
 * Calculate overall risk score from detected categories
 */
function calculateOverallScore(categories: CategoryResult[]): {
  score: number;
  level: RiskLevel;
} {
  const enabledCategories = categories.filter(c => c.isEnabled);

  if (enabledCategories.length === 0) {
    return { score: 0, level: 'Low' };
  }

  // Calculate weighted average
  let totalWeight = 0;
  let weightedSum = 0;

  for (const category of enabledCategories) {
    const weight = category.userWeight;
    const adjustedScore = category.score * weight;
    weightedSum += adjustedScore;
    totalWeight += weight;
  }

  const score =
    totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
  const level = getRiskLevel(score);

  return { score, level };
}

/**
 * Generate summary text from detected categories
 */
function generateSummary(categories: CategoryResult[]): string {
  const detectedByGroup: { [key: string]: CategoryResult[] } = {};

  for (const category of categories) {
    if (category.score > 0 && category.isEnabled) {
      if (!detectedByGroup[category.group]) {
        detectedByGroup[category.group] = [];
      }
      detectedByGroup[category.group].push(category);
    }
  }

  const groups = Object.keys(detectedByGroup).sort();

  if (groups.length === 0) {
    return 'No significant hazards detected in the provided text.';
  }

  const summaryParts: string[] = [];

  for (const group of groups) {
    const groupCategories = detectedByGroup[group];
    const topCategories = groupCategories
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const categoryNames = topCategories.map(c => c.name).join(', ');
    const avgScore = Math.round(
      topCategories.reduce((sum, c) => sum + c.score, 0) / topCategories.length
    );

    summaryParts.push(
      `${group} hazards identified (${categoryNames}): ${avgScore}/100 risk score`
    );
  }

  return summaryParts.join('; ') + '.';
}

/**
 * Main analysis function
 * Analyzes text against all CICTT categories using keyword matching
 */
export async function analyzeIncident(text: string): Promise<AnalysisResult> {
  // Validate input
  if (!text || text.trim().length === 0) {
    return {
      summary: 'No text provided for analysis.',
      overallRiskScore: 0,
      overallRiskLevel: 'Low',
      categories: [],
      detectedCount: 0,
      totalCategories: CICTT_TAXONOMY.length,
    };
  }

  // Analyze all categories
  const results: CategoryResult[] = [];
  for (const category of CICTT_TAXONOMY) {
    const result = analyzeCategory(text, category);
    results.push(result);
  }

  // Filter to detected categories (score > 0)
  const detectedCategories = results.filter(c => c.score > 0);

  // Calculate overall score
  const { score: overallScore, level: overallLevel } =
    calculateOverallScore(detectedCategories);

  // Generate summary
  const summary = generateSummary(detectedCategories);

  return {
    summary,
    overallRiskScore: overallScore,
    overallRiskLevel: overallLevel,
    categories: results,
    detectedCount: detectedCategories.length,
    totalCategories: CICTT_TAXONOMY.length,
  };
}

/**
 * Recalculate overall score when user changes weights or toggles
 * Returns new overall score and risk level
 */
export function recalculateOverallScore(categories: CategoryResult[]): {
  score: number;
  level: RiskLevel;
} {
  return calculateOverallScore(categories);
}

/**
 * Get all categories (for manual addition UI)
 */
export function getAllCategories(): CICTTCategory[] {
  return CICTT_TAXONOMY;
}

/**
 * Get categories by group (for filtering UI)
 */
export function getCategoriesByGroup(group: string): CICTTCategory[] {
  return CICTT_TAXONOMY.filter(cat => cat.group === group);
}

/**
 * Create a manual category result (score = 0, marked as manually added)
 * Returns new CategoryResult with default values
 */
export function createManualCategory(code: string): CategoryResult | null {
  const category = getCategoryByCode(code);
  if (!category) {
    return null;
  }

  return {
    code: category.code,
    name: category.name,
    group: category.group,
    score: 0,
    riskLevel: 'Low',
    matchedKeywords: [],
    userWeight: 1.0,
    isManuallyAdded: true,
    isEnabled: true,
  };
}

/**
 * Get a category by code
 */
export function getCategoryByCode(code: string): CICTTCategory | undefined {
  return CICTT_TAXONOMY.find(cat => cat.code === code);
}

/**
 * Get all unique groups in the taxonomy
 */
export function getAllGroups(): string[] {
  return Array.from(new Set(CICTT_TAXONOMY.map(cat => cat.group)));
}

/**
 * Validate category code exists
 */
export function isValidCategoryCode(code: string): boolean {
  return CICTT_TAXONOMY.some(cat => cat.code === code);
}
