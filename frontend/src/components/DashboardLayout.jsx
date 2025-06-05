import { useState } from "react"
import { Link, useLocation, Outlet } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { RiRobot3Fill } from "react-icons/ri";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { currentUser, logout } = useAuth()

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: "📊" },
    { name: "Advisory", href: "/dashboard/advisory", icon: "💡" },
    { name: "Reports", href: "/dashboard/reports", icon: "📈" },
    { name: "Farm Info", href: "/dashboard/farm-info", icon: "🌾" },
    { name: "Profile", href: "/dashboard/profile", icon: "👤" }
  ]

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard"
    }
    return location.pathname.startsWith(path)
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center h-auto md:h-16 py-2 md:py-0">
            {/* Logo and Main Navigation */}
            <div className="flex flex-col md:flex-row md:items-center w-full md:w-auto">
              <Link to="/" className="flex items-center space-x-2 mb-2 md:mb-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
                  <span className="text-white font-bold">🍃</span>
                </div>
                <span className="text-xl font-bold text-gray-900">AgriOptimize</span>
              </Link>

              <nav className="flex flex-wrap gap-2 md:gap-4 lg:gap-6 ml-0 md:ml-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                      isActive(item.href)
                        ? "bg-green-100 text-green-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <span className="mr-2 text-lg">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right side - User menu and Assistant button */}
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              {/* Assistant Button */}
              <Link
                to="/dashboard/assistant"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-500 text-white hover:bg-gray-700 transition-colors"
                title="AI Assistant"
              >
                <span className="text-lg"><RiRobot3Fill /></span>
              </Link>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {currentUser?.profile?.firstName?.charAt(0) || currentUser?.email?.charAt(0) || "U"}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {currentUser?.profile?.firstName || currentUser?.email?.split('@')[0]}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {sidebarOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        {currentUser?.profile?.firstName && currentUser?.profile?.lastName
                          ? `${currentUser.profile.firstName} ${currentUser.profile.lastName}`
                          : currentUser?.email}
                      </p>
                      <p className="text-xs text-gray-500">
                        {currentUser?.profile?.farmName || "Farm Owner"}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Overlay for dropdown */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default DashboardLayout
