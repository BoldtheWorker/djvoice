import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        checkAdminRole(session.user.id);
      }
    });
  }, []);

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (data) {
      navigate("/admin/dashboard");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('verify-admin-secret', {
        body: { secret }
      });

      if (error) throw error;

      if (data?.valid) {
        // Create a special admin session marker
        localStorage.setItem('admin_verified', 'true');
        toast.success("Admin access granted");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid admin secret");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to verify secret");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Sign in to access the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="secret" className="text-sm font-medium">
                Admin Secret Code
              </label>
              <Input
                id="secret"
                type="password"
                placeholder="Enter admin secret"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Access Admin Panel"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
