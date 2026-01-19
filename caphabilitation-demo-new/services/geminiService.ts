
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

export const generateEvaluationSummary = async (evaluationData: any) => {
  if (!API_KEY) return "AI Summary unavailable: No API Key provided.";

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const prompt = `
    Analyze the following professional evaluation data and provide a concise, professional summary 
    of the candidate's performance. Highlight strengths and areas for improvement.
    
    Data:
    Technical Skills: ${evaluationData.technicalSkills}/10
    Safety Compliance: ${evaluationData.safetyCompliance}/10
    Theoretical Knowledge: ${evaluationData.theoreticalKnowledge}/10
    Comments: ${evaluationData.comments}
    
    Respond in French as a senior technical supervisor.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Unable to generate summary.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating AI insights.";
  }
};
