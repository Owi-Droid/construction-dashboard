import React from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface AddMaterialFormData {
  name: string;
  category: string;
  quantity: string;
  unitCost: string;
  supplier: string;
  project: string;
}

interface AddMaterialDialogProps {
  onMaterialAdd: (material: any) => void;
}

export const AddMaterialDialog = ({ onMaterialAdd }: AddMaterialDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<AddMaterialFormData>();

  const categoryValue = watch("category");

  const onSubmit = (data: AddMaterialFormData) => {
    const newMaterial = {
      id: Date.now(),
      name: data.name,
      category: data.category,
      assignedQty: data.quantity,
      unitCost: parseInt(data.unitCost.replace(/,/g, '')),
      totalCost: parseInt(data.unitCost.replace(/,/g, '')) * parseInt(data.quantity.replace(/[^0-9]/g, '')),
      status: "In Warehouse",
      lastUpdated: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      project: data.project,
      supplier: data.supplier,
      statusColor: "bg-blue-100 text-blue-700"
    };

    onMaterialAdd(newMaterial);
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1366D9] hover:bg-[#1570EF]">
          <Plus className="w-4 h-4 mr-2" />
          Add Material
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-steel-900">Add New Material</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="name" className="text-sm font-medium text-steel-900">
                Material Name *
              </Label>
              <Input
                id="name"
                {...register("name", { required: "Material name is required" })}
                placeholder="Enter material name"
                className="mt-1"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="category" className="text-sm font-medium text-steel-900">
                Category *
              </Label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger className="mt-1">
                  <input type="hidden" {...register("category", { required: "Category is required" })} />
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Civil">Civil</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="Finishing">Finishing</SelectItem>
                  <SelectItem value="Plumbing">Plumbing</SelectItem>
                  <SelectItem value="Steel">Steel</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-600 mt-1">{errors.category.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="quantity" className="text-sm font-medium text-steel-900">
                Quantity *
              </Label>
              <Input
                id="quantity"
                {...register("quantity", { required: "Quantity is required" })}
                placeholder="e.g., 100 Bags, 50 Pieces"
                className="mt-1"
              />
              {errors.quantity && (
                <p className="text-sm text-red-600 mt-1">{errors.quantity.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="unitCost" className="text-sm font-medium text-steel-900">
                Unit Cost (Rs.) *
              </Label>
              <Input
                id="unitCost"
                {...register("unitCost", { 
                  required: "Unit cost is required",
                  pattern: {
                    value: /^[0-9,]+$/,
                    message: "Please enter a valid cost amount"
                  }
                })}
                placeholder="e.g., 850"
                className="mt-1"
              />
              {errors.unitCost && (
                <p className="text-sm text-red-600 mt-1">{errors.unitCost.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="supplier" className="text-sm font-medium text-steel-900">
                Supplier *
              </Label>
              <Input
                id="supplier"
                {...register("supplier", { required: "Supplier is required" })}
                placeholder="Enter supplier name"
                className="mt-1"
              />
              {errors.supplier && (
                <p className="text-sm text-red-600 mt-1">{errors.supplier.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="project" className="text-sm font-medium text-steel-900">
                Project *
              </Label>
              <Select onValueChange={(value) => setValue("project", value)}>
                <SelectTrigger className="mt-1">
                  <input type="hidden" {...register("project", { required: "Project is required" })} />
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DHA Phase 4">DHA Phase 4</SelectItem>
                  <SelectItem value="Mall of Lahore">Mall of Lahore</SelectItem>
                  <SelectItem value="Wild Zoo Complex">Wild Zoo Complex</SelectItem>
                </SelectContent>
              </Select>
              {errors.project && (
                <p className="text-sm text-red-600 mt-1">{errors.project.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-[#1366D9] hover:bg-[#1570EF]"
            >
              Add Material
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};