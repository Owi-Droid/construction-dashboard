import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";

interface AddCategoryDialogProps {
  onCategoryAdd: (category: string) => void;
  existingCategories: string[];
}

export function AddCategoryDialog({ onCategoryAdd, existingCategories }: AddCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim() && !existingCategories.includes(categoryName.trim())) {
      onCategoryAdd(categoryName.trim());
      setCategoryName("");
      setOpen(false);
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    // In a real app, you'd want to check if this category is being used by materials
    console.log(`Remove category: ${categoryToRemove}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Manage Categories</DialogTitle>
          <DialogDescription>
            Add new material categories or view existing ones.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Existing Categories */}
          <div>
            <Label className="text-sm font-medium">Existing Categories</Label>
            <div className="flex flex-wrap gap-2 mt-2 min-h-[40px] p-2 border rounded-md bg-gray-50">
              {existingCategories.length > 0 ? (
                existingCategories.map((category) => (
                  <Badge key={category} variant="secondary" className="flex items-center gap-1">
                    {category}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-4 w-4 p-0 hover:bg-red-100"
                      onClick={() => handleRemoveCategory(category)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500 text-sm">No categories added yet</span>
              )}
            </div>
          </div>

          {/* Add New Category */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="categoryName">New Category Name</Label>
              <Input
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="mt-1"
              />
              {categoryName.trim() && existingCategories.includes(categoryName.trim()) && (
                <p className="text-sm text-red-500 mt-1">This category already exists</p>
              )}
            </div>
          </form>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!categoryName.trim() || existingCategories.includes(categoryName.trim())}
            className="bg-[#1366D9] hover:bg-[#1570EF]"
          >
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
