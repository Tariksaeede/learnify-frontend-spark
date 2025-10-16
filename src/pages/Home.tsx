import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { GraduationCap, Search, BookOpen, Users } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const { me } = useApp();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/50 via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Welcome to Learnify</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
                Find live & recorded{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  tech courses
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl">
                Discover teacher-led live sessions and curated recorded content. 
                Enroll with one click and start learning today.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="rounded-full px-8"
                  onClick={() => navigate("/catalog")}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Browse Catalog
                </Button>
                {me?.role === 1 && (
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="rounded-full px-8"
                    onClick={() => navigate("/teacher")}
                  >
                    Create Course
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                <Stat icon={BookOpen} label="Courses" value="100+" />
                <Stat icon={Users} label="Students" value="10K+" />
                <Stat icon={GraduationCap} label="Teachers" value="50+" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-3xl blur-3xl" />
              <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                  alt="Students learning"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose Learnify?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to accelerate your learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Live Sessions"
            description="Join interactive live classes with real-time Q&A and collaboration"
            icon="🎥"
          />
          <FeatureCard
            title="Recorded Content"
            description="Learn at your own pace with high-quality recorded courses"
            icon="📚"
          />
          <FeatureCard
            title="Expert Teachers"
            description="Learn from industry professionals with years of experience"
            icon="👨‍🏫"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-glow p-12 text-center text-primary-foreground">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of students already learning on Learnify
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="rounded-full px-8"
            onClick={() => navigate("/catalog")}
          >
            Explore Courses
          </Button>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="p-8 rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 bg-card">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
