"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Search,
  Users,
  Clock,
  DollarSign,
  X,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Comanda {
  id: string;
  numero: number;
  mesa: number;
  nomeCliente: string;
  email: string;
  telefone: string;
  dataAbertura: string;
  dataFechamento: string | null;
  status: boolean;
  itens: Array<{
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
    total: number;
  }>;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Authorization": `Bearer ${token}`,
    "Accept": "application/json",
    "Content-Type": "application/json"
  };
};

const API_BASE = "https://localhost:7097/api/Waiter";
const TOKEN =  localStorage.getItem("token");
const ComandasPage = () => {
  const router = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [comandas, setComandas] = useState<Comanda[]>([]);
  const [novaComanda, setNovaComanda] = useState({
    nome: "",
    email: "",
    telefone: "",
    mesa: "",
  });
  const [comandaSelecionada, setComandaSelecionada] = useState<Comanda | null>(
    null
  );
  const [dialogAberto, setDialogAberto] = useState(false);
  const [dialogGerenciar, setDialogGerenciar] = useState(false);

  // Buscar comandas reais
  useEffect(() => {
    const fetchComandas = async () => {
      try {
        const response = await axios.get(`${API_BASE}/comandas`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        setComandas(response.data);
      } catch (err) {
        console.error("Erro ao buscar comandas:", err);
      }
    };
    fetchComandas();
  }, []);

  // Criar (abrir) comanda
  const handleAbrirComanda = async (comanda: Comanda) => {
    if (
      novaComanda.nome &&
      novaComanda.email &&
      novaComanda.telefone &&
      novaComanda.mesa
    ) {
      try {
        const response = await axios.post(
          `${API_BASE}/abrir-comanda`,
          {
            numero: comanda.numero,
            mesa: parseInt(novaComanda.mesa),
            nomeCliente: novaComanda.nome,
            email: novaComanda.email,
            telefone: novaComanda.telefone,
          },
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );

        setComandas((prev) => [...prev, response.data]);

        setNovaComanda({ nome: "", email: "", telefone: "", mesa: "" });
        setDialogAberto(false);

        toast({
          title: "Comanda aberta!",
          description: `Mesa ${novaComanda.mesa} aberta para ${novaComanda.nome}`,
        });
      } catch (err) {
        console.error("Erro ao abrir comanda:", err);
        toast({
          title: "Erro",
          description: "Não foi possível abrir a comanda.",
          variant: "destructive",
        });
      }
    }
  };

  // Fechar comanda (aqui você ainda não tem endpoint, então só limpa local)
  const handleFecharComanda = (comanda: Comanda) => {
    setComandas((prev) => prev.filter((c) => c.id !== comanda.id));
    setDialogGerenciar(false);
    setComandaSelecionada(null);

    toast({
      title: "Comanda fechada!",
      description: `Mesa ${comanda.mesa} foi liberada`,
    });
  };

  // Filtro
  const comandasFiltradas = comandas.filter(
    (comanda) =>
      comanda.numero.toString().includes(searchTerm) ||
      comanda.nomeCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comanda.mesa.toString().includes(searchTerm)
  );

  // Stats
  const stats = {
    livres: 50 - comandas.length, // ajuste temporário
    ocupadas: comandas.length,
    faturamento: comandas.reduce(
      (acc, c) =>
        acc +
        c.itens.reduce((soma, item) => soma + item.total, 0),
      0
    ),
  };
  // Exemplo: ordenando por número da comanda
const comandasOrdenadas = [...comandasFiltradas].sort((a, b) => a.numero - b.numero);


  return (
    <div className="flex justify-center">
      <div className="w-full max-w-7xl space-y-6">
        {/* Cabeçalho com botão voltar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-10">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">Gerenciamento de Comandas</h1>
              <p className="text-muted-foreground">
                Controle todas as comandas do restaurante
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-end">
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 justify-center">
          {comandasOrdenadas.map((comanda) => (
            <Card
              key={comanda.id}
              className={`cursor-pointer transition-all hover:shadow-medium ${
                comanda.status === true
                  ? 'border-success hover:border-success/50'
                  : 'border-warning hover:border-warning/50'
              }`}
            >
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <div className="text-lg font-bold">#{comanda.numero}</div>
                  <Badge
                    variant={comanda.status === true ? 'default' : 'secondary'}
                    className={
                      comanda.status === true
                        ? 'bg-success text-success-foreground'
                        : 'bg-warning text-warning-foreground'
                    }
                  >
                    {comanda.status === true ? true : false}
                  </Badge>

                  {comanda.status === false && (
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div>Mesa {comanda.mesa}</div>
                      <div>{comanda.nomeCliente}</div>
                      <div className="font-semibold text-accent">
                        R$ {comanda.numero.toFixed(2)} 
                        {/* trocar para total */}
                      </div>
                    </div>
                  )}

                  {comanda.status === true ? (
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
                              onChange={(e) =>
                                setNovaComanda({ ...novaComanda, nome: e.target.value })
                              }
                              placeholder="Digite o nome completo"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                              id="email"
                              type="email"
                              value={novaComanda.email}
                              onChange={(e) =>
                                setNovaComanda({ ...novaComanda, email: e.target.value })
                              }
                              placeholder="cliente@email.com"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="telefone">Telefone</Label>
                            <Input
                              id="telefone"
                              value={novaComanda.telefone}
                              onChange={(e) =>
                                setNovaComanda({ ...novaComanda, telefone: e.target.value })
                              }
                              placeholder="(11) 99999-9999"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="mesa">Número da Mesa</Label>
                            <Input
                              id="mesa"
                              type="number"
                              value={novaComanda.mesa}
                              onChange={(e) =>
                                setNovaComanda({ ...novaComanda, mesa: e.target.value })
                              }
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
                Cliente: {comandaSelecionada?.nomeCliente} | Aberta às{' '}
                {comandaSelecionada?.dataAbertura}
              </DialogDescription>
            </DialogHeader>

            {comandaSelecionada && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <Label className="text-sm font-medium">E-mail</Label>
                    <p className="text-sm text-muted-foreground">
                      {comandaSelecionada.email}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Telefone</Label>
                    <p className="text-sm text-muted-foreground">
                      {comandaSelecionada.telefone}
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-semibold">Itens Consumidos</Label>
                  <ScrollArea className="h-48 mt-2">
                    {comandaSelecionada.itens.length > 0 ? (
                      <div className="space-y-2">
                        {comandaSelecionada.itens.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between items-center p-2 border rounded"
                          >
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
                  <span className="text-accent">
                    R$ {comandaSelecionada.numero.toFixed(2)}
                    {/* Trocar para total */}
                  </span>
                </div>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button variant="outline">Adicionar Itens</Button>
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
    </div>
  );
};

export default ComandasPage;
