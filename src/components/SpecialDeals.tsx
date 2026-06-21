import { useState, useEffect } from 'react';
import { Flame, Percent, MessageSquare, ShoppingCart, PercentCircle } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface SpecialDealsProps {
  onAddToCart: (product: Product) => void;
  onQuickOrder: (product: Product) => void;
}

export default function SpecialDeals({ onAddToCart, onQuickOrder }: SpecialDealsProps) {
  // Grab the Grand BBQ Platter to highlight
  const bbqPlatter = PRODUCTS.find((p) => p.id === 'grand-bbq-platter');

  if (!bbqPlatter) return null;

  // Real-time styled countdown for visual rush/conversion
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 34, seconds: 12 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer to keep looping
          return { hours: 4, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10" id="deals-banner">
      <div className="relative overflow-hidden bg-neutral-900 rounded-[32px] text-white p-8 md:p-12 lg:p-14 shadow-xl border border-neutral-800">
        {/* Background elements */}
        <div className="absolute top-0 right-0 h-full w-1/2 opacity-35 hidden lg:block">
          <img
            src="/src/assets/images/bbq_special_1781610562903.jpg"
            alt="Family BBQ Special Platter"
            className="h-full w-full object-cover object-center scale-105 rounded-l-[50%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/40 to-transparent" />
        </div>

        {/* Hot spot light badge */}
        <div className="absolute -top-12 -left-12 h-44 w-44 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl lg:max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-lg mb-6">
            <Percent className="w-3.5 h-3.5" />
            Limited-Time BBQ Bargain Deal
          </div>

          <h3 className="text-3xl md:text-4xl font-display font-black tracking-tight text-white mb-3">
            Grand BBQ Mixed Platter Deal
          </h3>

          <p className="text-sm md:text-base text-gray-300 font-normal leading-relaxed mb-6">
            Elevate your family dinner! Includes 4 hand-stretched juicy Seekh Kababs, 2 melt-in-mouth Chapli Kababs, 1 premium skewer of marinated Beef Tikka, and succulent dry-aged beef ribs. Frozen raw, or cooked hot!
          </p>

          {/* Pricing Box */}
          <div className="flex items-center gap-4 mb-6">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Special Price</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-display font-black text-red-500">
                  ${bbqPlatter.price.toFixed(2)}
                </span>
                <span className="text-base text-gray-400 line-through">
                  ${bbqPlatter.originalPrice?.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="h-10 w-px bg-neutral-800" />
            <div className="bg-red-950/40 px-3 py-1.5 rounded-xl border border-red-900/30">
              <span className="text-red-400 font-extrabold text-xs">SAVE 21% OFF</span>
            </div>
          </div>

          {/* Flash Timer */}
          <div className="flex items-center gap-3.5 mb-8">
            <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase">Offer Ends In:</span>
            <div className="flex gap-2 text-xs font-black">
              <div className="bg-neutral-800 border border-neutral-700/80 px-2.5 py-1.5 rounded-lg text-white">
                {String(timeLeft.hours).padStart(2, '0')}h
              </div>
              <div className="text-gray-500 self-center font-bold">:</div>
              <div className="bg-neutral-800 border border-neutral-700/80 px-2.5 py-1.5 rounded-lg text-white">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </div>
              <div className="text-gray-500 self-center font-bold">:</div>
              <div className="bg-red-950/50 border border-red-900/40 px-2.5 py-1.5 rounded-lg text-red-400">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onAddToCart(bbqPlatter)}
              className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl transition-all cursor-pointer flex items-center gap-2"
              id="deal-add-to-cart"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
              <span>Add Deal to Basket</span>
            </button>
            <button
              onClick={() => onQuickOrder(bbqPlatter)}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl transition-all cursor-pointer flex items-center gap-2"
              id="deal-quick-buy"
            >
              <MessageSquare className="w-4 h-4 text-white fill-current" />
              <span>Instant WhatsApp Buy</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
