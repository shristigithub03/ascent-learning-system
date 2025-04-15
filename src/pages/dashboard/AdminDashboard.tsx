
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  BookOpen,
  GraduationCap,
  MoreHorizontal,
  FileText,
  LineChart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data - would come from Supabase
const recentUsers = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "student",
    joinDate: "2023-10-12",
  },
  {
    id: "2",
    name: "John Smith",
    email: "john@example.com",
    role: "instructor",
    joinDate: "2023-10-10",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "student",
    joinDate: "2023-10-08",
  },
  {
    id: "4",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "student",
    joinDate: "2023-10-05",
  },
  {
    id: "5",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "instructor",
    joinDate: "2023-10-03",
  },
];

const recentCourses = [
  {
    id: "1",
    title: "Introduction to Web Development",
    instructor: "Jane Smith",
    students: 153,
    created: "2023-09-20",
  },
  {
    id: "2",
    title: "Advanced React Techniques",
    instructor: "John Doe",
    students: 86,
    created: "2023-09-18",
  },
  {
    id: "3",
    title: "UX Design Principles",
    instructor: "Alice Johnson",
    students: 127,
    created: "2023-09-15",
  },
  {
    id: "4",
    title: "Data Science Fundamentals",
    instructor: "Robert Chen",
    students: 95,
    created: "2023-09-12",
  },
  {
    id: "5",
    title: "Mobile App Development with React Native",
    instructor: "Sarah Wilson",
    students: 72,
    created: "2023-09-10",
  },
];

// Mock chart data
const chartData = [
  { name: "Jan", users: 40, courses: 24 },
  { name: "Feb", users: 65, courses: 28 },
  { name: "Mar", users: 85, courses: 35 },
  { name: "Apr", users: 125, courses: 42 },
  { name: "May", users: 160, courses: 51 },
  { name: "Jun", users: 210, courses: 60 },
];

export default function AdminDashboard() {
  return (
    <MainLayout userRole="admin">
      <DashboardHeader 
        title="Admin Dashboard" 
        subtitle="Manage all users, courses, and platform settings" 
      />
      
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">543</div>
            <p className="text-xs text-muted-foreground mt-1">
              +32 this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Courses
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground mt-1">
              +5 this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Instructors
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">
              +2 this month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <LineChart className="mr-2 h-5 w-5" />
            Growth Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="hsl(217, 91%, 60%)" 
                strokeWidth={2} 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="courses" 
                stroke="hsl(263, 75%, 58%)" 
                strokeWidth={2} 
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Recent Users</TabsTrigger>
          <TabsTrigger value="courses">Recent Courses</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`capitalize inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.role === "instructor" 
                            ? "bg-primary/10 text-primary" 
                            : "bg-secondary/10 text-secondary"
                        }`}>
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem>View Courses</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div className="flex justify-end mt-4">
            <Button variant="outline">View All Users</Button>
          </div>
        </TabsContent>
        <TabsContent value="courses">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Title</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>{course.students}</TableCell>
                      <TableCell>{course.created}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Course</DropdownMenuItem>
                            <DropdownMenuItem>Edit Course</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete Course
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div className="flex justify-end mt-4">
            <Button variant="outline">View All Courses</Button>
          </div>
        </TabsContent>
        <TabsContent value="reports">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0">
                <div className="flex-1">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    User Engagement Report
                  </CardTitle>
                </div>
                <Button variant="ghost" size="sm">Download</Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Overview of user logins, course participation, and activity metrics.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0">
                <div className="flex-1">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Course Completion Report
                  </CardTitle>
                </div>
                <Button variant="ghost" size="sm">Download</Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Detailed analysis of course completion rates and student performance.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0">
                <div className="flex-1">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Instructor Performance
                  </CardTitle>
                </div>
                <Button variant="ghost" size="sm">Download</Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Evaluation of instructor ratings, engagement, and course success.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0">
                <div className="flex-1">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    System Usage Analytics
                  </CardTitle>
                </div>
                <Button variant="ghost" size="sm">Download</Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Platform usage metrics, load patterns, and technical performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
