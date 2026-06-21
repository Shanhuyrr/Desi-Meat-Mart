import { Star, MessageSquareQuote } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export default function Testimonials() {
  return (
    <section className="py-12" id="reviews">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-red-600 font-extrabold text-xs uppercase tracking-widest bg-red-50 px-2.5 py-1 rounded-md">
          Client Endorsements
        </span>
        <h3 className="text-2xl sm:text-3xl font-display font-black text-neutral-900 tracking-tight mt-3">
          Trusted by Home Chefs & Families
        </h3>
        <p className="text-sm text-neutral-500 font-medium leading-relaxed mt-2">
          Read what food bloggers, executive chefs, and local mothers say about our grass-fed cuts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-3xl p-6 border border-neutral-200/60 shadow-3xs hover:shadow-xs transition-shadow flex flex-col justify-between relative group"
          >
            {/* Quote watermark */}
            <div className="absolute right-6 top-6 text-neutral-100 group-hover:text-red-50 transition-colors">
              <MessageSquareQuote className="w-12 h-12 stroke-1" />
            </div>

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-0.5 text-amber-500 mb-4 select-none">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-amber-500" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-xs text-neutral-600 font-medium leading-relaxed italic">
                "{testimonial.text}"
              </p>
            </div>

            {/* Profile Row */}
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-neutral-100 relative z-10">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="h-10 w-10 rounded-full object-cover border border-neutral-200"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="text-xs font-extrabold text-neutral-950">
                  {testimonial.name}
                </h4>
                <p className="text-[10px] font-semibold text-neutral-400">
                  {testimonial.role}
                </p>
                <p className="text-[9px] font-bold text-red-500 mt-0.5">
                  📍 {testimonial.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
