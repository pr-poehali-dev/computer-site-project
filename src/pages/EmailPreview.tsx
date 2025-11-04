import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export default function EmailPreview() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const sampleOrder = {
    orderNumber: 'CPC-1234567890',
    total: 150000,
    items: [
      { name: 'ULTRA GAMING PRO', quantity: 1, price: 150000 }
    ],
    customer: {
      firstName: 'Иван',
      lastName: 'Иванов',
      email: 'test@example.com',
      phone: '+7 999 123-45-67'
    },
    delivery: {
      city: 'Москва',
      address: 'ул. Тверская, д. 10',
      postalCode: '125009'
    },
    paymentMethod: 'card',
    status: 'processing'
  };

  const sendTestEmail = async (type: string, status?: string) => {
    setLoading(true);
    const testOrder = status ? { ...sampleOrder, status } : sampleOrder;
    
    try {
      const response = await fetch('https://functions.poehali.dev/076bb0f4-1196-4218-a71b-038068639d52', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          order: testOrder
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: 'Письмо сгенерировано!',
          description: result.message || 'Email успешно создан'
        });
      } else {
        toast({
          title: 'Ошибка',
          description: result.error || 'Не удалось отправить письмо',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить письмо',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gradient">CYBERPUNK PC</Link>
          <Link to="/orders">
            <Button variant="outline">
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Button>
          </Link>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black mb-4 text-gradient">Email уведомления</h1>
          <p className="text-muted-foreground mb-8">Просмотр и тестирование писем</p>

          <Tabs defaultValue="confirmation" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="confirmation">Подтверждение заказа</TabsTrigger>
              <TabsTrigger value="updates">Обновления статуса</TabsTrigger>
            </TabsList>

            <TabsContent value="confirmation" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Mail" size={24} />
                  Подтверждение заказа
                </h2>
                <p className="text-muted-foreground mb-6">
                  Это письмо отправляется покупателю сразу после оформления заказа
                </p>

                <div className="bg-muted/50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold mb-3">Письмо содержит:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="mt-0.5 text-green-600" />
                      <span>Номер заказа и дату оформления</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="mt-0.5 text-green-600" />
                      <span>Список всех товаров с ценами</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="mt-0.5 text-green-600" />
                      <span>Примененные промокоды и скидки</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="mt-0.5 text-green-600" />
                      <span>Адрес доставки и способ оплаты</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="mt-0.5 text-green-600" />
                      <span>Ожидаемую дату доставки</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="mt-0.5 text-green-600" />
                      <span>Кнопку отслеживания заказа</span>
                    </li>
                  </ul>
                </div>

                <Button 
                  onClick={() => sendTestEmail('order_confirmation')} 
                  disabled={loading}
                  size="lg"
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                      Генерация...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={18} className="mr-2" />
                      Тестовое письмо подтверждения
                    </>
                  )}
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="updates" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Bell" size={24} />
                  Обновления статуса заказа
                </h2>
                <p className="text-muted-foreground mb-6">
                  Эти письма информируют покупателя о текущем статусе заказа
                </p>

                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          <Icon name="Clock" size={18} className="text-blue-600" />
                          В обработке
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Заказ принят и проверяется менеджером
                        </p>
                      </div>
                      <Button 
                        onClick={() => sendTestEmail('status_update', 'processing')}
                        disabled={loading}
                        size="sm"
                        variant="outline"
                      >
                        <Icon name="Send" size={16} className="mr-2" />
                        Тест
                      </Button>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          <Icon name="Truck" size={18} className="text-purple-600" />
                          Отправлен
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Заказ передан в доставку
                        </p>
                      </div>
                      <Button 
                        onClick={() => sendTestEmail('status_update', 'shipped')}
                        disabled={loading}
                        size="sm"
                        variant="outline"
                      >
                        <Icon name="Send" size={16} className="mr-2" />
                        Тест
                      </Button>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          <Icon name="CheckCircle2" size={18} className="text-green-600" />
                          Доставлен
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Заказ успешно доставлен
                        </p>
                      </div>
                      <Button 
                        onClick={() => sendTestEmail('status_update', 'completed')}
                        disabled={loading}
                        size="sm"
                        variant="outline"
                      >
                        <Icon name="Send" size={16} className="mr-2" />
                        Тест
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-blue-50 border-blue-200">
                <div className="flex items-start gap-3">
                  <Icon name="Info" size={20} className="text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Автоматическая отправка</h3>
                    <p className="text-sm text-blue-800">
                      В реальном магазине эти письма отправляются автоматически при изменении статуса заказа. 
                      Здесь вы можете протестировать как они выглядят.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
