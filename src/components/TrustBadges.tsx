import { ShieldCheck, Truck, Award, HeartHandshake } from 'lucide-react';

export default function TrustBadges() {
  const safetyGuidelines = [
    {
      title: '100% Halal Certified',
      description: 'Fully grass-fed and naturally raised beef. Sourced directly from verified pastures adhering to professional slaughtering standards.',
      icon: <Award className="w-8 h-8 text-amber-500 fill-amber-100/30" />,
    },
    {
      title: 'Sub-4°C Cold Carriage',
      description: 'Your meat cuts never break the cold logistics threshold. Dispatched inside food-insulated coolers with safe dry-gel refrigerant packs.',
      icon: <Truck className="w-8 h-8 text-neutral-800" />,
    },
    {
      title: 'Hygienic Clean Vaults',
      description: 'Processed in stainless ISO-grade cutting rooms. Vacuum sealed and heat-sanitized within 10 minutes of cutting to arrest microbial activity.',
      icon: <ShieldCheck className="w-8 h-8 text-red-600 fill-red-100/30" />,
    },
    {
      title: 'No Added Water / Pure Trim',
      description: 'Honest portion weight guarantee. Every package contains tightly trimmed meat without injected water or excess fat filler.',
      icon: <HeartHandshake className="w-8 h-8 text-blue-600 fill-blue-100/30" />,
    },
  ];

  return (
    <section className="py-12 bg-neutral-50 rounded-[32px] border border-neutral-200/50 px-6 my-10" id="why-us">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <span className="text-red-600 font-extrabold text-xs uppercase tracking-widest bg-red-50 px-2.5 py-1 rounded-md">
          Uncompromised Quality Vault
        </span>
        <h3 className="text-2xl sm:text-3xl font-display font-black text-neutral-900 tracking-tight mt-3">
          Our Four Pillars of Freshness
        </h3>
        <p className="text-sm text-neutral-500 font-normal leading-relaxed mt-2 max-w-xl mx-auto">
          We strictly follow high-grade veterinary protocols and ISO safety guidelines so that your household receives restaurant-quality meat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {safetyGuidelines.map((badge, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-3xs flex flex-col items-center text-center hover:shadow-xs transition-shadow"
          >
            <div className="h-14 w-14 rounded-full bg-neutral-50 flex items-center justify-center mb-4">
              {badge.icon}
            </div>
            <h4 className="text-sm font-extrabold text-neutral-900 leading-snug">
              {badge.title}
            </h4>
            <p className="text-xs text-neutral-500 font-normal leading-relaxed mt-1.5">
              {badge.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
