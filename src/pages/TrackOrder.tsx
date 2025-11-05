import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface TrackingStep {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  icon: string;
}

interface Order {
  orderNumber: string;
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  delivery: {
    city: string;
    address: string;
    postalCode: string;
  };
  status: string;
  orderDate?: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState(searchParams.get('order') || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  const searchOrder = () => {
    if (!orderNumber.trim()) return;

    const savedOrders = localStorage.getItem('orderHistory');
    if (savedOrders) {
      const orders: Order[] = JSON.parse(savedOrders);
      const found = orders.find(o => o.orderNumber === orderNumber.trim());
      
      if (found) {
        setOrder(found);
        setNotFound(false);
      } else {
        setOrder(null);
        setNotFound(true);
      }
    } else {
      setOrder(null);
      setNotFound(true);
    }
  };

  useEffect(() => {
    if (searchParams.get('order')) {
      searchOrder();
    }
  }, []);

  const getTrackingSteps = (status: string, orderDate?: string): TrackingStep[] => {
    const now = new Date();
    const orderTime = orderDate ? new Date(orderDate) : now;
    const processingTime = new Date(orderTime.getTime() + 2 * 60 * 60 * 1000);
    const packagingTime = new Date(orderTime.getTime() + 24 * 60 * 60 * 1000);
    const shippingTime = new Date(orderTime.getTime() + 48 * 60 * 60 * 1000);
    const deliveryTime = new Date(orderTime.getTime() + 5 * 24 * 60 * 60 * 1000);

    const steps: TrackingStep[] = [
      {
        title: 'Заказ оформлен',
        description: 'Ваш заказ успешно принят в обработку',
        timestamp: orderTime.toLocaleString('ru-RU'),
        completed: true,
        icon: 'CheckCircle2'
      },
      {
        title: 'Обработка',
        description: 'Менеджер проверяет наличие товаров на складе',
        timestamp: processingTime.toLocaleString('ru-RU'),
        completed: status !== 'pending',
        icon: 'Clock'
      },
      {
        title: 'Сборка заказа',
        description: 'Комплектуем и упаковываем ваш заказ',
        timestamp: packagingTime.toLocaleString('ru-RU'),
        completed: status === 'shipped' || status === 'completed',
        icon: 'Package'
      },
      {
        title: 'Передан в доставку',
        description: 'Заказ передан курьерской службе',
        timestamp: shippingTime.toLocaleString('ru-RU'),
        completed: status === 'shipped' || status === 'completed',
        icon: 'Truck'
      },
      {
        title: 'Доставлен',
        description: 'Заказ успешно доставлен получателю',
        timestamp: deliveryTime.toLocaleString('ru-RU'),
        completed: status === 'completed',
        icon: 'Home'
      }
    ];

    return steps;
  };

  const getEstimatedDelivery = (orderDate?: string): string => {
    if (!orderDate) return 'Уточняется';
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { text: 'Ожидает обработки', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: 'Clock' };
      case 'processing':
        return { text: 'В обработке', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: 'Settings' };
      case 'shipped':
        return { text: 'В пути', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: 'Truck' };
      case 'completed':
        return { text: 'Доставлен', color: 'bg-green-100 text-green-800 border-green-200', icon: 'CheckCircle2' };
      case 'cancelled':
        return { text: 'Отменён', color: 'bg-red-100 text-red-800 border-red-200', icon: 'XCircle' };
      default:
        return { text: status, color: 'bg-gray-100 text-gray-800 border-gray-200', icon: 'Info' };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gradient">CYBERPUNK PC</Link>
          <div className="flex items-center gap-4">
            <Link to="/orders">
              <Button variant="outline" size="icon">
                <Icon name="Package" size={20} />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="outline" size="icon" className="border-gradient">
                <Icon name="ShoppingCart" size={20} />
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black mb-4 text-gradient">Отследить заказ</h1>
          <p className="text-muted-foreground mb-8">Узнайте, когда приедет ваш заказ</p>

          <Card className="p-6 mb-8">
            <Label htmlFor="orderNumber" className="text-base mb-2 block">Введите номер заказа</Label>
            <div className="flex gap-3">
              <Input
                id="orderNumber"
                placeholder="CPC-1234567890"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchOrder()}
                className="text-lg"
              />
              <Button onClick={searchOrder} size="lg">
                <Icon name="Search" size={18} className="mr-2" />
                Найти
              </Button>
            </div>
          </Card>

          {notFound && (
            <Card className="p-8 text-center border-red-200 bg-red-50/50">
              <Icon name="AlertCircle" size={64} className="mx-auto text-red-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Заказ не найден</h2>
              <p className="text-muted-foreground mb-6">
                Проверьте правильность номера заказа. Номер можно найти в email с подтверждением.
              </p>
              <Link to="/orders">
                <Button variant="outline">
                  <Icon name="Package" size={18} className="mr-2" />
                  Посмотреть все заказы
                </Button>
              </Link>
            </Card>
          )}

          {order && (
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Заказ #{order.orderNumber}</h2>
                    {order.orderDate && (
                      <p className="text-sm text-muted-foreground">
                        Оформлен {new Date(order.orderDate).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusInfo(order.status).color} flex items-center gap-2`}>
                    <Icon name={getStatusInfo(order.status).icon} size={16} />
                    {getStatusInfo(order.status).text}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Icon name="Calendar" size={20} className="text-blue-600 mt-1" />
                      <div>
                        <p className="font-semibold text-blue-900">Ожидаемая доставка</p>
                        <p className="text-blue-700">{getEstimatedDelivery(order.orderDate)}</p>
                        {order.status === 'completed' && (
                          <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                            <Icon name="CheckCircle2" size={14} />
                            Заказ уже доставлен!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {(order.status === 'shipped' || order.status === 'completed') && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Icon name="MessageCircle" size={20} className="text-green-600 mt-1" />
                        <div className="flex-1">
                          <p className="font-semibold text-green-900 mb-2">Связь с курьером</p>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="flex-1 border-green-300 hover:bg-green-100"
                              onClick={() => window.open('https://wa.me/79991234567?text=Здравствуйте! Мой заказ ' + order.orderNumber, '_blank')}
                            >
                              <Icon name="MessageCircle" size={16} className="mr-1" />
                              WhatsApp
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="flex-1 border-green-300 hover:bg-green-100"
                              onClick={() => window.open('https://t.me/cyberpunk_delivery?start=' + order.orderNumber, '_blank')}
                            >
                              <Icon name="Send" size={16} className="mr-1" />
                              Telegram
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {getTrackingSteps(order.status, order.orderDate).map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? 'bg-green-100 border-2 border-green-500' 
                            : 'bg-gray-100 border-2 border-gray-300'
                        }`}>
                          <Icon 
                            name={step.icon} 
                            size={20} 
                            className={step.completed ? 'text-green-600' : 'text-gray-400'} 
                          />
                        </div>
                        {index < getTrackingSteps(order.status, order.orderDate).length - 1 && (
                          <div className={`w-0.5 h-16 ${
                            step.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <h3 className={`font-semibold mb-1 ${
                          step.completed ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-1">{step.description}</p>
                        {step.completed && (
                          <p className="text-xs text-green-600 flex items-center gap-1">
                            <Icon name="Check" size={12} />
                            {step.timestamp}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Icon name="MapPin" size={18} />
                    Адрес доставки
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{order.customer.firstName} {order.customer.lastName}</p>
                    <p className="text-muted-foreground">{order.delivery.city}, {order.delivery.postalCode}</p>
                    <p className="text-muted-foreground">{order.delivery.address}</p>
                    <p className="text-muted-foreground">{order.customer.phone}</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Icon name="ShoppingBag" size={18} />
                    Товары ({order.items.length})
                  </h3>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span className="font-medium">{item.price * item.quantity} ₽</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Итого:</span>
                        <span>{order.total === 0 ? 'Бесплатно' : `${order.total} ₽`}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-muted/30">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Info" size={18} />
                  Нужна помощь?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Если у вас возникли вопросы по заказу, свяжитесь с нами
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm">
                    <Icon name="Phone" size={16} className="mr-2" />
                    Позвонить
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Mail" size={16} className="mr-2" />
                    Написать
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Чат поддержки
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}