import { useState } from 'react';
import { ShoppingBag, Search, Phone, Clock, Menu, X } from 'lucide-react';
import { SHOP_INFO } from '../data/products';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({
  cartCount,
  onCartClick,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm" id="shop-header">
      {/* Top Banner Bar */}
      <div className="bg-neutral-900 text-white text-xs py-2 px-4 flex flex-wrap justify-between items-center max-w-7xl mx-auto md:px-8">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Shop Open (Hygienic Cold Chain Delivered)
          </span>
          <span className="hidden sm:flex items-center gap-1 text-gray-300">
            <Clock className="w-3.5 h-3.5" />
            {SHOP_INFO.openingHours}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`https://wa.me/${SHOP_INFO.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-red-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-red-500" />
            Support: {SHOP_INFO.phone}
          </a>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center text-white font-extrabold text-xl tracking-tighter shadow-md shadow-red-200">
            D
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-extrabold text-neutral-900 tracking-tight leading-none text-nowrap">
              DESI <span className="text-red-600">MEAT MART</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-neutral-500 font-medium uppercase tracking-wider">
              Premium Fresh Meat
            </p>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search fresh steaks, kababs, tikka, mince qeema..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder:text-gray-400 text-neutral-800"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-3 text-gray-400 hover:text-neutral-600 text-xs font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Search trigger on mobile */}
          <div className="relative md:hidden w-36 sm:w-48">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-1.5 pl-8 pr-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 placeholder:text-gray-400 text-neutral-800"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5 pointer-events-none" />
          </div>

          <button
            onClick={onCartClick}
            className="relative p-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="View Cart"
            id="open-cart-btn"
          >
            <ShoppingBag className="w-5 h-5 text-red-500" />
            <span className="hidden sm:inline text-xs font-semibold">My Cart</span>
            {cartCount > 0 ? (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-bold text-[10px] h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce-short">
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
}
