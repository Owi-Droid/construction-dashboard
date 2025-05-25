import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Construction, Calendar, Users } from "lucide-react";
import { NewProjectDialog } from "@/components/NewProjectDialog";
import { ProjectDetailsDialog } from "@/components/ProjectDetailsDialog";
import { ProjectManageDialog } from "@/components/ProjectManageDialog";

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "DHA Phase 4 Commercial Plaza",
      status: "In Progress",
      progress: 35,
      startDate: "March 15, 2025",
      expectedCompletion: "December 30, 2025",
      siteManager: {
        name: "Sara Ahmed",
        initials: "SA"
      },
      budget: 15000000,
      spent: 5250000,
      location: "DHA Phase 4, Lahore"
    },
    {
      id: 2,
      name: "Mall of Lahore",
      status: "Planning",
      progress: 10,
      startDate: "June 1, 2025",
      expectedCompletion: "March 30, 2026",
      siteManager: {
        name: "Ahmed Hassan",
        initials: "AH"
      },
      budget: 25000000,
      spent: 2500000,
      location: "Gulberg, Lahore"
    },
    {
      id: 3,
      name: "Wild Zoo Complex",
      status: "In Progress",
      progress: 60,
      startDate: "January 10, 2025",
      expectedCompletion: "August 15, 2025",
      siteManager: {
        name: "Fatima Khan",
        initials: "FK"
      },
      budget: 8000000,
      spent: 4800000,
      location: "Safari Park, Lahore"
    }
  ]);

  const handleAddProject = (newProject: any) => {
    setProjects(prevProjects => [...prevProjects, newProject]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-green-100 text-green-700";
      case "Planning":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-steel-50 to-construction-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-steel-900">Projects Overview</h1>
                  <p className="text-steel-600 mt-2">Monitor and manage all construction projects</p>
                </div>
                <NewProjectDialog onProjectAdd={handleAddProject} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Construction className="w-8 h-8 text-construction-500" />
                          <div>
                            <CardTitle className="text-lg text-steel-900">{project.name}</CardTitle>
                            <p className="text-sm text-steel-600">{project.location}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Timeline */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-steel-600 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Start Date
                          </p>
                          <p className="font-semibold">{project.startDate}</p>
                        </div>
                        <div>
                          <p className="text-steel-600">Expected End</p>
                          <p className="font-semibold">{project.expectedCompletion}</p>
                        </div>
                      </div>
                      
                      {/* Site Manager */}
                      <div className="flex items-center gap-3 p-3 bg-steel-50 rounded-lg">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-construction-500 text-white text-xs">
                            {project.siteManager.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-steel-900 flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            Site Manager
                          </p>
                          <p className="text-sm text-steel-600">{project.siteManager.name}</p>
                        </div>
                      </div>
                      
                      {/* Progress */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium text-steel-900">Progress</p>
                          <span className="text-lg font-bold text-construction-600">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      {/* Budget */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-steel-600">Budget</p>
                          <p className="font-semibold">Rs. {project.budget.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-steel-600">Spent</p>
                          <p className="font-semibold">Rs. {project.spent.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <ProjectDetailsDialog project={project}>
                          <Button variant="outline" className="flex-1" size="sm">
                            View Details
                          </Button>
                        </ProjectDetailsDialog>
                        <ProjectManageDialog project={project}>
                          <Button className="flex-1 bg-[#1366D9] hover:bg-[#1570EF]" size="sm">
                            Manage
                          </Button>
                        </ProjectManageDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Projects;
