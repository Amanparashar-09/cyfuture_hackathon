const AboutPage = () => {
  const values = [
    {
      icon: "🎯",
      title: "Our Vision",
      description: "A world where every farm operates at peak efficiency while maintaining environmental harmony.",
      color: "bg-green-100",
    },
    {
      icon: "👥",
      title: "Our Team",
      description: "Agricultural experts, data scientists, and engineers working together for sustainable solutions.",
      color: "bg-blue-100",
    },
    {
      icon: "🏆",
      title: "Our Values",
      description: "Innovation, sustainability, transparency, and commitment to environmental stewardship.",
      color: "bg-purple-100",
    },
    {
      icon: "🌍",
      title: "Global Impact",
      description: "Supporting farmers across 50+ countries to achieve sustainable and profitable agriculture.",
      color: "bg-orange-100",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Farmers Served", color: "text-green-600" },
    { number: "2M+", label: "Acres Optimized", color: "text-blue-600" },
    { number: "40%", label: "Water Savings", color: "text-purple-600" },
    { number: "25%", label: "Yield Increase", color: "text-orange-600" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
            About AgriOptimize
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Pioneering Sustainable Agriculture Through Technology
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We're on a mission to revolutionize farming practices by providing farmers with intelligent tools to
            optimize resource usage and promote environmental sustainability.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To empower farmers worldwide with cutting-edge technology that optimizes resource utilization, increases
                crop yields, and promotes sustainable agricultural practices for a healthier planet.
              </p>
              <p className="text-lg text-gray-600">
                We believe that technology and nature can work together to create a more sustainable future for
                agriculture, ensuring food security while protecting our environment for future generations.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=400&fit=crop"
                alt="Our mission"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center bg-white shadow-lg rounded-lg p-6">
                <div
                  className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4 text-2xl`}
                >
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Story</h2>
          <div className="prose prose-lg mx-auto text-gray-600 space-y-6">
            <p className="text-lg leading-relaxed">
              Founded in 2020 by a team of agricultural engineers and environmental scientists, AgriOptimize was born
              from a simple observation: traditional farming methods were struggling to meet the demands of a growing
              population while protecting our planet's resources.
            </p>
            <p className="text-lg leading-relaxed">
              Our founders, having witnessed firsthand the challenges faced by farmers in optimizing water usage and
              fertilizer application, set out to create a technology platform that could bridge the gap between
              agricultural productivity and environmental sustainability.
            </p>
            <p className="text-lg leading-relaxed">
              Today, we're proud to serve thousands of farmers worldwide, helping them reduce resource waste by up to
              40% while increasing crop yields by an average of 25%. Our AI-powered platform continues to evolve,
              incorporating the latest advances in agricultural science and environmental monitoring.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
