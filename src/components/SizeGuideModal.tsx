import React from 'react';
import { X, Ruler, CheckCircle } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 border border-white/15 max-h-[85vh] overflow-y-auto my-auto text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-slate-300 hover:text-white border border-white/10"
          id="size-guide-close-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-rose-300 font-serif font-bold text-lg">
          <Ruler className="w-5 h-5 text-rose-400" />
          <span>Guía de Tallas Coqueta Chic</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Nuestras prendas deportivas estilo ALO y vestidos cuentan con elástico licrado adaptable que abraza tus curvas suavemente. Usa esta tabla como referencia general:
        </p>

        {/* Table Activewear */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-white/10 text-rose-300 font-bold border-b border-white/10">
                <th className="p-2.5 rounded-l-lg">Talla</th>
                <th className="p-2.5">Busto (cm)</th>
                <th className="p-2.5">Cintura (cm)</th>
                <th className="p-2.5 rounded-r-lg">Cadera (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-slate-300">
              <tr>
                <td className="p-2.5 font-bold text-white">XS</td>
                <td className="p-2.5">80 - 84</td>
                <td className="p-2.5">60 - 64</td>
                <td className="p-2.5">86 - 90</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-white">S</td>
                <td className="p-2.5">85 - 89</td>
                <td className="p-2.5">65 - 69</td>
                <td className="p-2.5">91 - 95</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-white">M</td>
                <td className="p-2.5">90 - 94</td>
                <td className="p-2.5">70 - 74</td>
                <td className="p-2.5">96 - 100</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-white">L</td>
                <td className="p-2.5">95 - 100</td>
                <td className="p-2.5">75 - 80</td>
                <td className="p-2.5">101 - 107</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-white">XL</td>
                <td className="p-2.5">101 - 106</td>
                <td className="p-2.5">81 - 86</td>
                <td className="p-2.5">108 - 114</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-[11px] text-slate-300 space-y-1 backdrop-blur-md">
          <p className="font-bold text-emerald-300 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> ¿Dudas entre dos tallas?
          </p>
          <p>
            Escríbenos por WhatsApp (<strong>+58 424-888-59-68</strong>) con tus medidas y te asesoramos personalmente.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition-all shadow-lg shadow-rose-500/20"
        >
          Entendido
        </button>

      </div>
    </div>
  );
};
