import React from 'react';
import { Heart, X, ShoppingBag } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatPrice } from '../data/affirmations';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  currency: Currency;
  onAddToCart: (product: Product) => void;
  onOpenCart: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  currency,
  onAddToCart,
  onOpenCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900/90 backdrop-blur-2xl border-l border-white/10 w-full max-w-md h-full shadow-2xl flex flex-col justify-between relative p-6 text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="font-serif font-bold text-lg text-white">Mis Favoritos ({wishlist.length})</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {wishlist.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="text-sm font-semibold text-slate-300">Aún no tienes favoritos guardados</p>
              <p className="text-xs text-slate-500">Haz clic en el ícono de corazón en cualquier producto.</p>
            </div>
          ) : (
            wishlist.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl border border-white/10" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs text-white truncate">{item.name}</h4>
                  <p className="text-xs font-bold text-rose-400">{formatPrice(item.priceBRL, currency)}</p>
                </div>
                <button
                  onClick={() => {
                    onAddToCart(item);
                    onClose();
                    onOpenCart();
                  }}
                  className="bg-rose-500 hover:bg-rose-400 text-slate-950 p-2 rounded-xl text-xs font-semibold"
                  title="Añadir al carrito"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 rounded-2xl font-bold text-xs backdrop-blur-md"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
