
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Box, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export function QuickActionsCard() {
  const actions = [
    {
      title: "Add Project",
      icon: Plus,
      link: "/projects/new",
      color: "bg-construction-500 hover:bg-construction-600",
      description: "Create new construction project"
    },
    {
      title: "Add Material",
      icon: Box,
      link: "/materials/new",
      color: "bg-blue-500 hover:bg-blue-600",
      description: "Add materials to inventory"
    },
    {
      title: "Create Invoice",
      icon: FileText,
      link: "/invoices/new",
      color: "bg-green-500 hover:bg-green-600",
      description: "Generate new invoice"
    }
  ];

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-yellow-500">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-steel-900">
          ⚡ Quick Actions
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              asChild
              className={`w-full justify-start h-auto p-4 ${action.color} text-white`}
            >
              <Link to={action.link}>
                <div className="flex items-center gap-3">
                  <action.icon className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-semibold">{action.title}</p>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
