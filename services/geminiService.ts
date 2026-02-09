
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateResponse(prompt: string, systemInstruction: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
          topP: 0.95,
        },
      });
      return response.text || "I'm sorry, my bark got lost in the wind! Let me try again.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Something went wrong in my kennel. Please try again later!";
    }
  }

  async *streamResponse(prompt: string, systemInstruction: string) {
    try {
      const responseStream = await this.ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      for await (const chunk of responseStream) {
        yield chunk.text;
      }
    } catch (error) {
      console.error("Gemini Stream Error:", error);
      yield "Woof! An error occurred while fetching your answer.";
    }
  }
}

export const geminiService = new GeminiService();
