import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function AdminEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    venue: "",
    event_date: "",
    event_time: "",
    image_url: "",
    event_link: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true });

    if (error) {
      toast.error("Failed to load events");
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  };

  const uploadFile = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('site-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('site-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = formData.image_url;

      // Upload image if selected
      if (imageFile) {
        imageUrl = await uploadFile(imageFile, 'event-images');
      }

      const payload = {
        ...formData,
        image_url: imageUrl,
      };

      if (editingId) {
        const { error } = await supabase
          .from("events")
          .update(payload)
          .eq("id", editingId);

        if (error) throw error;
        toast.success("Event updated successfully");
      } else {
        const { error } = await supabase.from("events").insert(payload);
        if (error) throw error;
        toast.success("Event created successfully");
      }

      setDialogOpen(false);
      loadEvents();
      resetForm();
    } catch (error: any) {
      toast.error(error.message || "Failed to save event");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (event: any) => {
    setEditingId(event.id);
    setFormData({
      title: event.title || "",
      venue: event.venue || "",
      event_date: event.event_date || "",
      event_time: event.event_time || "",
      image_url: event.image_url || "",
      event_link: event.event_link || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete event");
    } else {
      toast.success("Event deleted successfully");
      loadEvents();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      venue: "",
      event_date: "",
      event_time: "",
      image_url: "",
      event_link: "",
    });
    setImageFile(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Add"} Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Venue</label>
                <Input
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Time</label>
                <Input
                  value={formData.event_time}
                  onChange={(e) => setFormData({ ...formData, event_time: e.target.value })}
                  placeholder="e.g., 9:00 PM - 4:00 AM"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Event Link</label>
                <Input
                  type="url"
                  value={formData.event_link}
                  onChange={(e) => setFormData({ ...formData, event_link: e.target.value })}
                  placeholder="e.g., https://eventbrite.com/..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Event Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
                {formData.image_url && !imageFile && (
                  <p className="text-xs text-muted-foreground mt-1">Current: {formData.image_url.split('/').pop()}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={uploading}>
                {uploading ? "Uploading..." : editingId ? "Update" : "Create"} Event
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{event.venue}</TableCell>
                <TableCell>{event.event_date}</TableCell>
                <TableCell>{event.event_time}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(event)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash2 className="w-4 h-4" />
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
