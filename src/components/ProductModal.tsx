import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Send, Star, Zap, Clock, Truck, Ruler } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatPrice } from '../data/affirmations';

interface ProductModalProps {
  product: Product | null;
  currency: Currency;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (product: Product) => void;
  onAddToCartWithSize: (product: Product, size?: string, color?: string, quantity?: number) => void;
  onOpenSizeGuide: () => void;
  onOpenOrderForm?: (product: Product, size?: string, color?: string, quantity?: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  currency,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCartWithSize,
  onOpenSizeGuide,
  onOpenOrderForm,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0]?.name || '');
  const [quantity, setQuantity] = useState<number>(1);

  const handleOrderClick = () => {
    if (onOpenOrderForm) {
      onClose();
      onOpenOrderForm(product, selectedSize, selectedColor, quantity);
    } else {
      const text = `🌸 *NOVO PEDIDO - COQUETA CHIC* 🌸
• *Produto:* ${product.name} (Cód: ${product.id})
${selectedSize ? `• *Tamanho:* ${selectedSize}\n` : ''}${selectedColor ? `• *Cor:* ${selectedColor}\n` : ''}• *Quantidade:* ${quantity}
• *Total:* ${formatPrice(product.priceBRL * quantity, currency)}
• *Proprietária:* Milena (WhatsApp: 0424-888-5968 | Milena.recio@gmail.com)`;
      window.open(`https://wa.me/584248885968?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/15 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col md:flex-row my-auto text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-slate-200 p-2 rounded-full border border-white/20 backdrop-blur-md transition-all"
          id="product-modal-close-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Side */}
        <div className="md:w-1/2 relative bg-slate-950/60 min-h-[300px] flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full max-h-[420px] object-cover rounded-2xl shadow-2xl border border-white/10"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={() => onToggleWishlist(product)}
            className={`absolute top-4 left-4 p-2.5 rounded-full shadow-lg border backdrop-blur-md transition-all ${
              isWishlisted ? 'bg-rose-500 text-slate-950 border-rose-400' : 'bg-slate-950/60 border-white/20 text-slate-200 hover:text-rose-400'
            }`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-slate-950' : ''}`} />
          </button>
        </div>

        {/* Product Info Side */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto space-y-4">
          <div className="space-y-3">
            
            {/* Stock Badge & Code */}
            <div className="flex items-center justify-between">
              {product.stockType === 'inmediato' ? (
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                  <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                  Stock Imediato
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  Sob Pedido
                </span>
              )}

              <span className="text-xs font-mono font-bold text-slate-400">
                Cód: {product.id}
              </span>
            </div>

            {/* Title & Price */}
            <div>
              <div className="flex items-center text-amber-300 gap-1 text-xs mb-1">
                <Star className="w-4 h-4 fill-amber-300" />
                <span className="font-bold text-slate-200">{product.rating}</span>
                <span className="text-slate-400">({product.reviewsCount} avaliações)</span>
              </div>
              <h2 className="text-xl font-serif font-bold text-white leading-snug">{product.name}</h2>
              <div className="mt-1 text-2xl font-bold text-rose-300">
                {formatPrice(product.priceBRL * quantity, currency)}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{product.description}</p>

            {/* Sizes Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                  <span>Selecione seu Tamanho:</span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-rose-300 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    Guia de Tamanhos
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        selectedSize === sz
                          ? 'bg-rose-500 text-slate-950 border-rose-400 font-bold shadow-lg'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-semibold text-slate-200 block">
                  Cor: <span className="text-rose-300 font-bold">{selectedColor}</span>
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((col) => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        selectedColor === col.name ? 'scale-110 border-rose-400 shadow-lg' : 'border-white/20'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs font-semibold text-slate-200">Quantidade:</span>
              <div className="flex items-center border border-white/10 bg-white/5 rounded-xl overflow-hidden backdrop-blur-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-slate-300 hover:bg-white/10 font-bold"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-slate-300 hover:bg-white/10 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Shipping note with Owner contact */}
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-[11px] text-slate-300 space-y-1 backdrop-blur-md">
              <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                <Truck className="w-3.5 h-3.5" />
                <span>Envio para toda a Venezuela via MRW & Zoom</span>
              </div>
              <p className="text-[10px] text-slate-400">
                Contato proprietária Milena: 0424-888-5968 • Milena.recio@gmail.com
              </p>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-3 border-t border-white/10">
            <button
              onClick={handleOrderClick}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all uppercase tracking-wide active:scale-98"
              id="modal-order-now-btn"
            >
              <Send className="w-4 h-4 fill-slate-950" />
              <span>Preencher Formulário de Pedido (WhatsApp)</span>
            </button>

            <button
              onClick={() => {
                onAddToCartWithSize(product, selectedSize, selectedColor, quantity);
                onClose();
              }}
              className="w-full bg-white/10 hover:bg-white/15 text-white font-bold py-2.5 rounded-2xl text-xs flex items-center justify-center gap-2 border border-white/10 transition-all"
              id="modal-add-to-cart-btn"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Apenas Adicionar ao Carrinho</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
