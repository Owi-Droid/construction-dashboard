import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";

interface TeamMember {
  name: string;
  designation: string;
  phone: string;
  email: string;
  joinDate: string;
  assignedProjects: string[];
  currentTasks: string[];
  status: "Active" | "On Leave" | "Inactive";
  experience: string;
  location: string;
}

interface AddTeamMemberDialogProps {
  onTeamMemberAdd: (member: TeamMember) => void;
}

export function AddTeamMemberDialog({ onTeamMemberAdd }: AddTeamMemberDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    phone: "",
    email: "",
    experience: "",
    location: "",
    assignedProjects: "",
    currentTasks: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMember: TeamMember = {
      name: formData.name,
      designation: formData.designation,
      phone: formData.phone,
      email: formData.email,
      joinDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      assignedProjects: formData.assignedProjects.split(',').map(p => p.trim()).filter(p => p),
      currentTasks: formData.currentTasks.split(',').map(t => t.trim()).filter(t => t),
      status: "Active",
      experience: formData.experience,
      location: formData.location,
    };

    onTeamMemberAdd(newMember);
    setOpen(false);
    setFormData({
      name: "",
      designation: "",
      phone: "",
      email: "",
      experience: "",
      location: "",
      assignedProjects: "",
      currentTasks: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1366D9] hover:bg-[#1570EF]">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Team Member</DialogTitle>
          <DialogDescription>
            Add a new team member to your construction team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation *</Label>
              <Select
                value={formData.designation}
                onValueChange={(value) => setFormData({ ...formData, designation: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Site Manager">Site Manager</SelectItem>
                  <SelectItem value="Engineer">Engineer</SelectItem>
                  <SelectItem value="Labour">Labour</SelectItem>
                  <SelectItem value="Supervisor">Supervisor</SelectItem>
                  <SelectItem value="Foreman">Foreman</SelectItem>
                  <SelectItem value="Electrician">Electrician</SelectItem>
                  <SelectItem value="Plumber">Plumber</SelectItem>
                  <SelectItem value="Mason">Mason</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+92 300 1234567"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Experience *</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="e.g., 5 years"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Work location"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedProjects">Assigned Projects</Label>
            <Input
              id="assignedProjects"
              value={formData.assignedProjects}
              onChange={(e) => setFormData({ ...formData, assignedProjects: e.target.value })}
              placeholder="Enter project names separated by commas"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentTasks">Current Tasks</Label>
            <Textarea
              id="currentTasks"
              value={formData.currentTasks}
              onChange={(e) => setFormData({ ...formData, currentTasks: e.target.value })}
              placeholder="Enter current tasks separated by commas"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#1366D9] hover:bg-[#1570EF]">
              Add Team Member
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
