import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { promoCodes } from '@/lib/promoCodes';

const Cart = () => {
  const { items, totalPrice, totalItems, updateQuantity, removeFromCart, appliedPromo, setAppliedPromo, finalPrice } = useCart();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gradient">CYBERPUNK PC</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/catalog" className="text-foreground/80 hover:text-primary transition-colors">Каталог</Link>
            <Link to="/builds" className="text-foreground/80 hover:text-primary transition-colors">Сборки</Link>
            <Link to="/components" className="text-foreground/80 hover:text-primary transition-colors">Комплектующие</Link>
            <Link to="/delivery" className="text-foreground/80 hover:text-primary transition-colors">Доставка</Link>
            <Link to="/warranty" className="text-foreground/80 hover:text-primary transition-colors">Гарантия</Link>
            <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors">О нас</Link>
          </div>
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative border-gradient">
              <Icon name="ShoppingCart" size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary rounded-full flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-black mb-8 text-gradient">Корзина</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <Icon name="ShoppingCart" size={80} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-xl text-foreground/60 mb-8">Ваша корзина пуста</p>
            <Link to="/catalog">
              <Button size="lg">Перейти в каталог</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border border-border bg-card rounded-lg p-6 flex items-center gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center text-4xl">
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-2xl font-bold text-gradient">{item.price.toLocaleString()} ₽</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Icon name="Minus" size={16} />
                    </Button>
                    <span className="text-xl font-bold w-8 text-center">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Icon name="Trash2" size={18} />
                  </Button>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="border border-border bg-card rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Итого</h2>
                
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Промокод</label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Введите промокод"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      disabled={!!appliedPromo}
                    />
                    {!appliedPromo ? (
                      <Button 
                        onClick={() => {
                          const promo = promoCodes[promoCode];
                          if (promo) {
                            setAppliedPromo({ code: promoCode, discount: promo.discount });
                            toast({
                              title: "Промокод применен!",
                              description: `${promo.description} - ${promo.discount}%`,
                            });
                          } else {
                            toast({
                              title: "Ошибка",
                              description: "Неверный промокод",
                              variant: "destructive"
                            });
                          }
                        }}
                        disabled={!promoCode}
                      >
                        Применить
                      </Button>
                    ) : (
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setAppliedPromo(null);
                          setPromoCode('');
                          toast({
                            title: "Промокод удален",
                          });
                        }}
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    )}
                  </div>
                  {appliedPromo && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-500">
                      <Icon name="CheckCircle" size={16} />
                      <span>{promoCodes[appliedPromo.code].description}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="text-foreground/60">Товары ({totalItems})</span>
                    <span className="font-bold">{totalPrice.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-foreground/60">Доставка</span>
                    <span className="font-bold text-green-500">Бесплатно</span>
                  </div>
                  {appliedPromo && appliedPromo.discount > 0 && (
                    <div className="flex justify-between text-lg">
                      <span className="text-foreground/60">Скидка ({appliedPromo.discount}%)</span>
                      <span className="font-bold text-green-500">-{Math.round(totalPrice * appliedPromo.discount / 100).toLocaleString()} ₽</span>
                    </div>
                  )}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-2xl">
                      <span className="font-bold">Всего</span>
                      <span className="font-bold text-gradient">
                        {finalPrice.toLocaleString()} ₽
                      </span>
                    </div>
                    {appliedPromo && appliedPromo.discount === 100 && (
                      <div className="mt-2 text-center text-sm text-green-500 font-bold">
                        🎉 Поздравляем! Заказ бесплатный!
                      </div>
                    )}
                  </div>
                </div>
                <Link to="/checkout">
                  <Button size="lg" className="w-full text-lg rgb-glow">
                    <Icon name="CreditCard" size={20} className="mr-2" />
                    Оформить заказ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-foreground/60">
          <p>&copy; 2025 CYBERPUNK PC. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Cart;