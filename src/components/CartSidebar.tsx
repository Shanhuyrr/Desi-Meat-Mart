import React, { useState, useEffect } from 'react';
import { CartItem, OrderFormData } from '../types';
import { SHOP_INFO } from '../data/products';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Truck,
  Building,
  CheckCircle,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartSidebarProps) {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phone: '',
    address: '',
    deliveryInstructions: '',
    paymentMethod: 'COD',
  });
  const [formErrors, setFormErrors] = useState<Partial<OrderFormData>>({});

  // Reset step when sidebar closes or opens
  useEffect(() => {
    if (!isOpen) {
      // Small timeout to not disrupt closure animation
      const timer = setTimeout(() => {
        setStep('cart');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const qualifiesForFreeDelivery = subtotal >= SHOP_INFO.freeDeliveryThreshold;
  const deliveryFee = qualifiesForFreeDelivery ? 0 : SHOP_INFO.deliveryFee;
  const total = subtotal + deliveryFee;

  const freeDeliveryDiff = SHOP_INFO.freeDeliveryThreshold - subtotal;
  const freeDeliveryProgress = Math.min(
    (subtotal / SHOP_INFO.freeDeliveryThreshold) * 100,
    100
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof OrderFormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Partial<OrderFormData> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.phone.trim()) {
      errors.phone = 'Phone Number is required';
    } else if (!/^[0-9+() \-]{8,15}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!formData.address.trim()) errors.address = 'Delivery Address is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = () => {
    if (!validateForm()) return;

    // Generate beautifully formatted WhatsApp message content
    const dateStr = new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    
    let messageText = `*🍖 NEW ORDER FROM DESI MEAT MART* \n`;
    messageText += `*📅 Date:* ${dateStr}\n\n`;
    messageText += `*👤 Customer Information:*\n`;
    messageText += `• *Name:* ${formData.fullName}\n`;
    messageText += `• *Contact:* ${formData.phone}\n`;
    messageText += `• *Address:* ${formData.address}\n`;
    if (formData.deliveryInstructions.trim()) {
      messageText += `• *Instructions:* ${formData.deliveryInstructions}\n`;
    }
    messageText += `• *Payment Mode:* ${
      formData.paymentMethod === 'COD' ? '💸 Cash on Delivery (COD)' : '🏦 Bank Transfer'
    }\n\n`;

    messageText += `*🛒 Order Breakdown:*\n`;
    
    cartItems.forEach((item, index) => {
      const itemSubtotal = item.product.price * item.quantity;
      messageText += `${index + 1}. *${item.product.name}* (${item.product.unit})\n`;
      messageText += `    _Qty: ${item.quantity} x $${item.product.price.toFixed(2)}_  →  *$${itemSubtotal.toFixed(2)}*\n`;
    });

    messageText += `\n--------------------------\n`;
    messageText += `*🥩 Subtotal:* $${subtotal.toFixed(2)}\n`;
    messageText += `*🚚 Cold Chain Shipping:* ${deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}\n`;
    messageText += `*💰 TOTAL DUE:* *$${total.toFixed(2)}*\n`;
    messageText += `--------------------------\n\n`;
    messageText += `_Please confirm this order and let me know the approximate delivery slot. Thank you!_`;

    // URI encode the message text
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${SHOP_INFO.whatsappNumber}?text=${encodedMessage}`;

    // Redirect user to WhatsApp
    window.open(whatsappUrl, '_blank');

    // Proceed to success UI
    setStep('success');
    onClearCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blur Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Drawer Body Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col justify-between"
            id="cart-sidebar-panel"
          >
            {/* Header section */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-neutral-900 text-white">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-red-500 fill-current" />
                <h3 className="font-display font-extrabold text-lg uppercase tracking-tight">
                  {step === 'cart' ? 'My Meat Basket' : step === 'checkout' ? 'Order Details' : 'Order Placed!'}
                </h3>
                {cartItems.length > 0 && step === 'cart' && (
                  <span className="bg-red-500 text-white text-[11px] px-1.5 py-0.5 font-bold rounded">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1 px-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white transition-all font-semibold tracking-tighter"
              >
                Close
              </button>
            </div>

            {/* Inner Content Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col">
              {step === 'cart' && (
                <>
                  {cartItems.length === 0 ? (
                    /* EMPTY CART STATE */
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-6">
                      <div className="h-20 w-20 bg-red-50 rounded-full flex items-center justify-center mb-5 text-red-500">
                        <Truck className="w-10 h-10 stroke-1.5" />
                      </div>
                      <h4 className="font-display font-extrabold text-neutral-800 text-lg leading-snug">
                        Your Basket is Empty
                      </h4>
                      <p className="text-xs text-neutral-400 font-normal leading-relaxed mt-2 max-w-xs">
                        Add our succulent Seekh Kababs, marinated Tikka skewers, or juicy Ribeye Steaks to start your custom meat order today.
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-6 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all cursor-pointer"
                      >
                        Browse Premium Cuts
                      </button>
                    </div>
                  ) : (
                    /* BASKET LIST */
                    <div className="flex-1 flex flex-col gap-4">
                      {/* Delivery Increments Banner */}
                      <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100">
                        <div className="flex justify-between text-xs font-semibold text-neutral-700 mb-1.5">
                          <span>Cold-Chain Delivery Progress</span>
                          {qualifiesForFreeDelivery ? (
                            <span className="text-emerald-600 flex items-center gap-1 font-bold">
                              ✓ Free Shipping Achieved!
                            </span>
                          ) : (
                            <span className="text-neutral-500 font-medium">
                              Add{' '}
                              <strong className="text-red-500 font-bold">
                                ${freeDeliveryDiff.toFixed(2)}
                              </strong>{' '}
                              more for FREE
                            </span>
                          )}
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-red-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${freeDeliveryProgress}%` }}
                          />
                        </div>
                        <div className="flex gap-2 items-center mt-2 text-[10px] text-neutral-400 font-medium font-sans">
                          <Truck className="w-3.5 h-3.5 text-neutral-500" />
                          <span>Hygienic ice-gel packed box delivery. Free over $40.00</span>
                        </div>
                      </div>

                      {/* Items loop */}
                      <div className="flex-1 flex flex-col gap-3 overflow-y-auto max-h-[380px] pr-1">
                        {cartItems.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-neutral-100 hover:border-neutral-200 shadow-2xs transition-colors"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-14 w-18 rounded-lg object-cover bg-neutral-50 border border-neutral-100 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="text-xs font-bold text-neutral-900 truncate leading-tight">
                                {item.product.name}
                              </h5>
                              <p className="text-[10px] font-semibold text-neutral-400">
                                {item.product.unit} · ${item.product.price.toFixed(2)}
                              </p>
                              {/* Quantity Adjustment Bar */}
                              <div className="flex items-center gap-3 mt-1.5">
                                <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
                                  <button
                                    onClick={() =>
                                      onUpdateQuantity(item.product.id, item.quantity - 1)
                                    }
                                    className="p-1 px-1.5 hover:bg-neutral-200 text-neutral-600 transition-colors"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-xs font-bold px-2.5 text-neutral-800">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      onUpdateQuantity(item.product.id, item.quantity + 1)
                                    }
                                    className="p-1 px-1.5 hover:bg-neutral-200 text-neutral-600 transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="text-right flex flex-col items-end gap-1.5 shrink-0">
                              <span className="text-sm font-extrabold text-neutral-900 font-display">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                onClick={() => onRemoveItem(item.product.id)}
                                className="p-1 text-neutral-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {step === 'checkout' && (
                /* CHECKOUT DETAILS FORM */
                <div className="flex-grow flex flex-col gap-4">
                  <div className="bg-red-50/50 rounded-2xl p-4 border border-red-100 flex gap-2">
                    <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-neutral-800 leading-snug">
                        Strict Quality Delivery Guaranteed
                      </h4>
                      <p className="text-[10px] text-neutral-500 font-normal leading-relaxed">
                        We package all beef items in insulated carriers at 4°C with dry refrigeration gel. Free replacements if temperature seal is broken!
                      </p>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest leading-none mt-2">
                    Shipping & Delivery Details
                  </h4>

                  {/* Form fields */}
                  <div className="flex flex-col gap-3">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Muhammad Usman"
                        className={`w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm placeholder:text-gray-400 text-neutral-800 ${
                          formErrors.fullName ? 'border-red-500 bg-red-50/20' : ''
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Phone Number (WhatsApp Active) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. 0300 1234567"
                        className={`w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm placeholder:text-gray-400 text-neutral-800 ${
                          formErrors.phone ? 'border-red-500 bg-red-50/20' : ''
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.phone}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Delivery Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="House / Flat #, Street, Block, Phase / Sector, City"
                        className={`w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm placeholder:text-gray-400 text-neutral-800 ${
                          formErrors.address ? 'border-red-500 bg-red-50/20' : ''
                        }`}
                      />
                      {formErrors.address && (
                        <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.address}
                        </p>
                      )}
                    </div>

                    {/* Special Instructions */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Special Instructions (Optional)
                      </label>
                      <input
                        type="text"
                        name="deliveryInstructions"
                        value={formData.deliveryInstructions}
                        onChange={handleInputChange}
                        placeholder="e.g. Please trim fat, deliver in morning, ring bell"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm placeholder:text-gray-400 text-neutral-800"
                      />
                    </div>

                    {/* Payment Mode */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Payment Mode <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, paymentMethod: 'COD' }))
                          }
                          className={`p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5 select-none ${
                            formData.paymentMethod === 'COD'
                              ? 'bg-neutral-900 border-neutral-900 text-white'
                              : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                          }`}
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>Cash on Delivery</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              paymentMethod: 'BankTransfer',
                            }))
                          }
                          className={`p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5 select-none ${
                            formData.paymentMethod === 'BankTransfer'
                              ? 'bg-neutral-900 border-neutral-900 text-white'
                              : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                          }`}
                        >
                          <Building className="w-4 h-4" />
                          <span>Bank Account</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 'success' && (
                /* ORDER COMPLETED SUCCESS PANEL */
                <div className="flex-1 flex flex-col items-center justify-center text-center py-8 px-6">
                  <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mb-5 text-emerald-600 animate-pulse">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-display font-black text-neutral-900 text-xl leading-snug">
                    Order Submitted to WhatsApp!
                  </h4>
                  <p className="text-xs text-neutral-500 font-medium mt-2 leading-relaxed">
                    We’ve compiled your premium cuts and coordinates into a beautiful order sheet. If WhatsApp didn’t open, please make sure your pop-up blocker is disabled or copy the text.
                  </p>
                  <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 mt-6 text-left text-xs text-emerald-800 leading-normal max-w-xs">
                    <p className="font-bold mb-1">⏰ What Happens Next?</p>
                    <ol className="list-decimal pl-4 gap-1.5 flex flex-col font-medium mt-1">
                      <li>Our agent reviews your invoice on WhatsApp.</li>
                      <li>We package your beef cuts in ice-insulated box.</li>
                      <li>Cold dispatcher delivers to your door with real-time temperature log!</li>
                    </ol>
                  </div>
                  <button
                    onClick={() => {
                      setStep('cart');
                      onClose();
                    }}
                    className="mt-8 w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                  >
                    Done (Return to Shop)
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Actions section */}
            {cartItems.length > 0 && step !== 'success' && (
              <div className="p-4 border-t border-gray-100 shrink-0 bg-neutral-50">
                {/* Cost totals */}
                <div className="flex flex-col gap-2 mb-4 font-sans text-sm">
                  <div className="flex justify-between font-medium text-neutral-500">
                    <span>Meat Basket Subtotal:</span>
                    <span className="text-neutral-900 font-extrabold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-neutral-500">
                    <span>Cold Transport Courier:</span>
                    <span className="text-neutral-900 font-extrabold">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE</span>
                      ) : (
                        `$${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black border-t border-neutral-200/60 pt-2 text-neutral-900 font-display">
                    <span>Order Total:</span>
                    <span className="text-red-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Confirm Navigation */}
                {step === 'cart' ? (
                  <button
                    onClick={() => setStep('checkout')}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-sm py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-102 transition-all"
                  >
                    <span>Proceed to Delivery Specs</span>
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStep('cart')}
                      className="w-1/3 bg-white hover:bg-neutral-50 text-neutral-700 font-bold text-xs py-4 rounded-xl border border-neutral-300 transition-all cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmitOrder}
                      className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:scale-102 transition-all"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Order on WhatsApp</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
