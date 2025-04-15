
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

type UserRole = "admin" | "instructor" | "student";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("lms_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // If user is on login/register page but already logged in, redirect to their dashboard
        if (location.pathname === '/login' || location.pathname === '/register') {
          redirectToDashboard(parsedUser.role);
        }
      } catch (e) {
        localStorage.removeItem("lms_user");
      }
    }
    setIsLoading(false);
  }, [location.pathname]);

  const redirectToDashboard = (role: UserRole) => {
    if (role === "student") {
      navigate("/dashboard", { replace: true });
    } else if (role === "instructor") {
      navigate("/instructor/dashboard", { replace: true });
    } else if (role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    }
  };

  const login = (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock login - in a real app, this would be a call to Supabase
      let mockUser: User;
      
      if (email === "student@example.com" && password === "password") {
        mockUser = {
          id: "1",
          email: "student@example.com",
          name: "Student User",
          role: "student",
        };
      } else if (email === "instructor@example.com" && password === "password") {
        mockUser = {
          id: "2",
          email: "instructor@example.com",
          name: "Instructor User",
          role: "instructor",
        };
      } else if (email === "admin@example.com" && password === "password") {
        mockUser = {
          id: "3",
          email: "admin@example.com",
          name: "Admin User",
          role: "admin",
        };
      } else {
        throw new Error("Invalid credentials");
      }

      setUser(mockUser);
      localStorage.setItem("lms_user", JSON.stringify(mockUser));
      
      // Show success toast
      toast.success(`Welcome back, ${mockUser.name}!`);
      
      // Check if we need to redirect to a specific page
      const from = (location.state as any)?.from || null;
      
      if (from) {
        navigate(from, { replace: true });
      } else {
        redirectToDashboard(mockUser.role);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = (email: string, password: string, name: string, role: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock registration - in a real app, this would be a call to Supabase
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        email,
        name,
        role: role as UserRole,
      };

      setUser(mockUser);
      localStorage.setItem("lms_user", JSON.stringify(mockUser));
      
      toast.success("Account created successfully!");
      redirectToDashboard(mockUser.role);
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("lms_user");
    setUser(null);
    toast.info("You have been logged out");
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
