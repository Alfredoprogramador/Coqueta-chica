import React, { useState } from 'react';
import { Sparkles, X, Heart, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { Category } from '../types';

interface StylistAIProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: Category) => void;
}

export const StylistAI: React.FC<StylistAIProps> = ({ isOpen, onClose, onSelectCategory }) => {
  if (!isOpen) return null;

  const [occasion, setOccasion] = useState('Diario / Entrenamiento Chic');
  const [style, setStyle] = useState('Coqueta & Femenina');
  const [mood, setMood] = useState('Elevar mi autoestima y sentirme radiante');
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{
    recommendation: string;
    outfitName: string;
    tips: string[];
    affirmation?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasion,
          style,
          userGoal: mood,
          preferredCategory: 'Ropa Deportiva o Vestido'
        }),
      });

      const data = await response.json();
      setAiResult(data);
    } catch (err) {
      console.error(err);
      setAiResult({
        recommendation: "¡Hola hermosa! Para tu día te sugerimos nuestro Conjunto Deportivo 'Aura Sculpt' en tono Rosa Pastel junto con el Collar 'Aura Dorada'. La combinación perfecta entre confort, tendencia ALO Yoga y glamour.",
        outfitName: "Look Radiante Coqueta Chic",
        tips: [
          "Combínalo con un blazer oversized para darle un toque sofisticado de calle.",
          "Agrega tu lip gloss favorito y camina con la frente en alto."
        ],
        affirmation: "Eres hermosa tal cual eres. Invierte en tu felicidad hoy."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative my-auto border border-white/15 flex flex-col text-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-950/90 via-rose-950/90 to-purple-950/90 text-white p-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
              <Sparkles className="w-5 h-5 text-rose-300 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg">Asistente de Estilo & Amor Propio</h3>
              <p className="text-xs text-slate-300">Te ayudamos a elegir el outfit que resalta tu belleza única</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
            id="stylist-modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          
          {!aiResult ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  ¿Para qué ocasión buscas tu outfit?
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-950 border border-white/10 rounded-xl focus:ring-2 focus:ring-rose-400/50 focus:outline-hidden text-white"
                >
                  <option value="Diario / Entrenamiento Chic">Gym, Yoga o Salida Casual (Estilo ALO)</option>
                  <option value="Cita Romántica / Noche">Cita Romántica / Noche Elegante</option>
                  <option value="Reunión Trabajo / Universidad">Trabajo, Universidad o Universidad Chic</option>
                  <option value="Estar en Casa & Descanso">Estar en Casa & Descanso Lujoso (Home Chic)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  ¿Cuál es tu estilo preferido hoy?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Coqueta & Femenina',
                    'Deportivo Chic (ALO)',
                    'Minimalista & Elegante',
                    'Urbano Moderno'
                  ].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStyle(s)}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                        style === s
                          ? 'bg-rose-500 text-slate-950 border-rose-400 font-bold shadow-lg'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  ¿Qué emoción quieres transmitir hoy?
                </label>
                <input
                  type="text"
                  placeholder="Ej: Sentirme segura, radiante, empoderada y cómoda..."
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-rose-400/50 focus:bg-white/10 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs py-3.5 rounded-2xl shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2"
                id="stylist-generate-btn"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Diseñando tu recomendación...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Obtener Recomendación Personalizada</span>
                  </>
                )}
              </button>

            </form>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2 backdrop-blur-md">
                <span className="text-[10px] uppercase font-extrabold text-rose-300 tracking-wider">
                  Recomendación Coqueta Chic
                </span>
                <h4 className="font-serif font-bold text-lg text-white">{aiResult.outfitName}</h4>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{aiResult.recommendation}"
                </p>
              </div>

              {aiResult.tips && aiResult.tips.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-slate-200">Tips de Estilo:</h5>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {aiResult.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {aiResult.affirmation && (
                <div className="bg-gradient-to-r from-rose-950/80 to-purple-950/80 border border-white/10 text-white p-3.5 rounded-2xl text-center space-y-1 backdrop-blur-md">
                  <Heart className="w-4 h-4 mx-auto text-rose-400 fill-rose-400" />
                  <p className="text-xs font-serif font-semibold italic text-slate-200">"{aiResult.affirmation}"</p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setAiResult(null)}
                  className="flex-1 bg-white/10 border border-white/10 text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-white/20 transition-colors"
                >
                  Probar Otra Ocasión
                </button>
                <button
                  onClick={() => {
                    onSelectCategory('deportiva');
                    onClose();
                  }}
                  className="flex-1 bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition-all shadow-lg shadow-rose-500/20"
                >
                  Ver Prendas Recomendadas
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
