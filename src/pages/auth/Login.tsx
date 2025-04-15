
import { AuthForm } from "@/components/auth/AuthForm";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/10">
      <div className="mb-8 flex items-center gap-2">
        <GraduationCap className="h-10 w-10 text-primary" />
        <h1 className="text-3xl font-bold">Ascent LMS</h1>
      </div>
      <AuthForm />
      <p className="mt-4 text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary underline">
          Register
        </Link>
      </p>
    </div>
  );
}
