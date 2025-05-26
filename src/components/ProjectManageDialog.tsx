import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Users, Plus, Trash2, Edit } from "lucide-react";

interface ProjectManageDialogProps {
  project: any;
  children: React.ReactNode;
}

export function ProjectManageDialog({ project, children }: ProjectManageDialogProps) {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Foundation Work", status: "Completed", assignedTo: "Ali Hassan", dueDate: "2025-03-20", description: "Complete foundation work" },
    { id: 2, name: "Wall Construction", status: "In Progress", assignedTo: "Sara Ahmed", dueDate: "2025-04-15", description: "Build main walls" },
    { id: 3, name: "Electrical Wiring", status: "Pending", assignedTo: "Ahmed Khan", dueDate: "2025-05-10", description: "Install electrical systems" },
  ]);

  const [labour, setLabour] = useState([
    { id: 1, name: "Ali Hassan", role: "Mason", contact: "+92 300 1234567", dailyRate: 2500 },
    { id: 2, name: "Ahmed Khan", role: "Electrician", contact: "+92 301 2345678", dailyRate: 3000 },
    { id: 3, name: "Fatima Ali", role: "Plumber", contact: "+92 302 3456789", dailyRate: 2800 },
  ]);

  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    status: "Pending"
  });

  const [newLabour, setNewLabour] = useState({
    name: "",
    role: "",
    contact: "",
    dailyRate: ""
  });

  const handleAddTask = () => {
    if (newTask.name && newTask.assignedTo && newTask.dueDate) {
      const task = {
        id: tasks.length + 1,
        ...newTask,
        dailyRate: newTask.dailyRate ? parseInt(newTask.dailyRate) : 0
      };
      setTasks([...tasks, task]);
      setNewTask({ name: "", description: "", assignedTo: "", dueDate: "", status: "Pending" });
    }
  };

  const handleAddLabour = () => {
    if (newLabour.name && newLabour.role && newLabour.contact && newLabour.dailyRate) {
      const worker = {
        id: labour.length + 1,
        ...newLabour,
        dailyRate: parseInt(newLabour.dailyRate)
      };
      setLabour([...labour, worker]);
      setNewLabour({ name: "", role: "", contact: "", dailyRate: "" });
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleDeleteLabour = (id: number) => {
    setLabour(labour.filter(worker => worker.id !== id));
  };

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-construction-500" />
            Manage {project.name}
          </DialogTitle>
          <DialogDescription>
            Add and manage tasks and labour for this project
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tasks">Tasks Management</TabsTrigger>
            <TabsTrigger value="labour">Labour Management</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            {/* Add New Task */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New Task
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taskName">Task Name</Label>
                    <Input
                      id="taskName"
                      placeholder="Enter task name"
                      value={newTask.name}
                      onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assignedTo">Assigned To</Label>
                    <Input
                      id="assignedTo"
                      placeholder="Enter worker name"
                      value={newTask.assignedTo}
                      onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={newTask.status} onValueChange={(value) => setNewTask({ ...newTask, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter task description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddTask} className="bg-[#1366D9] hover:bg-[#1570EF]">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </CardContent>
            </Card>

            {/* Current Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Current Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.name}</TableCell>
                        <TableCell>
                          <Badge className={getTaskStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{task.assignedTo}</TableCell>
                        <TableCell>{task.dueDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteTask(task.id)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="labour" className="space-y-6">
            {/* Add New Labour */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New Worker
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workerName">Worker Name</Label>
                    <Input
                      id="workerName"
                      placeholder="Enter worker name"
                      value={newLabour.name}
                      onChange={(e) => setNewLabour({ ...newLabour, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={newLabour.role} onValueChange={(value) => setNewLabour({ ...newLabour, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mason">Mason</SelectItem>
                        <SelectItem value="Electrician">Electrician</SelectItem>
                        <SelectItem value="Plumber">Plumber</SelectItem>
                        <SelectItem value="Carpenter">Carpenter</SelectItem>
                        <SelectItem value="Painter">Painter</SelectItem>
                        <SelectItem value="Helper">Helper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact</Label>
                    <Input
                      id="contact"
                      placeholder="Enter phone number"
                      value={newLabour.contact}
                      onChange={(e) => setNewLabour({ ...newLabour, contact: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dailyRate">Daily Rate (Rs.)</Label>
                    <Input
                      id="dailyRate"
                      type="number"
                      placeholder="Enter daily rate"
                      value={newLabour.dailyRate}
                      onChange={(e) => setNewLabour({ ...newLabour, dailyRate: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleAddLabour} className="bg-[#1366D9] hover:bg-[#1570EF]">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Worker
                </Button>
              </CardContent>
            </Card>

            {/* Current Labour */}
            <Card>
              <CardHeader>
                <CardTitle>Current Workers</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Daily Rate</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {labour.map((worker) => (
                      <TableRow key={worker.id}>
                        <TableCell className="font-medium">{worker.name}</TableCell>
                        <TableCell>{worker.role}</TableCell>
                        <TableCell>{worker.contact}</TableCell>
                        <TableCell>Rs. {worker.dailyRate.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteLabour(worker.id)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
