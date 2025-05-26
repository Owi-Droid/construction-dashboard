import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, BarChart3, FileText, Truck } from "lucide-react";

interface FinanceProps {
  onLogout: () => void;
}

const Finance = ({ onLogout }: FinanceProps) => {
  const financeData = {
    totalBudget: 48000000,
    totalSpent: 16550000,
    pendingPayments: 3200000,
    availableFunds: 31450000,
    monthlyExpenses: [
      { month: "Jan", amount: 2800000 },
      { month: "Feb", amount: 3200000 },
      { month: "Mar", amount: 4100000 },
      { month: "Apr", amount: 3800000 },
      { month: "May", amount: 2650000 }
    ]
  };

  const expenseCategories = [
    { category: "Materials", amount: 8500000, percentage: 51.4 },
    { category: "Labour", amount: 4200000, percentage: 25.4 },
    { category: "Equipment", amount: 2300000, percentage: 13.9 },
    { category: "Utilities", amount: 950000, percentage: 5.7 },
    { category: "Other", amount: 600000, percentage: 3.6 }
  ];

  const recentTransactions = [
    {
      id: 1,
      date: "May 22, 2025",
      description: "Cement Payment - ABC Suppliers",
      amount: -170000,
      type: "expense",
      project: "DHA Phase 4"
    },
    {
      id: 2,
      date: "May 21, 2025",
      description: "Steel Payment - XYZ Steel Works",
      amount: -450000,
      type: "expense",
      project: "Mall of Lahore"
    },
    {
      id: 3,
      date: "May 20, 2025",
      description: "Project Milestone Payment",
      amount: 2500000,
      type: "income",
      project: "Wild Zoo Complex"
    },
    {
      id: 4,
      date: "May 19, 2025",
      description: "Equipment Rental",
      amount: -85000,
      type: "expense",
      project: "DHA Phase 4"
    }
  ];

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
                  <h1 className="text-3xl font-bold text-steel-900">Financial Overview</h1>
                  <p className="text-steel-600 mt-2">Track budgets, expenses, and financial performance</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Export Report</Button>
                  <Button className="bg-[#1366D9] hover:bg-[#1570EF]">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Invoice
                  </Button>
                </div>
              </div>

              {/* Financial Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Calculator className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-steel-600">Total Budget</p>
                        <p className="text-2xl font-bold text-steel-900">Rs. {financeData.totalBudget.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-red-500">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-8 h-8 text-red-600" />
                      <div>
                        <p className="text-sm text-steel-600">Total Spent</p>
                        <p className="text-2xl font-bold text-steel-900">Rs. {financeData.totalSpent.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-yellow-500">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-yellow-600" />
                      <div>
                        <p className="text-sm text-steel-600">Pending Payments</p>
                        <p className="text-2xl font-bold text-steel-900">Rs. {financeData.pendingPayments.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Truck className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="text-sm text-steel-600">Available Funds</p>
                        <p className="text-2xl font-bold text-steel-900">Rs. {financeData.availableFunds.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="expenses">Expense Breakdown</TabsTrigger>
                  <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Monthly Expenses Trend</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {financeData.monthlyExpenses.map((expense, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="font-medium">{expense.month} 2025</span>
                              <span className="text-lg font-bold">Rs. {expense.amount.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Budget Utilization</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span>Budget Used</span>
                            <span className="font-bold">
                              {((financeData.totalSpent / financeData.totalBudget) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-steel-200 rounded-full h-4">
                            <div 
                              className="bg-construction-500 h-4 rounded-full transition-all duration-500"
                              style={{ width: `${(financeData.totalSpent / financeData.totalBudget) * 100}%` }}
                            ></div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-steel-600">Remaining</p>
                              <p className="font-bold">Rs. {(financeData.totalBudget - financeData.totalSpent).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-steel-600">Spent</p>
                              <p className="font-bold">Rs. {financeData.totalSpent.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="expenses" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Expense Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {expenseCategories.map((category, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{category.category}</span>
                              <div className="text-right">
                                <span className="font-bold">Rs. {category.amount.toLocaleString()}</span>
                                <span className="text-sm text-steel-600 ml-2">({category.percentage}%)</span>
                              </div>
                            </div>
                            <div className="w-full bg-steel-200 rounded-full h-2">
                              <div 
                                className="bg-construction-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${category.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="transactions" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentTransactions.map((transaction) => (
                          <div key={transaction.id} className="flex items-center justify-between p-4 border border-steel-200 rounded-lg">
                            <div>
                              <p className="font-medium text-steel-900">{transaction.description}</p>
                              <p className="text-sm text-steel-600">{transaction.date} • {transaction.project}</p>
                            </div>
                            <span className={`text-lg font-bold ${
                              transaction.type === "income" ? "text-green-600" : "text-red-600"
                            }`}>
                              {transaction.type === "income" ? "+" : ""}Rs. {Math.abs(transaction.amount).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Finance;
