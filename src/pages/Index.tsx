import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

interface PCProduct {
  id: number;
  name: string;
  price: number;
  cpu: string;
  gpu: string;
  ram: number;
  storage: string;
  image: string;
  category: string;
}

const products: PCProduct[] = [
  {
    id: 1,
    name: 'ULTRA GAMING PRO',
    price: 250000,
    cpu: 'Intel Core i9-14900K',
    gpu: 'RTX 4090 24GB',
    ram: 64,
    storage: '2TB NVMe SSD',
    image: 'https://cdn.poehali.dev/projects/0e9e4d24-ce18-46db-b39f-bdbab26251c0/files/101f0504-6d45-4064-8cc9-65f17c481861.jpg',
    category: 'Сборки',
  },
  {
    id: 2,
    name: 'CYBER BEAST X',
    price: 180000,
    cpu: 'AMD Ryzen 9 7950X',
    gpu: 'RTX 4080 16GB',
    ram: 32,
    storage: '1TB NVMe SSD',
    image: 'https://cdn.poehali.dev/projects/0e9e4d24-ce18-46db-b39f-bdbab26251c0/files/64807d78-5f95-4792-a6ae-028f7f3fd541.jpg',
    category: 'Сборки',
  },
  {
    id: 3,
    name: 'RGB WARRIOR',
    price: 120000,
    cpu: 'Intel Core i7-14700K',
    gpu: 'RTX 4070 Ti 12GB',
    ram: 32,
    storage: '1TB NVMe SSD',
    image: 'https://cdn.poehali.dev/projects/0e9e4d24-ce18-46db-b39f-bdbab26251c0/files/90f463e9-6df3-43e8-90e8-8fde833cc296.jpg',
    category: 'Сборки',
  },
  {
    id: 4,
    name: 'STARTER GAMING',
    price: 80000,
    cpu: 'AMD Ryzen 5 7600X',
    gpu: 'RTX 4060 Ti 8GB',
    ram: 16,
    storage: '512GB NVMe SSD',
    image: 'https://cdn.poehali.dev/projects/0e9e4d24-ce18-46db-b39f-bdbab26251c0/files/101f0504-6d45-4064-8cc9-65f17c481861.jpg',
    category: 'Сборки',
  },
  {
    id: 5,
    name: 'PRO WORKSTATION',
    price: 200000,
    cpu: 'AMD Ryzen Threadripper',
    gpu: 'RTX 4080 16GB',
    ram: 128,
    storage: '4TB NVMe SSD',
    image: 'https://cdn.poehali.dev/projects/0e9e4d24-ce18-46db-b39f-bdbab26251c0/files/64807d78-5f95-4792-a6ae-028f7f3fd541.jpg',
    category: 'Сборки',
  },
  {
    id: 6,
    name: 'BUDGET GAMER',
    price: 60000,
    cpu: 'Intel Core i5-13400F',
    gpu: 'RTX 4060 8GB',
    ram: 16,
    storage: '512GB NVMe SSD',
    image: 'https://cdn.poehali.dev/projects/0e9e4d24-ce18-46db-b39f-bdbab26251c0/files/90f463e9-6df3-43e8-90e8-8fde833cc296.jpg',
    category: 'Сборки',
  },
];

