
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
import { search, plus, FileText, eye, edit } from "lucide-react";

const Invoices = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const invoices = [
    {
      id: "INV-001",
      supplier: "ABC Cement Suppliers",
      amount: 170000,
      status: "Paid",
      dueDate: "May 25, 2025",
      issueDate: "May 15, 2025",
      project: "DHA Phase 4",
      category: "Materials",
      paymentMethod: "Bank Transfer",
      statusColor: "bg-green-100 text-green-700"
    },
    {
      id: "INV-002",
      supplier: "XYZ Steel Works",
      amount: 450000,
      status: "Pending",
      dueDate: "May 28, 2025",
      issueDate: "May 18, 2025",
      project: "Mall of Lahore",
      category: "Materials",
      paymentMethod: "Cheque",
      statusColor: "bg-yellow-100 text-yellow-700"
    },
    {
      id: "INV-003",
      supplier: "Elite Brick Company",
      amount: 75000,
      status: "Overdue",
      dueDate: "May 20, 2025",
      issueDate: "May 10, 2025",
      project: "Wild Zoo Complex",
      category: "Materials",
      paymentMethod: "Cash",
      statusColor: "bg-red-100 text-red-700"
    },
    {
      id: "INV-004",
      supplier: "Power Electric Solutions",
      amount: 125000,
      status: "Pending",
      dueDate: "June 1, 2025",
      issueDate: "May 22, 2025",
      project: "DHA Phase 4",
      category: "Electrical",
      paymentMethod: "Bank Transfer",
      statusColor: "bg-yellow-100 text-yellow-700"
    },
    {
      id: "INV-005",
      supplier: "Color Master Paints",
      amount: 65000,
      status: "Draft",
      dueDate: "June 5, 2025",
      issueDate: "May 23, 2025",
      project: "Mall of Lahore",
      category: "Finishing",
      paymentMethod: "Cheque",
      statusColor: "bg-gray-100 text-gray-700"
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    return (
      (filterStatus === "all" || invoice.status === filterStatus) &&
      (invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       invoice.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
       invoice.project.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = filteredInvoices
    .filter(inv => inv.status === "Pending" || inv.status === "Overdue")
    .reduce((sum, inv) => sum + inv.amount, 0);

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
                  <h1 className="text-3xl font-bold text-steel-900">Invoice Management</h1>
                  <p className="text-steel-600 mt-2">Track and manage all construction material invoices</p>
                </div>
                <Button className="bg-construction-500 hover:bg-construction-600">
                  <plus className="w-4 h-4 mr-2" />
                  Create Invoice
                </Button>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-steel-600">Total Invoices</p>
                        <p className="text-2xl font-bold text-steel-900">{filteredInvoices.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="text-sm text-steel-600">Total Amount</p>
                        <p className="text-2xl font-bold text-steel-900">Rs. {totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-red-600" />
                      <div>
                        <p className="text-sm text-steel-600">Pending Amount</p>
                        <p className="text-2xl font-bold text-steel-900">Rs. {pendingAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Invoice Details</CardTitle>
                  
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="relative flex-1 min-w-64">
                      <search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-steel-400" />
                      <Input
                        placeholder="Search invoices..."
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
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Overdue">Overdue</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.map((invoice) => (
                        <TableRow key={invoice.id} className="hover:bg-steel-50">
                          <TableCell className="font-semibold">{invoice.id}</TableCell>
                          <TableCell>{invoice.supplier}</TableCell>
                          <TableCell>{invoice.project}</TableCell>
                          <TableCell>{invoice.category}</TableCell>
                          <TableCell className="font-semibold">Rs. {invoice.amount.toLocaleString()}</TableCell>
                          <TableCell>{invoice.issueDate}</TableCell>
                          <TableCell>{invoice.dueDate}</TableCell>
                          <TableCell>
                            <Badge className={invoice.statusColor}>
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{invoice.paymentMethod}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <eye className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <edit className="w-3 h-3" />
                              </Button>
                              {invoice.status !== "Paid" && (
                                <Button size="sm" className="bg-green-500 hover:bg-green-600 text-xs">
                                  Pay
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

export default Invoices;
