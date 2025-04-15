
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  GraduationCap, 
  Home, 
  LayoutDashboard, 
  Library, 
  LogOut, 
  Settings, 
  Users 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

type SidebarItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  role?: string[];
};

const sidebarItems: SidebarItem[] = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
    role: ["student", "instructor", "admin"],
  },
  {
    icon: BookOpen,
    label: "My Courses",
    href: "/my-courses",
    role: ["student"],
  },
  {
    icon: Library,
    label: "Courses",
    href: "/courses",
    role: ["instructor"],
  },
  {
    icon: GraduationCap,
    label: "Students",
    href: "/students",
    role: ["instructor"],
  },
  {
    icon: Users,
    label: "Users",
    href: "/users",
    role: ["admin"],
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];

interface SidebarProps {
  userRole?: "admin" | "instructor" | "student";
  className?: string;
}

export function Sidebar({ userRole, className }: SidebarProps) {
  const location = useLocation();
  const path = location.pathname;

  const filteredItems = sidebarItems.filter(
    (item) => !item.role || item.role.includes(userRole || "")
  );

  return (
    <div
      className={cn(
        "flex flex-col h-full border-r bg-sidebar p-4 w-64 shrink-0",
        className
      )}
    >
      <div className="flex items-center gap-2 px-2 mb-6">
        <GraduationCap className="h-10 w-10 text-primary" />
        <span className="text-lg font-bold">Ascent LMS</span>
      </div>

      <div className="space-y-1 flex-1">
        {filteredItems.map((item) => (
          <Link to={item.href} key={item.href}>
            <Button
              variant={path === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                path === item.href
                  ? "bg-secondary/20 hover:bg-secondary/20"
                  : ""
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </div>

      <Button variant="ghost" className="justify-start gap-2 mt-auto">
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
}
