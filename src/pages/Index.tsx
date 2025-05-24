
import { useState } from "react";
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { ProjectInfoCard } from "@/components/ProjectInfoCard";
import { MaterialStatusCard } from "@/components/MaterialStatusCard";
import { AuditLogsCard } from "@/components/AuditLogsCard";
import { QuickOverviewCard } from "@/components/QuickOverviewCard";
import { QuickActionsCard } from "@/components/QuickActionsCard";
import { InvoicesCard } from "@/components/InvoicesCard";
import { EditDashboard } from "@/components/EditDashboard";

const Index = () => {
  const [dashboardLayout, setDashboardLayout] = useState({
    projectInfo: true,
    materialStatus: true,
    auditLogs: true,
    quickOverview: true,
    quickActions: true,
    invoices: true,
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-steel-50 to-construction-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-steel-900">Construction Dashboard</h1>
                <p className="text-steel-600 mt-2">Monitor projects, materials, and operations</p>
              </div>
              <EditDashboard layout={dashboardLayout} onLayoutChange={setDashboardLayout} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {dashboardLayout.projectInfo && <ProjectInfoCard />}
              {dashboardLayout.quickOverview && <QuickOverviewCard />}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {dashboardLayout.materialStatus && <MaterialStatusCard />}
              {dashboardLayout.auditLogs && <AuditLogsCard />}
              {dashboardLayout.quickActions && <QuickActionsCard />}
            </div>

            {dashboardLayout.invoices && <InvoicesCard />}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
