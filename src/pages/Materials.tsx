import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Truck, Edit } from "lucide-react";
import { AddMaterialDialog } from "@/components/AddMaterialDialog";
import { AddCategoryDialog } from "@/components/AddCategoryDialog";


interface MaterialsProps {
  onLogout: () => void;
}

const Materials = ({ onLogout }: MaterialsProps) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState(["Civil", "Electrical", "Finishing"]);

  const [materials, setMaterials] = useState([
    {
      id: 1,
      name: "Portland Cement",
      category: "Civil",
      assignedQty: "200 Bags",
      unitCost: 850,
      totalCost: 170000,
      status: "On Site",
      lastUpdated: "May 21, 2025",
      project: "DHA Phase 4",
      supplier: "ABC Cement Co.",
      statusColor: "bg-green-100 text-green-700"
    },
    {
      id: 2,
      name: "Red Clay Bricks",
      category: "Civil",
      assignedQty: "5,000 Pcs",
      unitCost: 15,
      totalCost: 75000,
      status: "In Warehouse",
      lastUpdated: "May 20, 2025",
      project: "Mall of Lahore",
      supplier: "Elite Brick Company",
      statusColor: "bg-blue-100 text-blue-700"
    },
    {
      id: 3,
      name: "Copper Wires",
      category: "Electrical",
      assignedQty: "10 Rolls",
      unitCost: 1200,
      totalCost: 12000,
      status: "On The Way",
      lastUpdated: "May 20, 2025",
      project: "Wild Zoo Complex",
      supplier: "XYZ Electric",
      statusColor: "bg-yellow-100 text-yellow-700"
    },
    {
      id: 4,
      name: "Exterior Paint",
      category: "Finishing",
      assignedQty: "50 Cans",
      unitCost: 900,
      totalCost: 45000,
      status: "On Site",
      lastUpdated: "May 18, 2025",
      project: "DHA Phase 4",
      supplier: "Color Master",
      statusColor: "bg-green-100 text-green-700"
    },
    {
      id: 5,
      name: "Steel Rebars",
      category: "Civil",
      assignedQty: "100 Pieces",
      unitCost: 2500,
      totalCost: 250000,
      status: "In Warehouse",
      lastUpdated: "May 19, 2025",
      project: "Mall of Lahore",
      supplier: "Steel Works Ltd",
      statusColor: "bg-blue-100 text-blue-700"
    }
  ]);

  const handleMaterialAdd = (newMaterial: any) => {
    setMaterials(prev => [...prev, newMaterial]);
  };

  const handleCategoryAdd = (newCategory: string) => {
    setCategories(prev => [...prev, newCategory]);
  };

  const filteredMaterials = materials.filter(material => {
    return (
      (filterStatus === "all" || material.status === filterStatus) &&
      (filterCategory === "all" || material.category === filterCategory) &&
      (material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       material.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-steel-50 to-construction-50">
        <AppSidebar onLogout={onLogout}/>
        <main className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-steel-900">Materials Management</h1>
                  <p className="text-steel-600 mt-2">Track and manage construction materials across all projects</p>
                </div>
                <div className="flex gap-2">
                  <AddCategoryDialog 
                    onCategoryAdd={handleCategoryAdd}
                    existingCategories={categories}
                  />
                  <AddMaterialDialog onMaterialAdd={handleMaterialAdd} />
                </div>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Material Inventory</CardTitle>
                  
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="relative flex-1 min-w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-steel-400" />
                      <Input
                        placeholder="Search materials..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="On Site">On Site</SelectItem>
                        <SelectItem value="In Warehouse">In Warehouse</SelectItem>
                        <SelectItem value="On The Way">On The Way</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Material Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Cost</TableHead>
                        <TableHead>Total Cost</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMaterials.map((material) => (
                        <TableRow key={material.id} className="hover:bg-steel-50">
                          <TableCell className="font-semibold">{material.name}</TableCell>
                          <TableCell>{material.category}</TableCell>
                          <TableCell>{material.project}</TableCell>
                          <TableCell>{material.assignedQty}</TableCell>
                          <TableCell>Rs. {material.unitCost.toLocaleString()}</TableCell>
                          <TableCell>Rs. {material.totalCost.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={material.statusColor}>
                              {material.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{material.supplier}</TableCell>
                          <TableCell>{material.lastUpdated}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-3 h-3" />
                              </Button>
                              {material.status === "In Warehouse" && (
                                <Button size="sm" className="bg-construction-500 hover:bg-construction-600">
                                  <Truck className="w-3 h-3" />
                                </Button>
                              )}
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

export default Materials;
