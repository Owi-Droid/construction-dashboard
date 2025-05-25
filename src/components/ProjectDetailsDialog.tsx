import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Users, Construction, Package, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface ProjectDetailsDialogProps {
  project: any;
  children: React.ReactNode;
}

export function ProjectDetailsDialog({ project, children }: ProjectDetailsDialogProps) {
  // Mock data for demonstration
  const materials = [
    { name: "Portland Cement", quantity: "50 Bags", cost: "Rs. 42,500", status: "Delivered" },
    { name: "Steel Rebars", quantity: "20 Pieces", cost: "Rs. 50,000", status: "Pending" },
    { name: "Red Bricks", quantity: "2,000 Pcs", cost: "Rs. 30,000", status: "Delivered" },
  ];

  const tasks = [
    { name: "Foundation Work", status: "Completed", assignedTo: "Ali Hassan", dueDate: "Mar 20, 2025" },
    { name: "Wall Construction", status: "In Progress", assignedTo: "Sara Ahmed", dueDate: "Apr 15, 2025" },
    { name: "Electrical Wiring", status: "Pending", assignedTo: "Ahmed Khan", dueDate: "May 10, 2025" },
    { name: "Plumbing Installation", status: "Pending", assignedTo: "Fatima Ali", dueDate: "May 20, 2025" },
  ];

  const labour = [
    { name: "Ali Hassan", role: "Mason", contact: "+92 300 1234567", dailyRate: "Rs. 2,500" },
    { name: "Ahmed Khan", role: "Electrician", contact: "+92 301 2345678", dailyRate: "Rs. 3,000" },
    { name: "Fatima Ali", role: "Plumber", contact: "+92 302 3456789", dailyRate: "Rs. 2,800" },
  ];

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTaskIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "In Progress":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "Pending":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Construction className="w-5 h-5 text-construction-500" />
            {project.name} - Project Details
          </DialogTitle>
          <DialogDescription>
            Comprehensive overview of project progress, materials, tasks, and team
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Project Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-steel-600">Location</p>
                  <p className="font-semibold">{project.location}</p>
                </div>
                <div>
                  <p className="text-sm text-steel-600">Start Date</p>
                  <p className="font-semibold">{project.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-steel-600">Expected Completion</p>
                  <p className="font-semibold">{project.expectedCompletion}</p>
                </div>
                <div>
                  <p className="text-sm text-steel-600">Total Budget</p>
                  <p className="font-semibold">Rs. {project.budget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-steel-600">Amount Spent</p>
                  <p className="font-semibold">Rs. {project.spent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-steel-600">Progress</p>
                  <div className="flex items-center gap-2">
                    <Progress value={project.progress} className="flex-1" />
                    <span className="text-sm font-semibold">{project.progress}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Site Manager */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Site Manager
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-construction-500 text-white">
                    {project.siteManager.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{project.siteManager.name}</p>
                  <p className="text-sm text-steel-600">Site Manager</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Tabs */}
          <Tabs defaultValue="materials" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="labour">Labour</TabsTrigger>
            </TabsList>

            <TabsContent value="materials" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Materials Used
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Material Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {materials.map((material, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{material.name}</TableCell>
                          <TableCell>{material.quantity}</TableCell>
                          <TableCell>{material.cost}</TableCell>
                          <TableCell>
                            <Badge className={material.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                              {material.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead>Due Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tasks.map((task, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {getTaskIcon(task.status)}
                              {task.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getTaskStatusColor(task.status)}>
                              {task.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{task.assignedTo}</TableCell>
                          <TableCell>{task.dueDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="labour" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Labour Team
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Daily Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {labour.map((worker, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{worker.name}</TableCell>
                          <TableCell>{worker.role}</TableCell>
                          <TableCell>{worker.contact}</TableCell>
                          <TableCell>{worker.dailyRate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
