import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"

const ProfilePage = () => {
  const { currentUser, updateUserProfile } = useAuth()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    farmName: "",
    farmSize: "",
    farmType: "",
    primaryCrops: [],
    irrigationSystem: "",
    phone: "",
    address: "",
    experience: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (currentUser?.profile) {
      setFormData({
        firstName: currentUser.profile.firstName || "",
        lastName: currentUser.profile.lastName || "",
        email: currentUser.email || "",
        farmName: currentUser.profile.farmName || "",
        farmSize: currentUser.profile.farmSize || "",
        farmType: currentUser.profile.farmType || "",
        primaryCrops: currentUser.profile.primaryCrops || [],
        irrigationSystem: currentUser.profile.irrigationSystem || "",
        phone: currentUser.profile.phone || "",
        address: currentUser.profile.address || "",
        experience: currentUser.profile.experience || "",
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

  const handleCropChange = (e) => {
    const { value, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      primaryCrops: checked
        ? [...prev.primaryCrops, value]
        : prev.primaryCrops.filter((crop) => crop !== value),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      await updateUserProfile(formData)
      setSuccess("Profile updated successfully!")
    } catch (error) {
      setError("Failed to update profile. Please try again.")
      console.error("Profile update error:", error)
    } finally {
      setLoading(false)
    }
  }

  const farmSizes = [
    { value: "small", label: "Small (1-50 acres)" },
    { value: "medium", label: "Medium (51-200 acres)" },
    { value: "large", label: "Large (201-1000 acres)" },
    { value: "enterprise", label: "Enterprise (1000+ acres)" },
  ]

  const farmTypes = [
    { value: "crop", label: "Crop Farming" },
    { value: "livestock", label: "Livestock" },
    { value: "mixed", label: "Mixed Farming" },
    { value: "organic", label: "Organic Farming" },
  ]

  const cropOptions = [
    "Corn", "Wheat", "Soybeans", "Rice", "Tomatoes", "Potatoes", "Cotton", "Sugarcane", "Barley", "Oats"
  ]

  const irrigationSystems = [
    { value: "drip", label: "Drip Irrigation" },
    { value: "sprinkler", label: "Sprinkler System" },
    { value: "flood", label: "Flood Irrigation" },
    { value: "center-pivot", label: "Center Pivot" },
    { value: "manual", label: "Manual Watering" },
  ]

  const experienceLevels = [
    "Beginner (0-2 years)",
    "Intermediate (3-10 years)",
    "Advanced (10+ years)",
    "Expert (20+ years)",
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-gray-600">Manage your account and farm information</p>
          </div>

          <div className="p-6">
            {success && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm">
                {success}
              </div>
            )}

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your farm address"
                  />
                </div>
              </div>

              {/* Farm Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Farm Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="farmName" className="block text-sm font-medium text-gray-700 mb-2">
                      Farm Name
                    </label>
                    <input
                      type="text"
                      id="farmName"
                      name="farmName"
                      value={formData.farmName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="farmSize" className="block text-sm font-medium text-gray-700 mb-2">
                      Farm Size
                    </label>
                    <select
                      id="farmSize"
                      name="farmSize"
                      value={formData.farmSize}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select farm size</option>
                      {farmSizes.map((size) => (
                        <option key={size.value} value={size.value}>
                          {size.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="farmType" className="block text-sm font-medium text-gray-700 mb-2">
                      Farm Type
                    </label>
                    <select
                      id="farmType"
                      name="farmType"
                      value={formData.farmType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select farm type</option>
                      {farmTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="irrigationSystem" className="block text-sm font-medium text-gray-700 mb-2">
                      Irrigation System
                    </label>
                    <select
                      id="irrigationSystem"
                      name="irrigationSystem"
                      value={formData.irrigationSystem}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select irrigation system</option>
                      {irrigationSystems.map((system) => (
                        <option key={system.value} value={system.value}>
                          {system.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Crops</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {cropOptions.map((crop) => (
                      <label key={crop} className="flex items-center">
                        <input
                          type="checkbox"
                          value={crop.toLowerCase()}
                          checked={formData.primaryCrops.includes(crop.toLowerCase())}
                          onChange={handleCropChange}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{crop}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Farming Experience
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
