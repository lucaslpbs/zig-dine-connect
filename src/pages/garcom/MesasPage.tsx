import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Users, Clock, DollarSign, Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MesasPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMesa, setSelectedMesa] = useState<any>(null);

  const mesas = [
    {
      id: 1,
      numero: 'Mesa 01',
      status: 'ocupada',
      clientes: 4,
      garcom: 'João Silva',
      horaInicio: '19:30',
      valorConta: 156.80,
      pedidosAtivos: 2
    },
    {
      id: 2,
      numero: 'Mesa 02',
      status: 'livre',
      clientes: 0,
      garcom: null,
      horaInicio: null,
      valorConta: 0,
      pedidosAtivos: 0
    },
    {
      id: 3,
      numero: 'Mesa 03',
      status: 'ocupada',
      clientes: 2,
      garcom: 'Maria Santos',
      horaInicio: '20:15',
      valorConta: 89.50,
      pedidosAtivos: 1
    },
    {
      id: 4,
      numero: 'Mesa 04',
      status: 'reservada',
      clientes: 6,
      garcom: 'Pedro Costa',
      horaInicio: '21:00',
      valorConta: 0,
      pedidosAtivos: 0
    },
    {
      id: 5,
      numero: 'Mesa 05',
      status: 'ocupada',
      clientes: 3,
      garcom: 'Ana Lima',
      horaInicio: '18:45',
      valorConta: 203.40,
      pedidosAtivos: 3
    },
    {
      id: 6,
      numero: 'Mesa 06',
      status: 'livre',
      clientes: 0,
      garcom: null,
      horaInicio: null,
      valorConta: 0,
      pedidosAtivos: 0
    }
  ];

  const filteredMesas = mesas.filter(mesa =>
    mesa.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mesa.garcom?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ocupada': return 'bg-accent text-accent-foreground';
      case 'livre': return 'bg-success text-success-foreground';
      case 'reservada': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ocupada': return 'Ocupada';
      case 'livre': return 'Livre';
      case 'reservada': return 'Reservada';
      default: return 'Indefinido';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-white shadow-soft sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">Gerenciar Mesas</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar por mesa ou garçom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-success">{mesas.filter(m => m.status === 'livre').length}</p>
              <p className="text-sm text-muted-foreground">Mesas Livres</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-accent">{mesas.filter(m => m.status === 'ocupada').length}</p>
              <p className="text-sm text-muted-foreground">Ocupadas</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-warning">{mesas.filter(m => m.status === 'reservada').length}</p>
              <p className="text-sm text-muted-foreground">Reservadas</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-primary">
                R$ {mesas.reduce((total, mesa) => total + mesa.valorConta, 0).toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">Total Vendas</p>
            </CardContent>
          </Card>
        </div>

        {/* Mesas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMesas.map(mesa => (
            <Dialog key={mesa.id}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-medium transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{mesa.numero}</CardTitle>
                      <Badge className={getStatusColor(mesa.status)}>
                        {getStatusText(mesa.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mesa.status === 'ocupada' && (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{mesa.clientes} clientes</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>Desde {mesa.horaInicio}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span>R$ {mesa.valorConta.toFixed(2)}</span>
                        </div>
                        {mesa.pedidosAtivos > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {mesa.pedidosAtivos} pedidos ativos
                          </Badge>
                        )}
                      </>
                    )}
                    {mesa.status === 'reservada' && (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{mesa.clientes} pessoas</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>Para {mesa.horaInicio}</span>
                        </div>
                      </>
                    )}
                    {mesa.status === 'livre' && (
                      <p className="text-sm text-muted-foreground">Disponível para ocupação</p>
                    )}
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{mesa.numero} - Detalhes</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    <Badge className={getStatusColor(mesa.status)}>
                      {getStatusText(mesa.status)}
                    </Badge>
                  </div>
                  {mesa.garcom && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Garçom:</span>
                      <span className="text-sm">{mesa.garcom}</span>
                    </div>
                  )}
                  {mesa.status !== 'livre' && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Clientes:</span>
                        <span className="text-sm">{mesa.clientes}</span>
                      </div>
                      {mesa.horaInicio && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Horário:</span>
                          <span className="text-sm">{mesa.horaInicio}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Valor da Conta:</span>
                        <span className="text-sm font-bold">R$ {mesa.valorConta.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                  <div className="flex gap-2 pt-4">
                    <Button 
                      className="flex-1 bg-gradient-primary hover:shadow-glow"
                      onClick={() => navigate(`/garcom/mesa/${mesa.id}/pedidos`)}
                    >
                      Ver Pedidos
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => navigate(`/garcom/mesa/${mesa.id}/editar`)}
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="fixed bottom-6 right-6">
          <Button 
            size="lg"
            className="rounded-full w-14 h-14 bg-gradient-accent hover:shadow-glow"
            onClick={() => navigate('/garcom/nova-mesa')}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MesasPage;