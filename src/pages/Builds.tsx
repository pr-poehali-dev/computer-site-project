import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const builds = [
  { 
    id: 1, 
    name: 'НАЧАЛЬНЫЙ УРОВЕНЬ', 
    price: 79990, 
    image: '🎯',
    components: [
      'Intel Core i5-13600K',
      'NVIDIA RTX 4060 8GB',
      '16GB DDR5 5600MHz',
      'SSD 512GB NVMe',
      'БП 650W 80+ Gold'
    ]
  },
  { 
    id: 2, 
    name: 'СРЕДНИЙ УРОВЕНЬ', 
    price: 149990, 
    image: '⚡',
    components: [
      'Intel Core i7-14700K',
      'NVIDIA RTX 4070 Ti 12GB',
      '32GB DDR5 6000MHz',
      'SSD 1TB NVMe Gen4',
      'БП 850W 80+ Gold'
    ]
  },
  { 
    id: 3, 
    name: 'ТОПОВАЯ СБОРКА', 
    price: 299990, 
    image: '🎮',
    components: [
      'Intel Core i9-14900K',
      'NVIDIA RTX 4090 24GB',
      '64GB DDR5 6400MHz',
      'SSD 2TB NVMe Gen4',
      'БП 1200W 80+ Platinum'
    ]
  }
];

const Builds = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gradient">CYBERPUNK PC</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/catalog" className="text-foreground/80 hover:text-primary transition-colors">Каталог</Link>
            <Link to="/builds" className="text-primary font-semibold">Сборки</Link>
            <Link to="/components" className="text-foreground/80 hover:text-primary transition-colors">Комплектующие</Link>
            <Link to="/delivery" className="text-foreground/80 hover:text-primary transition-colors">Доставка</Link>
            <Link to="/warranty" className="text-foreground/80 hover:text-primary transition-colors">Гарантия</Link>
            <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors">О нас</Link>
          </div>
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative border-gradient">
              <Icon name="ShoppingCart" size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary rounded-full flex items-center justify-center text-xs">0</span>
            </Button>
          </Link>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-black mb-4 text-gradient">Готовые сборки</h1>
        <p className="text-xl text-foreground/70 mb-12">Профессионально собранные игровые ПК под любой бюджет</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {builds.map((build) => (
            <div key={build.id} className="border border-border bg-card rounded-lg overflow-hidden hover:border-primary transition-all group">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-9xl">
                {build.image}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{build.name}</h3>
                <div className="space-y-2 mb-6">
                  {build.components.map((component, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-foreground/70">
                      <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{component}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gradient">{build.price.toLocaleString()} ₽</span>
                  <Button className="rgb-glow">
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Купить
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border border-border bg-card/50 rounded-lg p-8 text-center">
          <Icon name="Sparkles" size={48} className="text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Индивидуальная сборка</h2>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Не нашли подходящую конфигурацию? Создайте свою уникальную сборку с нашими специалистами
          </p>
          <Link to="/components">
            <Button size="lg" className="text-lg px-8">
              Собрать свой ПК
            </Button>
          </Link>
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

export default Builds;
