
import { GoogleGenAI } from "@google/genai";

// Fix: Per coding guidelines, initialize the GoogleGenAI client directly assuming process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generatePetCareTip(petType: string, serviceName: string): Promise<string> {
  const prompt = `Cung cấp một mẹo chăm sóc thú cưng ngắn gọn, thân thiện và hữu ích bằng Tiếng Việt cho chủ của một con ${petType} vừa mới sử dụng dịch vụ thú y này: "${serviceName}". Mẹo nên tập trung vào việc chăm sóc sau dịch vụ hoặc sức khỏe chung. Giữ câu trả lời dưới 60 từ và định dạng thành một đoạn văn duy nhất. Không sử dụng markdown.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    // Fix: Explicitly convert the 'unknown' error type to a string before logging to prevent type errors.
    console.error(`Error generating pet care tip: ${String(error)}`);
    return "Hãy nhớ dành cho thú cưng của bạn nhiều tình yêu thương và một nơi nghỉ ngơi thoải mái sau chuyến thăm khám. Liên hệ với chúng tôi nếu bạn có bất kỳ lo ngại nào!";
  }
}