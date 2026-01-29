
import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, Send, User, Phone, MapPin } from 'lucide-react';
import { CartItem } from '../types';
import { CURRENCY, WHATSAPP_NUMBER } from '../constants';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, updateQuantity, removeItem }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 1500 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (!customerName.trim() || !customerPhone.trim() || !address.trim()) {
      alert("Please fill in all delivery details!");
      return;
    }

    setIsSubmitting(true);
    
    // Construct WhatsApp Message
    let message = `*NEW ORDER - Amala Spot*\n`;
    message += `--------------------------\n`;
    message += `*Customer:* ${customerName}\n`;
    message += `*Phone:* ${customerPhone}\n\n`;
    
    message += `*Order Items:*\n`;
    items.forEach(item => {
      message += `• ${item.quantity}x ${item.name} (${CURRENCY}${item.price.toLocaleString()})\n`;
    });
    
    message += `\n*Order Summary*\n`;
    message += `Subtotal: ${CURRENCY}${subtotal.toLocaleString()}\n`;
    message += `Delivery: ${CURRENCY}${deliveryFee.toLocaleString()}\n`;
    message += `*Total: ${CURRENCY}${total.toLocaleString()}*\n\n`;
    
    message += `*Delivery Address:*\n${address}\n`;
    message += `--------------------------\n`;
    message += `_Sent from Amala Spot Web App_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Your Order <span className="text-stone-400 text-base font-normal">({items.length} items)</span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <ShoppingBag size={64} className="mb-4 text-stone-300" />
              <p className="text-lg">Your cart is empty</p>
              <button onClick={onClose} className="mt-4 text-orange-600 font-semibold underline">Browse our menu</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <img src={item.image} className="w-20 h-20 object-cover rounded-xl shadow-sm" alt={item.name} />
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-stone-800">{item.name}</h4>
                    <button onClick={() => removeItem(item.id)} className="text-stone-300 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-orange-600 font-semibold text-sm mb-2">{CURRENCY}{item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-stone-50 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-bold text-lg w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-stone-50 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t bg-stone-50 space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-500 flex items-center gap-1 uppercase tracking-wider">
                    <User size={12} /> Full Name
                  </label>
                  <input 
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full p-3 text-sm rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-500 flex items-center gap-1 uppercase tracking-wider">
                    <Phone size={12} /> Phone
                  </label>
                  <input 
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="080 0000 0000"
                    className="w-full p-3 text-sm rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-500 flex items-center gap-1 uppercase tracking-wider">
                  <MapPin size={12} /> Delivery Address
                </label>
                <textarea 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your street, building, and apartment number..."
                  className="w-full p-3 text-sm rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-500 outline-none min-h-[60px]"
                />
              </div>
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-stone-500 text-sm">
                <span>Subtotal</span>
                <span>{CURRENCY}{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-500 text-sm">
                <span>Delivery Fee</span>
                <span>{CURRENCY}{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-stone-900 pt-2">
                <span>Total</span>
                <span>{CURRENCY}{total.toLocaleString()}</span>
              </div>
            </div>

            <button 
              disabled={isSubmitting}
              onClick={handleCheckout}
              className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-all shadow-xl active:scale-95 disabled:opacity-50"
            >
              <WhatsAppIcon size={24} />
              Confirm via WhatsApp
            </button>
            <p className="text-[10px] text-center text-stone-400">
              By clicking, you will be redirected to WhatsApp to complete your order.
            </p>
          </div>
        )}
      </div>
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

const WhatsAppIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const ShoppingBag = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
