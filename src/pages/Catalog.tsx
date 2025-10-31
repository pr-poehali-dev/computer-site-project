import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const products = [
  { id: 1, name: 'CYBERPUNK ELITE', price: 299990, category: 'gaming', image: '🎮', specs: 'RTX 4090 | i9-14900K | 64GB DDR5' },
  { id: 2, name: 'RGB WARRIOR', price: 189990, category: 'gaming', image: '⚡', specs: 'RTX 4070 Ti | i7-14700K | 32GB DDR5' },
  { id: 3, name: 'NEON STORM', price: 129990, category: 'gaming', image: '🌟', specs: 'RTX 4060 Ti | i5-14600K | 32GB DDR5' },
  { id: 4, name: 'CYBER WORKSTATION', price: 249990, category: 'work', image: '💼', specs: 'RTX 4080 | Ryzen 9 7950X | 128GB DDR5' },
  { id: 5, name: 'STREAM MASTER', price: 169990, category: 'streaming', image: '📹', specs: 'RTX 4070 | Ryzen 7 7800X3D | 64GB DDR5' },
  { id: 6, name: 'BUDGET GAMER', price: 79990, category: 'gaming', image: '🎯', specs: 'RTX 4060 | i5-13600K | 16GB DDR5' }
];

const Catalog = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filteredProducts = products.filter(p => 
    (category === 'all' || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gradient">CYBERPUNK PC</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/catalog" className="text-primary font-semibold">Каталог</Link>
            <Link to="/builds" className="text-foreground/80 hover:text-primary transition-colors">Сборки</Link>
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
        <h1 className="text-5xl font-black mb-8 text-gradient">Каталог</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input 
            placeholder="Поиск компьютеров..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              <SelectItem value="gaming">Игровые</SelectItem>
              <SelectItem value="work">Рабочие станции</SelectItem>
              <SelectItem value="streaming">Для стриминга</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border border-border bg-card rounded-lg overflow-hidden hover:border-primary transition-all group">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-8xl">
                {product.image}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-foreground/60 mb-4 text-sm">{product.specs}</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gradient">{product.price.toLocaleString()} ₽</span>
                  <Button className="rgb-glow">
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </div>
              </div>
            </div>
          ))}
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

export default Catalog;
