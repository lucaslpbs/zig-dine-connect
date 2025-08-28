import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  CreditCard, 
  Settings,
  LogOut,
  TrendingUp,
  DollarSign,
  Package
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  // Mock data for KPIs
  const kpis = {
    faturamentoDia: 2847.50,
    pedidosAtivos: 12,
    mesasOcupadas: 8,
    clientesCadastrados: 156,
    produtosCadastrados: 45,
    avaliacaoMedia: 4.7
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-white shadow-soft sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-foreground">Painel Administrativo</h1>
              <p className="text-sm text-muted-foreground">Gestão completa do restaurante</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <Card className="hover:shadow-medium transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Faturamento Hoje</p>
                  <p className="text-2xl font-bold text-success">R$ {kpis.faturamentoDia.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-success opacity-70" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pedidos Ativos</p>
                  <p className="text-2xl font-bold text-accent">{kpis.pedidosAtivos}</p>
                </div>
                <ShoppingBag className="w-8 h-8 text-accent opacity-70" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Mesas Ocupadas</p>
                  <p className="text-2xl font-bold text-primary">{kpis.mesasOcupadas}</p>
                </div>
                <Users className="w-8 h-8 text-primary opacity-70" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Clientes</p>
                  <p className="text-2xl font-bold text-primary">{kpis.clientesCadastrados}</p>
                </div>
                <Users className="w-8 h-8 text-primary opacity-70" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Produtos</p>
                  <p className="text-2xl font-bold text-accent">{kpis.produtosCadastrados}</p>
                </div>
                <Package className="w-8 h-8 text-accent opacity-70" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avaliação</p>
                  <p className="text-2xl font-bold text-warning">{kpis.avaliacaoMedia}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-warning opacity-70" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
            <TabsTrigger value="produtos">Produtos</TabsTrigger>
            <TabsTrigger value="clientes">Clientes</TabsTrigger>
            <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
            <TabsTrigger value="configuracoes">Config</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Vendas por Período
                  </CardTitle>
                  <CardDescription>Faturamento dos últimos 7 dias</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Gráfico de vendas será exibido aqui</p>
                    <p className="text-sm mt-2">API: GET /admin/dashboard</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Produtos Mais Vendidos
                  </CardTitle>
                  <CardDescription>Top 5 itens do cardápio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Hambúrguer Clássico</span>
                      <span className="text-sm font-medium">127 vendas</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pizza Margherita</span>
                      <span className="text-sm font-medium">98 vendas</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Batata Frita</span>
                      <span className="text-sm font-medium">89 vendas</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Coca-Cola</span>
                      <span className="text-sm font-medium">156 vendas</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Salada Caesar</span>
                      <span className="text-sm font-medium">67 vendas</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="relatorios" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Relatórios de Consumo
                </CardTitle>
                <CardDescription>
                  Gráficos e relatórios detalhados por período
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Interface de relatórios será implementada aqui</p>
                  <p className="text-sm mt-2">API: GET /admin/relatorios</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="produtos" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Gestão de Produtos
                    </CardTitle>
                    <CardDescription>
                      Cadastro e gestão do cardápio
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => navigate('/admin/produtos')}
                    className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Gerenciar Produtos
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="text-center">
                    <CardContent className="p-4">
                      <p className="text-2xl font-bold text-primary">45</p>
                      <p className="text-sm text-muted-foreground">Total</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-4">
                      <p className="text-2xl font-bold text-success">42</p>
                      <p className="text-sm text-muted-foreground">Ativos</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-4">
                      <p className="text-2xl font-bold text-muted-foreground">3</p>
                      <p className="text-sm text-muted-foreground">Inativos</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-4">
                      <p className="text-2xl font-bold text-accent">127</p>
                      <p className="text-sm text-muted-foreground">Mais Vendido</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clientes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Gerenciamento de Clientes
                </CardTitle>
                <CardDescription>
                  Lista de clientes e histórico de consumo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Lista de clientes cadastrados e histórico</p>
                  <div className="text-sm mt-2 space-y-1">
                    <p>API: GET /admin/clientes</p>
                    <p>API: POST /admin/notificacoes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pagamentos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Fechamento de Contas
                </CardTitle>
                <CardDescription>
                  Encerramento de consumo e pagamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Interface para fechamento de contas</p>
                  <div className="text-sm mt-2 space-y-1">
                    <p>API: POST /admin/fechar-conta</p>
                    <p>API: POST /pagamento</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuracoes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Configurações do Sistema
                </CardTitle>
                <CardDescription>
                  Usuários, permissões, impostos e configurações gerais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Painel de configurações do sistema</p>
                  <div className="text-sm mt-2 space-y-1">
                    <p>API: GET /admin/config</p>
                    <p>API: POST /admin/config</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;