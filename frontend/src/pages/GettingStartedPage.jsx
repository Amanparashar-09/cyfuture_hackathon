import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { doc, updateDoc, getDoc } from "firebase/firestore"
import { auth, db } from "../firebase/config"

const GettingStartedPage = () => {
  const [user, loading] = useAuthState(auth)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    farmType: "",
    primaryCrops: [],
    irrigationSystem: "",
    currentChallenges: [],
    goals: [],
    experience: "",
  })
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin")
    }
  }, [user, loading, navigate])

  const farmTypes = [
    { id: "crop", label: "Crop Farming", icon: "🌾", description: "Grains, vegetables, fruits" },
    { id: "livestock", label: "Livestock", icon: "🐄", description: "Cattle, poultry, sheep" },
    { id: "mixed", label: "Mixed Farming", icon: "🚜", description: "Combination of crops and livestock" },
    { id: "organic", label: "Organic Farming", icon: "🌱", description: "Certified organic practices" },
  ]

  const cropOptions = [
    "Corn", "Wheat", "Soybeans", "Rice", "Tomatoes", "Potatoes", "Lettuce", "Carrots", "Apples", "Grapes", "Other"
  ]

  const irrigationSystems = [
    { id: "drip", label: "Drip Irrigation", icon: "💧" },
    { id: "sprinkler", label: "Sprinkler System", icon: "🌊" },
    { id: "flood", label: "Flood Irrigation", icon: "🌊" },
    { id: "manual", label: "Manual Watering", icon: "🪣" },
    { id: "none", label: "Rain-fed Only", icon: "🌧️" },
  ]

  const challenges = [
    "Water management", "Fertilizer optimization", "Pest control", "Weather prediction", 
    "Crop monitoring", "Cost reduction", "Yield improvement", "Soil health"
  ]

  const goals = [
    "Reduce water usage", "Increase crop yield", "Lower costs", "Improve sustainability",
    "Better pest management", "Soil improvement", "Weather resilience", "Automation"
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setSaving(true)
    try {
      if (user) {
        await updateDoc(doc(db, "users", user.uid), {
          ...formData,
          onboardingCompleted: true,
          completedAt: new Date().toISOString()
        })
        navigate("/dashboard")
      }
    } catch (error) {
      console.error("Error saving onboarding data:", error)
    } finally {
      setSaving(false)
    }
  }

  const ProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
      <div 
        className="bg-green-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(currentStep / 4) * 100}%` }}
      />
    </div>
  )

  const StepIndicator = () => (
    <div className="flex justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step <= currentStep ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {step}
          </div>
          {step < 4 && (
            <div className={`w-12 h-1 mx-2 ${
              step < currentStep ? 'bg-green-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to AgriOptimize!</h1>
          <p className="text-gray-600">Let's set up your farm profile to get personalized recommendations</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <StepIndicator />
          <ProgressBar />

          {/* Step 1: Farm Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center">What type of farming do you do?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {farmTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleInputChange('farmType', type.id)}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      formData.farmType === type.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-4xl mb-2">{type.icon}</div>
                    <h3 className="font-semibold text-gray-900">{type.label}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Crops and Irrigation */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">What do you grow?</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {cropOptions.map((crop) => (
                    <button
                      key={crop}
                      onClick={() => handleArrayToggle('primaryCrops', crop)}
                      className={`p-3 rounded-lg border transition-all ${
                        formData.primaryCrops.includes(crop)
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What irrigation system do you use?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {irrigationSystems.map((system) => (
                    <button
                      key={system.id}
                      onClick={() => handleInputChange('irrigationSystem', system.id)}
                      className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                        formData.irrigationSystem === system.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl">{system.icon}</span>
                      <span className="font-medium">{system.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Challenges */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center">What are your main challenges?</h2>
              <p className="text-gray-600 text-center">Select all that apply</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {challenges.map((challenge) => (
                  <button
                    key={challenge}
                    onClick={() => handleArrayToggle('currentChallenges', challenge)}
                    className={`p-3 rounded-lg border transition-all ${
                      formData.currentChallenges.includes(challenge)
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {challenge}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Goals and Experience */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">What are your goals?</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {goals.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => handleArrayToggle('goals', goal)}
                      className={`p-3 rounded-lg border transition-all ${
                        formData.goals.includes(goal)
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How would you describe your farming experience?</h3>
                <div className="space-y-2">
                  {['Beginner (0-2 years)', 'Intermediate (3-10 years)', 'Experienced (10+ years)', 'Expert (20+ years)'].map((level) => (
                    <button
                      key={level}
                      onClick={() => handleInputChange('experience', level)}
                      className={`w-full p-3 rounded-lg border transition-all text-left ${
                        formData.experience === level
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && !formData.farmType) ||
                  (currentStep === 2 && (!formData.primaryCrops.length || !formData.irrigationSystem)) ||
                  (currentStep === 3 && !formData.currentChallenges.length)
                }
                className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-md font-medium"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={saving || !formData.goals.length || !formData.experience}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-md font-medium"
              >
                {saving ? "Saving..." : "Complete Setup"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GettingStartedPage
