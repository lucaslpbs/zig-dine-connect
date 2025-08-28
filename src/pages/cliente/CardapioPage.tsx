import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Plus, Minus, ShoppingCart, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CardapioPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'bebidas', name: 'Bebidas' },
    { id: 'pratos', name: 'Pratos' },
    { id: 'sobremesas', name: 'Sobremesas' },
    { id: 'aperitivos', name: 'Aperitivos' }
  ];

  const produtos = [
    {
      id: 1,
      nome: 'Hambúrguer Artesanal',
      descricao: 'Hambúrguer de carne angus, queijo, alface, tomate',
      preco: 28.90,
      categoria: 'pratos',
      imagem: '/placeholder.svg'
    },
    {
      id: 2,
      nome: 'Refrigerante',
      descricao: 'Coca-Cola, Guaraná, Sprite 350ml',
      preco: 5.50,
      categoria: 'bebidas',
      imagem: '/placeholder.svg'
    },
    {
      id: 3,
      nome: 'Petit Gateau',
      descricao: 'Bolinho quente com sorvete de baunilha',
      preco: 15.90,
      categoria: 'sobremesas',
      imagem: '/placeholder.svg'
    },
    {
      id: 4,
      nome: 'Pastéis Variados',
      descricao: 'Porção com 6 pastéis de sabores variados',
      preco: 18.50,
      categoria: 'aperitivos',
      imagem: '/placeholder.svg'
    }
  ];

  const filteredProducts = produtos.filter(produto => {
    const matchCategory = selectedCategory === 'all' || produto.categoria === selectedCategory;
    const matchSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const addToCart = (produto: any) => {
    const existingItem = cart.find(item => item.id === produto.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === produto.id 
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...produto, quantidade: 1 }]);
    }
  };

  const removeFromCart = (produtoId: number) => {
    const existingItem = cart.find(item => item.id === produtoId);
    if (existingItem && existingItem.quantidade > 1) {
      setCart(cart.map(item => 
        item.id === produtoId 
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      ));
    } else {
      setCart(cart.filter(item => item.id !== produtoId));
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  const cartItems = cart.reduce((total, item) => total + item.quantidade, 0);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-white shadow-soft sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/cliente')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">Cardápio</h1>
            <div className="ml-auto">
              <Button 
                onClick={() => navigate('/cliente')}
                className="bg-gradient-primary hover:shadow-glow"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Carrinho
                {cartItems > 0 && (
                  <Badge className="bg-accent text-accent-foreground ml-1">
                    {cartItems}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(produto => (
            <Card key={produto.id} className="overflow-hidden hover:shadow-medium transition-all">
              <div className="aspect-video bg-muted"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{produto.nome}</CardTitle>
                <p className="text-sm text-muted-foreground">{produto.descricao}</p>
                <p className="text-xl font-bold text-primary">R$ {produto.preco.toFixed(2)}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {cart.find(item => item.id === produto.id) ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeFromCart(produto.id)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="px-3 py-1 bg-muted rounded text-sm font-medium">
                        {cart.find(item => item.id === produto.id)?.quantidade || 0}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => addToCart(produto)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => addToCart(produto)}
                      className="flex-1 bg-gradient-accent hover:shadow-glow"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      {cartItems > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-20">
          <Card className="bg-primary text-primary-foreground shadow-large">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{cartItems} itens</p>
                  <p className="text-lg font-bold">R$ {cartTotal.toFixed(2)}</p>
                </div>
                <Button 
                  onClick={() => navigate('/cliente')}
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Ver Pedido
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CardapioPage;