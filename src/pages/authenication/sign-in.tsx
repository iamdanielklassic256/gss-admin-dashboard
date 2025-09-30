import { useState, useEffect } from "react"
import { Eye, EyeOff, LogIn, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/stores/authStore"
import { useNavigate, useLocation } from "react-router-dom"

function LoginPage() {
	const [showPassword, setShowPassword] = useState(false)
	const [rememberMe, setRememberMe] = useState(false)
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	})

	const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore()
	const navigate = useNavigate()
	const location = useLocation()

	// Redirect if already authenticated
	useEffect(() => {
		if (isAuthenticated) {
			const from = location.state?.from?.pathname || "/"
			navigate(from, { replace: true })
		}
	}, [isAuthenticated, navigate, location])

	// Clear error when form data changes
	useEffect(() => {
		clearError()
	}, [formData.email, formData.password, clearError])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		
		try {
			await login(formData)
			// Navigation will be handled by the useEffect above
		} catch (error) {
			// Error is handled in the store
			console.error('Login failed:', error)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const currentYear = new Date().getFullYear()

	return (
		<div className="min-h-screen flex">
			{/* Left Side - Login Form */}
			<div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
				<div className="w-full max-w-md">
					{/* Header */}
					<div className="text-center mb-8">
						<div className="flex items-center justify-center gap-3 mb-4">
							<div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/40">
								<img src="/logo.png" alt="Gulu Secondary School Logo" className="w-9 h-9 object-contain" />
							</div>
							<div>
								<h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
									Gulu Secondary School
								</h1>
								<p className="text-sm text-gray-500 font-medium">
									Admin Dashboard
								</p>
							</div>
						</div>
						<p className="text-gray-600">Welcome back! Please sign in to your account</p>
					</div>

					{/* Login Card */}
					<Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
						<CardHeader className="text-center pb-4">
							<CardTitle className="text-xl font-bold flex items-center justify-center gap-2">
								<LogIn className="w-5 h-5 text-emerald-600" />
								Sign In
							</CardTitle>
							<CardDescription>
								Enter your credentials to access the dashboard
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-5">
								{/* Error Message */}
								{error && (
									<div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
										<svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
										</svg>
										{error}
									</div>
								)}

								{/* Email Field */}
								<div className="space-y-2">
									<Label htmlFor="email" className="text-sm font-medium text-gray-700">
										Email Address
									</Label>
									<div className="relative">
										<Input
											id="email"
											name="email"
											type="email"
											placeholder="admin@guluss.sc.ug"
											value={formData.email}
											onChange={handleChange}
											className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
											required
											disabled={isLoading}
										/>
										<div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
											</svg>
										</div>
									</div>
								</div>

								{/* Password Field */}
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<Label htmlFor="password" className="text-sm font-medium text-gray-700">
											Password
										</Label>
										<button
											type="button"
											className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
										>
											Forgot password?
										</button>
									</div>
									<div className="relative">
										<Input
											id="password"
											name="password"
											type={showPassword ? "text" : "password"}
											placeholder="Enter your password"
											value={formData.password}
											onChange={handleChange}
											className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
											required
											disabled={isLoading}
										/>
										<div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
											</svg>
										</div>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
											disabled={isLoading}
										>
											{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
										</button>
									</div>
								</div>

								{/* Remember Me */}
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<Checkbox
											id="remember"
											checked={rememberMe}
											onCheckedChange={(checked) => setRememberMe(checked as boolean)}
											className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
											disabled={isLoading}
										/>
										<Label
											htmlFor="remember"
											className="text-sm text-gray-600 cursor-pointer"
										>
											Remember me
										</Label>
									</div>
								</div>

								{/* Sign In Button */}
								<Button
									type="submit"
									disabled={isLoading || !formData.email || !formData.password}
									className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{isLoading ? (
										<div className="flex items-center gap-2">
											<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
											Signing in...
										</div>
									) : (
										<div className="flex items-center gap-2">
											<LogIn className="w-5 h-5" />
											Sign In
										</div>
									)}
								</Button>
							</form>
						</CardContent>
					</Card>

					{/* Footer */}
					<div className="text-center mt-6">
						<p className="text-sm text-gray-600">
							© {currentYear} Gulu Secondary School. All rights reserved.
						</p>
					</div>
				</div>
			</div>

			{/* Right Side - Branding/Image */}
			<div className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-600 items-center justify-center p-12 relative overflow-hidden">
				{/* Background Pattern */}
				<div className="absolute inset-0 bg-black/10"></div>
				<div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
				<div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

				<div className="relative z-10 text-center text-white max-w-lg">
					<div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/30">
						<BookOpen className="w-12 h-12 text-white" />
					</div>

					<h2 className="text-4xl font-bold mb-6">
						Welcome to <span className="text-emerald-200">Gulu Secondary School</span>
					</h2>

					<p className="text-xl text-emerald-100 mb-8 leading-relaxed">
						Streamline your school management with our comprehensive admin dashboard.
						Manage students, staff, academics, and finances all in one place.
					</p>

					{/* Features List */}
					<div className="grid grid-cols-2 gap-4 text-left">
						{[
							"Student Management",
							"Academic Tracking",
							"Fee Collection",
							"Staff Directory",
							"Event Calendar",
							"Real-time Reports"
						].map((feature, index) => (
							<div key={index} className="flex items-center gap-3 text-emerald-100">
								<div className="w-2 h-2 bg-emerald-200 rounded-full"></div>
								<span className="text-sm">{feature}</span>
							</div>
						))}
					</div>

					{/* Stats */}
					<div className="flex justify-center gap-8 mt-12 pt-8 border-t border-white/20">
						{[
							{ number: "50K+", label: "Students" },
							{ number: "2K+", label: "Schools" },
							{ number: "99%", label: "Satisfaction" }
						].map((stat, index) => (
							<div key={index} className="text-center">
								<div className="text-2xl font-bold text-white">{stat.number}</div>
								<div className="text-sm text-emerald-200">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage