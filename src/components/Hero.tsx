import React from 'react';
import { Sparkles, Heart, ArrowRight, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { HERO_BANNER_IMAGE } from '../data/products';
import { Category } from '../types';

interface HeroProps {
  onSelectCategory: (category: Category) => void;
  onOpenStylist: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectCategory, onOpenStylist }) => {
  return (
    <section className="relative overflow-hidden py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Frosted Glass Card Container */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Text Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Pill Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-bold tracking-wide backdrop-blur-md">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>Espacio de Amor Propio & Moda Femenina</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-[1.15]">
                Nunca te olvides de ti misma:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-emerald-300 italic block sm:inline">
                  eres hermosa tal cual eres.
                </span>
              </h1>

              {/* Subheading Narrative */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto lg:mx-0">
                En <strong className="text-white font-semibold">Coqueta Chic</strong> creamos un espacio para elevar tu autoestima. Invierte en ti misma con outfits chic, ropa deportiva estilo ALO, accesorios radiantes y productos que resaltan tu belleza natural.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onSelectCategory('deportiva')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all group"
                  id="hero-cta-deportiva"
                >
                  <span>Explorar Colección ALO Style</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onOpenStylist}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-7 py-4 rounded-2xl backdrop-blur-lg transition-all"
                  id="hero-cta-stylist"
                >
                  <Sparkles className="w-4 h-4 text-rose-300" />
                  <span>Asistente de Estilo IA</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Stock Propio</span>
                  </div>
                  <span className="text-[11px] text-slate-400">y Bajo Pedido</span>
                </div>

                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div className="flex items-center gap-1 text-rose-400 font-bold text-xs">
                    <Truck className="w-4 h-4" />
                    <span>Envíos Nacionales</span>
                  </div>
                  <span className="text-[11px] text-slate-400">MRW y Zoom</span>
                </div>

                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div className="flex items-center gap-1 text-amber-300 font-bold text-xs">
                    <CreditCard className="w-4 h-4" />
                    <span>Pagos Fáciles</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Binance / Paypal / PagoMóvil</span>
                </div>
              </div>

            </div>

            {/* Right Image Visual Banner */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-slate-900/50 group">
                <img
                  src={HERO_BANNER_IMAGE}
                  alt="Coqueta Chic Moda y Ropa Deportiva Femenina"
                  className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" /> Nueva Colección
                    </div>
                    <p className="text-xl font-serif font-bold text-white">Inspirada en ALO Yoga & Missguided</p>
                    <p className="text-xs text-slate-300 font-light">
                      Outfits diseñados para elevar tu confianza en cada paso.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Decorative Glass Badge */}
              <div className="absolute -bottom-4 -left-4 bg-slate-900/80 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/15 hidden sm:flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 font-bold">
                  ♥
                </div>
                <div>
                  <p className="text-xs font-bold text-white">100% Amor Propio</p>
                  <p className="text-[10px] text-slate-400">Atención personalizada WhatsApp</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
