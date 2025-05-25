import React, { useState, useCallback } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, FileText, Download, Eye, Trash2 } from "lucide-react";
import { AddDirectoryDialog } from "@/components/AddDirectoryDialog";

const Directory = () => {
  const [filterProject, setFilterProject] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [files, setFiles] = useState([
    {
      id: 1,
      name: "Project Blueprint.pdf",
      type: "PDF",
      size: "2.5 MB",
      project: "DHA Phase 4",
      uploadedBy: "Sara Ahmed",
      uploadDate: "May 21, 2025",
      category: "Blueprint"
    },
    {
      id: 2,
      name: "Material Invoice.xlsx",
      type: "Excel",
      size: "1.2 MB",
      project: "Mall of Lahore",
      uploadedBy: "Ahmed Hassan",
      uploadDate: "May 20, 2025",
      category: "Invoice"
    },
    {
      id: 3,
      name: "Site Photos.zip",
      type: "Archive",
      size: "15.3 MB",
      project: "Wild Zoo Complex",
      uploadedBy: "Fatima Khan",
      uploadDate: "May 19, 2025",
      category: "Photos"
    },
    {
      id: 4,
      name: "Contract Agreement.pdf",
      type: "PDF",
      size: "892 KB",
      project: "DHA Phase 4",
      uploadedBy: "Admin",
      uploadDate: "May 18, 2025",
      category: "Contract"
    }
  ]);

  const handleAddFile = useCallback((newFile: any) => {
    setFiles(prevFiles => [...prevFiles, { ...newFile, id: Date.now() }]);
  }, []);

  const handleDeleteFile = (fileId: number) => {
    setFiles(files.filter(file => file.id !== fileId));
  };

  const getFileTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return "bg-red-100 text-red-700";
      case "excel":
        return "bg-green-100 text-green-700";
      case "archive":
        return "bg-purple-100 text-purple-700";
      case "image":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredFiles = files.filter(file => {
    return (
      (filterProject === "all" || file.project === filterProject) &&
      (filterType === "all" || file.type === filterType) &&
      (file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       file.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

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
                  <h1 className="text-3xl font-bold text-steel-900">Project Directory</h1>
                  <p className="text-steel-600 mt-2">Upload and manage important project files and documents</p>
                </div>
                <AddDirectoryDialog onFileAdd={handleAddFile}>
                  <Button className="bg-[#1366D9] hover:bg-[#1570EF]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Directory
                  </Button>
                </AddDirectoryDialog>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    File Repository
                  </CardTitle>
                  
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="relative flex-1 min-w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-steel-400" />
                      <Input
                        placeholder="Search files..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    <Select value={filterProject} onValueChange={setFilterProject}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Projects</SelectItem>
                        <SelectItem value="DHA Phase 4">DHA Phase 4</SelectItem>
                        <SelectItem value="Mall of Lahore">Mall of Lahore</SelectItem>
                        <SelectItem value="Wild Zoo Complex">Wild Zoo Complex</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="PDF">PDF</SelectItem>
                        <SelectItem value="Excel">Excel</SelectItem>
                        <SelectItem value="Archive">Archive</SelectItem>
                        <SelectItem value="Image">Image</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>File Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Uploaded By</TableHead>
                        <TableHead>Upload Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFiles.map((file) => (
                        <TableRow key={file.id} className="hover:bg-steel-50">
                          <TableCell className="font-semibold">{file.name}</TableCell>
                          <TableCell>
                            <Badge className={getFileTypeColor(file.type)}>
                              {file.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{file.size}</TableCell>
                          <TableCell>{file.project}</TableCell>
                          <TableCell>{file.category}</TableCell>
                          <TableCell>{file.uploadedBy}</TableCell>
                          <TableCell>{file.uploadDate}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="w-3 h-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDeleteFile(file.id)}
                              >
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
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Directory;
