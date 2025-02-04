import { HfInference } from "@huggingface/inference";



// analyze function takes a journal entry and uses deepseek to extract mood subject from it 

const client = new HfInference(process.env.HF_API_KEY);

interface JournalAnalysis {
  mood: string;
  subject: string;
  color: string;
  negative: string;
}

export const analyze = async (entry: string): Promise<JournalAnalysis> => {
  try {
    const prompt = `Analyze this journal entry and respond ONLY with a JSON object.
    Format: {"mood": "emotion", "subject": "main topic", "color": "mood color", "negative": "true/false"}
    Do not include any other text or explanation.
    
    Entry: "${entry}"`;

    const response = await client.chatCompletion({
      model: "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",
      messages: [
        {
          role: "system",
          content:
            "You are an AI that analyzes journal entries. Only respond with valid JSON.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 500,
      top_p: 0.7,
      provider: "hf-inference",
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Empty AI response");
    }

    // Clean the response to ensure valid JSON
    const cleanedContent = content.trim().replace(/^```json\n|\n```$/g, "");

    try {
      return JSON.parse(cleanedContent) as JournalAnalysis;
    } catch (parseError) {
      console.error("Invalid JSON response:", cleanedContent);
      throw new Error("Invalid AI response format");
    }
  } catch (error) {
    console.error("Error analyzing journal entry:", error);
    throw new Error("Failed to analyze journal entry");
  }
};



