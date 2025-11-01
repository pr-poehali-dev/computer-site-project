import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const categories = [
  { icon: 'Cpu', name: 'Процессоры', count: 45, description: 'Intel Core и AMD Ryzen последних поколений' },
  { icon: 'Layers', name: 'Видеокарты', count: 38, description: 'NVIDIA RTX 40 и AMD Radeon RX 7000 серии' },
  { icon: 'HardDrive', name: 'Оперативная память', count: 52, description: 'DDR4 и DDR5 от ведущих производителей' },
  { icon: 'Database', name: 'Накопители', count: 67, description: 'SSD NVMe Gen4/Gen5 и HDD большого объема' },
  { icon: 'Box', name: 'Материнские платы', count: 41, description: 'Intel Z790/B760 и AMD X670E/B650' },
  { icon: 'Fan', name: 'Охлаждение', count: 33, description: 'Водяное и воздушное охлаждение с RGB' },
  { icon: 'Zap', name: 'Блоки питания', count: 29, description: 'От 650W до 1600W с сертификатом 80+ Gold/Platinum' },
  { icon: 'Monitor', name: 'Мониторы', count: 55, description: 'От Full HD 144Hz до 4K 240Hz с HDR' },
  { icon: 'Keyboard', name: 'Периферия', count: 89, description: 'Игровые клавиатуры, мыши и гарнитуры' }
];

const Components = () => {
  const { totalItems } = useCart();
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gradient">CYBERPUNK PC</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/catalog" className="text-foreground/80 hover:text-primary transition-colors">Каталог</Link>
            <Link to="/builds" className="text-foreground/80 hover:text-primary transition-colors">Сборки</Link>
            <Link to="/components" className="text-primary font-semibold">Комплектующие</Link>
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
        <h1 className="text-5xl font-black mb-4 text-gradient">Комплектующие</h1>
        <p className="text-xl text-foreground/70 mb-12">Все необходимое для создания идеального игрового ПК</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.name} className="border border-border bg-card rounded-lg p-6 hover:border-primary transition-all group cursor-pointer">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
                  <Icon name={category.icon as any} size={32} className="text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                  <span className="text-sm text-foreground/60">{category.count} товаров</span>
                </div>
              </div>
              <p className="text-sm text-foreground/70">{category.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-border bg-card rounded-lg p-8">
            <Icon name="Wrench" size={40} className="text-secondary mb-4" />
            <h3 className="text-2xl font-bold mb-3">Бесплатная сборка</h3>
            <p className="text-foreground/70 mb-4">
              При заказе комплектующих на сумму от 50 000 ₽ мы соберем ваш ПК абсолютно бесплатно
            </p>
            <Button variant="outline">Узнать подробнее</Button>
          </div>

          <div className="border border-border bg-card rounded-lg p-8">
            <Icon name="MessageCircle" size={40} className="text-secondary mb-4" />
            <h3 className="text-2xl font-bold mb-3">Помощь в выборе</h3>
            <p className="text-foreground/70 mb-4">
              Не знаете что выбрать? Наши специалисты помогут подобрать оптимальную конфигурацию
            </p>
            <Button variant="outline">Получить консультацию</Button>
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

export default Components;