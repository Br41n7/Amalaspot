
import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getFoodPairing(dishName: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional chef specializing in African cuisine. Give a one-sentence, mouth-watering suggestion for a side dish or drink that pairs perfectly with "${dishName}". Keep it brief and exciting.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 100,
      }
    });
    // Access the text property directly from the response object.
    return response.text?.trim() || "Pairs well with chilled Palm Wine!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Authentic taste from our kitchen to your heart.";
  }
}

export async function getDishFunFact(dishName: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Share one interesting historical or cultural fun fact about the African dish "${dishName}". Keep it to 20 words or less.`,
      config: {
        temperature: 0.8,
        maxOutputTokens: 100,
      }
    });
    // Access the text property directly from the response object.
    return response.text?.trim() || "Deeply rooted in the cultural history of the region.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Crafted with passion using time-honored techniques.";
  }
}
