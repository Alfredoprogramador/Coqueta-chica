import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, Sparkles, Tag } from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../data/affirmations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: Currency;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const subtotalBRL = cartItems.reduce(
    (sum, item) => sum + item.product.priceBRL * item.quantity,
    0
  );

  const discountAmountBRL = discountApplied ? subtotalBRL * 0.1 : 0;
  const totalBRL = Math.max(0, subtotalBRL - discountAmountBRL);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'COQUETA10' || couponCode.trim().toUpperCase() === 'AMORPROPIO') {
      setDiscountApplied(true);
    } else {
      alert('Cupón no válido. Prueba con "COQUETA10" para un 10% OFF.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="bg-slate-900/95 backdrop-blur-2xl border-l border-white/15 w-full max-w-md h-full shadow-2xl flex flex-col justify-between relative overflow-hidden animate-slideLeft text-white">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-400" />
            <h2 className="font-serif font-bold text-lg text-white">Tu Carrito Chic</h2>
            <span className="bg-rose-500 text-slate-950 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
            id="cart-drawer-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping / Self Love Note */}
        <div className="bg-gradient-to-r from-indigo-950/90 via-rose-950/90 to-purple-950/90 text-white text-xs px-4 py-2.5 flex items-center gap-2 font-medium border-b border-white/10">
          <Sparkles className="w-4 h-4 text-rose-300 shrink-0 animate-pulse" />
          <span>¡Regálate ese gusto que mereces! Envíos rápidos por MRW y Zoom.</span>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-white/5 border border-white/10 text-rose-300 rounded-full flex items-center justify-center mx-auto backdrop-blur-md">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-serif font-semibold text-white text-lg">Tu carrito está vacío</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Añade tus prendas y accesorios favoritos para resaltar tu belleza única.
              </p>
              <button
                onClick={onClose}
                className="bg-rose-500 hover:bg-rose-400 text-slate-950 text-xs font-bold px-6 py-2.5 rounded-full transition-all shadow-lg shadow-rose-500/20"
              >
                Ver Productos
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-3.5 rounded-2xl backdrop-blur-md flex gap-3.5 items-center">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-18 h-18 object-cover rounded-xl border border-white/10 shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="font-bold text-xs text-white truncate">{item.product.name}</h4>
                  
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    {item.selectedSize && <span>Talla: <strong className="text-slate-200">{item.selectedSize}</strong></span>}
                    {item.selectedColor && <span>Color: <strong className="text-slate-200">{item.selectedColor}</strong></span>}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-bold text-xs text-rose-300">
                      {formatPrice(item.product.priceBRL * item.quantity, currency)}
                    </span>

                    {/* Qty controller */}
                    <div className="flex items-center border border-white/10 bg-white/5 rounded-lg text-xs backdrop-blur-md">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="px-2.5 py-0.5 text-slate-300 hover:bg-white/10 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="px-2.5 py-0.5 text-slate-300 hover:bg-white/10 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => onRemoveItem(index)}
                  className="text-slate-400 hover:text-rose-400 p-1.5 rounded-xl hover:bg-white/10 transition-colors"
                  title="Eliminar producto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-slate-950/80 backdrop-blur-xl space-y-3">
            
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder='Cupón "COQUETA10"'
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl uppercase text-white placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-rose-400"
                />
              </div>
              <button
                type="submit"
                className="bg-white/10 border border-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-white/20 transition-colors"
              >
                Aplicar
              </button>
            </form>

            {discountApplied && (
              <p className="text-[11px] text-emerald-300 font-bold flex items-center gap-1">
                ✓ ¡Descuento especial del 10% aplicado!
              </p>
            )}

            {/* Totals Breakdown */}
            <div className="space-y-1.5 text-xs pt-1">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-white font-medium">{formatPrice(subtotalBRL, currency)}</span>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-emerald-300">
                  <span>Descuento (10%)</span>
                  <span>-{formatPrice(discountAmountBRL, currency)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-400">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-rose-300" /> Envíos Nacionales
                </span>
                <span className="text-slate-400">Cobro a Destino (MRW / Zoom)</span>
              </div>

              <div className="flex justify-between font-bold text-base text-white pt-2 border-t border-white/10">
                <span>Total a Pagar</span>
                <span className="text-rose-300 font-extrabold">{formatPrice(totalBRL, currency)}</span>
              </div>
            </div>

            {/* Proceed Button */}
            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 transition-all active:scale-98"
              id="cart-proceed-checkout-btn"
            >
              <span>Continuar al Pago</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
