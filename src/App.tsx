import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthScreen } from "./components/AuthScreen";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Materials from "./pages/Materials";
import Invoices from "./pages/Invoices";
import Finance from "./pages/Finance";
import Directory from "./pages/Directory";
import NotFound from "./pages/NotFound";
import Team from "./pages/Team";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (email: string, password: string) => {
    // Simple authentication logic for demo
    if (email && password) {
      setUser({ email, name: email.split('@')[0] });
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthScreen onLogin={handleLogin} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index onLogout={handleLogout} />} />
            <Route path="/projects" element={<Projects onLogout={handleLogout} />} />
            <Route path="/projects/materials" element={<Materials onLogout={handleLogout}/>} />
            <Route path="/materials" element={<Materials onLogout={handleLogout}/>} />
             <Route path="/team" element={<Team onLogout={handleLogout} />} />
            <Route path="/invoices" element={<Invoices onLogout={handleLogout}/>} />
            <Route path="/finance" element={<Finance onLogout={handleLogout}/>} />
            <Route path="/directory" element={<Directory onLogout={handleLogout}/>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;