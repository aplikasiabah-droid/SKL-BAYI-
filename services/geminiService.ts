
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function parseBirthText(text: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Parse data kelahiran berikut ke dalam format JSON sesuai spesifikasi: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            day: { type: Type.STRING },
            date: { type: Type.STRING, description: "Format: DD MMMM YYYY" },
            time: { type: Type.STRING, description: "Format: HH:mm" },
            gender: { type: Type.STRING, description: "Laki-laki atau Perempuan" },
            birthType: { type: Type.STRING, description: "Tunggal, Kembar 2, Kembar 3, atau Lainnya" },
            birthOrder: { type: Type.STRING },
            gestationAge: { type: Type.STRING },
            weight: { type: Type.STRING },
            headCircumference: { type: Type.STRING },
            length: { type: Type.STRING },
            chestCircumference: { type: Type.STRING },
            babyName: { type: Type.STRING },
            motherName: { type: Type.STRING },
            fatherName: { type: Type.STRING },
            address: { type: Type.STRING },
          },
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Failed to parse birth text:", error);
    return null;
  }
}
