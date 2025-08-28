import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Plus, Search, Edit, Trash2, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProdutosPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    categoria: '',
    ativo: true
  });

  const categorias = [
    { id: 'all', name: 'Todas' },
    { id: 'bebidas', name: 'Bebidas' },
    { id: 'pratos', name: 'Pratos Principais' },
    { id: 'sobremesas', name: 'Sobremesas' },
    { id: 'aperitivos', name: 'Aperitivos' },
    { id: 'saladas', name: 'Saladas' }
  ];

  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: 'Hambúrguer Artesanal',
      descricao: 'Hambúrguer de carne angus 180g, queijo cheddar, alface, tomate, cebola caramelizada',
      preco: 28.90,
      categoria: 'pratos',
      ativo: true,
      vendas: 45
    },
    {
      id: 2,
      nome: 'Refrigerante Lata',
      descricao: 'Coca-Cola, Guaraná Antarctica, Sprite - 350ml gelado',
      preco: 5.50,
      categoria: 'bebidas',
      ativo: true,
      vendas: 123
    },
    {
      id: 3,
      nome: 'Petit Gateau',
      descricao: 'Bolinho de chocolate quente com recheio cremoso, acompanha sorvete de baunilha',
      preco: 15.90,
      categoria: 'sobremesas',
      ativo: true,
      vendas: 28
    },
    {
      id: 4,
      nome: 'Cerveja Artesanal',
      descricao: 'IPA 500ml da cervejaria local, amargor equilibrado',
      preco: 12.50,
      categoria: 'bebidas',
      ativo: false,
      vendas: 67
    },
    {
      id: 5,
      nome: 'Salada Caesar',
      descricao: 'Alface romana, croutons, parmesão, molho caesar, peito de frango grelhado',
      preco: 22.90,
      categoria: 'saladas',
      ativo: true,
      vendas: 31
    }
  ]);

  const filteredProducts = produtos.filter(produto => {
    const matchCategory = selectedCategory === 'all' || produto.categoria === selectedCategory;
    const matchSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      // API: PUT /admin/produtos/:id
      setProdutos(produtos.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData, preco: parseFloat(formData.preco) }
          : p
      ));
      setEditingProduct(null);
    } else {
      // API: POST /admin/produtos
      const newProduct = {
        id: Date.now(),
        ...formData,
        preco: parseFloat(formData.preco),
        vendas: 0
      };
      setProdutos([...produtos, newProduct]);
    }
    setFormData({ nome: '', descricao: '', preco: '', categoria: '', ativo: true });
    setIsAddDialogOpen(false);
  };

  const handleEdit = (produto: any) => {
    setEditingProduct(produto);
    setFormData({
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco.toString(),
      categoria: produto.categoria,
      ativo: produto.ativo
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    // API: DELETE /admin/produtos/:id
    setProdutos(produtos.filter(p => p.id !== id));
  };

  const toggleStatus = (id: number) => {
    // API: PATCH /admin/produtos/:id/status
    setProdutos(produtos.map(p => 
      p.id === id ? { ...p, ativo: !p.ativo } : p
    ));
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
            <h1 className="text-xl font-bold text-foreground">Gerenciar Produtos</h1>
            <div className="ml-auto">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary hover:shadow-glow">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Produto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="nome">Nome do Produto</Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="descricao">Descrição</Label>
                      <Textarea
                        id="descricao"
                        value={formData.descricao}
                        onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="preco">Preço (R$)</Label>
                      <Input
                        id="preco"
                        type="number"
                        step="0.01"
                        value={formData.preco}
                        onChange={(e) => setFormData({...formData, preco: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="categoria">Categoria</Label>
                      <Select 
                        value={formData.categoria} 
                        onValueChange={(value) => setFormData({...formData, categoria: value})}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categorias.filter(c => c.id !== 'all').map(categoria => (
                            <SelectItem key={categoria.id} value={categoria.id}>
                              {categoria.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setIsAddDialogOpen(false);
                          setEditingProduct(null);
                          setFormData({ nome: '', descricao: '', preco: '', categoria: '', ativo: true });
                        }}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" className="flex-1 bg-gradient-accent hover:shadow-glow">
                        {editingProduct ? 'Atualizar' : 'Criar'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categorias.map(categoria => (
                <SelectItem key={categoria.id} value={categoria.id}>
                  {categoria.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{produtos.length}</p>
              <p className="text-sm text-muted-foreground">Total Produtos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-success">{produtos.filter(p => p.ativo).length}</p>
              <p className="text-sm text-muted-foreground">Ativos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-muted-foreground">{produtos.filter(p => !p.ativo).length}</p>
              <p className="text-sm text-muted-foreground">Inativos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-accent">
                {produtos.reduce((sum, p) => sum + p.vendas, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Vendas Totais</p>
            </CardContent>
          </Card>
        </div>

        {/* Products List */}
        <div className="space-y-4">
          {filteredProducts.map(produto => (
            <Card key={produto.id} className="hover:shadow-medium transition-all">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{produto.nome}</h3>
                      <Badge 
                        variant={produto.ativo ? "default" : "secondary"}
                        className={produto.ativo ? "bg-success text-success-foreground" : ""}
                      >
                        {produto.ativo ? 'Ativo' : 'Inativo'}
                      </Badge>
                      <Badge variant="outline">{categorias.find(c => c.id === produto.categoria)?.name}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{produto.descricao}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span className="text-lg font-bold text-primary">R$ {produto.preco.toFixed(2)}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{produto.vendas} vendas</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(produto.id)}
                    >
                      {produto.ativo ? 'Desativar' : 'Ativar'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(produto)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(produto.id)}
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProdutosPage;