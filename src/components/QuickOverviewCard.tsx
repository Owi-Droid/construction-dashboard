
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { construction, box, truck, FileText, calculator } from "lucide-react";

export function QuickOverviewCard() {
  const quickStats = {
    activeProjects: 8,
    materialsOnSite: 127,
    pendingDeliveries: 23,
    openInvoices: 15
  };

  const financeStats = {
    totalBudget: 15000000,
    spentAmount: 8500000,
    pendingPayments: 2300000,
    remainingBudget: 6500000
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-steel-900">
          📊 Quick Overview
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="operations" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="operations" className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-construction-50 to-construction-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <construction className="w-5 h-5 text-construction-600" />
                  <p className="font-semibold text-construction-900">Active Projects</p>
                </div>
                <p className="text-2xl font-bold text-construction-900">{quickStats.activeProjects}</p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <box className="w-5 h-5 text-blue-600" />
                  <p className="font-semibold text-blue-900">Materials On Site</p>
                </div>
                <p className="text-2xl font-bold text-blue-900">{quickStats.materialsOnSite}</p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <truck className="w-5 h-5 text-yellow-600" />
                  <p className="font-semibold text-yellow-900">Pending Deliveries</p>
                </div>
                <p className="text-2xl font-bold text-yellow-900">{quickStats.pendingDeliveries}</p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-red-600" />
                  <p className="font-semibold text-red-900">Open Invoices</p>
                </div>
                <p className="text-2xl font-bold text-red-900">{quickStats.openInvoices}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="finance" className="mt-6">
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <calculator className="w-5 h-5 text-green-600" />
                  <p className="font-semibold text-green-900">Total Budget</p>
                </div>
                <p className="text-2xl font-bold text-green-900">Rs. {financeStats.totalBudget.toLocaleString()}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Spent Amount</p>
                  <p className="text-lg font-bold text-blue-900">Rs. {financeStats.spentAmount.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-600 font-medium">Pending Payments</p>
                  <p className="text-lg font-bold text-yellow-900">Rs. {financeStats.pendingPayments.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <p className="text-sm text-purple-600 font-medium mb-2">Remaining Budget</p>
                <p className="text-2xl font-bold text-purple-900">Rs. {financeStats.remainingBudget.toLocaleString()}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
