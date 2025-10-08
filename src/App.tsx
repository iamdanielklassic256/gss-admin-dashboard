import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AboutPage, BlogPage, BoardGovernorPage, CoCurriculumPage, CurriculumPage, DashboardPage, DepartmentContactPage, LoginPage, MessagePage, NotFoundPage, SchoolLeadershipPage, SocialMediaPage, StudentLeadershipPage, SubscribersPage } from "./pages";
import { useAuthStore } from "./stores/authStore";
import ProtectedRoute from "./components/authenication/ProtectedRoute";

// Component to handle authentication state
const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/auth/sign-in" 
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
        } 
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/school-administration/bog"
        element={
          <ProtectedRoute>
            <BoardGovernorPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/school-administration/leadership"
        element={
          <ProtectedRoute>
            <SchoolLeadershipPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/school-administration/student"
        element={
          <ProtectedRoute>
            <StudentLeadershipPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/academics/curriculum"
        element={
          <ProtectedRoute>
            <CurriculumPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/academics/co-curriculum"
        element={
          <ProtectedRoute>
            <CoCurriculumPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/school-profile/about"
        element={
          <ProtectedRoute>
            <AboutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/communications/department-contacts"
        element={
          <ProtectedRoute>
            <DepartmentContactPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/communications/messages"
        element={
          <ProtectedRoute>
            <MessagePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/communications/social-media"
        element={
          <ProtectedRoute>
            <SocialMediaPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/communications/subscribers"
        element={
          <ProtectedRoute>
            <SubscribersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/communications/news"
        element={
          <ProtectedRoute>
            <BlogPage />
          </ProtectedRoute>
        }
      />

      {/* ADD ALL CUSTOM PROTECTED ROUTES ABOVE */}
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;