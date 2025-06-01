import { useState } from "react"

const AdvisoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const advisories = [
    {
      id: 1,
      title: "Optimal Irrigation Timing for Corn",
      category: "irrigation",
      priority: "high",
      date: "2024-01-15",
      description: "Based on current weather patterns and soil moisture levels, adjust irrigation schedule for maximum efficiency.",
      recommendations: [
        "Reduce irrigation frequency by 20% this week",
        "Monitor soil moisture levels daily",
        "Consider drip irrigation for better water conservation"
      ],
      impact: "Water savings: 15-25%",
      status: "active"
    },
    {
      id: 2,
      title: "Fertilizer Application Advisory",
      category: "fertilizer",
      priority: "medium",
      date: "2024-01-14",
      description: "Nitrogen levels in North Field are optimal. Reduce application to prevent over-fertilization.",
      recommendations: [
        "Reduce nitrogen application by 30%",
        "Focus on phosphorus-rich fertilizers",
        "Schedule soil testing in 2 weeks"
      ],
      impact: "Cost savings: $200-300",
      status: "active"
    },
    {
      id: 3,
      title: "Pest Management Alert",
      category: "pest",
      priority: "high",
      date: "2024-01-13",
      description: "Early signs of aphid infestation detected in East Field. Immediate action recommended.",
      recommendations: [
        "Apply organic pesticide within 48 hours",
        "Increase field monitoring frequency",
        "Consider beneficial insect release"
      ],
      impact: "Potential yield protection: 10-15%",
      status: "urgent"
    },
    {
      id: 4,
      title: "Weather-Based Crop Protection",
      category: "weather",
      priority: "medium",
      date: "2024-01-12",
      description: "Heavy rainfall expected next week. Prepare drainage and crop protection measures.",
      recommendations: [
        "Clear drainage channels",
        "Apply fungicide preventively",
        "Harvest ready crops before rainfall"
      ],
      impact: "Risk mitigation: High",
      status: "active"
    }
  ]

  const categories = [
    { value: "all", label: "All Advisories", icon: "📋" },
    { value: "irrigation", label: "Irrigation", icon: "💧" },
    { value: "fertilizer", label: "Fertilizer", icon: "🌱" },
    { value: "pest", label: "Pest Control", icon: "🐛" },
    { value: "weather", label: "Weather", icon: "🌤️" }
  ]

  const filteredAdvisories = selectedCategory === "all" 
    ? advisories 
    : advisories.filter(advisory => advisory.category === selectedCategory)

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "urgent": return "bg-red-500"
      case "active": return "bg-green-500"
      case "completed": return "bg-gray-500"
      default: return "bg-blue-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Farm Advisory</h1>
          <p className="text-gray-600 mt-2">AI-powered recommendations for optimal farm management</p>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.value
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Advisory Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAdvisories.map((advisory) => (
            <div key={advisory.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(advisory.status)}`}></div>
                    <span className="text-sm text-gray-500">{advisory.date}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(advisory.priority)}`}>
                    {advisory.priority.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{advisory.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{advisory.description}</p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Recommendations:</h4>
                  <ul className="space-y-1">
                    {advisory.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Expected Impact:</p>
                  <p className="text-sm text-blue-700">{advisory.impact}</p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
                    Apply Recommendation
                  </button>
                  <button className="px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-md text-sm font-medium transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAdvisories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No advisories found</h3>
            <p className="text-gray-600">No advisories available for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdvisoryPage
