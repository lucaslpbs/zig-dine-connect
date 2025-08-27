import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { QrCode, ShoppingCart, Star, LogOut, Scan } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClienteDashboard = () => {
  const navigate = useNavigate();
  const [qrCode, setQrCode] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  const handleActivateCard = async () => {
    if (!qrCode.trim()) return;
    
    // API: POST /cliente/ativar-cartao
    console.log('Activating card:', qrCode);
    setIsActivated(true);
  };

  const handleScanQR = () => {
    // In a real app, this would open camera for QR scanning
    setQrCode('MESA001-QR123');
    setIsActivated(true);
  };

  const handleLogout = () => {
    navigate('/');
  };

  if (!isActivated) {
    return (
      <div className="min-h-screen bg-gradient-subtle p-4">
        <div className="container mx-auto max-w-md">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-foreground">Cliente</h1>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>

          <Card className="shadow-large">
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <QrCode className="w-10 h-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl">Ativar Mesa</CardTitle>
              <CardDescription>
                Escaneie o QR Code da sua mesa ou digite o código do cartão
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Button 
                onClick={handleScanQR}
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 py-6"
              >
                <Scan className="w-5 h-5 mr-2" />
                Escanear QR Code
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">ou</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="qr-code">Código do Cartão/Pulseira</Label>
                  <Input
                    id="qr-code"
                    value={qrCode}
                    onChange={(e) => setQrCode(e.target.value)}
                    placeholder="Digite o código"
                    className="text-center text-lg font-mono"
                  />
                </div>

                <Button 
                  onClick={handleActivateCard}
                  disabled={!qrCode.trim()}
                  className="w-full bg-gradient-accent hover:shadow-glow transition-all duration-300"
                >
                  Ativar Mesa
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-white shadow-soft sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-foreground">Mesa {qrCode}</h1>
              <p className="text-sm text-muted-foreground">Bem-vindo!</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-lg font-bold text-primary">R$ {cartTotal.toFixed(2)}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2 hover:bg-primary/5 hover:border-primary/20"
            onClick={() => navigate('/cliente/cardapio')}
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="text-sm">Cardápio</span>
          </Button>

          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2 hover:bg-primary/5 hover:border-primary/20"
            onClick={() => navigate('/cliente/pedidos')}
          >
            <QrCode className="w-6 h-6" />
            <span className="text-sm">Meus Pedidos</span>
          </Button>

          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2 hover:bg-primary/5 hover:border-primary/20"
            onClick={() => navigate('/cliente/conta')}
          >
            <Star className="w-6 h-6" />
            <span className="text-sm">Minha Conta</span>
          </Button>

          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2 hover:bg-primary/5 hover:border-primary/20"
            onClick={() => navigate('/cliente/avaliacao')}
          >
            <Star className="w-6 h-6" />
            <span className="text-sm">Avaliação</span>
          </Button>
        </div>

        {/* Active Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Status da Mesa</CardTitle>
                <CardDescription>Sua sessão está ativa</CardDescription>
              </div>
              <Badge className="bg-success text-success-foreground">
                Ativo
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Mesa:</p>
                <p className="font-medium">{qrCode}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Itens:</p>
                <p className="font-medium">0 pedidos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pedidos Recentes</CardTitle>
            <CardDescription>Seus últimos itens pedidos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum pedido realizado ainda</p>
              <Button 
                variant="link" 
                onClick={() => navigate('/cliente/cardapio')}
                className="mt-2"
              >
                Ver Cardápio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClienteDashboard;