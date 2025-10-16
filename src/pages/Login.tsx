import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { mockUsers } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Role } from "@/types";
import { toast } from "sonner";
import { GraduationCap } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { setMe } = useApp();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>(0);

  function handleLogin() {
    const found = mockUsers.find((u) => u.email === email && u.role === role) ?? null;
    setMe(found);
    
    if (!found) {
      toast.error("User not found. Try esma@example.com (Teacher) or qais@example.com (Student)");
    } else {
      toast.success(`Welcome back, ${found.name}!`);
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-accent/30 to-background">
      <div className="w-full max-w-md px-4">
        <div className="bg-card border border-border rounded-3xl shadow-2xl p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-primary-glow">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-2">Welcome back</h2>
          <p className="text-center text-muted-foreground mb-8">
            Sign in to your Learnify account
          </p>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Sign in as</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(Number(e.target.value) as Role)}
                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value={0}>Student</option>
                <option value={1}>Teacher</option>
              </select>
            </div>

            <Button className="w-full h-12" size="lg" onClick={handleLogin}>
              Continue
            </Button>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground mb-2">Demo accounts:</p>
            <ul className="text-xs space-y-1">
              <li>• Student: qais@example.com</li>
              <li>• Teacher: esma@example.com or merdun@example.com</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
