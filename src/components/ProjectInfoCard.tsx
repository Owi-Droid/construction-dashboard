import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, Box, BarChart3, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export function ProjectInfoCard() {
  const project = {
    name: "DHA Phase 4 Commercial Plaza",
    startDate: "March 15, 2025",
    expectedCompletion: "December 30, 2025",
    status: "In Progress",
    siteManager: {
      name: "Owais Asad",
      avatar: "/placeholder.svg",
      initials: "SA"
    },
    totalMaterials: 45,
    totalCost: 2850000,
    progress: 35,
    recentTasks: [
      { action: "Cement delivery completed", time: "2 hours ago", type: "delivery" },
      { action: "Foundation inspection passed", time: "1 day ago", type: "inspection" },
      { action: "Steel bars quality checked", time: "2 days ago", type: "quality" },
      { action: "Site safety audit completed", time: "3 days ago", type: "safety" },
      { action: "Electrical wiring phase started", time: "4 days ago", type: "milestone" }
    ]
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-construction-500">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-steel-900 mb-2">
              📅 {project.name}
            </CardTitle>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-steel-600">Start Date</p>
                <p className="font-semibold text-steel-900">{project.startDate}</p>
              </div>
              <div>
                <p className="text-steel-600">Expected Completion</p>
                <p className="font-semibold text-steel-900">{project.expectedCompletion}</p>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            {project.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Site Manager */}
        <div className="flex items-center justify-between p-4 bg-steel-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={project.siteManager.avatar} />
              <AvatarFallback className="bg-construction-500 text-white">
                {project.siteManager.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-steel-900">👷 Site Manager</p>
              <p className="text-steel-600">{project.siteManager.name}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-construction-200">
            View Profile
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Box className="w-5 h-5 text-blue-600" />
              <p className="font-semibold text-blue-900">Total Materials</p>
            </div>
            <p className="text-2xl font-bold text-blue-900">{project.totalMaterials}</p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <p className="font-semibold text-green-900">Total Cost</p>
            </div>
            <p className="text-2xl font-bold text-green-900">
              Rs. {project.totalCost.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-steel-900">📈 Progress</p>
            <span className="text-lg font-bold text-construction-600">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-3" />
        </div>

        {/* Recent Tasks */}
        <div>
          <p className="font-semibold text-steel-900 mb-3">📝 Recent Activities</p>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {project.recentTasks.map((task, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-white rounded border border-steel-100">
                <span className="text-sm text-steel-700">{task.action}</span>
                <span className="text-xs text-steel-500">{task.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-steel-200">
          <Button asChild className="flex-1 bg-construction-500 hover:bg-construction-600">
            <Link to="/projects/materials">
              <FileText className="w-4 h-4 mr-2" />
              View Materials
            </Link>
          </Button>
          <Button variant="outline" className="flex-1 border-construction-200">
            📊 View Charts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
