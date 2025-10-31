import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const Warranty = () => {
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
            <Link to="/warranty" className="text-primary font-semibold">Гарантия</Link>
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
        <h1 className="text-5xl font-black mb-4 text-gradient">Гарантия</h1>
        <p className="text-xl text-foreground/70 mb-12">Мы уверены в качестве наших компьютеров</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="border border-border bg-card rounded-lg p-8 text-center">
            <Icon name="Shield" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Гарантия</h3>
            <p className="text-5xl font-black text-gradient mb-2">3 года</p>
            <p className="text-foreground/60">На все комплектующие</p>
          </div>

          <div className="border border-border bg-card rounded-lg p-8 text-center">
            <Icon name="Wrench" size={48} className="text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Ремонт</h3>
            <p className="text-5xl font-black text-gradient mb-2">24 часа</p>
            <p className="text-foreground/60">Средний срок ремонта</p>
          </div>

          <div className="border border-border bg-card rounded-lg p-8 text-center">
            <Icon name="RefreshCw" size={48} className="text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Замена</h3>
            <p className="text-5xl font-black text-gradient mb-2">100%</p>
            <p className="text-foreground/60">При невозможности ремонта</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="border border-border bg-card rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Что входит в гарантию?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Бесплатный ремонт всех комплектующих',
                'Замена неисправных компонентов',
                'Бесплатная диагностика проблем',
                'Консультации по эксплуатации',
                'Обновление драйверов и ПО',
                'Чистка от пыли (раз в год)'
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={24} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border bg-card rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Как воспользоваться гарантией?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Свяжитесь с нами</h4>
                  <p className="text-foreground/70">Позвоните по телефону или напишите в чат. Опишите проблему нашему специалисту.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Доставьте ПК в сервис</h4>
                  <p className="text-foreground/70">Привезите компьютер в наш сервисный центр или отправьте курьером за наш счет.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Получите отремонтированный ПК</h4>
                  <p className="text-foreground/70">Мы проведем диагностику, устраним проблему и вернем вам исправный компьютер.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8">
            <div className="flex items-start gap-6">
              <Icon name="Headphones" size={48} className="text-primary flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-3">Техническая поддержка 24/7</h3>
                <p className="text-foreground/70 mb-4">
                  Наши специалисты всегда готовы помочь с любыми вопросами по эксплуатации и настройке вашего компьютера
                </p>
                <div className="flex gap-4">
                  <Button size="lg">
                    <Icon name="Phone" size={20} className="mr-2" />
                    8-800-555-35-35
                  </Button>
                  <Button size="lg" variant="outline">
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    Написать в чат
                  </Button>
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

export default Warranty;
