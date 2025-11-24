import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load bookings");
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success("Status updated successfully");
      loadBookings();
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete booking");
    } else {
      toast.success("Booking deleted successfully");
      loadBookings();
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: any = {
      pending: "secondary",
      confirmed: "default",
      cancelled: "destructive",
      completed: "outline",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bookings</h1>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Event Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{booking.client_name}</div>
                    <div className="text-sm text-muted-foreground">{booking.client_email}</div>
                    <div className="text-sm text-muted-foreground">{booking.client_phone}</div>
                  </div>
                </TableCell>
                <TableCell>{booking.event_type}</TableCell>
                <TableCell>
                  {new Date(booking.event_date).toLocaleDateString()}
                  {booking.event_time && ` at ${booking.event_time}`}
                </TableCell>
                <TableCell>{booking.location}</TableCell>
                <TableCell>{booking.budget_range}</TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Select
                      value={booking.status}
                      onValueChange={(value) => updateStatus(booking.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteBooking(booking.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
