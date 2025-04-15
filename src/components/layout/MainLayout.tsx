
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

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

  return (
    <div className="flex h-screen w-full bg-background">
      {showSidebar && <Sidebar userRole={role} />}
      <main className={cn("flex-1 overflow-auto p-6", className)}>
        {children}
      </main>
    </div>
  );
}
