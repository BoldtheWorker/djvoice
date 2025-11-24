import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Music, Image, FileText, Calendar, Users, LogOut, Menu } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const adminVerified = localStorage.getItem('admin_verified');
      
      if (!adminVerified) {
        navigate("/admin/login");
        return;
      }

      setLoading(false);
    } catch (error) {
      navigate("/admin/login");
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('admin_verified');
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Music, label: "Mixtapes", path: "/admin/mixtapes" },
    { icon: Calendar, label: "Events", path: "/admin/events" },
    { icon: Image, label: "Media", path: "/admin/media" },
    { icon: Image, label: "Portfolio", path: "/admin/portfolio" },
    { icon: FileText, label: "Blog Posts", path: "/admin/posts" },
    { icon: Calendar, label: "Bookings", path: "/admin/bookings" },
    { icon: Users, label: "Subscribers", path: "/admin/subscribers" },
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b flex items-center justify-between px-4 z-50">
        <h1 className="text-lg font-bold">Admin Panel</h1>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <div className="flex flex-col gap-2 mt-8">
              <NavLinks />
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="mt-4 w-full justify-start"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-card border-r p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="space-y-2">
          <NavLinks />
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
