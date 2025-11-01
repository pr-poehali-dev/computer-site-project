import { Link } from 'react-router-dom';
import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/context/CartContext';

const Checkout = () => {
  const { items, totalPrice, totalItems } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gradient">CYBERPUNK PC</Link>
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
        <h1 className="text-5xl font-black mb-8 text-gradient">Оформление заказа</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-border bg-card rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="User" size={24} />
                Контактные данные
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" placeholder="Иван" />
                </div>
                <div>
                  <Label htmlFor="surname">Фамилия</Label>
                  <Input id="surname" placeholder="Иванов" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="ivan@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" placeholder="+7 (999) 123-45-67" />
                </div>
              </div>
            </div>

            <div className="border border-border bg-card rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="MapPin" size={24} />
                Адрес доставки
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="city">Город</Label>
                  <Input id="city" placeholder="Москва" />
                </div>
                <div>
                  <Label htmlFor="address">Улица, дом, квартира</Label>
                  <Input id="address" placeholder="ул. Ленина, д. 10, кв. 5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zip">Индекс</Label>
                    <Input id="zip" placeholder="123456" />
                  </div>
                  <div>
                    <Label htmlFor="entrance">Подъезд</Label>
                    <Input id="entrance" placeholder="2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-border bg-card rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="CreditCard" size={24} />
                Способ оплаты
              </h2>
              <RadioGroup defaultValue="card">
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="cursor-pointer">Банковская карта</Label>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="cursor-pointer">Наличные при получении</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sbp" id="sbp" />
                  <Label htmlFor="sbp" className="cursor-pointer">СБП (Система быстрых платежей)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border border-border bg-card rounded-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Ваш заказ</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-foreground/80">{item.name} × {item.quantity}</span>
                    <span className="font-bold">{item.price.toLocaleString()} ₽</span>
                  </div>
                ))}
                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-lg">
                    <span className="text-foreground/60">Доставка</span>
                    <span className="font-bold text-green-500">Бесплатно</span>
                  </div>
                  <div className="flex justify-between text-2xl">
                    <span className="font-bold">Итого</span>
                    <span className="font-bold text-gradient">{totalPrice.toLocaleString()} ₽</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="w-full text-lg rgb-glow mb-3">
                <Icon name="Check" size={20} className="mr-2" />
                Подтвердить заказ
              </Button>
              <Link to="/cart">
                <Button variant="outline" size="lg" className="w-full">
                  <Icon name="ArrowLeft" size={20} className="mr-2" />
                  Вернуться в корзину
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-foreground/60">
          <p>&copy; 2025 CYBERPUNK PC. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;