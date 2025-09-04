import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, User, UserCheck, UserX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Garcom {
  id: string;
  nome: string;
  username: string;
  email: string;
  telefone: string;
  status: boolean; // true = ativo, false = inativo
  ultimoLogin: string;
}

const GarconsPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [garcons, setGarcons] = useState<Garcom[]>([]);
  const [novoGarcom, setNovoGarcom] = useState({
    nome: '',
    username: '',
    email: '',
    telefone: '',
    senha: ''
  });
  const [garcomEditando, setGarcomEditando] = useState<Garcom | null>(null);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [dialogEdicao, setDialogEdicao] = useState(false);

  // Fetch garçons da API
  useEffect(() => {
  const fetchGarcons = async () => {
    const token = localStorage.getItem('token'); // pega token do usuário logado
    if (!token) {
      toast({
        title: 'Erro de autenticação',
        description: 'Token não encontrado. Faça login novamente.',
        variant: 'destructive'
      });
      return;
    }

    try {
      const res = await fetch('https://localhost:7097/api/admin/garcons', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!res.ok) throw new Error('Falha ao buscar garçons');

      const data = await res.json();
      const mapped = data.map((g: any) => ({
        id: g.id,
        nome: g.nomeCompleto,
        username: g.usuario,
        email: g.email,
        telefone: g.telefone,
        status: g.status,
        ultimoLogin: g.ultimoAcesso ? new Date(g.ultimoAcesso).toLocaleString('pt-BR') : 'Nunca'
      }));

      setGarcons(mapped);
    } catch (err) {
      console.error(err);
      toast({
        title: 'Erro ao carregar garçons',
        description: 'Não foi possível carregar os garçons da API',
        variant: 'destructive'
      });
    }
  };

  fetchGarcons();
}, []);


  const garconsFiltrados = garcons.filter(garcom =>
    garcom.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    garcom.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    garcom.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: garcons.length,
    ativos: garcons.filter(g => g.status).length,
    inativos: garcons.filter(g => !g.status).length
  };

  // Criar garçom
  const handleCriarGarcom = async () => {
  if (novoGarcom.nome && novoGarcom.username && novoGarcom.email && novoGarcom.senha) {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: 'Erro de autenticação',
        description: 'Token não encontrado. Faça login novamente.',
        variant: 'destructive'
      });
      return;
    }
    const gerarUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
    });
    };

    try {
      const res = await fetch('https://localhost:7097/api/admin/garcons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: gerarUUID(), // gera um UUID para o novo garçom
          nomeCompleto: novoGarcom.nome,
          nomeUsuario: novoGarcom.username,
          email: novoGarcom.email,
          telefone: novoGarcom.telefone,
          senhaHash: novoGarcom.senha,
          ativo: true,
          ultimoAcesso: new Date().toISOString()
        })
      });

      if (!res.ok) throw new Error('Falha ao criar garçom');

      const data = await res.json();

      const garcomCriado: Garcom = {
        id: data.id,
        nome: data.nomeCompleto,
        username: data.nomeUsuario,
        email: data.email,
        telefone: data.telefone,
        status: data.status ? true : false,
        ultimoLogin: 'Nunca'
      };

      setGarcons(prev => [...prev, garcomCriado]);
      setNovoGarcom({ nome: '', username: '', email: '', telefone: '', senha: '' });
      setDialogAberto(false);

      toast({
        title: "Garçom criado!",
        description: `${garcomCriado.nome} foi adicionado ao sistema`,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Erro ao criar garçom',
        description: 'Não foi possível criar o garçom',
        variant: 'destructive'
      });
    }
  }
};

