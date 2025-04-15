
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, FileText, Lock, PlayCircle, User } from "lucide-react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

// Mock course data - would come from Supabase
const courseData = {
  id: "1",
  title: "Introduction to Web Development",
  description: "Learn the fundamentals of web development, HTML, CSS and JavaScript. This course is designed for beginners with no prior experience in web development. By the end of this course, you will be able to build basic websites and understand the core concepts of modern web development.",
  instructorName: "Jane Smith",
  instructorTitle: "Senior Web Developer",
  instructorBio: "Jane has 10+ years of experience in web development and has taught over 50,000 students online.",
  enrolledCount: 153,
  lessonCount: 12,
  duration: "6 hours",
  level: "Beginner",
  progress: 65,
  enrolled: true,
  imageUrl: "",
  lessons: [
    {
      id: "l1",
      title: "Introduction to HTML",
      duration: "15:30",
      type: "video",
      completed: true,
    },
    {
      id: "l2",
      title: "HTML Elements and Structure",
      duration: "23:45",
      type: "video",
      completed: true,
    },
    {
      id: "l3",
      title: "Introduction to CSS",
      duration: "18:20",
      type: "video",
      completed: true,
    },
    {
      id: "l4",
      title: "CSS Styling Basics",
      duration: "27:15",
      type: "video",
      completed: false,
    },
    {
      id: "l5",
      title: "HTML & CSS Quiz",
      type: "quiz",
      completed: false,
      locked: true,
    },
    {
      id: "l6",
      title: "Introduction to JavaScript",
      duration: "22:10",
      type: "video",
      completed: false,
      locked: true,
    }
  ]
};

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  // In a real app, we would fetch the course data using courseId
  const course = courseData;
  
  const completedCount = course.lessons.filter(lesson => lesson.completed).length;
  
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        {/* Course Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-muted-foreground mb-4">{course.description}</p>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-1 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Instructor: <span className="font-medium">{course.instructorName}</span></span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{course.duration}</span>
              </div>
              <Badge variant="secondary">{course.level}</Badge>
            </div>
            {course.enrolled && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Your progress</span>
                  <span>{course.progress}% complete</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            )}
          </div>
          <div>
            <Card className="overflow-hidden">
              {/* If we had an image, we would display it here */}
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 h-36 flex items-center justify-center">
                <PlayCircle className="h-16 w-16 text-primary" />
              </div>
              <CardContent className="p-6">
                {course.enrolled ? (
                  <Button className="w-full mb-4">Continue Learning</Button>
                ) : (
                  <Button className="w-full mb-4">Enroll Now</Button>
                )}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lessons</span>
                    <span>{course.lessonCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Students</span>
                    <span>{course.enrolledCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Course Content */}
        <Tabs defaultValue="content" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="content">Course Content</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Course Lessons</h2>
                  <div className="text-sm text-muted-foreground">
                    {completedCount}/{course.lessons.length} completed
                  </div>
                </div>
                <div className="space-y-2">
                  {course.lessons.map((lesson) => (
                    <div 
                      key={lesson.id} 
                      className={`p-3 rounded-md border flex items-center justify-between ${
                        lesson.completed ? "bg-primary/5" : ""
                      } ${lesson.locked ? "opacity-60" : ""}`}
                    >
                      <div className="flex items-center gap-2">
                        {lesson.type === "video" ? (
                          <PlayCircle className="h-5 w-5 text-primary" />
                        ) : (
                          <FileText className="h-5 w-5 text-primary" />
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium">{lesson.title}</span>
                          {lesson.duration && (
                            <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center">
                        {lesson.locked ? (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        ) : lesson.completed ? (
                          <CheckCircle className="h-4 w-4 text-primary" />
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="instructor">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                    {course.instructorName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{course.instructorName}</h2>
                    <p className="text-muted-foreground">{course.instructorTitle}</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <p className="text-sm">{course.instructorBio}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
