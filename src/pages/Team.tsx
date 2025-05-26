import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Users, MapPin, Calendar } from "lucide-react";
import { AddTeamMemberDialog } from "@/components/AddTeamMemberDialog";

interface TeamMember {
  id: number;
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

interface TeamProps {
  onLogout: () => void;
}

const Team = ({ onLogout }: TeamProps) => {
  const [filterDesignation, setFilterDesignation] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Sara Ahmed",
      designation: "Site Manager",
      phone: "+92 300 1234567",
      email: "sara.ahmed@des.com",
      joinDate: "Jan 15, 2024",
      assignedProjects: ["DHA Phase 4 Commercial Plaza"],
      currentTasks: ["Site supervision", "Material coordination"],
      status: "Active",
      experience: "8 years",
      location: "DHA Phase 4, Lahore"
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      designation: "Site Manager",
      phone: "+92 301 9876543",
      email: "ahmed.hassan@des.com",
      joinDate: "Mar 10, 2024",
      assignedProjects: ["Mall of Lahore"],
      currentTasks: ["Project planning", "Team coordination"],
      status: "Active",
      experience: "6 years",
      location: "Gulberg, Lahore"
    },
    {
      id: 3,
      name: "Fatima Khan",
      designation: "Site Manager",
      phone: "+92 302 5555666",
      email: "fatima.khan@des.com",
      joinDate: "Dec 5, 2023",
      assignedProjects: ["Wild Zoo Complex"],
      currentTasks: ["Quality control", "Safety management"],
      status: "Active",
      experience: "10 years",
      location: "Safari Park, Lahore"
    },
    {
      id: 4,
      name: "Muhammad Ali",
      designation: "Labour",
      phone: "+92 303 7777888",
      email: "muhammad.ali@des.com",
      joinDate: "Feb 20, 2024",
      assignedProjects: ["DHA Phase 4 Commercial Plaza"],
      currentTasks: ["Construction work", "Material handling"],
      status: "Active",
      experience: "4 years",
      location: "DHA Phase 4, Lahore"
    },
    {
      id: 5,
      name: "Zain Malik",
      designation: "Labour",
      phone: "+92 304 9999000",
      email: "zain.malik@des.com",
      joinDate: "Apr 8, 2024",
      assignedProjects: ["Mall of Lahore"],
      currentTasks: ["Electrical work", "Installation"],
      status: "Active",
      experience: "3 years",
      location: "Gulberg, Lahore"
    },
    {
      id: 6,
      name: "Hassan Raza",
      designation: "Engineer",
      phone: "+92 305 1111222",
      email: "hassan.raza@des.com",
      joinDate: "Jan 2, 2024",
      assignedProjects: ["Wild Zoo Complex", "DHA Phase 4 Commercial Plaza"],
      currentTasks: ["Design review", "Technical supervision"],
      status: "Active",
      experience: "7 years",
      location: "Head Office, Lahore"
    }
  ]);

  const handleAddTeamMember = (newMember: TeamMember) => {
    setTeamMembers(prev => [...prev, { ...newMember, id: Date.now() }]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "On Leave":
        return "bg-yellow-100 text-yellow-700";
      case "Inactive":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getDesignationColor = (designation: string) => {
    switch (designation) {
      case "Site Manager":
        return "bg-blue-100 text-blue-700";
      case "Engineer":
        return "bg-purple-100 text-purple-700";
      case "Labour":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    return (
      (filterDesignation === "all" || member.designation === filterDesignation) &&
      (filterStatus === "all" || member.status === filterStatus) &&
      (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       member.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
       member.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-steel-50 to-construction-50">
        <AppSidebar onLogout={onLogout} />
        <main className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-steel-900">Team Management</h1>
                  <p className="text-steel-600 mt-2">Manage team members across all projects</p>
                </div>
                <AddTeamMemberDialog onTeamMemberAdd={handleAddTeamMember} />
              </div>

              {/* Filters */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Team Overview
                  </CardTitle>
                  
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="relative flex-1 min-w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-steel-400" />
                      <Input
                        placeholder="Search team members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    <Select value={filterDesignation} onValueChange={setFilterDesignation}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by designation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Designations</SelectItem>
                        <SelectItem value="Site Manager">Site Manager</SelectItem>
                        <SelectItem value="Engineer">Engineer</SelectItem>
                        <SelectItem value="Labour">Labour</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="On Leave">On Leave</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
              </Card>

              {/* Team Members Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMembers.map((member) => (
                  <Card key={member.id} className="shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-construction-500 text-white">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg text-steel-900">{member.name}</CardTitle>
                            <Badge className={getDesignationColor(member.designation)}>
                              {member.designation}
                            </Badge>
                          </div>
                        </div>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Contact Info */}
                      <div className="space-y-2 text-sm">
                        <p className="text-steel-600">📧 {member.email}</p>
                        <p className="text-steel-600">📱 {member.phone}</p>
                        <p className="text-steel-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {member.location}
                        </p>
                        <p className="text-steel-600 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Joined: {member.joinDate}
                        </p>
                      </div>

                      {/* Experience */}
                      <div className="p-3 bg-steel-50 rounded-lg">
                        <p className="text-sm font-medium text-steel-900">Experience</p>
                        <p className="text-sm text-steel-600">{member.experience}</p>
                      </div>
                      
                      {/* Assigned Projects */}
                      <div>
                        <p className="text-sm font-medium text-steel-900 mb-2">Assigned Projects</p>
                        <div className="space-y-1">
                          {member.assignedProjects.map((project, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {project}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {/* Current Tasks */}
                      <div>
                        <p className="text-sm font-medium text-steel-900 mb-2">Current Tasks</p>
                        <div className="space-y-1">
                          {member.currentTasks.map((task, index) => (
                            <p key={index} className="text-xs text-steel-600 bg-gray-50 px-2 py-1 rounded">
                              • {task}
                            </p>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" className="flex-1" size="sm">
                          View Details
                        </Button>
                        <Button className="flex-1 bg-[#1366D9] hover:bg-[#1570EF]" size="sm">
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredMembers.length === 0 && (
                <Card className="shadow-lg">
                  <CardContent className="text-center py-12">
                    <Users className="w-16 h-16 text-steel-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-steel-900 mb-2">No team members found</h3>
                    <p className="text-steel-600">Try adjusting your search or filter criteria.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Team;
