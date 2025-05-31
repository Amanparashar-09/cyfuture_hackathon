"use client"

import { useState } from "react"

const DashboardPage = () => {
  const [selectedField, setSelectedField] = useState("field-1")
  const [activeTab, setActiveTab] = useState("water")

  const fields = [
    { id: "field-1", name: "North Field", size: "25 acres" },
    { id: "field-2", name: "South Field", size: "18 acres" },
    { id: "field-3", name: "East Field", size: "12 acres" },
  ]

  const stats = [
    {
      title: "Water Usage Today",
      value: "2,847 L",
      change: "12% less than yesterday",
      trend: "down",
      icon: "💧",
      color: "text-blue-500",
    },
    {
      title: "Fertilizer Applied",
      value: "45.2 kg",
      change: "8% reduction this week",
      trend: "down",
      icon: "🌱",
      color: "text-green-500",
    },
    {
      title: "Crop Health Score",
      value: "94%",
      change: "2% improvement",
      trend: "up",
      icon: "✅",
      color: "text-green-500",
    },
    {
      title: "Efficiency Score",
      value: "87%",
      change: "5% increase this month",
      trend: "up",
      icon: "📊",
      color: "text-purple-500",
    },
  ]

  const alerts = [
    {
      title: "Low Phosphorus - East Field",
      time: "Detected 2 hours ago",
      priority: "Medium Priority",
      color: "border-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "Rain Forecast",
      time: "Expected in 6 hours",
      priority: "Info",
      color: "border-blue-500",
      bgColor: "bg-blue-50",
    },
  ]

  const recommendations = [
    {
      title: "Optimize Irrigation Schedule",
      description: "Delay next irrigation by 1 day to save 15% water based on weather forecast.",
      bgColor: "bg-green-50",
      textColor: "text-green-900",
      descColor: "text-green-700",
    },
    {
      title: "Fertilizer Application",
      description: "Reduce nitrogen application by 20% in North Field based on soil analysis.",
      bgColor: "bg-blue-50",
      textColor: "text-blue-900",
      descColor: "text-blue-700",
    },
  ]

  const weather = [
    { day: "Today", temp: "24°C", icon: "☁️" },
    { day: "Tomorrow", temp: "19°C", icon: "🌧️" },
    { day: "Day 3", temp: "22°C", icon: "☁️" },
  ]

  const ProgressBar = ({ value, className = "" }) => (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${value}%` }} />
    </div>
  )

  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        active ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Farm Dashboard</h1>
            <p className="text-gray-600">Monitor and optimize your agricultural resources</p>
          </div>
          <div className="flex gap-3">
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors">
              Export Report
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
              Generate Recommendations
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                <span className={`text-lg ${stat.color}`}>{stat.icon}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <p className="text-xs text-gray-600">
                <span
                  className={`${stat.trend === "up" ? "text-green-600" : "text-green-600"} flex items-center gap-1`}
                >
                  {stat.trend === "up" ? "📈" : "📉"} {stat.change}
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Field Overview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-2">Field Overview</h2>
              <p className="text-gray-600 mb-6">Select a field to view detailed information</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {fields.map((field) => (
                  <button
                    key={field.id}
                    onClick={() => setSelectedField(field.id)}
                    className={`h-auto p-4 rounded-lg border-2 transition-colors ${
                      selectedField === field.id
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-lg font-semibold">{field.name}</div>
                    <div className="text-sm text-gray-600">{field.size}</div>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <TabButton id="water" label="Water" active={activeTab === "water"} onClick={setActiveTab} />
                  <TabButton
                    id="nutrients"
                    label="Nutrients"
                    active={activeTab === "nutrients"}
                    onClick={setActiveTab}
                  />
                  <TabButton
                    id="conditions"
                    label="Conditions"
                    active={activeTab === "conditions"}
                    onClick={setActiveTab}
                  />
                </div>

                {activeTab === "water" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Soil Moisture</span>
                          <span className="text-sm text-gray-600">68%</span>
                        </div>
                        <ProgressBar value={68} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Irrigation Efficiency</span>
                          <span className="text-sm text-gray-600">92%</span>
                        </div>
                        <ProgressBar value={92} />
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Next Irrigation</h4>
                      <p className="text-blue-700 text-sm">
                        Recommended in 2 days based on weather forecast and soil conditions.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "nutrients" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Nitrogen</span>
                          <span className="text-sm text-gray-600">Good</span>
                        </div>
                        <ProgressBar value={75} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Phosphorus</span>
                          <span className="text-sm text-gray-600">Low</span>
                        </div>
                        <ProgressBar value={35} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Potassium</span>
                          <span className="text-sm text-gray-600">Optimal</span>
                        </div>
                        <ProgressBar value={85} />
                      </div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-medium text-orange-900 mb-2">Fertilizer Recommendation</h4>
                      <p className="text-orange-700 text-sm">
                        Apply phosphorus-rich fertilizer (10-20-10) at 15kg/acre in the next week.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "conditions" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🌡️</span>
                        <div>
                          <div className="font-medium">Temperature</div>
                          <div className="text-sm text-gray-600">24°C (Optimal)</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">☁️</span>
                        <div>
                          <div className="font-medium">Humidity</div>
                          <div className="text-sm text-gray-600">65% (Good)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Resource Usage Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-2">Resource Usage Trends</h2>
              <p className="text-gray-600 mb-4">Water and fertilizer consumption over the past 30 days</p>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart visualization would go here</p>
              </div>
            </div>
          </div>

          {/* Right Column - Alerts & Recommendations */}
          <div className="space-y-6">
            {/* Alerts */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-orange-500">⚠️</span>
                Active Alerts
              </h2>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div key={index} className={`border-l-4 ${alert.color} pl-4 ${alert.bgColor} p-3 rounded-r`}>
                    <div className="font-medium">{alert.title}</div>
                    <div className="text-sm text-gray-600">{alert.time}</div>
                    <span className="inline-block mt-2 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                      {alert.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-yellow-500">⚡</span>
                AI Recommendations
              </h2>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className={`p-3 ${rec.bgColor} rounded-lg`}>
                    <div className={`font-medium ${rec.textColor}`}>{rec.title}</div>
                    <div className={`text-sm ${rec.descColor} mt-1`}>{rec.description}</div>
                    <button className="mt-2 px-3 py-1 border border-gray-300 hover:border-gray-400 text-gray-700 text-sm rounded transition-colors">
                      {index === 0 ? "Apply Recommendation" : "View Details"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather Widget */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Weather Forecast</h2>
              <div className="space-y-3">
                {weather.map((day, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{day.day}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{day.icon}</span>
                      <span>{day.temp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
