
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { FileText, eye } from "lucide-react";

export function InvoicesCard() {
  const invoices = [
    {
      id: "INV-001",
      supplier: "ABC Cement Suppliers",
      amount: 170000,
      status: "Paid",
      dueDate: "May 25, 2025",
      project: "DHA Phase 4",
      statusColor: "bg-green-100 text-green-700"
    },
    {
      id: "INV-002",
      supplier: "XYZ Steel Works",
      amount: 450000,
      status: "Pending",
      dueDate: "May 28, 2025",
      project: "Mall of Lahore",
      statusColor: "bg-yellow-100 text-yellow-700"
    },
    {
      id: "INV-003",
      supplier: "Elite Brick Company",
      amount: 75000,
      status: "Overdue",
      dueDate: "May 20, 2025",
      project: "Wild Zoo Complex",
      statusColor: "bg-red-100 text-red-700"
    }
  ];

  const totalPending = invoices
    .filter(inv => inv.status === "Pending" || inv.status === "Overdue")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-indigo-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-steel-900">
            💰 Recent Invoices
          </CardTitle>
          <Button asChild variant="outline" size="sm">
            <Link to="/invoices">
              <FileText className="w-4 h-4 mr-2" />
              View All
            </Link>
          </Button>
        </div>
        
        <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-yellow-50 rounded-lg">
          <p className="text-sm text-red-600 font-medium">Total Pending Amount</p>
          <p className="text-2xl font-bold text-red-900">Rs. {totalPending.toLocaleString()}</p>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="border border-steel-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-steel-900">{invoice.id}</h4>
                  <p className="text-sm text-steel-600">{invoice.supplier}</p>
                  <p className="text-xs text-steel-500">{invoice.project}</p>
                </div>
                <Badge className={invoice.statusColor}>
                  {invoice.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                <div>
                  <p className="text-steel-600">Amount</p>
                  <p className="font-semibold text-lg">Rs. {invoice.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-steel-600">Due Date</p>
                  <p className="font-semibold">{invoice.dueDate}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                {invoice.status !== "Paid" && (
                  <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                    Mark as Paid
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
