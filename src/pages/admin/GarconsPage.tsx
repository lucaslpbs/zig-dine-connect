import React, { useState } from 'react';
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
  id: number;
  nome: string;
  username: string;
  email: string;
  telefone: string;
  status: 'ativo' | 'inativo';
  dataCadastro: string;
  ultimoLogin: string;
}

const GarconsPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [garcons, setGarcons] = useState<Garcom[]>([
    {
      id: 1,
      nome: 'João Silva',
      username: 'joao.silva',
      email: 'joao@restaurante.com',
      telefone: '(11) 99999-9999',
      status: 'ativo',
      dataCadastro: '15/01/2024',
      ultimoLogin: '30/08/2024 14:30'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      username: 'maria.santos',
      email: 'maria@restaurante.com',
      telefone: '(11) 88888-8888',
      status: 'ativo',
      dataCadastro: '20/02/2024',
      ultimoLogin: '29/08/2024 18:45'
    },
    {
      id: 3,
      nome: 'Pedro Costa',
      username: 'pedro.costa',
      email: 'pedro@restaurante.com',
      telefone: '(11) 77777-7777',
      status: 'inativo',
      dataCadastro: '10/03/2024',
      ultimoLogin: '25/08/2024 10:15'
    }
  ]);

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

  const handleCriarGarcom = () => {
    // API: POST /admin/garcons
    if (novoGarcom.nome && novoGarcom.username && novoGarcom.email && novoGarcom.senha) {
      const garcom: Garcom = {
        id: Date.now(),
        nome: novoGarcom.nome,
        username: novoGarcom.username,
        email: novoGarcom.email,
        telefone: novoGarcom.telefone,
        status: 'ativo',
        dataCadastro: new Date().toLocaleDateString('pt-BR'),
        ultimoLogin: 'Nunca'
      };

      setGarcons(prev => [...prev, garcom]);
      setNovoGarcom({ nome: '', username: '', email: '', telefone: '', senha: '' });
      setDialogAberto(false);

      toast({
        title: "Garçom criado!",
        description: `${garcom.nome} foi adicionado ao sistema`,
      });
    }
  };

  const handleEditarGarcom = () => {
    // API: PUT /admin/garcons/:id
    if (garcomEditando && novoGarcom.nome && novoGarcom.username && novoGarcom.email) {
      const garcomAtualizado = {
        ...garcomEditando,
        nome: novoGarcom.nome,
        username: novoGarcom.username,
        email: novoGarcom.email,
        telefone: novoGarcom.telefone
      };

      setGarcons(prev =>
        prev.map(g => g.id === garcomEditando.id ? garcomAtualizado : g)
      );

      setGarcomEditando(null);
      setNovoGarcom({ nome: '', username: '', email: '', telefone: '', senha: '' });
      setDialogEdicao(false);

      toast({
        title: "Garçom atualizado!",
        description: `Dados de ${garcomAtualizado.nome} foram atualizados`,
      });
    }
  };

  const handleToggleStatus = (garcom: Garcom) => {
    // API: PATCH /admin/garcons/:id/status
    const novoStatus = garcom.status === 'ativo' ? 'inativo' : 'ativo';
    
    setGarcons(prev =>
      prev.map(g => 
        g.id === garcom.id 
          ? { ...g, status: novoStatus }
          : g
      )
    );

    toast({
      title: `Garçom ${novoStatus === 'ativo' ? 'ativado' : 'desativado'}!`,
      description: `${garcom.nome} foi ${novoStatus === 'ativo' ? 'ativado' : 'desativado'} no sistema`,
    });
  };

  const handleExcluirGarcom = (id: number) => {
    // API: DELETE /admin/garcons/:id
    const garcom = garcons.find(g => g.id === id);
    setGarcons(prev => prev.filter(g => g.id !== id));

    toast({
      title: "Garçom excluído!",
      description: `${garcom?.nome} foi removido do sistema`,
      variant: "destructive"
    });
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

  const garconsFiltrados = garcons.filter(garcom =>
    garcom.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    garcom.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    garcom.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: garcons.length,
    ativos: garcons.filter(g => g.status === 'ativo').length,
    inativos: garcons.filter(g => g.status === 'inativo').length
  };

  return (
    <div className="space-y-6">
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

      {/* Tabela de Garçons */}
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
                      variant={garcom.status === 'ativo' ? 'default' : 'secondary'}
                      className={
                        garcom.status === 'ativo'
                          ? 'bg-success text-success-foreground'
                          : 'bg-muted text-muted-foreground'
                      }
                    >
                      {garcom.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>{garcom.ultimoLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => abrirEdicao(garcom)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant={garcom.status === 'ativo' ? "secondary" : "default"}
                        onClick={() => handleToggleStatus(garcom)}
                      >
                        {garcom.status === 'ativo' ? (
                          <UserX className="w-3 h-3" />
                        ) : (
                          <UserCheck className="w-3 h-3" />
                        )}
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
                              Tem certeza que deseja excluir o garçom {garcom.nome}? 
                              Esta ação não pode ser desfeita.
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
                placeholder="Digite o nome completo"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-username">Nome de Usuário</Label>
              <Input
                id="edit-username"
                value={novoGarcom.username}
                onChange={(e) => setNovoGarcom({...novoGarcom, username: e.target.value})}
                placeholder="ex: joao.silva"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-email">E-mail</Label>
              <Input
                id="edit-email"
                type="email"
                value={novoGarcom.email}
                onChange={(e) => setNovoGarcom({...novoGarcom, email: e.target.value})}
                placeholder="garcom@restaurante.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-telefone">Telefone</Label>
              <Input
                id="edit-telefone"
                value={novoGarcom.telefone}
                onChange={(e) => setNovoGarcom({...novoGarcom, telefone: e.target.value})}
                placeholder="(11) 99999-9999"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-senha">Nova Senha (opcional)</Label>
              <Input
                id="edit-senha"
                type="password"
                value={novoGarcom.senha}
                onChange={(e) => setNovoGarcom({...novoGarcom, senha: e.target.value})}
                placeholder="Deixe em branco para manter a atual"
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