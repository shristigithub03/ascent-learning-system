
import { CourseGrid } from "@/components/courses/CourseGrid";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, BarChart } from "lucide-react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data - would come from Supabase
const instructorCourses = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of web development, HTML, CSS and JavaScript.",
    instructorName: "Jane Smith",
    enrolledCount: 153,
    lessonCount: 12,
    duration: "6 hours",
  },
  {
    id: "2",
    title: "Advanced React Techniques",
    description: "Master React hooks, context, and performance optimization.",
    instructorName: "Jane Smith",
    enrolledCount: 86,
    lessonCount: 10,
    duration: "8 hours",
  },
];

// Mock enrollment data
const enrollmentData = [
  { name: "Jan", enrollments: 32 },
  { name: "Feb", enrollments: 48 },
  { name: "Mar", enrollments: 61 },
  { name: "Apr", enrollments: 55 },
  { name: "May", enrollments: 78 },
  { name: "Jun", enrollments: 104 }
];

export default function InstructorDashboard() {
  return (
    <MainLayout userRole="instructor">
      <DashboardHeader 
        title="Instructor Dashboard" 
        subtitle="Manage your courses and track student progress" 
        showCreateButton
        createButtonText="Create Course"
      />
      
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">239</div>
            <p className="text-xs text-muted-foreground mt-1">
              +18 this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Courses
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground mt-1">
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Enrollment Trends</h3>
        <Card>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enrollments" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Your Courses</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <CourseGrid courses={instructorCourses} />
        </div>
      </div>
    </MainLayout>
  );
}
