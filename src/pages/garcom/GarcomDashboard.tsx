import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ClipboardList, 
  Search, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Users,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GarcomDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const [pedidosAtivos] = useState([
    {
      id: 1,
      mesa: 'MESA001',
      cliente: 'João Silva',
      itens: ['Hambúrguer Clássico', 'Batata Frita', 'Coca-Cola'],
      total: 45.90,
      status: 'em-preparo',
      tempo: '15 min',
      observacoes: 'Sem cebola no hambúrguer'
    },
    {
      id: 2,
      mesa: 'MESA003',
      cliente: 'Maria Santos',
      itens: ['Pizza Margherita', 'Suco de Laranja'],
      total: 32.50,
      status: 'pronto',
      tempo: '22 min',
      observacoes: ''
    },
    {
      id: 3,
      mesa: 'MESA007',
      cliente: 'Carlos Lima',
      itens: ['Salada Caesar', 'Água'],
      total: 18.90,
      status: 'novo',
      tempo: '5 min',
      observacoes: 'Mesa próxima à janela'
    }
  ]);

  const handleStatusChange = async (pedidoId: number, newStatus: string) => {
    // API: PATCH /garcom/pedido/:id/status
    console.log(`Updating order ${pedidoId} to status: ${newStatus}`);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'novo':
        return <Badge className="bg-warning text-warning-foreground">Novo</Badge>;
      case 'em-preparo':
        return <Badge className="bg-accent text-accent-foreground">Em Preparo</Badge>;
      case 'pronto':
        return <Badge className="bg-success text-success-foreground">Pronto</Badge>;
      case 'entregue':
        return <Badge variant="secondary">Entregue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'novo':
        return <AlertCircle className="w-4 h-4" />;
      case 'em-preparo':
        return <Clock className="w-4 h-4" />;
      case 'pronto':
        return <CheckCircle className="w-4 h-4" />;
      case 'entregue':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-white shadow-soft sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-foreground">Painel do Garçom</h1>
              <p className="text-sm text-muted-foreground">Gerencie pedidos e atendimento</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">3</div>
              <div className="text-sm text-muted-foreground">Novos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">5</div>
              <div className="text-sm text-muted-foreground">Em Preparo</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">2</div>
              <div className="text-sm text-muted-foreground">Prontos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">10</div>
              <div className="text-sm text-muted-foreground">Mesas Ativas</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pedidos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pedidos">Pedidos Ativos</TabsTrigger>
            <TabsTrigger value="clientes">Buscar Cliente</TabsTrigger>
            <TabsTrigger value="mesas">Gerenciar Mesas</TabsTrigger>
          </TabsList>

          <TabsContent value="pedidos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" />
                  Pedidos Ativos
                </CardTitle>
                <CardDescription>
                  Gerencie o status dos pedidos em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pedidosAtivos.map((pedido) => (
                    <Card key={pedido.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold">{pedido.mesa}</span>
                              <span className="text-muted-foreground">-</span>
                              <span className="text-muted-foreground">{pedido.cliente}</span>
                              {getStatusBadge(pedido.status)}
                            </div>
                            
                            <div className="space-y-1">
                              <p className="text-sm">
                                <strong>Itens:</strong> {pedido.itens.join(', ')}
                              </p>
                              <p className="text-sm">
                                <strong>Total:</strong> R$ {pedido.total.toFixed(2)}
                              </p>
                              <p className="text-sm">
                                <strong>Tempo:</strong> {pedido.tempo}
                              </p>
                              {pedido.observacoes && (
                                <p className="text-sm text-accent">
                                  <strong>Obs:</strong> {pedido.observacoes}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {pedido.status === 'novo' && (
                              <Button 
                                size="sm" 
                                className="bg-accent hover:bg-accent/90"
                                onClick={() => handleStatusChange(pedido.id, 'em-preparo')}
                              >
                                Iniciar Preparo
                              </Button>
                            )}
                            {pedido.status === 'em-preparo' && (
                              <Button 
                                size="sm" 
                                className="bg-success hover:bg-success/90"
                                onClick={() => handleStatusChange(pedido.id, 'pronto')}
                              >
                                Marcar Pronto
                              </Button>
                            )}
                            {pedido.status === 'pronto' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleStatusChange(pedido.id, 'entregue')}
                              >
                                Entregar
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clientes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Buscar Cliente
                </CardTitle>
                <CardDescription>
                  Pesquise por código, QR ou nome do cliente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Digite código da mesa, QR ou nome..."
                      className="pl-10"
                    />
                  </div>

                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Digite um termo para buscar clientes</p>
                    <p className="text-sm mt-2">Histórico de consumo será exibido aqui</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mesas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Gerenciar Mesas
                </CardTitle>
                <CardDescription>
                  Associe e desassocie QR codes a mesas e clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Funcionalidade de gerenciamento de mesas</p>
                  <p className="text-sm mt-2">API: POST /garcom/associar</p>
                  <p className="text-sm">API: POST /garcom/desassociar</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GarcomDashboard;