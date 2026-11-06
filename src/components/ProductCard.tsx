import React from 'react';
import { Heart, ShoppingBag, Send, Star, Zap, Clock, Eye } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatPrice } from '../data/affirmations';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOrderProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onOrderProduct,
}) => {
  const handleProductClick = () => {
    if (onOrderProduct) {
      onOrderProduct(product);
    } else {
      onQuickView(product);
    }
  };

  return (
    <div className="group bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-rose-400/40 hover:bg-white/10 overflow-hidden shadow-2xl transition-all duration-300 flex flex-col h-full">
      
      {/* Image Container */}
      <div 
        className="relative aspect-4/3 sm:aspect-1/1 overflow-hidden bg-slate-900/60 cursor-pointer" 
        onClick={handleProductClick}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Stock Type Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.stockType === 'inmediato' ? (
            <span className="inline-flex items-center gap-1 bg-emerald-500/90 backdrop-blur-md text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-lg">
              <Zap className="w-3 h-3 fill-slate-950" />
              Stock Imediato
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-purple-500/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-lg">
              <Clock className="w-3 h-3" />
              Sob Pedido
            </span>
          )}

          {product.isBestSeller && (
            <span className="bg-amber-400 text-slate-950 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
              Mais Vendido
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xl border transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-slate-950 border-rose-400 shadow-lg scale-110'
              : 'bg-slate-950/60 border-white/20 text-slate-200 hover:text-rose-400 hover:bg-slate-900'
          }`}
          title={isWishlisted ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
          id={`wishlist-btn-${product.id}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-slate-950' : ''}`} />
        </button>

        {/* Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-3 flex gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity px-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleProductClick();
            }}
            className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-2 rounded-xl text-xs font-extrabold transition-all shadow-xl flex items-center justify-center gap-1.5"
            id={`quick-order-btn-${product.id}`}
          >
            <Send className="w-3.5 h-3.5 fill-slate-950" />
            <span>Fazer Pedido</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2 bg-slate-950/80 hover:bg-slate-900 border border-white/20 text-white rounded-xl text-xs font-bold transition-all"
            title="Ver detalhes e fotos"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Details Content */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Rating & Code */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center text-amber-300 gap-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span className="font-bold text-slate-200 ml-1">{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-rose-300 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-md">
              Cód: {product.id}
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={handleProductClick}
            className="font-sans font-bold text-sm text-white hover:text-rose-300 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {product.name}
          </h3>

          {/* Sizes available */}
          {product.sizes && product.sizes.length > 0 && (
            <p className="text-[11px] text-slate-400">
              Tamanhos: <span className="font-semibold text-slate-200">{product.sizes.join(', ')}</span>
            </p>
          )}
        </div>

        {/* Footer: Price & Direct Order Action */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-medium tracking-wider">Preço</span>
            <span className="font-bold text-base text-white">
              {formatPrice(product.priceBRL, currency)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onAddToCart(product)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              title="Añadir al carrito"
              id={`add-to-cart-btn-${product.id}`}
            >
              <ShoppingBag className="w-4 h-4" />
            </button>

            <button
              onClick={handleProductClick}
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-2 rounded-xl text-xs font-extrabold transition-all active:scale-95 shadow-md shadow-emerald-500/20"
              id={`order-now-btn-${product.id}`}
            >
              <Send className="w-3.5 h-3.5 fill-slate-950" />
              <span>Pedir</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
