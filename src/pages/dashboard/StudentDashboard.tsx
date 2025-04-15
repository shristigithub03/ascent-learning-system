
import { CourseGrid } from "@/components/courses/CourseGrid";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CheckCircle2, Clock } from "lucide-react";

// Mock data - would come from Supabase
const enrolledCourses = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of web development, HTML, CSS and JavaScript.",
    instructorName: "Jane Smith",
    progress: 65,
    lessonCount: 12,
    duration: "6 hours",
    enrolled: true,
  },
  {
    id: "2",
    title: "Advanced React Techniques",
    description: "Master React hooks, context, and performance optimization.",
    instructorName: "John Doe",
    progress: 23,
    lessonCount: 10,
    duration: "8 hours",
    enrolled: true,
  },
  {
    id: "3", 
    title: "UX Design Principles",
    description: "Learn how to create intuitive and engaging user experiences.",
    instructorName: "Alice Johnson",
    progress: 10,
    lessonCount: 8,
    duration: "5 hours",
    enrolled: true,
  },
];

const recommendedCourses = [
  {
    id: "4",
    title: "Data Science Fundamentals",
    description: "Introduction to data analysis, visualization and machine learning.",
    instructorName: "Robert Chen",
    enrolledCount: 1254,
    lessonCount: 15,
    duration: "12 hours",
  },
  {
    id: "5",
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps using React Native.",
    instructorName: "Sarah Wilson",
    enrolledCount: 879,
    lessonCount: 14,
    duration: "10 hours",
  },
];

export default function StudentDashboard() {
  return (
    <MainLayout userRole="student">
      <DashboardHeader 
        title="Student Dashboard" 
        subtitle="Welcome back! Here's your learning progress"
      />
      
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Progress
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38%</div>
            <Progress className="mt-2" value={38} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Lessons
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12/32</div>
            <p className="text-xs text-muted-foreground mt-1">
              +2 this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Learning Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8h 24m</div>
            <p className="text-xs text-muted-foreground mt-1">
              +1h 12m this week
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="enrolled" className="space-y-4">
        <TabsList>
          <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        <TabsContent value="enrolled" className="space-y-4">
          <CourseGrid courses={enrolledCourses} />
        </TabsContent>
        <TabsContent value="recommended" className="space-y-4">
          <CourseGrid courses={recommendedCourses} />
          <div className="text-center mt-6">
            <Button variant="outline">Browse More Courses</Button>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
