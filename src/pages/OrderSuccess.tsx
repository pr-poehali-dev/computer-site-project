import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('lastOrder');
    if (data) {
      setOrderData(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!orderData) {
    return null;
  }

  const { orderNumber, total, items, customer, delivery, paymentMethod, appliedPromo } = orderData;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="bg-card rounded-lg shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="CheckCircle2" size={48} className="text-green-600" />
          </div>

          <h1 className="text-3xl font-bold mb-2">Заказ оформлен!</h1>
          <p className="text-muted-foreground mb-8">
            Номер заказа: <span className="font-mono font-semibold text-foreground">#{orderNumber}</span>
          </p>

          <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="Package" size={20} />
              Детали заказа
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Icon name="ShoppingBag" size={16} />
                  Товары ({items.length})
                </h3>
                <div className="space-y-2">
                  {items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span className="font-medium">{item.price * item.quantity} ₽</span>
                    </div>
                  ))}
                </div>
              </div>

              {appliedPromo && (
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm text-green-600">
                    <span className="flex items-center gap-1">
                      <Icon name="Ticket" size={14} />
                      Промокод {appliedPromo.code}
                    </span>
                    <span>-{appliedPromo.discount}%</span>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого:</span>
                  <span>{total === 0 ? 'Бесплатно' : `${total} ₽`}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="User" size={18} />
                Контактные данные
              </h3>
              <div className="space-y-1 text-sm">
                <p>{customer.firstName} {customer.lastName}</p>
                <p className="text-muted-foreground">{customer.email}</p>
                <p className="text-muted-foreground">{customer.phone}</p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="MapPin" size={18} />
                Адрес доставки
              </h3>
              <div className="space-y-1 text-sm">
                <p>{delivery.city}, {delivery.postalCode}</p>
                <p>{delivery.address}</p>
                {delivery.apartment && <p>Кв/офис: {delivery.apartment}</p>}
                {delivery.entrance && <p>Подъезд: {delivery.entrance}</p>}
                {delivery.floor && <p>Этаж: {delivery.floor}</p>}
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 mb-8 text-left">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Icon name="CreditCard" size={18} />
              Способ оплаты
            </h3>
            <p className="text-sm">
              {paymentMethod === 'card' && 'Банковская карта'}
              {paymentMethod === 'cash' && 'Наличные при получении'}
              {paymentMethod === 'sbp' && 'СБП (Система быстрых платежей)'}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-900">
              <Icon name="Info" size={16} className="inline mr-2" />
              Мы отправили подтверждение заказа на email <strong>{customer.email}</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">
                <Icon name="Home" size={18} className="mr-2" />
                На главную
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/catalog">
                <Icon name="ShoppingBag" size={18} className="mr-2" />
                Продолжить покупки
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
