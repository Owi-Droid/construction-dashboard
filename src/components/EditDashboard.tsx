
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { edit } from "lucide-react";

interface EditDashboardProps {
  layout: {
    projectInfo: boolean;
    materialStatus: boolean;
    auditLogs: boolean;
    quickOverview: boolean;
    quickActions: boolean;
    invoices: boolean;
  };
  onLayoutChange: (layout: any) => void;
}

export function EditDashboard({ layout, onLayoutChange }: EditDashboardProps) {
  const [tempLayout, setTempLayout] = useState(layout);

  const handleSave = () => {
    onLayoutChange(tempLayout);
  };

  const cardOptions = [
    { key: "projectInfo", label: "Project Information Card" },
    { key: "materialStatus", label: "Material Status Card" },
    { key: "auditLogs", label: "Audit Logs Card" },
    { key: "quickOverview", label: "Quick Overview Card" },
    { key: "quickActions", label: "Quick Actions Card" },
    { key: "invoices", label: "Invoices Card" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <edit className="w-4 h-4" />
          Edit Dashboard
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customize Dashboard</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-steel-600">
            Choose which cards to display on your dashboard
          </p>
          {cardOptions.map((option) => (
            <div key={option.key} className="flex items-center justify-between space-x-2">
              <Label htmlFor={option.key} className="text-sm font-medium">
                {option.label}
              </Label>
              <Switch
                id={option.key}
                checked={tempLayout[option.key as keyof typeof tempLayout]}
                onCheckedChange={(checked) =>
                  setTempLayout({ ...tempLayout, [option.key]: checked })
                }
              />
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setTempLayout(layout)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-construction-500 hover:bg-construction-600">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
