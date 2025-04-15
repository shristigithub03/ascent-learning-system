
import { CourseGrid } from "@/components/courses/CourseGrid";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";

// Mock enrolled courses data - would come from Supabase in a real app
const studentEnrolledCourses = [
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

export default function MyCourses() {
  const { user } = useAuth();
  const isInstructor = user?.role === "instructor";
  
  return (
    <MainLayout>
      <DashboardHeader 
        title={isInstructor ? "My Courses" : "Enrolled Courses"}
        subtitle={isInstructor 
          ? "Manage your created courses" 
          : "Courses you're currently enrolled in"
        }
        showCreateButton={isInstructor}
        createButtonText="Create Course"
      />
      
      <div className="space-y-6">
        <CourseGrid 
          courses={isInstructor ? instructorCourses : studentEnrolledCourses} 
        />
      </div>
    </MainLayout>
  );
}
