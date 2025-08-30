import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Search, Users, Clock, DollarSign, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Comanda {
  id: number;
  numero: number;
  cliente: {
    nome: string;
    email: string;
    telefone: string;
  };
  mesa: number;
  status: 'livre' | 'ocupada' | 'fechada';
  itens: Array<{
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
    total: number;
  }>;
  total: number;
  abertura: string;
}

const ComandasPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [comandas, setComandas] = useState<Comanda[]>([
    {
      id: 1,
      numero: 1,
      cliente: { nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 99999-9999' },
      mesa: 5,
      status: 'ocupada',
      itens: [
        { id: 1, nome: 'Pizza Margherita', preco: 32.00, quantidade: 1, total: 32.00 },
        { id: 2, nome: 'Refrigerante', preco: 6.00, quantidade: 2, total: 12.00 }
      ],
      total: 44.00,
      abertura: '19:30'
    },
    {
      id: 2,
      numero: 2,
      cliente: { nome: 'Maria Santos', email: 'maria@email.com', telefone: '(11) 88888-8888' },
      mesa: 12,
      status: 'ocupada',
      itens: [
        { id: 3, nome: 'Hambúrguer Especial', preco: 28.00, quantidade: 1, total: 28.00 }
      ],
      total: 28.00,
      abertura: '20:15'
    }
  ]);

  // Gerar comandas livres (números 3-50)
  React.useEffect(() => {
    const comandasLivres = Array.from({ length: 48 }, (_, i) => ({
      id: i + 3,
      numero: i + 3,
      cliente: { nome: '', email: '', telefone: '' },
      mesa: 0,
      status: 'livre' as const,
      itens: [],
      total: 0,
      abertura: ''
    }));
    setComandas(prev => [...prev, ...comandasLivres]);
  }, []);

  const [novaComanda, setNovaComanda] = useState({
    nome: '',
    email: '',
    telefone: '',
    mesa: ''
  });

  const [comandaSelecionada, setComandaSelecionada] = useState<Comanda | null>(null);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [dialogGerenciar, setDialogGerenciar] = useState(false);

  const handleAbrirComanda = (comanda: Comanda) => {
    // API: POST /garcom/comandas/abrir
    if (novaComanda.nome && novaComanda.email && novaComanda.telefone && novaComanda.mesa) {
      const comandaAtualizada = {
        ...comanda,
        cliente: {
          nome: novaComanda.nome,
          email: novaComanda.email,
          telefone: novaComanda.telefone
        },
        mesa: parseInt(novaComanda.mesa),
        status: 'ocupada' as const,
        abertura: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };

      setComandas(prev =>
        prev.map(c => c.id === comanda.id ? comandaAtualizada : c)
      );

      setNovaComanda({ nome: '', email: '', telefone: '', mesa: '' });
      setDialogAberto(false);

      toast({
        title: "Comanda aberta!",
        description: `Comanda ${comanda.numero} aberta para ${novaComanda.nome}`,
      });
    }
  };

  const handleFecharComanda = (comanda: Comanda) => {
    // API: POST /garcom/comandas/fechar
    const comandaFechada = {
      ...comanda,
      status: 'livre' as const,
      cliente: { nome: '', email: '', telefone: '' },
      mesa: 0,
      itens: [],
      total: 0,
      abertura: ''
    };

    setComandas(prev =>
      prev.map(c => c.id === comanda.id ? comandaFechada : c)
    );

    setDialogGerenciar(false);
    setComandaSelecionada(null);

    toast({
      title: "Comanda fechada!",
      description: `Comanda ${comanda.numero} foi fechada e está disponível`,
    });
  };

  const comandasFiltradas = comandas.filter(comanda =>
    comanda.numero.toString().includes(searchTerm) ||
    comanda.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comanda.mesa.toString().includes(searchTerm)
  );

  const stats = {
    livres: comandas.filter(c => c.status === 'livre').length,
    ocupadas: comandas.filter(c => c.status === 'ocupada').length,
    faturamento: comandas.filter(c => c.status === 'ocupada').reduce((acc, c) => acc + c.total, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Comandas</h1>
          <p className="text-muted-foreground">Controle todas as comandas do restaurante</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por número, cliente ou mesa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comandas Livres</CardTitle>
            <Users className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.livres}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comandas Ocupadas</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.ocupadas}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Ativo</CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              R$ {stats.faturamento.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid de Comandas */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {comandasFiltradas.map((comanda) => (
          <Card
            key={comanda.id}
            className={`cursor-pointer transition-all hover:shadow-medium ${
              comanda.status === 'livre' 
                ? 'border-success hover:border-success/50' 
                : 'border-warning hover:border-warning/50'
            }`}
          >
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <div className="text-lg font-bold">#{comanda.numero}</div>
                <Badge 
                  variant={comanda.status === 'livre' ? 'default' : 'secondary'}
                  className={
                    comanda.status === 'livre' 
                      ? 'bg-success text-success-foreground'
                      : 'bg-warning text-warning-foreground'
                  }
                >
                  {comanda.status === 'livre' ? 'Livre' : 'Ocupada'}
                </Badge>
                
                {comanda.status === 'ocupada' && (
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>Mesa {comanda.mesa}</div>
                    <div>{comanda.cliente.nome}</div>
                    <div className="font-semibold text-accent">
                      R$ {comanda.total.toFixed(2)}
                    </div>
                  </div>
                )}

                {comanda.status === 'livre' ? (
                  <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="w-full">
                        <Plus className="w-3 h-3 mr-1" />
                        Abrir
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Abrir Comanda #{comanda.numero}</DialogTitle>
                        <DialogDescription>
                          Preencha os dados do cliente para abrir a comanda
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="nome">Nome do Cliente</Label>
                          <Input
                            id="nome"
                            value={novaComanda.nome}
                            onChange={(e) => setNovaComanda({...novaComanda, nome: e.target.value})}
                            placeholder="Digite o nome completo"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">E-mail</Label>
                          <Input
                            id="email"
                            type="email"
                            value={novaComanda.email}
                            onChange={(e) => setNovaComanda({...novaComanda, email: e.target.value})}
                            placeholder="cliente@email.com"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="telefone">Telefone</Label>
                          <Input
                            id="telefone"
                            value={novaComanda.telefone}
                            onChange={(e) => setNovaComanda({...novaComanda, telefone: e.target.value})}
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="mesa">Número da Mesa</Label>
                          <Input
                            id="mesa"
                            type="number"
                            value={novaComanda.mesa}
                            onChange={(e) => setNovaComanda({...novaComanda, mesa: e.target.value})}
                            placeholder="Digite o número da mesa"
                          />
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button 
                          onClick={() => handleAbrirComanda(comanda)}
                          className="bg-gradient-primary"
                        >
                          Abrir Comanda
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setComandaSelecionada(comanda);
                      setDialogGerenciar(true);
                    }}
                  >
                    Gerenciar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog Gerenciar Comanda */}
      <Dialog open={dialogGerenciar} onOpenChange={setDialogGerenciar}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Comanda #{comandaSelecionada?.numero} - Mesa {comandaSelecionada?.mesa}
            </DialogTitle>
            <DialogDescription>
              Cliente: {comandaSelecionada?.cliente.nome} | 
              Aberta às {comandaSelecionada?.abertura}
            </DialogDescription>
          </DialogHeader>
          
          {comandaSelecionada && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <Label className="text-sm font-medium">E-mail</Label>
                  <p className="text-sm text-muted-foreground">{comandaSelecionada.cliente.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Telefone</Label>
                  <p className="text-sm text-muted-foreground">{comandaSelecionada.cliente.telefone}</p>
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold">Itens Consumidos</Label>
                <ScrollArea className="h-48 mt-2">
                  {comandaSelecionada.itens.length > 0 ? (
                    <div className="space-y-2">
                      {comandaSelecionada.itens.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-2 border rounded">
                          <div>
                            <span className="font-medium">{item.nome}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              {item.quantidade}x R$ {item.preco.toFixed(2)}
                            </span>
                          </div>
                          <span className="font-semibold">R$ {item.total.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      Nenhum item adicionado ainda
                    </p>
                  )}
                </ScrollArea>
              </div>

              <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
                <span>Total da Comanda:</span>
                <span className="text-accent">R$ {comandaSelecionada.total.toFixed(2)}</span>
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2">
            <Button variant="outline">
              Adicionar Itens
            </Button>
            <Button 
              variant="destructive"
              onClick={() => comandaSelecionada && handleFecharComanda(comandaSelecionada)}
            >
              <X className="w-4 h-4 mr-2" />
              Fechar Comanda
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComandasPage;