import React from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

interface NewProjectFormData {
  name: string;
  location: string;
  budget: string;
  startDate: string;
  expectedCompletion: string;
  siteManagerName: string;
  description?: string;
}

interface NewProjectDialogProps {
  onProjectAdd: (project: any) => void;
}

export const NewProjectDialog = ({ onProjectAdd }: NewProjectDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewProjectFormData>();

  const onSubmit = (data: NewProjectFormData) => {
    const newProject = {
      id: Date.now(), // Simple ID generation
      name: data.name,
      status: "Planning",
      progress: 0,
      startDate: new Date(data.startDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      expectedCompletion: new Date(data.expectedCompletion).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      siteManager: {
        name: data.siteManagerName,
        initials: data.siteManagerName.split(' ').map(n => n[0]).join('').toUpperCase()
      },
      budget: parseInt(data.budget.replace(/,/g, '')),
      spent: 0,
      location: data.location,
      description: data.description
    };

    onProjectAdd(newProject);
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1366D9] hover:bg-[#1570EF]">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-steel-900">Create New Project</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="name" className="text-sm font-medium text-steel-900">
                Project Name *
              </Label>
              <Input
                id="name"
                {...register("name", { required: "Project name is required" })}
                placeholder="Enter project name"
                className="mt-1"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="location" className="text-sm font-medium text-steel-900">
                Location *
              </Label>
              <Input
                id="location"
                {...register("location", { required: "Location is required" })}
                placeholder="Enter project location"
                className="mt-1"
              />
              {errors.location && (
                <p className="text-sm text-red-600 mt-1">{errors.location.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="budget" className="text-sm font-medium text-steel-900">
                Budget (Rs.) *
              </Label>
              <Input
                id="budget"
                {...register("budget", { 
                  required: "Budget is required",
                  pattern: {
                    value: /^[0-9,]+$/,
                    message: "Please enter a valid budget amount"
                  }
                })}
                placeholder="e.g., 15,000,000"
                className="mt-1"
              />
              {errors.budget && (
                <p className="text-sm text-red-600 mt-1">{errors.budget.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="siteManagerName" className="text-sm font-medium text-steel-900">
                Site Manager Name *
              </Label>
              <Input
                id="siteManagerName"
                {...register("siteManagerName", { required: "Site manager name is required" })}
                placeholder="Enter site manager name"
                className="mt-1"
              />
              {errors.siteManagerName && (
                <p className="text-sm text-red-600 mt-1">{errors.siteManagerName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="startDate" className="text-sm font-medium text-steel-900">
                Start Date *
              </Label>
              <Input
                id="startDate"
                type="date"
                {...register("startDate", { required: "Start date is required" })}
                className="mt-1"
              />
              {errors.startDate && (
                <p className="text-sm text-red-600 mt-1">{errors.startDate.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="expectedCompletion" className="text-sm font-medium text-steel-900">
                Expected Completion *
              </Label>
              <Input
                id="expectedCompletion"
                type="date"
                {...register("expectedCompletion", { required: "Expected completion date is required" })}
                className="mt-1"
              />
              {errors.expectedCompletion && (
                <p className="text-sm text-red-600 mt-1">{errors.expectedCompletion.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description" className="text-sm font-medium text-steel-900">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Enter project description..."
                className="mt-1 min-h-[80px]"
              />
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
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};