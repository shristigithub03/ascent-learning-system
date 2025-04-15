
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export interface CourseProps {
  id: string;
  title: string;
  description: string;
  instructorName: string;
  enrolledCount?: number;
  progress?: number;
  lessonCount?: number;
  duration?: string;
  imageUrl?: string;
  enrolled?: boolean;
}

export function CourseCard({
  id,
  title,
  description,
  instructorName,
  enrolledCount,
  progress,
  lessonCount,
  duration,
  imageUrl,
  enrolled = false,
}: CourseProps) {
  return (
    <Card className="overflow-hidden">
      {imageUrl ? (
        <div 
          className="h-40 bg-cover bg-center" 
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ) : (
        <div className="h-40 bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
          <h3 className="text-2xl font-semibold text-primary">{title.substring(0, 2)}</h3>
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="line-clamp-1">{title}</CardTitle>
          {enrolled && <Badge>Enrolled</Badge>}
        </div>
        <CardDescription>{instructorName}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>
        <div className="flex gap-4 text-xs text-muted-foreground mb-2">
          {lessonCount && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{lessonCount} lessons</span>
            </div>
          )}
          {enrolledCount && (
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{enrolledCount} students</span>
            </div>
          )}
          {duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{duration}</span>
            </div>
          )}
        </div>
        {progress !== undefined && (
          <div className="space-y-1">
            <Progress value={progress} className="h-1" />
            <p className="text-xs text-muted-foreground text-right">
              {progress}% complete
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link to={`/courses/${id}`} className="w-full">
          <Button className="w-full" variant={enrolled ? "outline" : "default"}>
            {enrolled ? "Continue Learning" : "View Course"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
