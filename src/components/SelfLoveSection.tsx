import React from 'react';
import { Heart, Sparkles, AtSign, Star, Quote } from 'lucide-react';
import { COLLECTION_IMAGE, REVIEWS } from '../data/products';
import { AFFIRMATIONS } from '../data/affirmations';

export const SelfLoveSection: React.FC = () => {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Story Banner */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-white">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-bold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Nuestra Historia & Propósito</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-snug">
              Un espacio para recordar lo hermosa que eres en cada faceta de tu vida.
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Sabemos que entre el trabajo, las rutinas y las responsabilidades es fácil olvidarnos de nosotras mismas. En <strong className="text-white font-semibold">Coqueta Chic</strong> creamos prendas con estilo deportivo, casual y elegante que te recuerdan diariamente lo valiosa que eres. Con el outfit correcto, resaltar tu belleza es alimentar tu amor propio.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-rose-300">
              <span className="bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl backdrop-blur-md">✨ Estilo ALO Yoga & Missguided</span>
              <span className="bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl backdrop-blur-md">💖 Envíos Seguros a Toda Venezuela</span>
              <span className="bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl backdrop-blur-md">🌸 Atención Cálida por WhatsApp</span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <img
              src={COLLECTION_IMAGE}
              alt="Colección Coqueta Chic"
              className="w-full h-72 sm:h-80 object-cover rounded-2xl shadow-2xl border border-white/15"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-3 -right-3 bg-slate-950/90 border border-white/20 text-white p-4 rounded-2xl shadow-2xl max-w-xs backdrop-blur-xl">
              <p className="text-xs font-serif font-bold italic text-rose-200">"Invertir en ti nunca es un gasto, es tu mejor decisión."</p>
            </div>
          </div>

        </div>

        {/* Affirmations Grid */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 text-rose-300 text-xs font-bold uppercase tracking-widest bg-rose-500/10 border border-rose-500/20 px-4 py-1.5 rounded-full backdrop-blur-md">
            <Heart className="w-4 h-4 fill-rose-400" />
            <span>Afirmaciones de Amor Propio</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">Manifiesto Coqueta Chic</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {AFFIRMATIONS.slice(0, 3).map((aff, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl hover:border-white/20 transition-all space-y-3 relative text-left group"
              >
                <Quote className="w-8 h-8 text-rose-400/40 group-hover:text-rose-400 transition-colors" />
                <p className="text-xs text-slate-200 leading-relaxed font-serif font-medium italic">
                  "{aff}"
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-rose-300">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" /> Coqueta Chic Affirmation
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews / Testimonials */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 space-y-6 text-white shadow-2xl">
          <div className="text-center space-y-1">
            <h3 className="font-serif font-bold text-2xl text-white">Lo que dicen nuestras clientas radiantes</h3>
            <p className="text-xs text-slate-400">Opiniones reales sobre nuestra ropa, atención y velocidad de envío</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-xl space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.userAvatar}
                    alt={rev.userName}
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-white">{rev.userName}</h4>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                </div>

                <div className="flex text-amber-300 gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-300" />
                  ))}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">"{rev.comment}"</p>

                <div className="text-[10px] font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-md inline-block">
                  Compró: {rev.productName}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram Banner */}
        <div className="bg-gradient-to-r from-indigo-950/80 via-rose-950/80 to-purple-950/80 backdrop-blur-2xl rounded-3xl p-8 border border-white/15 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-widest text-rose-300 font-bold">
              <AtSign className="w-4 h-4 text-rose-400" /> Síguenos en Instagram
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">@coqueta_chic22</h3>
            <p className="text-xs text-slate-300 max-w-md">
              Únete a nuestra comunidad de mujeres empoderadas. Publicamos ideas de outfits diarios, nuevos ingresos y consejos de amor propio.
            </p>
          </div>

          <a
            href="https://instagram.com/coqueta_chic22"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-slate-950 font-bold px-6 py-3.5 rounded-full text-xs hover:bg-rose-400 hover:text-slate-950 transition-all shadow-xl shrink-0 flex items-center gap-2"
          >
            <AtSign className="w-4 h-4 text-rose-600" />
            <span>Ver Instagram @coqueta_chic22</span>
          </a>
        </div>

      </div>
    </section>
  );
};