const handleEditarGarcom = async () => {
  if (garcomEditando && novoGarcom.nome && novoGarcom.email) {
    try {
      const token = localStorage.getItem('token');
      
      const body = {
        nomeCompleto: novoGarcom.nome,
        email: novoGarcom.email,
        telefone: novoGarcom.telefone,
        nomeUsuario: novoGarcom.username,
        status: garcomEditando.status === true // transforma para booleano
      };

      const res = await fetch(`https://localhost:7097/api/admin/garcons/${garcomEditando.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error('Erro na atualização');

      const data = await res.json();

      const garcomAtualizado: Garcom = {
        id: data.id,
        nome: data.nomeCompleto,
        username: garcomEditando.username, // manter username local
        email: data.email,
        telefone: data.telefone,
        status: data.status ? true : false,
        ultimoLogin: garcomEditando.ultimoLogin
      };

      setGarcons(prev => prev.map(g => g.id === garcomEditando.id ? garcomAtualizado : g));
      setGarcomEditando(null);
      setNovoGarcom({ nome: '', username: '', email: '', telefone: '', senha: '' });
      setDialogEdicao(false);

      toast({
        title: "Garçom atualizado!",
        description: `Dados de ${garcomAtualizado.nome} foram atualizados`,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Erro ao atualizar garçom',
        description: 'Não foi possível atualizar o garçom',
        variant: 'destructive'
      });
    }
  }
};


  // Ativar/Desativar garçom
  const handleToggleStatus = async (garcom: Garcom) => {
    const novoStatus = !garcom.status;
    try {
      await fetch(`https://localhost:7097/api/admin/garcons/${garcom.id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer SEU_TOKEN_AQUI'
        },
        body: JSON.stringify({ status: novoStatus })
      });
      setGarcons(prev => prev.map(g => g.id === garcom.id ? { ...g, status: novoStatus } : g));
      toast({
        title: `Garçom ${novoStatus ? 'ativado' : 'desativado'}!`,
        description: `${garcom.nome} foi ${novoStatus ? 'ativado' : 'desativado'} no sistema`,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Erro ao alterar status',
        description: 'Não foi possível alterar o status do garçom',
        variant: 'destructive'
      });
    }
  };

  // Excluir garçom
  const handleExcluirGarcom = async (id: string) => {
  const garcom = garcons.find(g => g.id === id);

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: 'Erro de autenticação',
        description: 'Token não encontrado. Faça login novamente.',
        variant: 'destructive'
      });
      return;
    }

    const res = await fetch(`https://localhost:7097/api/admin/garcons/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!res.ok) throw new Error('Falha ao excluir garçom');

    setGarcons(prev => prev.filter(g => g.id !== id));

    toast({
      title: "Garçom excluído!",
      description: `${garcom?.nome} foi removido do sistema`,
      variant: "destructive"
    });
  } catch (err) {
    console.error(err);
    toast({
      title: 'Erro ao excluir garçom',
      description: 'Não foi possível excluir o garçom',
      variant: 'destructive'
    });
  }
};


  const abrirEdicao = (garcom: Garcom) => {
    setGarcomEditando(garcom);
    setNovoGarcom({
      nome: garcom.nome,
      username: garcom.username,
      email: garcom.email,
      telefone: garcom.telefone,
      senha: ''
    });
    setDialogEdicao(true);
  };

  return (
    <div className="space-y-6">
      {/* Header e busca */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Garçons</h1>
          <p className="text-muted-foreground">Gerencie usuários garçons/atendentes</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, usuário ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Novo Garçom
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Garçom</DialogTitle>
                <DialogDescription>
                  Preencha os dados para criar um novo usuário garçom/atendente
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    value={novoGarcom.nome}
                    onChange={(e) => setNovoGarcom({...novoGarcom, nome: e.target.value})}
                    placeholder="Digite o nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Nome de Usuário</Label>
                  <Input
                    id="username"
                    value={novoGarcom.username}
                    onChange={(e) => setNovoGarcom({...novoGarcom, username: e.target.value})}
                    placeholder="ex: joao.silva"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={novoGarcom.email}
                    onChange={(e) => setNovoGarcom({...novoGarcom, email: e.target.value})}
                    placeholder="garcom@restaurante.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={novoGarcom.telefone}
                    onChange={(e) => setNovoGarcom({...novoGarcom, telefone: e.target.value})}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senha">Senha Inicial</Label>
                  <Input
                    id="senha"
                    type="password"
                    value={novoGarcom.senha}
                    onChange={(e) => setNovoGarcom({...novoGarcom, senha: e.target.value})}
                    placeholder="Digite uma senha inicial"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCriarGarcom} className="bg-gradient-primary">
                  Criar Garçom
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Garçons</CardTitle>
            <User className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ativos</CardTitle>
            <UserCheck className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.ativos}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inativos</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">{stats.inativos}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Garçons</CardTitle>
          <CardDescription>
            Todos os usuários garçons/atendentes cadastrados no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Último Login</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {garconsFiltrados.map((garcom) => (
                <TableRow key={garcom.id}>
                  <TableCell className="font-medium">{garcom.nome}</TableCell>
                  <TableCell>{garcom.username}</TableCell>
                  <TableCell>{garcom.email}</TableCell>
                  <TableCell>{garcom.telefone}</TableCell>
                  <TableCell>
                    <Badge
                      variant={garcom.status ? 'default' : 'secondary'}
                      className={garcom.status ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}
                    >
                      {garcom.status ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>{garcom.ultimoLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => abrirEdicao(garcom)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant={garcom.status ? "secondary" : "default"} onClick={() => handleToggleStatus(garcom)}>
                        {garcom.status ? <UserX className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir o garçom {garcom.nome}? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleExcluirGarcom(garcom.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog de Edição */}
      <Dialog open={dialogEdicao} onOpenChange={setDialogEdicao}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Garçom</DialogTitle>
            <DialogDescription>
              Atualize os dados do garçom {garcomEditando?.nome}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-nome">Nome Completo</Label>
              <Input
                id="edit-nome"
                value={novoGarcom.nome}
                onChange={(e) => setNovoGarcom({...novoGarcom, nome: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-username">Nome de Usuário</Label>
              <Input
                id="edit-username"
                value={novoGarcom.username}
                onChange={(e) => setNovoGarcom({...novoGarcom, username: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">E-mail</Label>
              <Input
                id="edit-email"
                type="email"
                value={novoGarcom.email}
                onChange={(e) => setNovoGarcom({...novoGarcom, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-telefone">Telefone</Label>
              <Input
                id="edit-telefone"
                value={novoGarcom.telefone}
                onChange={(e) => setNovoGarcom({...novoGarcom, telefone: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditarGarcom} className="bg-gradient-primary">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GarconsPage;
