import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

interface OrderFormData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  zip: string;
  entrance: string;
  floor: string;
  comment: string;
  paymentMethod: string;
}

const Checkout = () => {
  const { items, totalPrice, totalItems, clearCart, appliedPromo, finalPrice } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    zip: '',
    entrance: '',
    floor: '',
    comment: '',
    paymentMethod: 'card',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});

  const handleChange = (field: keyof OrderFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Введите имя';
    if (!formData.surname.trim()) newErrors.surname = 'Введите фамилию';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }

    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите телефон';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Слишком короткий номер';
    }

    if (!formData.city.trim()) newErrors.city = 'Введите город';
    if (!formData.address.trim()) newErrors.address = 'Введите адрес';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast({
        title: "Ошибка",
        description: "Корзина пуста",
        variant: "destructive"
      });
      return;
    }

    if (!validateForm()) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const orderNumber = `CPC-${Date.now()}`;
    
    const orderData = {
      orderNumber,
      total: finalPrice,
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      customer: {
        firstName: formData.name,
        lastName: formData.surname,
        email: formData.email,
        phone: formData.phone
      },
      delivery: {
        city: formData.city,
        address: formData.address,
        postalCode: formData.zip,
        apartment: '',
        entrance: formData.entrance,
        floor: formData.floor
      },
      paymentMethod: formData.paymentMethod,
      appliedPromo,
      orderDate: new Date().toISOString(),
      status: 'processing'
    };

    sessionStorage.setItem('lastOrder', JSON.stringify(orderData));

    const existingOrders = localStorage.getItem('orderHistory');
    const orderHistory = existingOrders ? JSON.parse(existingOrders) : [];
    orderHistory.unshift(orderData);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

    console.log('Заказ оформлен:', orderData);

    try {
      await fetch('https://functions.poehali.dev/076bb0f4-1196-4218-a71b-038068639d52', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'order_confirmation',
          order: orderData
        })
      });
    } catch (error) {
      console.error('Failed to send email:', error);
    }

    toast({
      title: "Заказ оформлен! 🎉",
      description: `Номер заказа: ${orderNumber}. Подтверждение отправлено на email`,
    });

    clearCart();
    setIsSubmitting(false);
    
    setTimeout(() => {
      navigate('/order-success');
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
          <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gradient">CYBERPUNK PC</Link>
            <Link to="/cart">
              <Button variant="outline" size="icon" className="relative border-gradient">
                <Icon name="ShoppingCart" size={20} />
              </Button>
            </Link>
          </nav>
        </header>
        <div className="container mx-auto px-4 py-16 text-center">
          <Icon name="ShoppingCart" size={80} className="mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
          <p className="text-foreground/60 mb-8">Добавьте товары в корзину, чтобы оформить заказ</p>
          <Link to="/catalog">
            <Button size="lg">Перейти в каталог</Button>
          </Link>
        </div>
      </div>
    );
  }

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

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="border border-border bg-card rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="User" size={24} />
                  Контактные данные
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Имя *</Label>
                    <Input 
                      id="name" 
                      placeholder="Иван" 
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="surname">Фамилия *</Label>
                    <Input 
                      id="surname" 
                      placeholder="Иванов"
                      value={formData.surname}
                      onChange={(e) => handleChange('surname', e.target.value)}
                      className={errors.surname ? 'border-red-500' : ''}
                    />
                    {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="ivan@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input 
                      id="phone" 
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
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
                    <Label htmlFor="city">Город *</Label>
                    <Input 
                      id="city" 
                      placeholder="Москва"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      className={errors.city ? 'border-red-500' : ''}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <Label htmlFor="address">Улица, дом, квартира *</Label>
                    <Input 
                      id="address" 
                      placeholder="ул. Ленина, д. 10, кв. 5"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className={errors.address ? 'border-red-500' : ''}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="zip">Индекс</Label>
                      <Input 
                        id="zip" 
                        placeholder="123456"
                        value={formData.zip}
                        onChange={(e) => handleChange('zip', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="entrance">Подъезд</Label>
                      <Input 
                        id="entrance" 
                        placeholder="2"
                        value={formData.entrance}
                        onChange={(e) => handleChange('entrance', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="floor">Этаж</Label>
                      <Input 
                        id="floor" 
                        placeholder="5"
                        value={formData.floor}
                        onChange={(e) => handleChange('floor', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="comment">Комментарий к заказу</Label>
                    <Textarea 
                      id="comment" 
                      placeholder="Дополнительная информация для курьера..."
                      value={formData.comment}
                      onChange={(e) => handleChange('comment', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="border border-border bg-card rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="CreditCard" size={24} />
                  Способ оплаты
                </h2>
                <RadioGroup 
                  value={formData.paymentMethod} 
                  onValueChange={(value) => handleChange('paymentMethod', value)}
                >
                  <div className="flex items-center space-x-2 mb-3 p-3 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="cursor-pointer flex items-center gap-2 flex-1">
                      <Icon name="CreditCard" size={20} />
                      Банковская карта
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-3 p-3 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="cursor-pointer flex items-center gap-2 flex-1">
                      <Icon name="Wallet" size={20} />
                      Наличные при получении
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="sbp" id="sbp" />
                    <Label htmlFor="sbp" className="cursor-pointer flex items-center gap-2 flex-1">
                      <Icon name="Smartphone" size={20} />
                      СБП (Система быстрых платежей)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="border border-border bg-card rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Ваш заказ</h2>
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm pb-3 border-b border-border/50">
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-foreground/60 text-xs">Количество: {item.quantity}</p>
                      </div>
                      <span className="font-bold">{(item.price * item.quantity).toLocaleString()} ₽</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="text-foreground/60">Товары ({totalItems})</span>
                    <span className="font-bold">{totalPrice.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-foreground/60">Доставка</span>
                    <span className="font-bold text-green-500">Бесплатно</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-lg">
                      <div className="flex items-center gap-2">
                        <Icon name="Tag" size={16} className="text-green-500" />
                        <span className="text-foreground/60">Промокод {appliedPromo.code}</span>
                      </div>
                      <span className="font-bold text-green-500">-{appliedPromo.discount}%</span>
                    </div>
                  )}
                  <div className="flex justify-between text-2xl border-t border-border pt-3">
                    <span className="font-bold">Итого</span>
                    <span className="font-bold text-gradient">{finalPrice.toLocaleString()} ₽</span>
                  </div>
                  {appliedPromo && appliedPromo.discount === 100 && (
                    <div className="text-center text-sm text-green-500 font-bold">
                      🎉 Заказ бесплатный!
                    </div>
                  )}
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg rgb-glow mb-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                      Оформление...
                    </>
                  ) : (
                    <>
                      <Icon name="Check" size={20} className="mr-2" />
                      Подтвердить заказ
                    </>
                  )}
                </Button>
                <Link to="/cart">
                  <Button variant="outline" size="lg" className="w-full">
                    <Icon name="ArrowLeft" size={20} className="mr-2" />
                    Вернуться в корзину
                  </Button>
                </Link>
                <p className="text-xs text-foreground/60 mt-4 text-center">
                  * Обязательные поля для заполнения
                </p>
              </div>
            </div>
          </div>
        </form>
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