import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Delivery = () => {
  const { totalItems } = useCart();
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gradient">CYBERPUNK PC</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/catalog" className="text-foreground/80 hover:text-primary transition-colors">Каталог</Link>
            <Link to="/builds" className="text-foreground/80 hover:text-primary transition-colors">Сборки</Link>
            <Link to="/components" className="text-foreground/80 hover:text-primary transition-colors">Комплектующие</Link>
            <Link to="/delivery" className="text-primary font-semibold">Доставка</Link>
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
        <h1 className="text-5xl font-black mb-4 text-gradient">Доставка</h1>
        <p className="text-xl text-foreground/70 mb-12">Быстрая и надежная доставка по всей России</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="border border-border bg-card rounded-lg p-8 text-center">
            <Icon name="Truck" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">По Москве</h3>
            <p className="text-4xl font-black text-gradient mb-2">1 день</p>
            <p className="text-foreground/60">Бесплатно от 30 000 ₽</p>
          </div>

          <div className="border border-border bg-card rounded-lg p-8 text-center">
            <Icon name="Plane" size={48} className="text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">По России</h3>
            <p className="text-4xl font-black text-gradient mb-2">2-5 дней</p>
            <p className="text-foreground/60">Бесплатно от 50 000 ₽</p>
          </div>

          <div className="border border-border bg-card rounded-lg p-8 text-center">
            <Icon name="Package" size={48} className="text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Самовывоз</h3>
            <p className="text-4xl font-black text-gradient mb-2">Сегодня</p>
            <p className="text-foreground/60">Всегда бесплатно</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="border border-border bg-card rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Icon name="MapPin" size={32} className="text-primary" />
              Способы доставки
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Icon name="Check" size={24} className="text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold mb-2">Курьерская доставка</h4>
                  <p className="text-foreground/70">Доставим заказ по указанному адресу в удобное время. Курьер позвонит за час до прибытия.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Icon name="Check" size={24} className="text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold mb-2">Пункты выдачи</h4>
                  <p className="text-foreground/70">Более 2000 пунктов выдачи по всей России. Можете забрать заказ в любое удобное время.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Icon name="Check" size={24} className="text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold mb-2">Транспортные компании</h4>
                  <p className="text-foreground/70">Отправка крупногабаритных заказов транспортными компаниями СДЭК, Boxberry, DPD.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-border bg-card rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Icon name="Shield" size={32} className="text-primary" />
              Гарантии при доставке
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <Icon name="PackageCheck" size={24} className="text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">Надежная упаковка</h4>
                  <p className="text-sm text-foreground/70">Специальная упаковка для безопасной транспортировки</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Icon name="FileCheck" size={24} className="text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">Проверка при получении</h4>
                  <p className="text-sm text-foreground/70">Можете осмотреть товар до оплаты</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Icon name="Clock" size={24} className="text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">Отслеживание</h4>
                  <p className="text-sm text-foreground/70">Следите за статусом заказа в личном кабинете</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Icon name="RefreshCw" size={24} className="text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">Возврат 14 дней</h4>
                  <p className="text-sm text-foreground/70">Можете вернуть товар без объяснения причин</p>
                </div>
              </div>
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

export default Delivery;