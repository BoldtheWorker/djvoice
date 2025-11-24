import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, Trash2, Edit, Image as ImageIcon } from "lucide-react";

interface MediaItem {
  id: string;
  title: string;
  file_name: string;
  file_path: string;
  category: string;
  alt_text: string | null;
  mime_type: string | null;
  created_at: string;
}

const AdminMedia = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadData, setUploadData] = useState({
    title: "",
    category: "other",
    alt_text: "",
  });
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const categories = [
    { value: "all", label: "All Images" },
    { value: "hero", label: "Hero Images" },
    { value: "logo", label: "Logos" },
    { value: "mixtape", label: "Mixtape Covers" },
    { value: "portfolio", label: "Portfolio" },
    { value: "event", label: "Events" },
    { value: "other", label: "Other" },
  ];

  const { data: mediaItems, isLoading } = useQuery({
    queryKey: ["media-library", selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from("media_library")
        .select("*")
        .order("created_at", { ascending: false });

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as MediaItem[];
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!uploadFile) throw new Error("No file selected");

      const fileExt = uploadFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${uploadData.category}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(filePath, uploadFile);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("site-images")
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase.from("media_library").insert({
        title: uploadData.title,
        file_name: uploadFile.name,
        file_path: urlData.publicUrl,
        file_size: uploadFile.size,
        mime_type: uploadFile.type,
        category: uploadData.category,
        alt_text: uploadData.alt_text || null,
      });

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media-library"] });
      toast({ title: "Image uploaded successfully!" });
      setIsUploadOpen(false);
      setUploadFile(null);
      setUploadData({ title: "", category: "other", alt_text: "" });
    },
    onError: (error: Error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!editingItem) return;

      const { error } = await supabase
        .from("media_library")
        .update({
          title: editingItem.title,
          category: editingItem.category,
          alt_text: editingItem.alt_text,
        })
        .eq("id", editingItem.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media-library"] });
      toast({ title: "Image updated successfully!" });
      setIsEditOpen(false);
      setEditingItem(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (item: MediaItem) => {
      const pathParts = item.file_path.split("/site-images/");
      const storagePath = pathParts[1];

      const { error: storageError } = await supabase.storage
        .from("site-images")
        .remove([storagePath]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from("media_library")
        .delete()
        .eq("id", item.id);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media-library"] });
      toast({ title: "Image deleted successfully!" });
    },
    onError: (error: Error) => {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Media Library</h1>
          <p className="text-muted-foreground">Manage all site images</p>
        </div>

        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload size={16} />
              Upload Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Image File</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  value={uploadData.title}
                  onChange={(e) =>
                    setUploadData({ ...uploadData, title: e.target.value })
                  }
                  placeholder="Image title"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={uploadData.category}
                  onValueChange={(value) =>
                    setUploadData({ ...uploadData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Alt Text (SEO)</Label>
                <Textarea
                  value={uploadData.alt_text}
                  onChange={(e) =>
                    setUploadData({ ...uploadData, alt_text: e.target.value })
                  }
                  placeholder="Describe the image for accessibility"
                />
              </div>
              <Button
                onClick={() => uploadMutation.mutate()}
                disabled={!uploadFile || !uploadData.title || uploadMutation.isPending}
                className="w-full"
              >
                {uploadMutation.isPending ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={selectedCategory === cat.value ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat.value)}
            size="sm"
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading images...</div>
      ) : !mediaItems || mediaItems.length === 0 ? (
        <Card className="p-12 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No images found</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mediaItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video bg-muted relative">
                <img
                  src={item.file_path}
                  alt={item.alt_text || item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold truncate">{item.title}</h3>
                <p className="text-xs text-muted-foreground">
                  Category: {item.category}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setEditingItem(item);
                      setIsEditOpen(true);
                    }}
                  >
                    <Edit size={14} />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      if (confirm("Delete this image?")) {
                        deleteMutation.mutate(item);
                      }
                    }}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={editingItem.title}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={editingItem.category}
                  onValueChange={(value) =>
                    setEditingItem({ ...editingItem, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Alt Text</Label>
                <Textarea
                  value={editingItem.alt_text || ""}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      alt_text: e.target.value,
                    })
                  }
                />
              </div>
              <Button
                onClick={() => updateMutation.mutate()}
                disabled={updateMutation.isPending}
                className="w-full"
              >
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMedia;
