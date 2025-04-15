
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
  userRole?: "admin" | "instructor" | "student";
  showSidebar?: boolean;
  className?: string;
}

export function MainLayout({ 
  children, 
  userRole,
  showSidebar = true,
  className 
}: MainLayoutProps) {
  const { user } = useAuth();
  const role = userRole || user?.role;
  const navigate = useNavigate();

  // Ensure correct routing on user role changes
  useEffect(() => {
    if (user && role) {
      // Make sure the user is on the correct dashboard based on their role
      const currentPath = window.location.pathname;
      const isOnDashboard = currentPath === '/dashboard' || 
                           currentPath === '/instructor/dashboard' || 
                           currentPath === '/admin/dashboard';
      
      if (isOnDashboard) {
        const correctPath = role === 'student' ? '/dashboard' :
                           role === 'instructor' ? '/instructor/dashboard' :
                           role === 'admin' ? '/admin/dashboard' : '/dashboard';
        
        if (currentPath !== correctPath) {
          navigate(correctPath);
        }
      }
    }
  }, [user, role, navigate]);

  return (
    <div className="flex h-screen w-full bg-background">
      {showSidebar && <Sidebar userRole={role} />}
      <main className={cn("flex-1 overflow-auto p-6", className)}>
        {children}
      </main>
    </div>
  );
}
