
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { bell, search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="border-b border-steel-200 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-steel-600 hover:text-steel-900" />
          <div className="hidden md:flex relative">
            <search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-steel-400" />
            <Input 
              placeholder="Search projects, materials..." 
              className="pl-10 w-64 bg-steel-50 border-steel-200 focus:border-construction-500"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative text-steel-600 hover:text-steel-900">
            <bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-steel-900">Admin User</p>
              <p className="text-xs text-steel-600">Construction Manager</p>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-construction-500 text-white">AU</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
