import { Routes, Route } from "react-router-dom"
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
import AdvisoryPage from "./pages/AdvisoryPage"
import ReportsPage from "./pages/ReportsPage"
import AssistantPage from "./pages/AssistantPage"
import FarmInformationPage from "./pages/FarmInformationPage"

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public routes with header/footer */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomePage />
              <Footer />
            </>
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
          <Route path="advisory" element={<AdvisoryPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="assistant" element={<AssistantPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
