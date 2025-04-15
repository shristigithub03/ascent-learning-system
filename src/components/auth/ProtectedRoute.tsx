
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

type UserRole = "admin" | "instructor" | "student";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles = [] }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect based on role
    if (user.role === "student") {
      return <Navigate to="/dashboard" />;
    } else if (user.role === "instructor") {
      return <Navigate to="/instructor/dashboard" />;
    } else if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
