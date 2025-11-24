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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminPortfolio() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "photo",
    media_url: "",
    thumbnail_url: "",
    event_name: "",
    event_date: "",
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const { data, error } = await supabase
      .from("portfolio")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load portfolio");
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from("portfolio")
        .update(formData)
        .eq("id", editingId);

      if (error) {
        toast.error("Failed to update item");
      } else {
        toast.success("Item updated successfully");
        setDialogOpen(false);
        loadItems();
        resetForm();
      }
    } else {
      const { error } = await supabase.from("portfolio").insert(formData);

      if (error) {
        toast.error("Failed to create item");
      } else {
        toast.success("Item created successfully");
        setDialogOpen(false);
        loadItems();
        resetForm();
      }
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      title: item.title || "",
      type: item.type || "photo",
      media_url: item.media_url || "",
      thumbnail_url: item.thumbnail_url || "",
      event_name: item.event_name || "",
      event_date: item.event_date || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const { error } = await supabase.from("portfolio").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete item");
    } else {
      toast.success("Item deleted successfully");
      loadItems();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      type: "photo",
      media_url: "",
      thumbnail_url: "",
      event_name: "",
      event_date: "",
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Add"} Portfolio Item</DialogTitle>
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
                <label className="text-sm font-medium">Type</label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photo">Photo</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="flyer">Flyer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Media URL</label>
                <Input
                  value={formData.media_url}
                  onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Thumbnail URL</label>
                <Input
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Event Name</label>
                <Input
                  value={formData.event_name}
                  onChange={(e) => setFormData({ ...formData, event_name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Event Date</label>
                <Input
                  type="date"
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">
                {editingId ? "Update" : "Create"} Item
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
              <TableHead>Type</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="capitalize">{item.type}</TableCell>
                <TableCell>{item.event_name}</TableCell>
                <TableCell>
                  {item.event_date && new Date(item.event_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
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
