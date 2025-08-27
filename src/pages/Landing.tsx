import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RoleCard } from '@/components/ui/role-card';
import { Smartphone, Users, Settings } from 'lucide-react';
import heroImage from '@/assets/hero-restaurant.jpg';

const Landing = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    // API: Will authenticate and redirect based on role
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Escolha seu Perfil de Acesso
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada perfil tem funcionalidades específicas para otimizar sua experiência
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <RoleCard
              title="Cliente"
              description="Escaneie QR Code, acesse o cardápio digital, faça pedidos e acompanhe sua conta em tempo real."
              icon={Smartphone}
              onClick={() => handleRoleSelect('cliente')}
            />
            
            <RoleCard
              title="Garçom/Atendente"
              description="Gerencie pedidos ativos, controle status de preparo e acompanhe o histórico de clientes."
              icon={Users}
              onClick={() => handleRoleSelect('garcom')}
            />
            
            <RoleCard
              title="Administrador"
              description="Dashboard completo, relatórios de faturamento, gestão do cardápio e controle total do sistema."
              icon={Settings}
              onClick={() => handleRoleSelect('admin')}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Funcionalidades Principais
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">QR Code</h3>
              <p className="text-muted-foreground text-sm">Acesso rápido via cartão ou pulseira</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-accent rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Gestão de Pedidos</h3>
              <p className="text-muted-foreground text-sm">Controle completo do status</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <Settings className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Dashboard</h3>
              <p className="text-muted-foreground text-sm">Relatórios e métricas em tempo real</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-accent rounded-full flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Responsivo</h3>
              <p className="text-muted-foreground text-sm">Funciona em qualquer dispositivo</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;