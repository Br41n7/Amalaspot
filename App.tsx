
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { DishCard } from './components/DishCard';
import { Cart } from './components/Cart';
import { AboutChef } from './components/AboutChef';
import { DISHES, CHEFS_SPECIALS, CURRENCY, WHATSAPP_NUMBER } from './constants';
import { Dish, CartItem, Category } from './types';
import { ChefHat, Search, ArrowRight, ExternalLink, Sparkles, ShoppingBag, AlertTriangle, X, Check, Star, Utensils, MessageCircle, Send, Flame, TrendingDown, TrendingUp } from 'lucide-react';
import { getDishFunFact } from './services/geminiService';

const CATEGORIES: Category[] = ['All', 'Swallow', 'Rice', 'Soups', 'Sides', 'Drinks'];

const PriceChangeModal: React.FC<{ 
  dish: Dish; 
  oldPrice: number; 
  onConfirm: () => void; 
  onCancel: () => void;
}> = ({ dish, oldPrice, onConfirm, onCancel }) => {
  const isDiscount = dish.price < oldPrice;
  
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl animate-scale-up">
        <div className={`${isDiscount ? 'bg-emerald-600' : 'bg-orange-500'} p-6 text-white flex items-center gap-4`}>
          <div className="bg-white/20 p-3 rounded-2xl">
            {isDiscount ? <TrendingDown size={32} /> : <AlertTriangle size={32} />}
          </div>
          <div>
            <h3 className="text-xl font-bold">{isDiscount ? 'Good News!' : 'Price Updated'}</h3>
            <p className="text-white/80 text-sm">{isDiscount ? 'Enjoy a lower price' : 'Market rates have changed'}</p>
          </div>
        </div>
        <div className="p-8">
          <p className="text-stone-600 mb-6">
            The price for <span className="font-bold text-stone-900">{dish.name}</span> has changed since you first viewed it.
          </p>
          <div className={`flex items-center justify-between p-4 rounded-2xl mb-8 border ${isDiscount ? 'bg-emerald-50 border-emerald-100' : 'bg-stone-50 border-stone-100'}`}>
            <div className="text-center">
              <span className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Was</span>
              <span className="text-lg font-bold text-stone-400 line-through">{CURRENCY}{oldPrice.toLocaleString()}</span>
            </div>
            <ArrowRight className="text-stone-300" />
            <div className="text-center">
              <span className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${isDiscount ? 'text-emerald-600' : 'text-orange-600'}`}>Now</span>
              <span className={`text-2xl font-black ${isDiscount ? 'text-emerald-600' : 'text-orange-600'}`}>{CURRENCY}{dish.price.toLocaleString()}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={onCancel}
              className="py-4 rounded-xl font-bold text-stone-500 hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
            >
              <X size={18} /> Cancel
            </button>
            <button 
              onClick={onConfirm}
              className={`py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${isDiscount ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100' : 'bg-orange-600 hover:bg-orange-700 shadow-orange-100'}`}
            >
              <Check size={18} /> Confirm
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-up { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-scale-up { animation: scale-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>
    </div>
  );
};

const FeaturedDish: React.FC<{ dish: Dish; onAddToCart: (dish: Dish, viewedPrice: number) => void }> = ({ dish, onAddToCart }) => {
  const [funFact, setFunFact] = useState<string>('');

  useEffect(() => {
    getDishFunFact(dish.name).then(setFunFact);
  }, [dish.name]);

  const handleQuickWhatsApp = () => {
    const message = `*FEATURED ORDER - Amala Spot*\n\nI want to order the Dish of the Week:\n• 1x ${dish.name} (${CURRENCY}${dish.price.toLocaleString()})\n\nPlease let me know how to pay!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-orange-600 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-orange-200 text-white">
        <div className="grid lg:grid-cols-2 items-center">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Sparkles size={16} />
              FEATURED DISH OF THE WEEK
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-black mb-6 leading-tight">
              {dish.name}
            </h2>
            <p className="text-orange-100 text-lg mb-8 leading-relaxed">
              {dish.description}
            </p>
            
            {funFact && (
              <div className="mb-8 p-4 bg-white/10 rounded-2xl border border-white/20">
                <p className="text-sm italic opacity-90">" {funFact} "</p>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onAddToCart(dish, dish.price)}
                className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-stone-50 transition-all shadow-lg active:scale-95"
              >
                Add to Cart • {CURRENCY}{dish.price.toLocaleString()}
              </button>
              <button 
                onClick={handleQuickWhatsApp}
                className="bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#128C7E] transition-all shadow-lg active:scale-95"
              >
                WhatsApp Order <Send size={18} />
              </button>
            </div>
          </div>
          <div className="h-full min-h-[400px] relative">
            <img 
              src={dish.image} 
              alt={dish.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-transparent to-transparent hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'chef'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dishes, setDishes] = useState<Dish[]>(DISHES);
  const [pendingConfirmation, setPendingConfirmation] = useState<{ dish: Dish, oldPrice: number } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDishes(prev => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        return prev.map((d, i) => {
          if (i === randomIndex) {
            // Simulate realistic price fluctuation (+/- 500)
            const change = Math.random() > 0.5 ? 500 : -500;
            const newPrice = Math.max(500, d.price + change);
            return { ...d, price: newPrice };
          }
          return d;
        });
      });
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const featuredDish = useMemo(() => dishes.find(d => d.isFeatured) || dishes[0], [dishes]);

  const filteredDishes = useMemo(() => {
    return dishes.filter(dish => {
      const matchesCategory = activeCategory === 'All' || dish.category === activeCategory;
      const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            dish.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, dishes]);

  const addToCart = (dish: Dish, viewedPrice: number) => {
    // Check if it's a special dish first
    const isSpecial = CHEFS_SPECIALS.find(d => d.id === dish.id);
    const currentDish = isSpecial || dishes.find(d => d.id === dish.id);
    
    if (!currentDish) return;

    // Detect if the price has changed since the user first saw the card
    if (currentDish.price !== viewedPrice) {
      setPendingConfirmation({ dish: currentDish, oldPrice: viewedPrice });
      return;
    }

    executeAddToCart(currentDish);
  };

  const executeAddToCart = (dish: Dish) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        return prev.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1, price: dish.price } : item);
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-orange-100 selection:text-orange-900">
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onNavigateHome={() => setCurrentView('home')}
        onNavigateChef={() => setCurrentView('chef')}
      />

      {currentView === 'chef' ? (
        <AboutChef onBack={() => setCurrentView('home')} />
      ) : (
        <>
          {/* Hero Section */}
          <header className="relative py-20 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative z-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                  <ChefHat size={18} />
                  AUTHENTIC AFRICAN KITCHEN
                </div>
                <h1 className="text-5xl md:text-7xl font-serif font-black text-stone-900 leading-[1.1] mb-8">
                  Experience the Best <span className="text-orange-600">Amala</span> in Town.
                </h1>
                <p className="text-xl text-stone-600 mb-10 max-w-lg mx-auto lg:mx-0">
                  From our famous Amala & Ewedu to the comforting stretch of Pounded Yam, Amala Spot brings authentic flavors straight to your table via WhatsApp.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="#menu" className="bg-stone-900 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-stone-200">
                    Explore Menu <ArrowRight size={20} />
                  </a>
                  <button 
                    onClick={() => {
                        const msg = encodeURIComponent("Hello! I'd like to make an inquiry about your catering services.");
                        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
                    }}
                    className="bg-white text-stone-900 border border-stone-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
                  >
                    Chat With Us <MessageCircle size={20} className="text-[#25D366]" />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -top-12 -left-12 w-64 h-64 bg-orange-200/50 rounded-full blur-3xl" />
                <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-amber-200/50 rounded-full blur-3xl" />
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                  <img 
                    src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1200" 
                    alt="Featured Dish" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-white shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#25D366] p-2 rounded-lg text-white">
                        <WhatsAppIcon size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900">Ordering is Easy</h4>
                        <p className="text-sm text-stone-600">Checkout in seconds via WhatsApp</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <FeaturedDish dish={featuredDish} onAddToCart={addToCart} />

          {/* Chef's Specials Section */}
          <section className="bg-stone-900 py-24 my-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <div className="h-px w-12 bg-orange-500" />
                <span className="text-orange-500 font-bold uppercase tracking-[0.2em] text-sm">Signature Crafts</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-black text-white mb-16 text-center md:text-left">
                Chef's <span className="text-orange-500">Specials</span>
              </h2>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {CHEFS_SPECIALS.map(dish => (
                  <div key={dish.id} className="group relative bg-stone-800/50 rounded-[2.5rem] p-4 border border-stone-700 hover:border-orange-500/50 transition-all duration-500">
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6">
                      <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Flame size={14} /> EXCLUSIVE
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-2xl font-bold text-white leading-tight">{dish.name}</h3>
                        <span className="text-xl font-black text-orange-500">{CURRENCY}{dish.price.toLocaleString()}</span>
                      </div>
                      <p className="text-stone-400 text-sm mb-8 leading-relaxed">
                        {dish.description}
                      </p>
                      <button 
                        onClick={() => addToCart(dish, dish.price)}
                        className="w-full py-4 bg-orange-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-500 transition-all active:scale-95 shadow-lg shadow-orange-900/20"
                      >
                        <ShoppingBag size={20} />
                        Add Special to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <main id="menu" className="max-w-7xl mx-auto px-4 py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
              <div>
                <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Our Signature Menu</h2>
                <p className="text-stone-500">Carefully curated dishes from across the continent.</p>
              </div>

              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search dishes..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-stone-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                    activeCategory === cat 
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-100' 
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-orange-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filteredDishes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredDishes.map(dish => (
                  <DishCard key={dish.id} dish={dish} onAddToCart={addToCart} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-stone-200">
                <div className="mb-4 text-stone-300 flex justify-center">
                  <Utensils size={64} />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">No dishes found</h3>
                <p className="text-stone-500">Try adjusting your search or category filters.</p>
                <button 
                  onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
                  className="mt-6 text-orange-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </>
      )}

      {/* Why Choose Us */}
      <section className="bg-stone-900 text-white py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Why Amala Spot?</h2>
            <p className="text-stone-400">Authentic flavors meet modern convenience.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Home-Grown Ingredients', desc: 'We source our spices and grains directly from local markets in West Africa.', icon: '🌿' },
              { title: 'Heritage Recipes', desc: 'Passed down through generations, our methods preserve the soul of the dish.', icon: '🥘' },
              { title: 'WhatsApp Orders', desc: 'Direct communication for custom orders and real-time delivery tracking.', icon: '💬' }
            ].map((item, i) => (
              <div key={i} className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-5xl mb-6">{item.icon}</div>
                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                <p className="text-stone-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="bg-orange-600 p-1 rounded text-white">
              <Utensils size={18} />
            </div>
            <button onClick={() => setCurrentView('home')} className="text-xl font-serif font-black text-stone-900 hover:text-orange-600 transition-colors">
              Amala<span className="text-orange-600">Spot</span>
            </button>
          </div>
          <p className="text-stone-500 text-sm mb-8">© 2024 Amala Spot. Bringing the pride of Africa to your plate.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-stone-400 hover:text-stone-900 transition-colors">Instagram</a>
            <a href="#" className="text-stone-400 hover:text-stone-900 transition-colors">Twitter</a>
            <a href="#" className="text-stone-400 hover:text-stone-900 transition-colors">Facebook</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp FAB */}
      <button 
        onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] hover:scale-110 transition-all active:scale-95 group"
      >
        <WhatsAppIcon size={28} />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-stone-900 px-3 py-1 rounded-lg text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-stone-100">
          Chat with us!
        </span>
      </button>

      {/* Modals */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />

      {pendingConfirmation && (
        <PriceChangeModal 
          dish={pendingConfirmation.dish}
          oldPrice={pendingConfirmation.oldPrice}
          onConfirm={() => {
            executeAddToCart(pendingConfirmation.dish);
            setPendingConfirmation(null);
          }}
          onCancel={() => setPendingConfirmation(null)}
        />
      )}
    </div>
  );
};

const WhatsAppIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default App;
