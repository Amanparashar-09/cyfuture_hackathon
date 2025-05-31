import { Link } from "react-router-dom"

const HomePage = () => {
  const features = [
    {
      icon: "💧",
      title: "Water Optimization",
      description: "Smart irrigation scheduling based on soil moisture, weather data, and crop requirements.",
      benefits: [
        "Real-time soil moisture monitoring",
        "Weather-based irrigation scheduling",
        "Water usage analytics and reporting",
      ],
    },
    {
      icon: "🌱",
      title: "Fertilizer Management",
      description: "Precision fertilizer application to maximize crop yield while minimizing environmental impact.",
      benefits: ["Soil nutrient analysis", "Customized fertilizer recommendations", "Application timing optimization"],
    },
    {
      icon: "📊",
      title: "Analytics & Insights",
      description: "Comprehensive data analytics to track performance and identify optimization opportunities.",
      benefits: ["Yield prediction models", "Resource efficiency metrics", "Sustainability scorecards"],
    },
  ]

  const benefits = [
    {
      icon: "📈",
      title: "Increase Yields",
      description: "Optimize resource allocation to maximize crop production and quality.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: "💧",
      title: "Reduce Water Usage",
      description: "Save up to 30% on water consumption through smart irrigation.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: "🍃",
      title: "Environmental Protection",
      description: "Minimize chemical runoff and promote sustainable farming practices.",
      color: "bg-purple-100 text-purple-600",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                🌱 Sustainable Agriculture
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Optimize Your Farm's <span className="text-green-600">Resources</span> for a{" "}
                <span className="text-blue-600">Sustainable Future</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Advanced AI-powered platform to optimize water usage, fertilizer application, and promote eco-friendly
                farming practices. Increase yields while protecting our environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/dashboard"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium text-center transition-colors"
                >
                  Start Optimizing
                </Link>
                <Link
                  to="/about"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium text-center transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=500&fit=crop"
                alt="Smart farming technology"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Smart Solutions for Modern Agriculture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides data-driven insights to help farmers make informed decisions about
              resource management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow rounded-lg p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx}>• {benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=400&fit=crop"
                alt="Sustainable farming benefits"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Why Choose Our Platform?</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 ${benefit.color} rounded-full flex items-center justify-center flex-shrink-0 text-sm`}
                    >
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Transform Your Farm?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using our platform to optimize their resources and increase
            sustainability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              to="/contact"
              className="border border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
