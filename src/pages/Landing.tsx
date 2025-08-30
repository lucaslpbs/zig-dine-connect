import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RoleCard } from '@/components/ui/role-card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  Users, 
  Coffee, 
  Settings, 
  ChefHat, 
  CreditCard, 
  BarChart3,
  FileText,
  Smartphone,
  Clock,
  Star
} from 'lucide-react';
import heroImage from '@/assets/hero-restaurant.jpg';

const Landing = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    // API: Will authenticate and redirect based on role
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ChefHat className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">RestaurantPro</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                Recursos
              </a>
              <a href="#roles" className="text-muted-foreground hover:text-primary transition-colors">
                Perfis
              </a>
              <ThemeToggle />
              <Button variant="outline">Contato</Button>
            </nav>
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Sistema Digital
                <span className="block text-accent">para Restaurantes</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Substitua comandas físicas por uma experiência digital moderna. 
                Controle total do consumo, agilidade no atendimento e gestão inteligente.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold rounded-full shadow-large hover:shadow-glow transition-all duration-300"
                onClick={() => navigate('/login')}
              >
                Começar Agora
              </Button>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Sistema digital para restaurantes"
                className="rounded-2xl shadow-large w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-hero opacity-20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section id="roles" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Escolha seu Perfil de Acesso
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sistema focado em comandas digitais para garçons e administradores
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <RoleCard
              title="Garçom/Atendente"
              description="Gerencie comandas, pedidos e tenha controle total do atendimento."
              icon={<Coffee className="w-8 h-8" />}
              features={[
                "Controle de comandas",
                "Gerenciamento de pedidos",
                "Histórico de clientes",
                "Status em tempo real"
              ]}
              onSelect={() => navigate('/login?role=garcom')}
              buttonText="Acesso do Garçom"
            />
            
            <RoleCard
              title="Administrador"
              description="Dashboard completo com relatórios, gestão e configurações do sistema."
              icon={<Settings className="w-8 h-8" />}
              features={[
                "Dashboard executivo",
                "Gestão de garçons",
                "Cadastro de produtos",
                "Relatórios completos"
              ]}
              onSelect={() => navigate('/login?role=admin')}
              buttonText="Painel Administrativo"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Funcionalidades Principais
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Comandas Digitais</h3>
              <p className="text-muted-foreground text-sm">Sistema completo de comandas digitais</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-accent rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Gestão de Equipe</h3>
              <p className="text-muted-foreground text-sm">Controle completo de garçons e atendentes</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Relatórios</h3>
              <p className="text-muted-foreground text-sm">Métricas e análises em tempo real</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-accent rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Tempo Real</h3>
              <p className="text-muted-foreground text-sm">Atualizações instantâneas do sistema</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;