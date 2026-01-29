
import React, { useState, useEffect, useRef } from 'react';
import { Dish } from '../types';
import { CURRENCY, WHATSAPP_NUMBER } from '../constants';
import { ShoppingCart, Star, Sparkles, TrendingDown, TrendingUp, Info } from 'lucide-react';
import { getFoodPairing, getDishFunFact } from '../services/geminiService';

interface DishCardProps {
  dish: Dish;
  onAddToCart: (dish: Dish, viewedPrice: number) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, onAddToCart }) => {
  const [pairing, setPairing] = useState<string | null>(null);
  const [funFact, setFunFact] = useState<string | null>(null);
  const initialPrice = useRef(dish.price);

  useEffect(() => {
    // Lazy load AI recommendations and fun facts for popular items
    if (dish.popular) {
      getFoodPairing(dish.name).then(setPairing);
      getDishFunFact(dish.name).then(setFunFact);
    }
  }, [dish.name, dish.popular]);

  const handleBuyNow = () => {
    const message = `*QUICK ORDER - Amala Spot*\n\nI want to order:\n• 1x ${dish.name} (${CURRENCY}${dish.price.toLocaleString()})\n\nPlease let me know the total with delivery!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const isDiscount = dish.price < initialPrice.current;
  const isIncrease = dish.price > initialPrice.current;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col h-full relative">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={dish.image} 
          alt={dish.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Visual Indicators for Price Changes */}
        {isDiscount && (
          <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 shadow-lg animate-bounce z-10 border border-emerald-400">
            <TrendingDown size={12} strokeWidth={3} /> PRICE DROP
          </div>
        )}
        {!isDiscount && isIncrease && (
          <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 shadow-lg z-10 border border-amber-400">
            <TrendingUp size={12} strokeWidth={3} /> UPDATED
          </div>
        )}

        {dish.popular && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg z-10">
            <Star size={12} fill="white" />
            POPULAR
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-white text-xs font-medium line-clamp-2">
            {dish.description}
          </p>
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-stone-800 leading-tight">{dish.name}</h3>
          <div className="flex flex-col items-end">
             <span className={`font-black whitespace-nowrap text-lg ${isDiscount ? 'text-emerald-600' : isIncrease ? 'text-amber-600' : 'text-orange-600'}`}>
               {CURRENCY}{dish.price.toLocaleString()}
             </span>
             {(isDiscount || isIncrease) && (
               <span className="text-[10px] text-stone-400 line-through font-medium">
                 Was {CURRENCY}{initialPrice.current.toLocaleString()}
               </span>
             )}
          </div>
        </div>
        
        <p className="text-stone-500 text-sm mb-4 line-clamp-2">
          {dish.description}
        </p>

        <div className="space-y-3 mb-4 mt-auto">
          {pairing && (
            <div className="p-2 bg-orange-50 rounded-lg flex gap-2 items-start border border-orange-100">
              <Sparkles size={14} className="text-orange-500 mt-1 shrink-0" />
              <div>
                <span className="block text-[8px] font-bold text-orange-400 uppercase tracking-widest">Chef Pairing</span>
                <p className="text-[10px] text-orange-700 font-medium italic">{pairing}</p>
              </div>
            </div>
          )}

          {funFact && (
            <div className="p-2 bg-stone-50 rounded-lg flex gap-2 items-start border border-stone-200">
              <Info size={14} className="text-stone-400 mt-1 shrink-0" />
              <div>
                <span className="block text-[8px] font-bold text-stone-400 uppercase tracking-widest">Did you know?</span>
                <p className="text-[10px] text-stone-600 font-medium leading-tight">{funFact}</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-5 gap-2 mt-auto">
          <button 
            onClick={() => onAddToCart(dish, initialPrice.current)}
            className={`col-span-3 py-3 text-white rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md ${isDiscount ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-stone-900 hover:bg-stone-800'}`}
          >
            <ShoppingCart size={16} />
            Add
          </button>
          <button 
            onClick={handleBuyNow}
            title="Order now on WhatsApp"
            className="col-span-2 py-3 bg-[#25D366] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#128C7E] active:scale-95 transition-all shadow-md"
          >
            <WhatsAppIcon size={16} />
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

const WhatsAppIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
