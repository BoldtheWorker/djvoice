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
import { Textarea } from "@/components/ui/textarea";

export default function AdminMixtapes() {
  const [mixtapes, setMixtapes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    genre: "",
    vibe: "",
    duration: "",
    audio_url: "",
    cover_url: "",
    tracklist: "",
    featured: false,
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadMixtapes();
  }, []);

  const loadMixtapes = async () => {
    const { data, error } = await supabase
      .from("mixtapes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load mixtapes");
    } else {
      setMixtapes(data || []);
    }
    setLoading(false);
  };

  const uploadFile = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
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
      let coverUrl = formData.cover_url;
      let audioUrl = formData.audio_url;

      // Upload cover image if selected
      if (coverFile) {
        coverUrl = await uploadFile(coverFile, 'mixtape-covers');
      }

      // Upload audio file if selected
      if (audioFile) {
        audioUrl = await uploadFile(audioFile, 'mixtape-audio');
      }

      const payload = {
        ...formData,
        cover_url: coverUrl,
        audio_url: audioUrl,
        duration: formData.duration ? parseInt(formData.duration) : null,
        tracklist: formData.tracklist ? JSON.parse(formData.tracklist) : null,
      };

      if (editingId) {
        const { error } = await supabase
          .from("mixtapes")
          .update(payload)
          .eq("id", editingId);

        if (error) throw error;
        toast.success("Mixtape updated successfully");
      } else {
        const { error } = await supabase.from("mixtapes").insert(payload);
        if (error) throw error;
        toast.success("Mixtape created successfully");
      }

      setDialogOpen(false);
      loadMixtapes();
      resetForm();
    } catch (error: any) {
      toast.error(error.message || "Failed to save mixtape");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (mixtape: any) => {
    setEditingId(mixtape.id);
    setFormData({
      title: mixtape.title || "",
      slug: mixtape.slug || "",
      genre: mixtape.genre || "",
      vibe: mixtape.vibe || "",
      duration: mixtape.duration?.toString() || "",
      audio_url: mixtape.audio_url || "",
      cover_url: mixtape.cover_url || "",
      tracklist: mixtape.tracklist ? JSON.stringify(mixtape.tracklist, null, 2) : "",
      featured: mixtape.featured || false,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this mixtape?")) return;

    const { error } = await supabase.from("mixtapes").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete mixtape");
    } else {
      toast.success("Mixtape deleted successfully");
      loadMixtapes();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      genre: "",
      vibe: "",
      duration: "",
      audio_url: "",
      cover_url: "",
      tracklist: "",
      featured: false,
    });
    setCoverFile(null);
    setAudioFile(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mixtapes</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Mixtape
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Add"} Mixtape</DialogTitle>
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
                <label className="text-sm font-medium">Slug</label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Genre</label>
                  <Input
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Vibe</label>
                  <Input
                    value={formData.vibe}
                    onChange={(e) => setFormData({ ...formData, vibe: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Duration (seconds)</label>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Cover Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
                {formData.cover_url && !coverFile && (
                  <p className="text-xs text-muted-foreground mt-1">Current: {formData.cover_url.split('/').pop()}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Audio File</label>
                <Input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
                {formData.audio_url && !audioFile && (
                  <p className="text-xs text-muted-foreground mt-1">Current: {formData.audio_url.split('/').pop()}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Tracklist (JSON)</label>
                <Textarea
                  value={formData.tracklist}
                  onChange={(e) => setFormData({ ...formData, tracklist: e.target.value })}
                  rows={6}
                  placeholder='[{"track": "Track 1", "artist": "Artist"}]'
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <label htmlFor="featured" className="text-sm font-medium">Featured</label>
              </div>
              <Button type="submit" className="w-full" disabled={uploading}>
                {uploading ? "Uploading..." : editingId ? "Update" : "Create"} Mixtape
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
              <TableHead>Genre</TableHead>
              <TableHead>Vibe</TableHead>
              <TableHead>Plays</TableHead>
              <TableHead>Downloads</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mixtapes.map((mixtape) => (
              <TableRow key={mixtape.id}>
                <TableCell className="font-medium">{mixtape.title}</TableCell>
                <TableCell>{mixtape.genre}</TableCell>
                <TableCell>{mixtape.vibe}</TableCell>
                <TableCell>{mixtape.play_count}</TableCell>
                <TableCell>{mixtape.download_count}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(mixtape)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(mixtape.id)}
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
