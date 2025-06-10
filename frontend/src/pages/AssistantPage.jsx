import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLocation } from 'react-router-dom'
import run from '../gemini.js'
import axios from 'axios'

const AssistantPage = () => {
  const { currentUser } = useAuth()
  const location = useLocation()
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [farmData, setFarmData] = useState(null)
  const messagesEndRef = useRef(null)

  // Quick action suggestions
  const quickActions = [
    {
      icon: "💧",
      title: "Water Optimization",
      question: "Based on current weather conditions and my crop type, should I adjust my irrigation schedule?"
    },
    {
      icon: "🌱",
      title: "Fertilizer Advice",
      question: "What fertilizer recommendations do you have for my current crop growth stage?"
    },
    {
      icon: "🐛",
      title: "Pest Control",
      question: "What pest and disease prevention measures should I take this season?"
    },
    {
      icon: "🌦️",
      title: "Weather Impact",
      question: "How will the current weather forecast affect my farming activities this week?"
    },
    {
      icon: "📊",
      title: "Performance Analysis",
      question: "Analyze my farm's current performance and suggest improvements."
    },
    {
      icon: "🌾",
      title: "Harvest Planning",
      question: "When should I plan my harvest based on current crop conditions?"
    }
  ]

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Fetch farm data on component mount
  useEffect(() => {
    const fetchFarmInfo = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get("http://localhost:5000/api/farminfo/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setFarmData(res.data)
      } catch (err) {
        console.error("Failed to fetch farm info:", err)
      }
    }

    fetchFarmInfo()
  }, [])

  // Add welcome message when component mounts
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'ai',
      content: `🌾 **Welcome to AgriOptimize AI Assistant!**

I'm here to help you optimize your farming operations with personalized recommendations based on:

• **Real-time weather data** for your location
• **Your specific crop type and growth stage**
• **Current soil and field conditions**
• **Seasonal farming best practices**

Feel free to ask me anything about water management, fertilizer application, pest control, or general farming advice. You can also use the quick action buttons below to get started!

How can I assist you today?`
    }
    setMessages([welcomeMessage])

    // If coming from dashboard with context, add that info
    if (location.state?.from === 'dashboard') {
      setTimeout(() => {
        const contextMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: `I see you came from your dashboard! I have access to your farm data and can provide personalized recommendations based on your current setup. What specific area would you like me to focus on?`
        }
        setMessages(prev => [...prev, contextMessage])
      }, 1000)
    }
  }, [location.state])

  // Handle sending messages
  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Build context for AI
      let contextPrompt = messageText

      if (farmData) {
        contextPrompt = `
Farm Context:
- Crop Type: ${farmData.crop_type}
- Farm Size: ${farmData.farm_size} acres
- Location: ${farmData.location}
- Soil Type: ${farmData.soil_type}

User Question: ${messageText}`
      }

      const aiResponse = await run(contextPrompt, farmData?.location || "Mathura")

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error getting AI response:', error)
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment."
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle quick action clicks
  const handleQuickAction = (question) => {
    handleSendMessage(question)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    handleSendMessage()
  }

  // Handle clearing chat
  const handleClearChat = () => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'ai',
      content: `🌾 **Welcome back to AgriOptimize AI Assistant!**

I'm ready to help you with your farming questions. What would you like to know?`
    }
    setMessages([welcomeMessage])
  }

  // Format AI message content (basic markdown-like formatting)
  const formatMessage = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/•/g, '&bull;')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🤖 AI Farm Assistant</h1>
            <p className="text-gray-600">Get personalized farming recommendations powered by AI</p>
          </div>
          {messages.length > 1 && (
            <button
              onClick={handleClearChat}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              Clear Chat
            </button>
          )}
        </div>

        {/* Quick Actions */}
        {messages.length <= 2 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.question)}
                  className="bg-white border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 rounded-lg p-4 text-left group"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{action.icon}</span>
                    <h3 className="font-medium text-gray-900 group-hover:text-green-600">{action.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{action.question}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.type === 'ai' ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(message.content)
                      }}
                    />
                  ) : (
                    <p>{message.content}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 max-w-xs lg:max-w-md px-4 py-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about farming..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send</span>
                    <span>📤</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick suggestions when input is empty */}
            {!inputMessage && messages.length > 2 && (
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setInputMessage("What's the weather forecast for my area?")}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                >
                  Weather forecast
                </button>
                <button
                  onClick={() => setInputMessage("Should I water my crops today?")}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                >
                  Watering advice
                </button>
                <button
                  onClick={() => setInputMessage("Any pest alerts for my region?")}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                >
                  Pest alerts
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Farm Context Info */}
        {farmData && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">🌾 Your Farm Context</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-blue-700 font-medium">Crop:</span>
                <p className="text-blue-800">{farmData.crop_type}</p>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Size:</span>
                <p className="text-blue-800">{farmData.farm_size} acres</p>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Location:</span>
                <p className="text-blue-800">{farmData.location}</p>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Soil:</span>
                <p className="text-blue-800">{farmData.soil_type}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AssistantPage
