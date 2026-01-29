
import React from 'react';
import { ShoppingBag, Utensils, Heart } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateHome: () => void;
  onNavigateChef: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onNavigateHome, onNavigateChef }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <button onClick={onNavigateHome} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-orange-600 p-2 rounded-xl text-white shadow-lg shadow-orange-200">
            <Utensils size={24} />
          </div>
          <span className="text-2xl font-serif font-black tracking-tight text-stone-900">
            Amala<span className="text-orange-600">Spot</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8 font-medium text-stone-600">
          <button onClick={onNavigateHome} className="hover:text-orange-600 transition-colors">Home</button>
          <a href="#menu" className="hover:text-orange-600 transition-colors">Menu</a>
          <button onClick={onNavigateChef} className="hover:text-orange-600 transition-colors">The Chef</button>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-stone-400 hover:text-orange-600 transition-colors">
            <Heart size={24} />
          </button>
          <button 
            onClick={onOpenCart}
            className="relative p-2 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors"
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
