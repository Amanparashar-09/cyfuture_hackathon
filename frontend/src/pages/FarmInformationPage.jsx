import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"

const FarmInformationPage = () => {
  const { currentUser, updateFarmInfo } = useAuth()

  const [formData, setFormData] = useState({
    crop_type: "",
    land_area: "",
    season: "",
    location: "",
    farming_type: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (currentUser?.farmInfo) {
      setFormData({
        crop_type: currentUser.farmInfo.crop_type || "",
        land_area: currentUser.farmInfo.land_area || "",
        season: currentUser.farmInfo.season || "",
        location: currentUser.farmInfo.location || "",
        farming_type: currentUser.farmInfo.farming_type || "",
      })
    }
  }, [currentUser])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      await updateFarmInfo(formData)

      setSuccess("Farm information updated successfully!")
    } catch (error) {
      setError("Failed to update farm information. Please try again.")
      console.error("Farm info update error:", error)
    } finally {
      setLoading(false)
    }
  }

  const cropTypes = [
    "Wheat", "Rice", "Maize", "Sugarcane", "Cotton", "Soybeans",
    "Vegetables", "Fruits", "Pulses", "Oilseeds"
  ]

  const seasons = [
    "Rabi", "Kharif", "Zaid"
  ]

  const farmingTypes = [
    "Organic", "Traditional", "Modern"
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Farm Information</h1>
            <p className="text-gray-600">Update your farm details and preferences</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
                {success}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label htmlFor="crop_type" className="block text-sm font-medium text-gray-700 mb-2">
                  Crop Type
                </label>
                <select
                  id="crop_type"
                  name="crop_type"
                  value={formData.crop_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select crop type</option>
                  {cropTypes.map((crop) => (
                    <option key={crop} value={crop}>
                      {crop}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="land_area" className="block text-sm font-medium text-gray-700 mb-2">
                  Land Area (in acres)
                </label>
                <input
                  type="number"
                  id="land_area"
                  name="land_area"
                  value={formData.land_area}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter land area"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label htmlFor="season" className="block text-sm font-medium text-gray-700 mb-2">
                  Season
                </label>
                <select
                  id="season"
                  name="season"
                  value={formData.season}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select season</option>
                  {seasons.map((season) => (
                    <option key={season} value={season}>
                      {season}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter village name or PIN code"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Farming Type
                </label>
                <div className="space-y-2">
                  {farmingTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="farming_type"
                        value={type}
                        checked={formData.farming_type === type}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FarmInformationPage 