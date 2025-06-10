import { Routes, Route, Navigate } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ProtectedRoute from "./components/ProtectedRoute"
import DashboardLayout from "./components/DashboardLayout"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import GettingStartedPage from "./pages/GettingStartedPage"
import DashboardPage from "./pages/DashboardPage"
import ProfilePage from "./pages/ProfilePage"

import AssistantPage from "./pages/AssistantPage"
import FarmInformationPage from "./pages/FarmInformationPage"
import { useAuth } from "./contexts/AuthContext"

function App() {
  const { currentUser } = useAuth()

  return (
    <div className="App">
      <Routes>
        {/* Public routes with header/footer */}
        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <>
                <Header />
                <HomePage />
                <Footer />
              </>
            )
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
              <AboutPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Header />
              <ContactPage />
              <Footer />
            </>
          }
        />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected routes without header/footer (dashboard layout) */}
        <Route
          path="/getting-started"
          element={
            <ProtectedRoute>
              <GettingStartedPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="farm-info" element={<FarmInformationPage />} />
          <Route path="assistant" element={<AssistantPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
