import { ArrowRight, ShieldCheck, Flame, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onExploreClick: () => void;
}

import heroImage from '../assets/images/hero_raw_beef_1781610434288.jpg';

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-neutral-950 min-h-[500px] md:min-h-[580px] flex items-center" id="hero-banner">
      {/* Background Image with elegant overlay to pop the text */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Premium Fresh Raw Ribeye Steak Background"
          className="w-full h-full object-cover object-center opacity-45 scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic gradient from dark transparent to deep black */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-white w-full">
        <div className="max-w-2xl text-left">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600/90 text-white rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Flame className="w-3.5 h-3.5 fill-current text-amber-300" />
            100% Halal & Hygienic Premium Beef
          </motion.div>

          {/* Primary Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
          >
            Savor the Premium Freshness of{' '}
            <span className="text-red-500 bg-clip-text">Hand-Selected Cuts</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 font-normal leading-relaxed mb-8 max-w-xl"
          >
            Farm-to-table premium beef cuts, mouthwatering pre-marinated seekh kababs, original Peshawari chapli patties, and exquisite BBQ specials. Aged to perfection and delivered cold-chain fresh.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onExploreClick}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer text-base focus:outline-none focus:ring-4 focus:ring-red-500"
            >
              Order Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#why-us"
              className="px-6 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/20 transition-all text-base text-center"
            >
              Learn Quality Standards
            </a>
          </motion.div>

          {/* Highlights Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 md:gap-6 mt-12 pt-8 border-t border-white/10"
          >
            <div className="flex items-start gap-2">
              <div className="p-1.5 bg-red-600/30 text-red-400 rounded-lg shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Vacuum Frozen</h4>
                <p className="text-xs text-gray-400">Locked Nutrients</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="p-1.5 bg-red-600/30 text-red-400 rounded-lg shrink-0 mt-0.5">
                <Award className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Halal Certified</h4>
                <p className="text-xs text-gray-400">100% Assurance</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="p-1.5 bg-red-600/30 text-red-500 rounded-lg shrink-0 mt-0.5">
                <span className="text-xs md:text-sm font-bold">4°C</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Cold Courier</h4>
                <p className="text-xs text-gray-400">Chilled Box Delivery</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
