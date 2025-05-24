
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { search, calendar, truck, box } from "lucide-react";

export function MaterialStatusCard() {
  const [filterDate, setFilterDate] = useState("today");
  const [searchTerm, setSearchTerm] = useState("");

  const materials = [
    {
      id: 1,
      name: "Cement",
      category: "Civil",
      assignedQty: "200 Bags",
      unitCost: 850,
      totalCost: 170000,
      status: "On Site",
      lastUpdated: "May 21, 2025",
      statusColor: "bg-green-100 text-green-700"
    },
    {
      id: 2,
      name: "Bricks",
      category: "Civil",
      assignedQty: "5,000 Pcs",
      unitCost: 15,
      totalCost: 75000,
      status: "In Warehouse",
      lastUpdated: "May 20, 2025",
      statusColor: "bg-blue-100 text-blue-700"
    },
    {
      id: 3,
      name: "Electrical Wires",
      category: "Electrical",
      assignedQty: "10 Rolls",
      unitCost: 1200,
      totalCost: 12000,
      status: "On The Way",
      lastUpdated: "May 20, 2025",
      statusColor: "bg-yellow-100 text-yellow-700"
    },
    {
      id: 4,
      name: "Paint Cans",
      category: "Finishing",
      assignedQty: "50 Cans",
      unitCost: 900,
      totalCost: 45000,
      status: "On Site",
      lastUpdated: "May 18, 2025",
      statusColor: "bg-green-100 text-green-700"
    }
  ];

  const totalMaterials = materials.length;
  const totalCost = materials.reduce((sum, material) => sum + material.totalCost, 0);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-steel-900">
            📦 Material Status
          </CardTitle>
          <div className="flex gap-2">
            <Select value={filterDate} onValueChange={setFilterDate}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1">
            <search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-steel-400" />
            <Input
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Total Materials Assigned</p>
            <p className="text-2xl font-bold text-blue-900">{totalMaterials}</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Total Estimated Cost</p>
            <p className="text-2xl font-bold text-green-900">Rs. {totalCost.toLocaleString()}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {materials.map((material) => (
            <div key={material.id} className="border border-steel-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-steel-900">{material.name}</h4>
                  <p className="text-sm text-steel-600">{material.category}</p>
                </div>
                <Badge className={material.statusColor}>
                  {material.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                <div>
                  <p className="text-steel-600">Quantity</p>
                  <p className="font-semibold">{material.assignedQty}</p>
                </div>
                <div>
                  <p className="text-steel-600">Unit Cost</p>
                  <p className="font-semibold">Rs. {material.unitCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-steel-600">Total Cost</p>
                  <p className="font-semibold">Rs. {material.totalCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-steel-600">Last Updated</p>
                  <p className="font-semibold">{material.lastUpdated}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Update
                </Button>
                {material.status === "In Warehouse" && (
                  <Button size="sm" className="flex-1 bg-construction-500 hover:bg-construction-600">
                    Dispatch
                  </Button>
                )}
                {material.status === "On The Way" && (
                  <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                    Receive
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
