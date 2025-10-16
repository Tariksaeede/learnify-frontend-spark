import { Link, useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { getRoleLabel, getLocalTimeZone } from "@/lib/formatters";
import { GraduationCap } from "lucide-react";

export function Navigation() {
  const { me, setMe } = useApp();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Learnify
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" active={isActive("/")}>
              Home
            </NavLink>
            <NavLink to="/catalog" active={isActive("/catalog")}>
              Catalog
            </NavLink>
            {me && me.role === 0 && (
              <NavLink to="/my-courses" active={isActive("/my-courses")}>
                My Courses
              </NavLink>
            )}
            {me && me.role === 1 && (
              <NavLink to="/teacher" active={isActive("/teacher")}>
                Teacher Console
              </NavLink>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden lg:block text-xs text-muted-foreground">
              {getLocalTimeZone()}
            </span>
            {me ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-semibold">
                    {me.name} {me.surname}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getRoleLabel(me.role)}
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setMe(null)}>
                  Sign out
                </Button>
              </div>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link to="/login">Sign in</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Button asChild variant={active ? "default" : "ghost"} size="sm" className="rounded-full">
      <Link to={to}>{children}</Link>
    </Button>
  );
}
