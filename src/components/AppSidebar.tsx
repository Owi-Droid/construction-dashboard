import { Construction, Home, FileText, Truck, Users, Calculator, BarChart3, Bell, Folder,LogOut  } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
   SidebarFooter
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface AppSidebarProps {
  onLogout?: () => void;
}
const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Construction,
  },
  {
    title: "Materials",
    url: "/materials",
    icon: Truck,
  },
  {
    title: "Directory",
    url: "/directory",
    icon: Folder,
  },
  {
    title: "Invoices",
    url: "/invoices",
    icon: FileText,
  },
  {
    title: "Team",
    url: "/team",
    icon: Users,
  },
  // {
  //   title: "Finance",
  //   url: "/finance",
  //   icon: Calculator,
  // },
  // {
  //   title: "Reports",
  //   url: "/reports",
  //   icon: BarChart3,
  // },
  // {
  //   title: "Notifications",
  //   url: "/notifications",
  //   icon: Bell,
  // },
];
export function AppSidebar({ onLogout }: AppSidebarProps) {
  const location = useLocation();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <Sidebar className="border-r border-steel-200">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10  rounded-lg flex items-center justify-center">
            <img src="/img/logo.png" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-steel-900">DES</h2>
            <p className="text-sm text-steel-600">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-steel-700 font-semibold">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`${
                      location.pathname === item.url 
                        ? 'bg-blue-100 text-blue-700 border-r-2 border-[#1366D9]' 
                        : 'text-steel-600 hover:bg-steel-100 hover:text-steel-900'
                    } transition-all duration-200`}
                  >
                    <Link to={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
       <SidebarFooter className="p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
