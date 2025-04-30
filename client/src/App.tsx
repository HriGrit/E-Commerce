import { Routes, Route } from "react-router-dom"
import Navbar from "@/components/Navbar"
import About from "@/pages/About"
import Home from "@/pages/Home"
import Contact from "@/pages/Contact"
import Footer from "@/components/Footer"
import Profile from "@/pages/Profile"
import NotFound from "./pages/404"
import { Suspense } from "react"
import { LoadingSpinner } from "./components/ui/spinner"
import AuthLayout from "./pages/AuthLayout"
import { LoginForm } from "./components/login-form"
import { RegisterForm } from "./components/register-form"

const App = () => {
  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <div className="flex-grow">
          <Routes>
            <Route index element={<Home />} />
            <Route element={<AuthLayout />}>
              <Route path="login" element={<LoginForm />} />
              <Route path="register" element={<RegisterForm />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Suspense>
      <Footer />
    </div>
  )
}

export default App
