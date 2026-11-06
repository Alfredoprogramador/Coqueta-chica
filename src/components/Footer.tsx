import React from 'react';
import { Heart, AtSign, PhoneCall, Truck, ShieldCheck, CreditCard, Sparkles, Mail, Scale } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  onSelectCategory: (category: Category) => void;
  onOpenStylist: () => void;
  onOpenSizeGuide: () => void;
  onOpenDataProtection: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onSelectCategory, 
  onOpenStylist, 
  onOpenSizeGuide,
  onOpenDataProtection,
}) => {
  return (
    <footer className="bg-slate-950/80 backdrop-blur-2xl border-t border-white/10 text-slate-300 pt-12 pb-8 shadow-2xl relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                COQUETA<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-emerald-300 font-light italic ml-1">CHIC</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Espacio dedicado a elevar la autoestima de las mujeres. Moda femenina, ropa deportiva estilo ALO Yoga, accesorios, maquillaje y confort para el hogar. Recuerda siempre: eres hermosa tal cual eres.
            </p>

            <div className="space-y-2 pt-1">
              <a
                href="mailto:Milena.recio@gmail.com"
                className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-rose-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-rose-400" />
                <span>Milena.recio@gmail.com</span>
              </a>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://wa.me/584248885968"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center hover:scale-110 transition-transform font-bold shadow-lg shadow-emerald-500/20"
                title="Atención por WhatsApp (+58 424-888-5968)"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
              <a
                href="mailto:Milena.recio@gmail.com"
                className="w-9 h-9 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-rose-500/20"
                title="Enviar Correo (Milena.recio@gmail.com)"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/coqueta_chic22"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-rose-500/20"
                title="Síguenos en Instagram"
              >
                <AtSign className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Categorías</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onSelectCategory('deportiva')} className="hover:text-rose-300 transition-colors">
                  Ropa Deportiva (ALO)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('vestidos_tops')} className="hover:text-rose-300 transition-colors">
                  Vestidos & Blusas Chic
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('pantalones_jeans')} className="hover:text-rose-300 transition-colors">
                  Jeans & Pantalones
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('accesorios_bolsos')} className="hover:text-rose-300 transition-colors">
                  Accesorios & Bolsos
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('maquillaje_facial')} className="hover:text-rose-300 transition-colors">
                  Maquillaje & Cuidado Facial
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('hombres')} className="hover:text-rose-300 transition-colors">
                  Sección Hombre
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('hogar')} className="hover:text-rose-300 transition-colors">
                  Hogar & Confort
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Atención & Contacto</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onOpenStylist} className="hover:text-rose-300 transition-colors flex items-center gap-1.5 text-rose-300 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" /> Asistente de Estilo IA
                </button>
              </li>
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-rose-300 transition-colors">
                  Guía de Tallas
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenDataProtection} 
                  className="hover:text-rose-300 transition-colors flex items-center gap-1.5 text-slate-300"
                >
                  <Scale className="w-3.5 h-3.5 text-rose-400" /> Ley de Protección de Datos (Venezuela)
                </button>
              </li>
              <li>
                <a href="https://wa.me/584248885968" target="_blank" rel="noopener noreferrer" className="hover:text-rose-300 transition-colors flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp: 0424-888-5968
                </a>
              </li>
              <li>
                <a href="mailto:Milena.recio@gmail.com" className="hover:text-rose-300 transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-rose-400" /> Milena.recio@gmail.com
                </a>
              </li>
              <li>
                <span className="text-slate-500">Envíos Nacionales: MRW & Zoom</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Payment Methods */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Métodos de Pago</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 backdrop-blur-md space-y-0.5">
                <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-[11px]">
                  <CreditCard className="w-3.5 h-3.5" /> Binance Pay
                </div>
                <p className="text-[11px] text-slate-300 font-mono">Milena.recio@gmail.com</p>
              </div>

              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 backdrop-blur-md space-y-0.5">
                <div className="flex items-center gap-1.5 text-sky-400 font-semibold text-[11px]">
                  <CreditCard className="w-3.5 h-3.5" /> PayPal
                </div>
                <p className="text-[11px] text-slate-300 font-mono">Milena.recio@gmail.com</p>
              </div>

              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 backdrop-blur-md space-y-1">
                <div className="flex items-center gap-1.5 text-rose-300 font-semibold text-[11px]">
                  <CreditCard className="w-3.5 h-3.5" /> Pago Móvil (0102 BDV)
                </div>
                <div className="text-[10px] text-slate-300 space-y-0.5 font-mono">
                  <p>Tel: 0424-888-5968</p>
                  <p>CI: 30.776.123</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p>© {new Date().getFullYear()} Coqueta Chic. Todos los derechos reservados.</p>
            <button
              onClick={onOpenDataProtection}
              className="text-slate-400 hover:text-rose-300 underline transition-colors flex items-center gap-1"
            >
              <Scale className="w-3 h-3 text-rose-400" />
              <span>Privacidad & Hábeas Data (Art. 28 CRBV)</span>
            </button>
          </div>
          <p className="flex items-center gap-1.5 text-rose-300">
            <span>Creado con amor propio</span>
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <span>para resaltar tu belleza</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
