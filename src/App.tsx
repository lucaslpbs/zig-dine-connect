import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ClienteDashboard from "./pages/cliente/ClienteDashboard";
import CardapioPage from "./pages/cliente/CardapioPage";
import GarcomDashboard from "./pages/garcom/GarcomDashboard";
import MesasPage from "./pages/garcom/MesasPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProdutosPage from "./pages/admin/ProdutosPage";
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
          
          {/* Cliente Routes */}
          <Route path="/cliente" element={<ClienteDashboard />} />
          <Route path="/cliente/cardapio" element={<CardapioPage />} />
          
          {/* Garçom Routes */}
          <Route path="/garcom" element={<GarcomDashboard />} />
          <Route path="/garcom/mesas" element={<MesasPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/produtos" element={<ProdutosPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
