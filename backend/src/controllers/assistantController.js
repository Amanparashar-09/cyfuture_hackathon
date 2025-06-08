const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getAssistantResponse = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.json({
      response: text,
    });
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    res.status(500).json({ message: "Failed to get response from AI assistant", error: error.message });
  }
}; 