const Index = () => {
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [selectedCPUs, setSelectedCPUs] = useState<string[]>([]);
  const [selectedGPUs, setSelectedGPUs] = useState<string[]>([]);
  const [selectedRAM, setSelectedRAM] = useState<number[]>([]);
  const [activeSection, setActiveSection] = useState('Главная');
  const { addToCart, totalItems } = useCart();
  const { toast } = useToast();

  const cpuOptions = ['Intel Core i9', 'Intel Core i7', 'Intel Core i5', 'AMD Ryzen 9', 'AMD Ryzen 7', 'AMD Ryzen 5', 'AMD Threadripper'];
  const gpuOptions = ['RTX 4090', 'RTX 4080', 'RTX 4070 Ti', 'RTX 4060 Ti', 'RTX 4060'];
  const ramOptions = [16, 32, 64, 128];

  const filteredProducts = products.filter((product) => {
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const cpuMatch = selectedCPUs.length === 0 || selectedCPUs.some((cpu) => product.cpu.includes(cpu));
    const gpuMatch = selectedGPUs.length === 0 || selectedGPUs.some((gpu) => product.gpu.includes(gpu));
    const ramMatch = selectedRAM.length === 0 || selectedRAM.includes(product.ram);
    return priceMatch && cpuMatch && gpuMatch && ramMatch;
  });

  const toggleFilter = (value: string | number, filters: any[], setFilters: Function) => {
    if (filters.includes(value)) {
      setFilters(filters.filter((item) => item !== value));
    } else {
      setFilters([...filters, value]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-lg bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center rgb-glow">
                <Icon name="Cpu" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gradient">CYBER SHOP</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              {['Главная', 'Каталог', 'Сборки', 'Комплектующие', 'Доставка', 'Гарантия', 'О нас'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
            <Link to="/cart">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 relative">
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                Корзина
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary rounded-full flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {activeSection === 'Главная' && (
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-pink-900/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="text-gradient">ИГРОВЫЕ</span>
                  <br />
                  <span className="text-white">КОМПЬЮТЕРЫ</span>
                  <br />
                  <span className="text-gradient">БУДУЩЕГО</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Собираем топовые конфигурации с RGB-подсветкой и максимальной производительностью для игр в 4K
                </p>
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8"
                    onClick={() => setActiveSection('Каталог')}
                  >
                    <Icon name="Zap" size={20} className="mr-2" />
                    Смотреть каталог
                  </Button>
                  <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600/10">
                    <Icon name="Settings" size={20} className="mr-2" />
                    Собрать ПК
                  </Button>
                </div>
                <div className="flex gap-8 pt-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient">500+</div>
                    <div className="text-sm text-muted-foreground">Сборок</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient">2000+</div>
                    <div className="text-sm text-muted-foreground">Клиентов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient">3 года</div>
                    <div className="text-sm text-muted-foreground">Гарантия</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-3xl opacity-30 animate-pulse"></div>
                <img
                  src="https://cdn.poehali.dev/projects/0e9e4d24-ce18-46db-b39f-bdbab26251c0/files/101f0504-6d45-4064-8cc9-65f17c481861.jpg"
                  alt="Gaming PC"
                  className="relative rounded-xl rgb-glow"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {(activeSection === 'Каталог' || activeSection === 'Сборки') && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-8">
              <Card className="lg:col-span-1 bg-card border-border/50 h-fit sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="SlidersHorizontal" size={20} />
                    Фильтры
                  </CardTitle>
                  <CardDescription>Настройте параметры поиска</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-4 block">
                      Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={300000}
                      step={10000}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Процессор</label>
                    <div className="space-y-2">
                      {cpuOptions.map((cpu) => (
                        <div key={cpu} className="flex items-center space-x-2">
                          <Checkbox
                            id={cpu}
                            checked={selectedCPUs.includes(cpu)}
                            onCheckedChange={() => toggleFilter(cpu, selectedCPUs, setSelectedCPUs)}
                          />
                          <label htmlFor={cpu} className="text-sm cursor-pointer">
                            {cpu}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Видеокарта</label>
                    <div className="space-y-2">
                      {gpuOptions.map((gpu) => (
                        <div key={gpu} className="flex items-center space-x-2">
                          <Checkbox
                            id={gpu}
                            checked={selectedGPUs.includes(gpu)}
                            onCheckedChange={() => toggleFilter(gpu, selectedGPUs, setSelectedGPUs)}
                          />
                          <label htmlFor={gpu} className="text-sm cursor-pointer">
                            {gpu}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Оперативная память</label>
                    <div className="space-y-2">
                      {ramOptions.map((ram) => (
                        <div key={ram} className="flex items-center space-x-2">
                          <Checkbox
                            id={`ram-${ram}`}
                            checked={selectedRAM.includes(ram)}
                            onCheckedChange={() => toggleFilter(ram, selectedRAM, setSelectedRAM)}
                          />
                          <label htmlFor={`ram-${ram}`} className="text-sm cursor-pointer">
                            {ram} GB
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setPriceRange([0, 300000]);
                      setSelectedCPUs([]);
                      setSelectedGPUs([]);
                      setSelectedRAM([]);
                    }}
                  >
                    Сбросить фильтры
                  </Button>
                </CardContent>
              </Card>

              <div className="lg:col-span-3 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">
                    <span className="text-gradient">Каталог</span> компьютеров
                  </h2>
                  <Badge variant="secondary" className="text-sm">
                    Найдено: {filteredProducts.length}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="bg-card border-border/50 hover:border-purple-600/50 transition-all duration-300 group overflow-hidden"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600">
                          <Icon name="Zap" size={12} className="mr-1" />
                          RGB
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl group-hover:text-gradient transition-all">
                          {product.name}
                        </CardTitle>
                        <div className="text-2xl font-bold text-gradient">{product.price.toLocaleString()} ₽</div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Icon name="Cpu" size={16} className="text-purple-600" />
                            <span className="text-muted-foreground">{product.cpu}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="MonitorPlay" size={16} className="text-pink-600" />
                            <span className="text-muted-foreground">{product.gpu}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="MemoryStick" size={16} className="text-cyan-600" />
                            <span className="text-muted-foreground">{product.ram} GB RAM</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="HardDrive" size={16} className="text-green-600" />
                            <span className="text-muted-foreground">{product.storage}</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          onClick={() => {
                            addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image
                            });
                            toast({
                              title: "Добавлено в корзину",
                              description: product.name,
                            });
                          }}
                        >
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          В корзину
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'Комплектующие' && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">
              <span className="text-gradient">Комплектующие</span>
            </h2>
            <Tabs defaultValue="gpu" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="gpu">Видеокарты</TabsTrigger>
                <TabsTrigger value="cpu">Процессоры</TabsTrigger>
                <TabsTrigger value="ram">Память</TabsTrigger>
                <TabsTrigger value="storage">Накопители</TabsTrigger>
                <TabsTrigger value="cooling">Охлаждение</TabsTrigger>
              </TabsList>
              <TabsContent value="gpu" className="space-y-4">
                <div className="grid md:grid-cols-3 gap-6">
                  {['RTX 4090', 'RTX 4080', 'RTX 4070 Ti'].map((gpu, idx) => (
                    <Card key={gpu} className="bg-card border-border/50 hover:border-purple-600/50 transition-all">
                      <CardHeader>
                        <CardTitle>{gpu}</CardTitle>
                        <CardDescription>Топовая производительность в играх</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-gradient mb-4">
                          {(120000 - idx * 30000).toLocaleString()} ₽
                        </div>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">Купить</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}

      {activeSection === 'Доставка' && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">
              <span className="text-gradient">Доставка</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <Icon name="Truck" size={32} className="text-purple-600 mb-2" />
                  <CardTitle>Быстрая доставка</CardTitle>
                  <CardDescription>По Москве — 1-2 дня, по России — 3-7 дней</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <Icon name="PackageCheck" size={32} className="text-pink-600 mb-2" />
                  <CardTitle>Бесплатная сборка</CardTitle>
                  <CardDescription>Все ПК тестируются и собираются профессионалами</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <Icon name="Shield" size={32} className="text-cyan-600 mb-2" />
                  <CardTitle>Страхование</CardTitle>
                  <CardDescription>Полная защита при транспортировке</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'Гарантия' && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">
              <span className="text-gradient">Гарантия</span>
            </h2>
            <Card className="bg-card border-border/50">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Icon name="CheckCircle2" size={24} className="text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">3 года гарантии</h3>
                    <p className="text-muted-foreground">На все компьютеры и комплектующие</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="CheckCircle2" size={24} className="text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Бесплатный ремонт</h3>
                    <p className="text-muted-foreground">Устраним любые неисправности за наш счет</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="CheckCircle2" size={24} className="text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Техподдержка 24/7</h3>
                    <p className="text-muted-foreground">Консультации и помощь в любое время</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {activeSection === 'О нас' && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">
              <span className="text-gradient">О нас</span>
            </h2>
            <Card className="bg-card border-border/50">
              <CardContent className="pt-6">
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  CYBER SHOP — это команда профессионалов, которая собирает топовые игровые компьютеры с 2020 года. Мы
                  используем только проверенные комплектующие от ведущих производителей и тестируем каждую сборку перед
                  отправкой клиенту.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Наша цель — дать каждому геймеру возможность получить мощный ПК с RGB-подсветкой и максимальной
                  производительностью для игр в 4K и стриминга.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <footer className="border-t border-border/50 mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 CYBER SHOP. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;