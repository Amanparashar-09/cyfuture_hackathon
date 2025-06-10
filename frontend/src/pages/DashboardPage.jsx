import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const ProgressBar = ({ value, className = "" }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div
      className="bg-green-500 h-2 rounded-full transition-all duration-300"
      style={{ width: `${value}%` }}
    />
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

const DashboardPage = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [selectedField, setSelectedField] = useState("field-1")
  const [activeTab, setActiveTab] = useState("overview")
  const [farmData, setFarmData] = useState(null)
  const [selectedPeriod, setSelectedPeriod] = useState("month")

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

  // Function to handle Generate Recommendations button click
  const handleGenerateRecommendations = () => {
    navigate('/dashboard/assistant', { state: { from: 'dashboard' } })
  }

  // Function to generate random efficiency score between 80-93
  const generateEfficiencyScore = () => {
    return Math.floor(Math.random() * (93 - 80 + 1)) + 80;
  }

  const getCropSpecificData = (cropType) => {
    const cropDatabase = {
      "Wheat": {
        waterUsagePerAcre: 120,
        fertilizerNPK: { nitrogen: 1.8, phosphorus: 0.9, potassium: 1.2 },
        expectedYield: 2850,
        growthStages: ["Germination", "Tillering", "Jointing", "Flowering", "Grain Filling", "Maturity"],
        currentStage: "Flowering",
        efficiencyScore: generateEfficiencyScore(),
        diseaseRisk: "Low",
        harvestDays: 45
      },
      "Rice": {
        waterUsagePerAcre: 180,
        fertilizerNPK: { nitrogen: 2.2, phosphorus: 1.1, potassium: 1.8 },
        expectedYield: 3200,
        growthStages: ["Germination", "Seedling", "Tillering", "Panicle", "Flowering", "Maturity"],
        currentStage: "Panicle",
        efficiencyScore: generateEfficiencyScore(),
        diseaseRisk: "Medium",
        harvestDays: 60
      },
      "Maize": {
        waterUsagePerAcre: 95,
        fertilizerNPK: { nitrogen: 1.5, phosphorus: 0.7, potassium: 1.0 },
        expectedYield: 4200,
        growthStages: ["Germination", "Vegetative", "Tasseling", "Silking", "Grain Filling", "Maturity"],
        currentStage: "Silking",
        efficiencyScore: generateEfficiencyScore(),
        diseaseRisk: "Low",
        harvestDays: 30
      }
    }
    return cropDatabase[cropType] || cropDatabase["Wheat"]
  }

  const userCropData = getCropSpecificData(farmData?.crop_type || "Wheat")
  const landArea = farmData?.land_area || 25

  const dailyWaterUsage = Math.round(userCropData.waterUsagePerAcre * landArea)
  const totalFertilizer = Math.round((userCropData.fertilizerNPK.nitrogen + userCropData.fertilizerNPK.phosphorus + userCropData.fertilizerNPK.potassium) * landArea)
  const expectedTotalYield = Math.round(userCropData.expectedYield * landArea)

  const stats = [
    {
      title: "Daily Water Usage",
      value: `${dailyWaterUsage.toLocaleString()} L`,
      change: "12% less than yesterday",
      trend: "down",
      icon: "💧",
      color: "text-blue-500",
    },
    {
      title: "Fertilizer Applied",
      value: `${totalFertilizer} kg`,
      change: "8% reduction this week",
      trend: "down",
      icon: "🌱",
      color: "text-green-500",
    },
    {
      title: "Efficiency",
      value: `${userCropData.efficiencyScore}%`,
      change: "2% improvement",
      trend: "up",
      icon: "✅",
      color: "text-green-500",
    },
    {
      title: "Expected Yield",
      value: `${expectedTotalYield.toLocaleString()} kg`,
      change: "5% increase this month",
      trend: "up",
      icon: "🌾",
      color: "text-purple-500",
    },
  ]

  const waterUsageChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Water Usage (Liters)',
        data: [
          dailyWaterUsage * 7 * 0.9,
          dailyWaterUsage * 7 * 1.1,
          dailyWaterUsage * 7 * 0.95,
          dailyWaterUsage * 7
        ],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  }

  const fertilizerChartData = {
    labels: ['Nitrogen', 'Phosphorus', 'Potassium'],
    datasets: [
      {
        data: [
          userCropData.fertilizerNPK.nitrogen * landArea,
          userCropData.fertilizerNPK.phosphorus * landArea,
          userCropData.fertilizerNPK.potassium * landArea
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(168, 85, 247, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  const yieldComparisonData = {
    labels: ['Expected', 'Current Projection', 'Last Season'],
    datasets: [
      {
        label: 'Yield (kg)',
        data: [
          expectedTotalYield,
          expectedTotalYield * 1.05,
          expectedTotalYield * 0.92
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(156, 163, 175, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  const alerts = [
    {
      title: `${userCropData.currentStage} stage detected in ${farmData?.crop_type || 'Wheat'} crop`,
      time: "2 hours ago",
      priority: userCropData.diseaseRisk === "High" ? "High Priority" : "Medium Priority",
      color: userCropData.diseaseRisk === "High" ? "border-red-500" : "border-yellow-500",
      bgColor: userCropData.diseaseRisk === "High" ? "bg-red-50" : "bg-yellow-50",
    },
    {
      title: `Harvest expected in ${userCropData.harvestDays} days`,
      time: "4 hours ago",
      priority: "Info",
      color: "border-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Weather forecast: Rain expected tomorrow",
      time: "6 hours ago",
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Farm Dashboard & Analytics</h1>
            <p className="text-gray-600">Comprehensive overview, reports, and optimization insights for your farm</p>
          </div>
          <div className="flex gap-3">
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors">
              Export Report
            </button>
            <button
              onClick={handleGenerateRecommendations}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Generate Recommendations
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                <span className={`text-lg ${stat.color}`}>{stat.icon}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <p className="text-xs text-gray-600">
                <span className={`${stat.trend === "up" ? "text-green-600" : "text-green-600"} flex items-center gap-1`}>
                  {stat.trend === "up" ? "📈" : "📉"} {stat.change}
                </span>
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Farm Information Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Crop Type:</span>
                    <span className="font-medium text-gray-900">{farmData?.crop_type || "Wheat"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Land Area:</span>
                    <span className="font-medium text-gray-900">{landArea} acres</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Season:</span>
                    <span className="font-medium text-gray-900">{farmData?.season || "Rabi"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium text-gray-900">{farmData?.location || "Punjab, India"}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Farming Type:</span>
                    <span className="font-medium text-gray-900">{farmData?.farming_type || "Modern"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Soil Type:</span>
                    <span className="font-medium text-gray-900">{farmData?.soil_type || "Loamy"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex gap-2 mb-6 overflow-x-auto">
                <TabButton id="overview" label="📊 Overview" active={activeTab === "overview"} onClick={setActiveTab} />
                <TabButton id="water" label="💧 Water Analytics" active={activeTab === "water"} onClick={setActiveTab} />
                <TabButton id="fertilizer" label="🌱 Fertilizer" active={activeTab === "fertilizer"} onClick={setActiveTab} />
                <TabButton id="yield" label="🌾 Yield Projection" active={activeTab === "yield"} onClick={setActiveTab} />
              </div>

              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Crop Performance Analysis</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Expected Yield:</span>
                          <span className="font-medium text-green-600">{userCropData.expectedYield.toLocaleString()} kg/acre</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Current Growth Stage:</span>
                          <span className="font-medium text-blue-600">{userCropData.currentStage}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Efficiency:</span>
                          <span className="font-medium text-green-600">{userCropData.efficiencyScore}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Disease Risk:</span>
                          <span className={`font-medium ${userCropData.diseaseRisk === 'Low' ? 'text-green-600' : userCropData.diseaseRisk === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>
                            {userCropData.diseaseRisk}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Harvest in:</span>
                          <span className="font-medium text-gray-900">{userCropData.harvestDays} days</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Environmental Conditions</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-3xl mb-2">🌡️</div>
                          <div className="text-2xl font-bold text-orange-600">28°C</div>
                          <div className="text-sm text-gray-600">Average Temperature</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-3xl mb-2">💧</div>
                          <div className="text-2xl font-bold text-blue-600">65%</div>
                          <div className="text-sm text-gray-600">Soil Moisture</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "water" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Water Usage Trends</h3>
                      <Line data={waterUsageChartData} options={chartOptions} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Water Analytics</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Daily Usage:</span>
                          <span className="font-medium text-blue-600">{dailyWaterUsage.toLocaleString()} L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Usage per Acre:</span>
                          <span className="font-medium text-blue-600">{userCropData.waterUsagePerAcre} L/acre</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Efficiency Score:</span>
                          <span className="font-medium text-green-600">92%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Water Saved:</span>
                          <span className="font-medium text-green-600">2,847 L this month</span>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Next Irrigation</h4>
                        <p className="text-blue-700 text-sm">
                          Recommended in 2 days based on weather forecast and soil conditions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "fertilizer" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Fertilizer Distribution</h3>
                      <Doughnut data={fertilizerChartData} options={doughnutOptions} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Fertilizer Analytics</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Nitrogen (N):</span>
                          <span className="font-medium text-green-600">{(userCropData.fertilizerNPK.nitrogen * landArea).toFixed(1)} kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Phosphorus (P):</span>
                          <span className="font-medium text-orange-600">{(userCropData.fertilizerNPK.phosphorus * landArea).toFixed(1)} kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Potassium (K):</span>
                          <span className="font-medium text-purple-600">{(userCropData.fertilizerNPK.potassium * landArea).toFixed(1)} kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Total Applied:</span>
                          <span className="font-medium text-gray-900">{totalFertilizer} kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Cost Estimate:</span>
                          <span className="font-medium text-gray-900">${Math.round(totalFertilizer * 2.5)}</span>
                        </div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-medium text-orange-900 mb-2">Fertilizer Recommendation</h4>
                        <p className="text-orange-700 text-sm">
                          Apply balanced NPK fertilizer for {farmData?.crop_type || 'Wheat'} at recommended rates for optimal growth.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "yield" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Yield Comparison</h3>
                      <Bar data={yieldComparisonData} options={chartOptions} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Yield Projections</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Expected Yield:</span>
                          <span className="font-medium text-green-600">{expectedTotalYield.toLocaleString()} kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Current Projection:</span>
                          <span className="font-medium text-blue-600">{Math.round(expectedTotalYield * 1.05).toLocaleString()} kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Last Season:</span>
                          <span className="font-medium text-gray-600">{Math.round(expectedTotalYield * 0.92).toLocaleString()} kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Improvement:</span>
                          <span className="font-medium text-green-600">+14% vs last season</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Market Value:</span>
                          <span className="font-medium text-gray-900">${Math.round(expectedTotalYield * 0.45).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-2">Yield Optimization</h4>
                        <p className="text-green-700 text-sm">
                          Current practices are projected to increase yield by 5% above expected levels.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Alerts & Notifications</h2>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div key={index} className={`border-l-4 ${alert.color} ${alert.bgColor} p-4 rounded-r-lg`}>
                    <div className="font-medium text-sm">{alert.title}</div>
                    <div className="text-xs text-gray-600 mt-1">{alert.time} • {alert.priority}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">AI Recommendations</h2>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className={`${rec.bgColor} p-4 rounded-lg`}>
                    <div className={`font-medium text-sm ${rec.textColor}`}>{rec.title}</div>
                    <div className={`text-xs mt-1 ${rec.descColor}`}>{rec.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Weather Forecast</h2>
              <div className="space-y-3">
                {weather.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{day.icon}</span>
                      <span className="font-medium">{day.day}</span>
                    </div>
                    <span className="text-gray-600">{day.temp}</span>
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
