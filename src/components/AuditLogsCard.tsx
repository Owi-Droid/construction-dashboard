
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AuditLogsCard() {
  const auditLogs = [
    {
      id: 1,
      dateTime: "May 22, 2025 – 10:15 AM",
      user: "Ali",
      role: "admin",
      action: "Assigned 200 Cement bags to DHA Phase 4",
      module: "Materials",
      details: "Status: In Warehouse",
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: 2,
      dateTime: "May 22, 2025 – 10:12 AM",
      user: "Sara",
      role: "site mgr",
      action: "Updated material status: 100 Bricks → On Site",
      module: "Inventory",
      details: "Project: DHA Phase 4",
      color: "bg-green-100 text-green-700"
    },
    {
      id: 3,
      dateTime: "May 22, 2025 – 09:58 AM",
      user: "Kamran",
      role: "finance",
      action: "Added invoice: Rs. 75,000 from ABC Bricks Supplier",
      module: "Finance",
      details: "Linked to Project: Wild Zoo",
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      id: 4,
      dateTime: "May 21, 2025 – 05:44 PM",
      user: "Ahsan",
      role: "admin",
      action: "Created new project: Mall of Lahore",
      module: "Projects",
      details: "Site Manager: Sara B.",
      color: "bg-purple-100 text-purple-700"
    },
    {
      id: 5,
      dateTime: "May 21, 2025 – 04:20 PM",
      user: "Sara",
      role: "site mgr",
      action: "Marked 8 workers present on Wild Zoo site",
      module: "Labour",
      details: "Weather delay noted",
      color: "bg-orange-100 text-orange-700"
    }
  ];

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-steel-900">
          📋 Audit Logs
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {auditLogs.map((log) => (
            <div key={log.id} className="border border-steel-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-construction-500 text-white text-xs">
                    {log.user.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-steel-900">{log.user}</span>
                    <Badge variant="outline" className="text-xs">
                      {log.role}
                    </Badge>
                    <Badge className={log.color}>
                      {log.module}
                    </Badge>
                  </div>
                  <p className="text-sm text-steel-600 mb-1">{log.dateTime}</p>
                </div>
              </div>
              
              <div className="ml-11">
                <p className="text-sm text-steel-900 font-medium mb-1">{log.action}</p>
                <p className="text-xs text-steel-600">{log.details}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
