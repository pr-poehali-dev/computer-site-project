import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
  paymentMethod: string;
  appliedPromo?: {
    code: string;
    discount: number;
  } | null;
  orderDate?: string;
  status: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orderHistory');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Доставлен';
      case 'processing':
        return 'В обработке';
      case 'pending':
        return 'Ожидает';
      case 'cancelled':
        return 'Отменён';
      default:
        return status;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'card':
        return 'Банковская карта';
      case 'cash':
        return 'Наличные';
      case 'sbp':
        return 'СБП';
      default:
        return method;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gradient">CYBERPUNK PC</Link>
          <div className="flex items-center gap-4">
            <Link to="/cart">
              <Button variant="outline" size="icon" className="border-gradient">
                <Icon name="ShoppingCart" size={20} />
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-black mb-4 text-gradient">Мои заказы</h1>
          <p className="text-muted-foreground">История всех ваших заказов в одном месте</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Icon name="Package" size={80} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">У вас пока нет заказов</h2>
            <p className="text-muted-foreground mb-8">Начните покупки, чтобы увидеть историю заказов</p>
            <Link to="/catalog">
              <Button size="lg">
                <Icon name="ShoppingBag" size={18} className="mr-2" />
                Перейти в каталог
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <Card key={index} className="p-6 border-border/50 hover:border-primary/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">Заказ #{order.orderNumber}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    {order.orderDate && (
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.orderDate).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{order.total === 0 ? 'Бесплатно' : `${order.total} ₽`}</p>
                    {order.appliedPromo && (
                      <p className="text-sm text-green-600 flex items-center gap-1 justify-end">
                        <Icon name="Ticket" size={14} />
                        Промокод -{order.appliedPromo.discount}%
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                      <Icon name="ShoppingBag" size={16} />
                      Товары ({order.items.length})
                    </h4>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {item.name} × {item.quantity}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                      <Icon name="MapPin" size={16} />
                      Доставка
                    </h4>
                    <p className="text-sm text-muted-foreground">{order.delivery.city}</p>
                    <p className="text-sm text-muted-foreground">{order.delivery.address}</p>
                    <p className="text-sm text-muted-foreground">{order.delivery.postalCode}</p>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                      <Icon name="CreditCard" size={16} />
                      Оплата
                    </h4>
                    <p className="text-sm text-muted-foreground">{getPaymentMethodText(order.paymentMethod)}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {order.customer.firstName} {order.customer.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-border/50">
                  <Link to={`/track-order?order=${order.orderNumber}`}>
                    <Button variant="default" size="sm">
                      <Icon name="MapPin" size={16} className="mr-2" />
                      Отследить заказ
                    </Button>
                  </Link>
                  {(order.status === 'shipped' || order.status === 'completed') && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-green-300 hover:bg-green-50"
                        onClick={() => window.open('https://wa.me/79991234567?text=Здравствуйте! Мой заказ ' + order.orderNumber, '_blank')}
                      >
                        <Icon name="MessageCircle" size={16} className="mr-2" />
                        WhatsApp курьера
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-blue-300 hover:bg-blue-50"
                        onClick={() => window.open('https://t.me/cyberpunk_delivery?start=' + order.orderNumber, '_blank')}
                      >
                        <Icon name="Send" size={16} className="mr-2" />
                        Telegram курьера
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="sm">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать чек
                  </Button>
                  {order.status === 'completed' && (
                    <Button variant="outline" size="sm">
                      <Icon name="RefreshCw" size={16} className="mr-2" />
                      Повторить заказ
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}