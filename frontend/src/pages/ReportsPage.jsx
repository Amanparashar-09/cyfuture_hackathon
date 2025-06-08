import { useState  , useEffect} from "react"
import axios from "axios"
const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedReport, setSelectedReport] = useState("overview")
  const [farmData, setFarmData] = useState(null)
  const reportTypes = [
    { value: "overview", label: "Farm Overview", icon: "📊" },
    { value: "water", label: "Water Usage", icon: "💧" },
    { value: "fertilizer", label: "Fertilizer Usage", icon: "🌱" },
    { value: "efficiency", label: "Efficiency Metrics", icon: "⚡" },
    { value: "financial", label: "Financial Summary", icon: "💰" }
  ]
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

  const timePeriods = [
    { value: "week", label: "Last Week" },
    { value: "month", label: "Last Month" },
    { value: "quarter", label: "Last Quarter" },
    { value: "year", label: "Last Year" }
  ]

  const overviewData = {
    totalFields: 3,
    totalAcres: farmData?.land_area || 0,
    waterSaved: "2,847L",
    fertilizerReduced: "45.2kg",
    costSavings: "$1,250",
    efficiencyScore: "87%"
  }

  const waterUsageData = [
    { field: "North Field", usage: "1,200L", efficiency: "92%", savings: "15%" },
    { field: "South Field", usage: "980L", efficiency: "88%", savings: "12%" },
    { field: "East Field", usage: "667L", efficiency: "95%", savings: "18%" }
  ]

  const fertilizerData = [
    { field: "North Field", nitrogen: "15.2kg", phosphorus: "8.1kg", potassium: "12.3kg" },
    { field: "South Field", nitrogen: "12.8kg", phosphorus: "6.9kg", potassium: "10.1kg" },
    { field: "East Field", nitrogen: "8.5kg", phosphorus: "4.2kg", potassium: "7.8kg" }
  ]

  const generateReport = () => {
    alert(`Generating ${reportTypes.find(r => r.value === selectedReport)?.label} report for ${timePeriods.find(p => p.value === selectedPeriod)?.label}...`)
  }

  const exportReport = (format) => {
    alert(`Exporting report as ${format.toUpperCase()}...`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Farm Reports</h1>
          <p className="text-gray-600 mt-2">Comprehensive analytics and performance reports</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {reportTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {timePeriods.map((period) => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={generateReport}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
              >
                Generate Report
              </button>
              <div className="relative">
                <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md font-medium transition-colors">
                  Export ▼
                </button>
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10 hidden group-hover:block">
                  <button
                    onClick={() => exportReport('pdf')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Export PDF
                  </button>
                  <button
                    onClick={() => exportReport('excel')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Export Excel
                  </button>
                  <button
                    onClick={() => exportReport('csv')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Export CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Content */}
        {selectedReport === "overview" && (
          <div className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-green-600">{overviewData.totalFields}</div>
                <div className="text-sm text-gray-600">Total Fields</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-blue-600">{overviewData.totalAcres}</div>
                <div className="text-sm text-gray-600">Total Acres</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-cyan-600">{overviewData.waterSaved}</div>
                <div className="text-sm text-gray-600">Water Saved</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-green-600">{overviewData.fertilizerReduced}</div>
                <div className="text-sm text-gray-600">Fertilizer Reduced</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-yellow-600">{overviewData.costSavings}</div>
                <div className="text-sm text-gray-600">Cost Savings</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-purple-600">{overviewData.efficiencyScore}</div>
                <div className="text-sm text-gray-600">Efficiency Score</div>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Performance chart would be displayed here</p>
              </div>
            </div>
          </div>
        )}

        {selectedReport === "water" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Water Usage Report</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Savings</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {waterUsageData.map((field, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{field.field}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{field.usage}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{field.efficiency}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{field.savings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedReport === "fertilizer" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Fertilizer Usage Report</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nitrogen</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phosphorus</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potassium</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {fertilizerData.map((field, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{field.field}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{field.nitrogen}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{field.phosphorus}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{field.potassium}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {(selectedReport === "efficiency" || selectedReport === "financial") && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              {selectedReport === "efficiency" ? "Efficiency Metrics" : "Financial Summary"}
            </h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">
                {selectedReport === "efficiency" ? "Efficiency metrics" : "Financial data"} would be displayed here
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReportsPage
