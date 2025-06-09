import { useEffect, useRef, useState } from "react";
import run from "../gemini";


const formatMarkdown = (text) => {
  const lines = text.split("\n");
  const formatted = lines.map(line => {
    if (/^\*\*(.+)\*\*$/.test(line.trim())) {
      // Full bold line - treated as heading
      return `<h3 class="font-semibold text-md text-green-700 mb-1">${line.replace(/\*\*(.+)\*\*/, '$1')}</h3>`;
    } else if (/^\* (.+)/.test(line.trim())) {
      // Bullet point
      return `<li class="ml-4 list-disc">${line.replace(/^\* (.+)/, '$1')}</li>`;
    } else {
      // Inline bold
      return `<p>${line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</p>`;
    }
  });

  // Wrap bullets in <ul>
  return formatted.join('\n').replace(/(<li[\s\S]+?<\/li>)/g, "<ul>$1</ul>");
};


const AssistantPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content: "Hello! I'm your AgriOptimize AI Assistant. I can help you with farming questions, provide recommendations, and analyze your farm data. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { icon: "💧", text: "Water optimization tips", action: "water-tips" },
    { icon: "🌱", text: "Fertilizer recommendations", action: "fertilizer-advice" },
    { icon: "🌤️", text: "Weather impact analysis", action: "weather-analysis" },
    { icon: "📊", text: "Performance summary", action: "performance-summary" },
    { icon: "🐛", text: "Pest management", action: "pest-management" },
    { icon: "💰", text: "Cost optimization", action: "cost-optimization" }
  ]

  const sampleResponses = {
    "water-tips": "Based on your current soil moisture levels and weather forecast, I recommend reducing irrigation by 15% this week. Your drip irrigation system is performing well with 92% efficiency. Consider scheduling irrigation during early morning hours (5-7 AM) to minimize evaporation losses.",
    "fertilizer-advice": "Your soil analysis shows optimal nitrogen levels in North Field. I recommend reducing nitrogen application by 20% and focusing on phosphorus-rich fertilizers for the East Field. This could save you approximately $200-300 while maintaining crop health.",
    "weather-analysis": "The upcoming weather pattern shows 60% chance of rain in the next 3 days. I recommend delaying your planned irrigation and preparing drainage systems. This natural rainfall could save you 500-700L of water across all fields.",
    "performance-summary": "Your farm efficiency has improved by 12% this month! Water usage is down 18%, fertilizer costs reduced by $450, and crop health scores are at 94%. Your sustainable practices are showing excellent results.",
    "pest-management": "I've detected early signs of aphid activity in your East Field based on recent monitoring data. I recommend applying organic neem oil spray within 48 hours and increasing beneficial insect populations. This preventive approach could save 10-15% of your crop yield.",
    "cost-optimization": "Analysis shows potential savings of $800-1200 this season through optimized resource usage. Key opportunities: reduce water consumption by 20%, optimize fertilizer timing, and implement precision application techniques."
  }


// 
const handleSendMessage = async () => {
  if (!inputMessage.trim()) return;

  const newMessage = {
    id: messages.length + 1,
    type: "user",
    content: inputMessage,
    timestamp: new Date().toLocaleTimeString(),
  };

  setMessages(prev => [...prev, newMessage]);
  setInputMessage("");
  setIsTyping(true);

  try {
    // Call Gemini API via your run() function
    const responseText = await run(inputMessage);

    // Strip Markdown formatting
    const cleanResponse = responseText.replace(/\*\*(.*?)\*\*/g, "$1").trim();

    const responseMessage = {
      id: messages.length + 2,
      type: "assistant",
      content: cleanResponse,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, responseMessage]);
  } catch (error) {
    console.error("Error fetching AI response:", error);

    // Optional: Show error message to user
    const errorMessage = {
      id: messages.length + 2,
      type: "assistant",
      content: "Sorry, I couldn't fetch a response. Please try again.",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsTyping(false);
  }
};


  const handleQuickAction = (action) => {
    const response = {
      id: messages.length + 1,
      type: "assistant",
      content: sampleResponses[action] || "I'm here to help with that! Let me analyze your farm data and provide specific recommendations.",
      timestamp: new Date().toLocaleTimeString()
    }
    setMessages(prev => [...prev, response])
  }

  const generateResponse = (input) => {
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes("water") || lowerInput.includes("irrigation")) {
      return sampleResponses["water-tips"]
    } else if (lowerInput.includes("fertilizer") || lowerInput.includes("nutrient")) {
      return sampleResponses["fertilizer-advice"]
    } else if (lowerInput.includes("weather") || lowerInput.includes("rain")) {
      return sampleResponses["weather-analysis"]
    } else if (lowerInput.includes("pest") || lowerInput.includes("insect")) {
      return sampleResponses["pest-management"]
    } else if (lowerInput.includes("cost") || lowerInput.includes("money") || lowerInput.includes("save")) {
      return sampleResponses["cost-optimization"]
    } else {
      return "I understand you're asking about farm management. Based on your current farm data, I can provide specific recommendations for water usage, fertilizer application, pest management, and cost optimization. Could you please specify which area you'd like me to focus on?"
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Farm Assistant</h1>
          <p className="text-gray-600 mt-2">Get instant answers and personalized recommendations for your farm</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.action)}
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-xl">{action.icon}</span>
                <span className="text-sm font-medium text-gray-700">{action.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => {
              const isLast = index === messages.length - 1;
              return (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  ref={isLast ? messagesEndRef : null}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === "user"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div
                      className="text-sm"
                      dangerouslySetInnerHTML={{
                        __html: message.type === "assistant"
                          ? formatMarkdown(message.content)
                          : message.content,
                      }}
                    />
                    <p className={`text-xs mt-1 ${
                      message.type === "user" ? "text-green-100" : "text-gray-500"
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>


          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your farm..."
                className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="2"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Assistant Features */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-2xl mb-3">🧠</div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Analysis</h3>
            <p className="text-sm text-gray-600">AI-powered analysis of your farm data to provide personalized recommendations.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Answers</h3>
            <p className="text-sm text-gray-600">Get immediate responses to your farming questions and concerns.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-2xl mb-3">📈</div>
            <h3 className="font-semibold text-gray-900 mb-2">Performance Insights</h3>
            <p className="text-sm text-gray-600">Understand your farm's performance and identify optimization opportunities.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssistantPage
