import React from 'react';
import { Product, ShopInfo } from '../types';
import { Flame, ShoppingCart, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { SHOP_INFO } from '../data/products';

interface ProductCardProps {
  key?: string;
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickOrder: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onQuickOrder,
}: ProductCardProps) {
  // Generate Spice Level indicators
  const renderSpiceLevel = () => {
    if (!product.spiceLevel) return null;
    return (
      <div className="flex items-center gap-0.5 text-red-500 absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2 py-1 rounded-lg text-[10px] font-extrabold shadow-xs z-10 select-none">
        <span className="text-gray-600 mr-1 uppercase tracking-tight">Spice:</span>
        {Array.from({ length: product.spiceLevel }).map((_, i) => (
          <Flame key={i} className="w-3.5 h-3.5 fill-current text-red-600 inline" />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-3xl border border-neutral-200/60 overflow-hidden shadow-xs hover:shadow-lg hover:border-red-100 transition-all flex flex-col h-full relative group"
      id={`prod-card-${product.id}`}
    >
      {/* Upper Thumbnail Section */}
      <div className="relative aspect-4/3 w-full bg-neutral-100 overflow-hidden shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Shading gradient over image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Spice Level (if present) */}
        {renderSpiceLevel()}

        {/* Quality Checked Tag */}
        <div className="absolute top-3 right-3 bg-neutral-900/90 text-white font-semibold text-[10px] py-1 px-1.5 rounded-md flex items-center gap-1 shadow-xs uppercase select-none z-10">
          <ShieldCheck className="w-3.5 h-3.5 text-red-500 fill-current" />
          Hygienic
        </div>

        {/* Badge: Best Seller / Featured / New */}
        {product.isBestSeller && (
          <div className="absolute bottom-3 left-3 bg-red-600 text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-sm shadow-xs select-none z-10 tracking-wider">
            BEST SELLER
          </div>
        )}
        {product.isFeatured && !product.isBestSeller && (
          <div className="absolute bottom-3 left-3 bg-neutral-900 text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-sm shadow-xs select-none z-10 tracking-wider">
            SPECIAL
          </div>
        )}
        {product.isNew && (
          <div className="absolute bottom-3 left-3 bg-blue-600 text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-sm shadow-xs select-none z-10 tracking-wider">
            NEW ARRIVAL
          </div>
        )}

        {/* Portion Pack Unit Badge */}
        <div className="absolute bottom-3 right-3 bg-neutral-950/80 backdrop-blur-xs text-white font-bold text-xs px-2.5 py-1 rounded-sm z-10">
          {product.unit}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Chef suggest info or specs */}
          <div className="flex items-center gap-3 text-neutral-400 text-[11px] font-semibold mb-1.5">
            {product.prepTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                Prep: {product.prepTime}
              </span>
            )}
            <span className="uppercase text-red-600 tracking-wider text-[10px] font-extrabold">
              {product.category.replace('-', ' ')}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-lg font-display font-extrabold text-neutral-900 tracking-tight leading-snug group-hover:text-red-600 transition-colors">
            {product.name}
          </h4>

          {/* Description */}
          <p className="text-xs text-neutral-500 font-normal leading-relaxed mt-1.5 line-clamp-3">
            {product.description}
          </p>
        </div>

        <div className="mt-5">
          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-display font-extrabold text-red-600">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm font-normal text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Call to Actions */}
          <div className="grid grid-cols-5 gap-2">
            {/* Direct Instant Order on WhatsApp */}
            <button
              onClick={() => onQuickOrder(product)}
              className="col-span-2 cursor-pointer bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs py-3 rounded-xl border border-emerald-200 transition-all flex flex-col items-center justify-center gap-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:scale-[1.02]"
              title="Instant WhatsApp Order (Skip Cart)"
              id={`prod-quick-${product.id}`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-600 fill-current" />
              <span>Quick Buy</span>
            </button>

            {/* Standard Cart add */}
            <button
              onClick={() => onAddToCart(product)}
              className="col-span-3 cursor-pointer bg-red-600 hover:bg-neutral-900 text-white font-extrabold text-sm py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-red-500 hover:scale-[1.02]"
              id={`prod-add-${product.id}`}
            >
              <ShoppingCart className="w-4 h-4 text-white" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
