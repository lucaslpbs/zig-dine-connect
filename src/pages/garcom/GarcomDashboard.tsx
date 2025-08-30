import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, DollarSign, TrendingUp, LogOut, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const GarcomDashboard = () => {
  const navigate = useNavigate();

  // Mock data - API: GET /garcom/dashboard
  const stats = {
    comandasAbertas: 8,
    totalFaturamento: 1245.50,
    clientesAtivos: 15,
    pedidosPendentes: 5
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sistema do Garçom</h1>
              <p className="text-muted-foreground">Bem-vindo, João Silva</p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comandas Abertas</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.comandasAbertas}</div>
              <p className="text-xs text-muted-foreground">Comandas ativas no sistema</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Faturamento</CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">R$ {stats.totalFaturamento.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Faturamento das comandas abertas</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.clientesAtivos}</div>
              <p className="text-xs text-muted-foreground">Clientes com comandas abertas</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pedidos Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.pedidosPendentes}</div>
              <p className="text-xs text-muted-foreground">Pedidos aguardando preparo</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>
                Últimas comandas e pedidos do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Comanda #15 - Mesa 8</p>
                    <p className="text-sm text-muted-foreground">João Silva • R$ 45,90 • há 5 min</p>
                  </div>
                  <Badge className="bg-success text-success-foreground">Aberta</Badge>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Comanda #12 - Mesa 3</p>
                    <p className="text-sm text-muted-foreground">Maria Santos • R$ 78,50 • há 15 min</p>
                  </div>
                  <Badge className="bg-warning text-warning-foreground">Pendente</Badge>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Comanda #09 - Mesa 1</p>
                    <p className="text-sm text-muted-foreground">Carlos Lima • R$ 32,00 • há 25 min</p>
                  </div>
                  <Badge className="bg-accent text-accent-foreground">Fechada</Badge>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Comanda #07 - Mesa 5</p>
                    <p className="text-sm text-muted-foreground">Ana Costa • R$ 91,20 • há 35 min</p>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">Nova</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => navigate('/garcom/comandas')}
                className="w-full justify-start bg-gradient-primary hover:shadow-glow"
              >
                <FileText className="w-4 h-4 mr-2" />
                Gerenciar Comandas
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Pedidos Pendentes
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="w-4 h-4 mr-2" />
                Fechar Conta
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default GarcomDashboard;