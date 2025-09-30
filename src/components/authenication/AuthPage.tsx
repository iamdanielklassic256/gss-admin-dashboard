import { useState } from "react"
import { LogIn, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthForm } from "./AuthForm"
import { BrandSection } from "./BrandSection"

export type AuthView = "signin" | "forgot-password" | "reset-password"

interface AuthPageProps {
  defaultView?: AuthView
  onAuthSuccess?: (data: any) => void
  schoolName?: string
  schoolLogo?: string
  adminEmailDomain?: string
}

export function AuthPage({
  defaultView = "signin",
  onAuthSuccess,
  schoolName = "Gulu Secondary School",
  schoolLogo = "/logo.png",
  adminEmailDomain = "guluss.sc.ug"
}: AuthPageProps) {
  const [currentView, setCurrentView] = useState<AuthView>(defaultView)

  const handleViewChange = (view: AuthView) => {
    setCurrentView(view)
  }

  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/40">
                <img 
                  src={schoolLogo} 
                  alt={`${schoolName} Logo`} 
                  className="w-9 h-9 object-contain" 
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  {schoolName}
                </h1>
                <p className="text-sm text-gray-500 font-medium">
                  Admin Dashboard
                </p>
              </div>
            </div>
            <p className="text-gray-600">
              {currentView === "signin" && "Welcome back! Please sign in to your account"}
              {currentView === "forgot-password" && "Reset your password"}
              {currentView === "reset-password" && "Create new password"}
            </p>
          </div>

          {/* Auth Card */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-bold flex items-center justify-center gap-2">
                <LogIn className="w-5 h-5 text-emerald-600" />
                {currentView === "signin" && "Sign In"}
                {currentView === "forgot-password" && "Forgot Password"}
                {currentView === "reset-password" && "Reset Password"}
              </CardTitle>
              <CardDescription>
                {currentView === "signin" && "Enter your credentials to access the dashboard"}
                {currentView === "forgot-password" && "Enter your email to receive reset instructions"}
                {currentView === "reset-password" && "Enter your new password below"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuthForm
                view={currentView}
                onViewChange={handleViewChange}
                onAuthSuccess={onAuthSuccess}
                adminEmailDomain={adminEmailDomain}
              />
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              © {currentYear} {schoolName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <BrandSection schoolName={schoolName} />
    </div>
  )
}