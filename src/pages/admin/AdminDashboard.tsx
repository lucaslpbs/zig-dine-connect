import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { 
  DollarSign, TrendingUp, Users, Clock, 
  Package, LogOut, Plus, Edit, AlertTriangle, FileText, UserPlus 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Mock data - API: GET /admin/dashboard
  const stats = {
    faturamentoDia: 2847.50,
    comandasAbertas: 12,
    garconsAtivos: 8,
    produtosCadastrados: 156,
    clientesTotais: 450,
    avaliacaoMedia: 4.7
  };

  const salesData = [
    { name: 'Seg', value: 400 },
    { name: 'Ter', value: 300 },
    { name: 'Qua', value: 500 },
    { name: 'Qui', value: 280 },
    { name: 'Sex', value: 590 },
    { name: 'Sáb', value: 800 },
    { name: 'Dom', value: 650 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Painel Administrativo</h1>
              <p className="text-muted-foreground">Sistema de Gestão do Restaurante</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <Card className="hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturamento Hoje</CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">R$ {stats.faturamentoDia.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+20.1% em relação a ontem</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comandas Abertas</CardTitle>
              <FileText className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.comandasAbertas}</div>
              <p className="text-xs text-muted-foreground">Comandas ativas agora</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Garçons Ativos</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.garconsAtivos}</div>
              <p className="text-xs text-muted-foreground">Funcionários online</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtos</CardTitle>
              <Package className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.produtosCadastrados}</div>
              <p className="text-xs text-muted-foreground">Itens no cardápio</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Totais</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.clientesTotais}</div>
              <p className="text-xs text-muted-foreground">Cadastros no sistema</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.avaliacaoMedia}</div>
              <p className="text-xs text-muted-foreground">De 5.0 estrelas</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Vendas da Semana</CardTitle>  
              <CardDescription>Faturamento dos últimos 7 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Comandas Recentes</CardTitle>
              <CardDescription>Últimas atividades do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Comanda #42</p>
                    <p className="text-sm text-muted-foreground">João Silva • R$ 78,90</p>
                  </div>
                  <Badge className="bg-success text-success-foreground">Aberta</Badge>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Comanda #41</p>
                    <p className="text-sm text-muted-foreground">Maria Santos • R$ 45,50</p>
                  </div>
                  <Badge className="bg-warning text-warning-foreground">Pendente</Badge>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Comanda #40</p>
                    <p className="text-sm text-muted-foreground">Carlos Lima • R$ 32,00</p>
                  </div>
                  <Badge className="bg-accent text-accent-foreground">Fechada</Badge>
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
                onClick={() => navigate('/admin/produtos')}
                className="w-full justify-start bg-gradient-primary hover:shadow-glow"
              >
                <Plus className="w-4 h-4 mr-2" />
                Cadastrar Produto
              </Button>
              <Button 
                onClick={() => navigate('/admin/garcons')}
                variant="outline" 
                className="w-full justify-start"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Gerenciar Garçons
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Ver Comandas
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Relatórios
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;