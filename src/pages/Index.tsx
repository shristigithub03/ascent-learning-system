
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, Layers, Users, CheckCircle } from "lucide-react";

const features = [
  {
    title: "Comprehensive Courses",
    description: "Access a wide range of courses taught by expert instructors in various fields.",
    icon: Layers,
  },
  {
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of practical experience.",
    icon: Users,
  },
  {
    title: "Self-Paced Learning",
    description: "Study at your own pace, with lifetime access to course materials.",
    icon: CheckCircle,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Ascent LMS</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Elevate Your Learning Journey
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover courses that will help you grow professionally and personally.
              Learn at your own pace with our flexible learning platform.
            </p>
            <div className="flex gap-4">
              <Link to="/register">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" size="lg">Browse Courses</Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary to-accent blur-xl opacity-30"></div>
              <div className="w-full h-64 md:h-80 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center border">
                <GraduationCap className="h-24 w-24 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 container">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Ascent LMS</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 border rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/10">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Begin Your Learning Journey?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students already learning on our platform.
          </p>
          <Link to="/register">
            <Button size="lg" className="mt-4">Create Your Account</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t mt-auto">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold">Ascent LMS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Ascent Learning Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
