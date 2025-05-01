
import { toast } from "@/components/ui/use-toast";

// This is the API key provided by the user
const API_KEY = "AIzaSyAkcOeeAgrkyI_2bCJygHiWoifNAxDiSdk";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
}

export async function sendChatMessage(message: string): Promise<string> {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: message
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(`API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Chat service error:", error);
    toast({
      title: "Error",
      description: "Failed to get a response. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
}
