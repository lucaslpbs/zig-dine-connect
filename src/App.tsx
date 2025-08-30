import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import GarcomDashboard from "./pages/garcom/GarcomDashboard";
import ComandasPage from "./pages/garcom/ComandasPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProdutosPage from "./pages/admin/ProdutosPage";
import GarconsPage from "./pages/admin/GarconsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          
          {/* Garçom Routes */}
          <Route path="/garcom" element={<GarcomDashboard />} />
          <Route path="/garcom/comandas" element={<ComandasPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/produtos" element={<ProdutosPage />} />
          <Route path="/admin/garcons" element={<GarconsPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
