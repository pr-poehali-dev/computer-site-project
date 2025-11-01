import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const About = () => {
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
            <Link to="/delivery" className="text-foreground/80 hover:text-primary transition-colors">Доставка</Link>
            <Link to="/warranty" className="text-foreground/80 hover:text-primary transition-colors">Гарантия</Link>
            <Link to="/about" className="text-primary font-semibold">О нас</Link>
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
        <h1 className="text-5xl font-black mb-4 text-gradient">О нас</h1>
        <p className="text-xl text-foreground/70 mb-12">Создаем игровые компьютеры будущего с 2015 года</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="border border-border bg-card rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Наша миссия</h2>
            <p className="text-lg text-foreground/70 mb-4">
              Мы создаем мощные игровые компьютеры, которые раскрывают весь потенциал современных игр и профессиональных приложений.
            </p>
            <p className="text-lg text-foreground/70">
              Каждая наша сборка — это сочетание производительности, надежности и уникального дизайна с RGB-подсветкой.
            </p>
          </div>

          <div className="border border-border bg-card rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Почему выбирают нас?</h2>
            <div className="space-y-3">
              {[
                'Только оригинальные комплектующие',
                'Профессиональная сборка с тестированием',
                'Гарантия 3 года на все компоненты',
                'Техподдержка 24/7',
                'Индивидуальный подход к каждому клиенту'
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Icon name="Star" size={20} className="text-secondary flex-shrink-0 mt-1" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 border border-border bg-card rounded-lg">
            <p className="text-5xl font-black text-gradient mb-2">10+</p>
            <p className="text-foreground/60">Лет на рынке</p>
          </div>
          <div className="text-center p-6 border border-border bg-card rounded-lg">
            <p className="text-5xl font-black text-gradient mb-2">15k+</p>
            <p className="text-foreground/60">Довольных клиентов</p>
          </div>
          <div className="text-center p-6 border border-border bg-card rounded-lg">
            <p className="text-5xl font-black text-gradient mb-2">98%</p>
            <p className="text-foreground/60">Положительных отзывов</p>
          </div>
          <div className="text-center p-6 border border-border bg-card rounded-lg">
            <p className="text-5xl font-black text-gradient mb-2">24/7</p>
            <p className="text-foreground/60">Техподдержка</p>
          </div>
        </div>

        <div className="border border-border bg-card rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Наша команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Алексей Волков', role: 'Основатель и CEO', icon: '👨‍💼' },
              { name: 'Мария Петрова', role: 'Главный инженер', icon: '👩‍🔧' },
              { name: 'Дмитрий Смирнов', role: 'Руководитель поддержки', icon: '👨‍💻' }
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-6xl">
                  {member.icon}
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-foreground/60">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
          <Icon name="Mail" size={48} className="text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Свяжитесь с нами</h2>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Есть вопросы или хотите обсудить индивидуальную сборку? Мы всегда рады помочь!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Icon name="Phone" size={20} className="mr-2" />
              8-800-555-35-35
            </Button>
            <Button size="lg" variant="outline">
              <Icon name="Mail" size={20} className="mr-2" />
              info@cyberpunkpc.ru
            </Button>
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

export default About;