import React, { useState } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import SpecialDeals from './components/SpecialDeals';
import TrustBadges from './components/TrustBadges';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { ShoppingCart } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  // Scroll to products helper
  const handleScrollToProducts = () => {
    const section = document.getElementById('products-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Cart actions
  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    // Visual cue: open cart sidebar on add to cart (or keep brief feedback)
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Instant Quick Order on WhatsApp (adds single product, opens sidebar)
  const handleQuickOrder = (product: Product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems; // Product already exists in cart, keep it and proceed
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    // Instantly open the basket drawer
    setCartOpen(true);
  };

  // Filter products by searching and category
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-neutral-800 font-sans antialiased" id="meat-shop-app">
      {/* 1. Navbar / Header */}
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          // If searching, auto scroll to products so user sees results
          if (query) {
            handleScrollToProducts();
          }
        }}
      />

      {/* 2. Hero Background Banner */}
      <Hero onExploreClick={handleScrollToProducts} />

      {/* 3. Main Body Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hot Badge Deals */}
        <SpecialDeals
          onAddToCart={handleAddToCart}
          onQuickOrder={handleQuickOrder}
        />

        {/* Products Core Section */}
        <section id="products-section" className="py-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-4 mb-6">
            <div>
              <span className="text-red-600 font-extrabold text-xs uppercase tracking-widest bg-red-50 px-2 rounded-sm">
                In Stock Today
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-neutral-900 tracking-tight mt-1">
                Explore Premium Butcher Cuts
              </h2>
            </div>
            
            {/* Direct indicator details */}
            <div className="text-xs text-neutral-400 font-medium mt-1 md:mt-0 flex items-center gap-1.5">
              Showing {filteredProducts.length} Premium Choice Items
            </div>
          </div>

          {/* Categories Horizontal scroller */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-neutral-50 rounded-[24px] border border-neutral-100 my-12">
              <p className="text-neutral-500 font-bold mb-2">No cuts match your criteria.</p>
              <p className="text-xs text-neutral-400">Try adjusting your search terms or view another category.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-5 py-2 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onQuickOrder={handleQuickOrder}
                />
              ))}
            </div>
          )}
        </section>

        {/* 4. Trust Badges ("Why Choose Us") */}
        <TrustBadges />

        {/* 5. Testimonial Reviews */}
        <Testimonials />

      </main>

      {/* Floating Sticky Cart button at bottom-right for mobile to be highly accessible */}
      {cartCount > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="md:hidden fixed bottom-6 right-6 z-30 h-14 w-14 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-red-500/40 border-2 border-white focus:outline-none cursor-pointer"
          id="mobile-sticky-cart"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-1.5 -right-1 bg-neutral-900 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border border-white">
            {cartCount}
          </span>
        </button>
      )}

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* 6. Footer section containing FAQ/Map/Address details */}
      <Footer />

      {/* 7. Slide-In Cart sidebar */}
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
