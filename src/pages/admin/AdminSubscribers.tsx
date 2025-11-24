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
import { Trash2, Download } from "lucide-react";

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    const { data, error } = await supabase
      .from("subscribers")
      .select("*")
      .order("subscribed_at", { ascending: false });

    if (error) {
      toast.error("Failed to load subscribers");
    } else {
      setSubscribers(data || []);
    }
    setLoading(false);
  };

  const deleteSubscriber = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;

    const { error } = await supabase.from("subscribers").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete subscriber");
    } else {
      toast.success("Subscriber deleted successfully");
      loadSubscribers();
    }
  };

  const exportToCSV = () => {
    const csv = [
      ["Email", "Source", "Subscribed At"],
      ...subscribers.map((sub) => [
        sub.email,
        sub.source,
        new Date(sub.subscribed_at).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
    toast.success("Exported to CSV");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Subscribers</h1>
        <Button onClick={exportToCSV}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Subscribed At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell className="font-medium">{subscriber.email}</TableCell>
                <TableCell>{subscriber.source}</TableCell>
                <TableCell>
                  {new Date(subscriber.subscribed_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteSubscriber(subscriber.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
