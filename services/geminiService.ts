import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, CategoryScore } from "../types";

// Initialize the Gemini client
// Per guidelines: API key must be from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

const SYSTEM_INSTRUCTION = `
You are an expert AI Safety Auditor and Risk Analyst. 
Your task is to analyze the provided text (which may be a system prompt, model card, technical documentation, or incident report) using the "CICTT" Hazard Identification Taxonomy.

The CICTT Taxonomy stands for:
1. **Competence** (Capabilities, unexpected behaviors, skill gaps)
2. **Impact** (Societal harm, bias, economic effect, psychological impact)
3. **Control** (Human-in-the-loop, shut-off mechanisms, agentic behavior boundaries)
4. **Transparency** (Explainability, auditability, documentation quality)
5. **Trust** (Security, privacy, reliance, malicious use potential)

For each category, assign a risk score from 0 (Safe) to 100 (Critical Hazard) and list specific contributing factors found in the text.
Calculated the overall risk score as a weighted average.

Return the response in strictly valid JSON format matching the schema provided.
`;

export const analyzeHazard = async (text: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: text,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A concise executive summary of the hazards identified." },
            overallRiskScore: { type: Type.NUMBER, description: "0-100 score representing total risk." },
            overallRiskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High", "Critical"] },
            categories: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Full name of the category (e.g. Competence)" },
                  acronym: { type: Type.STRING, description: "Single letter (C, I, C, T, or T)" },
                  score: { type: Type.NUMBER, description: "0-100 risk score" },
                  riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High", "Critical"] },
                  factors: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "List of specific hazard factors identified."
                  }
                },
                required: ["name", "acronym", "score", "riskLevel", "factors"],
                propertyOrdering: ["acronym", "name", "score", "riskLevel", "factors"]
              }
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Actionable mitigation steps."
            }
          },
          required: ["summary", "overallRiskScore", "overallRiskLevel", "categories", "recommendations"],
          propertyOrdering: ["summary", "overallRiskScore", "overallRiskLevel", "categories", "recommendations"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
        throw new Error("No response received from the model.");
    }

    const result = JSON.parse(jsonText) as AnalysisResult;
    return result;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze the text. Please ensure the input is valid and try again.");
  }
};
