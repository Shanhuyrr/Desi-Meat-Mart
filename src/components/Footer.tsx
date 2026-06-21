import { MapPin, Phone, Mail, Clock, MessageSquare, HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { SHOP_INFO, FAQS } from '../data/products';

export default function Footer() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <footer className="bg-neutral-950 text-white mt-16" id="shop-footer">
      {/* 1. Dynamic FAQ Accordion segment within footer area or preceding close */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-neutral-900">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-red-500 font-extrabold text-xs uppercase tracking-widest bg-red-950/40 px-3 py-1 rounded-md border border-red-900/40">
            F.A.Q. Help Center
          </span>
          <h3 className="text-2xl font-display font-black text-white mt-3 tracking-tight">
            Common Household Questions
          </h3>
          <p className="text-xs text-neutral-400 mt-2 font-medium leading-relaxed">
            Need specifications regarding cold chain, Halal cutting guidelines, or WhatsApp order deliveries? Search here.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 font-bold text-left text-xs sm:text-sm text-neutral-200 hover:text-white transition-colors cursor-pointer select-none"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-red-500 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-10 pb-4 text-xs font-normal text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Main Contacts and Map Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* About column */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-red-600 rounded-full flex items-center justify-center text-white font-extrabold text-sm tracking-tighter">
              D
            </div>
            <h3 className="text-lg font-display font-black tracking-tight text-white">
              DESI<span className="text-red-500"> MEAT MART</span>
            </h3>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed font-normal">
            We are a premium butcher franchise serving the city with certified 100% Halal beef, fresh tenderloin steaks, hand-ground minced qeema, and exquisite ready-to-fry BBQ items. Packaged hygienically at sub-4°C coordinates.
          </p>

          <div className="flex flex-col gap-2.5 text-xs text-neutral-300 font-medium mt-2">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span>{SHOP_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-red-500 shrink-0" />
              <span>{SHOP_INFO.phone}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-red-500 shrink-0" />
              <span>{SHOP_INFO.email}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-red-500 shrink-0" />
              <span>{SHOP_INFO.openingHours}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Pages Shortcuts */}
        <div className="lg:col-span-3 flex flex-col gap-3.5">
          <h4 className="text-xs font-black uppercase text-neutral-300 tracking-wider">
            Quick Navigation Links
          </h4>
          <ul className="text-xs text-neutral-400 flex flex-col gap-2.5 font-medium">
            <li>
              <a href="#hero-banner" className="hover:text-red-500 transition-colors">
                Return to Top
              </a>
            </li>
            <li>
              <a href="#category-scroller" className="hover:text-red-500 transition-colors">
                Browse Meat Sections
              </a>
            </li>
            <li>
              <a href="#deals-banner" className="hover:text-red-500 transition-colors">
                Flash Barbeque Deals
              </a>
            </li>
            <li>
              <a href="#why-us" className="hover:text-red-500 transition-colors">
                Strict Hygiene Standards
              </a>
            </li>
            <li>
              <a href="#reviews" className="hover:text-red-500 transition-colors">
                Happy Customer Endorsements
              </a>
            </li>
          </ul>
        </div>

        {/* Google Maps Columns */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <h4 className="text-xs font-black uppercase text-neutral-300 tracking-wider">
            Visit Our Premium Location
          </h4>
          {SHOP_INFO.googleMapEmbedUrl && (
            <div className="w-full h-44 rounded-2xl overflow-hidden border border-neutral-800 shadow-md">
              <iframe
                title="Desi Meat Mart Location Map"
                src={SHOP_INFO.googleMapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
          <span className="text-[10px] text-neutral-500 leading-tight">
            💡 <strong>Pick Up Order Option:</strong> Simply place order on WhatsApp and mention *"Pickup order at Block C"* to skip our courier queue!
          </span>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-neutral-950 py-6 border-t border-neutral-900 text-center text-xs text-neutral-500 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Desi Meat Mart. All rights reserved.</p>
          <p className="flex items-center gap-1 font-semibold text-neutral-400">
            Hygienically certified double-washed beef cuts with zero fillers.
          </p>
        </div>
      </div>
    </footer>
  );
}
