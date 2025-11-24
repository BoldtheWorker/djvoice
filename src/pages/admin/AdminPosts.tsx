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
import { Badge } from "@/components/ui/badge";

export default function AdminPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    featured_image: "",
    published: false,
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load posts");
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      published_at: formData.published ? new Date().toISOString() : null,
    };

    if (editingId) {
      const { error } = await supabase
        .from("posts")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        toast.error("Failed to update post");
      } else {
        toast.success("Post updated successfully");
        setDialogOpen(false);
        loadPosts();
        resetForm();
      }
    } else {
      const { error } = await supabase.from("posts").insert(payload);

      if (error) {
        toast.error("Failed to create post");
      } else {
        toast.success("Post created successfully");
        setDialogOpen(false);
        loadPosts();
        resetForm();
      }
    }
  };

  const handleEdit = (post: any) => {
    setEditingId(post.id);
    setFormData({
      title: post.title || "",
      slug: post.slug || "",
      content: post.content || "",
      category: post.category || "",
      featured_image: post.featured_image || "",
      published: post.published || false,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete post");
    } else {
      toast.success("Post deleted successfully");
      loadPosts();
    }
  };

  const togglePublish = async (post: any) => {
    const { error } = await supabase
      .from("posts")
      .update({
        published: !post.published,
        published_at: !post.published ? new Date().toISOString() : null,
      })
      .eq("id", post.id);

    if (error) {
      toast.error("Failed to update post");
    } else {
      toast.success(`Post ${!post.published ? "published" : "unpublished"}`);
      loadPosts();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      content: "",
      category: "",
      featured_image: "",
      published: false,
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Add"} Post</DialogTitle>
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
              <div>
                <label className="text-sm font-medium">Category</label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Featured Image URL</label>
                <Input
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                />
                <label htmlFor="published" className="text-sm font-medium">Published</label>
              </div>
              <Button type="submit" className="w-full">
                {editingId ? "Update" : "Create"} Post
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
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>
                  {post.published ? (
                    <Badge>Published</Badge>
                  ) : (
                    <Badge variant="secondary">Draft</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {post.published_at &&
                    new Date(post.published_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePublish(post)}
                    >
                      {post.published ? "Unpublish" : "Publish"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(post)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
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
