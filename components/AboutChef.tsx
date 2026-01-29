
import React from 'react';
import { Award, UtensilsCrossed, History, Heart, ArrowLeft } from 'lucide-react';

interface AboutChefProps {
  onBack: () => void;
}

export const AboutChef: React.FC<AboutChefProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-stone-50 pt-10 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-stone-500 hover:text-orange-600 font-bold mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Menu
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-100 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-100 rounded-full blur-2xl" />
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1583394238182-6f3ad36b51a0?auto=format&fit=crop&q=80&w=800" 
                alt="Chef Adewale Ojo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-10 -right-4 bg-white p-6 rounded-2xl shadow-xl border border-stone-100 max-w-[200px]">
              <div className="flex items-center gap-2 text-orange-600 mb-2">
                <Award size={20} />
                <span className="font-bold text-sm">Master Chef</span>
              </div>
              <p className="text-stone-600 text-xs font-medium">15+ Years specializing in Traditional African Cuisine</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-serif font-black text-stone-900 mb-2">Chef Adewale Ojo</h1>
              <p className="text-orange-600 font-bold tracking-widest text-sm uppercase">Founder & Executive Chef</p>
            </div>

            <p className="text-xl text-stone-600 leading-relaxed font-light italic">
              "The rhythm of the mortar and the aroma of roasted yam flour are the soundtracks of my childhood. At Amala Spot, we don't just feed the body; we nourish the Nigerian soul."
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-orange-600 text-white p-3 rounded-2xl h-fit">
                  <History size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-stone-900 mb-1">The Journey</h4>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    Born in the heart of Ibadan, Chef Wale's journey began at his grandmother's side, learning the precise art of stirring Amala to a lump-free silkiness. He later refined his techniques in international kitchens, merging ancestral wisdom with modern culinary precision.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-orange-600 text-white p-3 rounded-2xl h-fit">
                  <UtensilsCrossed size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-stone-900 mb-1">Expertise</h4>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    A true master of 'Swallow' delicacies, Wale is renowned for his signature Ewedu & Gbegiri mix. He personally sources every spice from local markets, ensuring the heat and heart of Africa are present in every bite.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-orange-600 text-white p-3 rounded-2xl h-fit">
                  <Heart size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-stone-900 mb-1">Our Philosophy</h4>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    At Amala Spot, Chef Wale believes in 'Slow Food' — taking the time to let flavors develop naturally, without shortcuts. It's about preserving heritage through the medium of taste.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
