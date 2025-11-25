import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ModelId } from "../types";

const apiKey = process.env.API_KEY || ''; // Ensure this is set in your environment
const ai = new GoogleGenAI({ apiKey });

export const generateContent = async (
  modelId: ModelId,
  prompt: string
): Promise<{ text: string; isImage: boolean }> => {
  
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  try {
    // Handle Image Generation Models
    if (modelId === ModelId.GEMINI_FLASH_IMAGE) {
        // According to guidelines, use generateContent for nano banana series
        const response = await ai.models.generateContent({
            model: modelId,
            contents: {
                parts: [{ text: prompt }]
            },
            config: {
                // Default aspect ratio for simple tests
                imageConfig: { aspectRatio: "1:1" }
            }
        });

        // Parse response for image data
        let imageUrl = '';
        if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64EncodeString = part.inlineData.data;
                    imageUrl = `data:image/png;base64,${base64EncodeString}`;
                    break; // Found the image
                }
            }
        }
        
        if (!imageUrl) {
             throw new Error("No image generated.");
        }

        return { text: imageUrl, isImage: true };
    } 
    
    // Handle Text Models
    else {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: modelId,
        contents: prompt,
      });

      return { text: response.text || "No response text generated.", isImage: false };
    }

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate content");
  }
};