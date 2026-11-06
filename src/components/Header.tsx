import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Sparkles, 
  Menu, 
  X, 
  PhoneCall, 
  AtSign, 
  Shirt, 
  Dumbbell, 
  Scissors, 
  Smile, 
  Home as HomeIcon, 
  User
} from 'lucide-react';
import { Category, Currency } from '../types';

interface HeaderProps {
  currentCategory: Category;
  onSelectCategory: (category: Category) => void;
  currency: Currency;
  onChangeCurrency: (currency: Currency) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenStylist: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  stockFilter: 'todos' | 'inmediato' | 'por_pedido';
  onStockFilterChange: (filter: 'todos' | 'inmediato' | 'por_pedido') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  currency,
  onChangeCurrency,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenStylist,
  searchQuery,
  onSearchChange,
  stockFilter,
  onStockFilterChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories: { key: Category; label: string; icon: React.ReactNode }[] = [
    { key: 'todos', label: 'Todo', icon: <Sparkles className="w-4 h-4" /> },
    { key: 'deportiva', label: 'Ropa Deportiva', icon: <Dumbbell className="w-4 h-4" /> },
    { key: 'vestidos_tops', label: 'Vestidos & Blusas', icon: <Shirt className="w-4 h-4" /> },
    { key: 'pantalones_jeans', label: 'Jeans & Pantalones', icon: <Scissors className="w-4 h-4" /> },
    { key: 'accesorios_bolsos', label: 'Accesorios & Bolsos', icon: <ShoppingBag className="w-4 h-4" /> },
    { key: 'maquillaje_facial', label: 'Belleza & Facial', icon: <Smile className="w-4 h-4" /> },
    { key: 'hombres', label: 'Hombre', icon: <User className="w-4 h-4" /> },
    { key: 'hogar', label: 'Hogar Chic', icon: <HomeIcon className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur-xl border-b border-white/10 shadow-2xl text-white">
      {/* Top Banner - Announcement */}
      <div className="bg-gradient-to-r from-indigo-950/90 via-rose-950/90 to-purple-950/90 text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-between border-b border-white/10">
        <div className="hidden sm:flex items-center gap-2 text-rose-200 text-[11px]">
          <span>✨ Envíos a toda Venezuela vía MRW & Zoom</span>
        </div>
        <div className="mx-auto sm:mx-0 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-rose-300" />
          <span className="text-slate-200 font-sans">"Nunca te olvides de ti misma: eres hermosa tal cual eres"</span>
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-300" />
        </div>
        <div className="hidden md:flex items-center gap-3 text-xs">
          <a 
            href="https://wa.me/584248885968" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-emerald-300 transition-colors flex items-center gap-1 text-slate-300"
          >
            <PhoneCall className="w-3 h-3 text-emerald-400" /> +58 424-888-59-68
          </a>
          <a 
            href="https://instagram.com/coqueta_chic22" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-rose-300 transition-colors flex items-center gap-1 text-slate-300"
          >
            <AtSign className="w-3 h-3 text-rose-400" /> @coqueta_chic22
          </a>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Left: Mobile Menu Button & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 focus:outline-hidden"
              aria-label="Abrir menú"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onSelectCategory('todos'); }}
              className="group flex flex-col items-start"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-rose-300 transition-colors">
                  COQUETA<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-emerald-300 font-light italic ml-1">CHIC</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping"></span>
              </div>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-medium -mt-1">
                Moda • Autoestima • Amor Propio
              </span>
            </a>
          </div>

          {/* Center Search Input */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar vestidos, leggings ALO, accesorios..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-full focus:outline-hidden focus:ring-2 focus:ring-rose-400/50 focus:bg-white/10 transition-all text-white placeholder-slate-400 backdrop-blur-md"
                id="header-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Controls: AI Stylist, Currency, Wishlist, Cart & Admin Access */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Stylist Button */}
            <button
              onClick={onOpenStylist}
              className="hidden sm:flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg transition-all"
              id="ai-stylist-button"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-300" />
              <span>Asistente IA</span>
            </button>

            {/* Currency Switcher */}
            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs backdrop-blur-md">
              {(['BRL', 'USD', 'VES'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => onChangeCurrency(curr)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    currency === curr
                      ? 'bg-rose-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  id={`currency-select-${curr}`}
                >
                  {curr}
                </button>
              ))}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors backdrop-blur-md"
              title="Mis Favoritos"
              id="wishlist-toggle-button"
            >
              <Heart className="w-5 h-5 text-slate-300 hover:text-rose-400" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-slate-950 rounded-full text-[10px] font-extrabold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold px-4 py-2 rounded-full transition-all shadow-lg shadow-rose-500/20"
              id="cart-drawer-toggle-button"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-bold">Carrito</span>
              {cartCount > 0 && (
                <span className="bg-slate-950 text-rose-300 rounded-full w-5 h-5 text-xs font-extrabold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar for small mobile screens */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar en Coqueta Chic..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-full focus:outline-hidden focus:ring-2 focus:ring-rose-400 text-white placeholder-slate-400"
              id="mobile-search-input"
            />
          </div>
        </div>

        {/* Categories Bar & Stock Filters */}
        <div className="hidden lg:flex items-center justify-between border-t border-white/10 py-2.5 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => onSelectCategory(cat.key)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${
                  currentCategory === cat.key
                    ? 'bg-white/15 border-white/20 text-white font-semibold shadow-md backdrop-blur-md'
                    : 'bg-transparent border-transparent text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                id={`category-nav-${cat.key}`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </nav>

          {/* Stock Filter Pills */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 text-[11px] backdrop-blur-md">
            <button
              onClick={() => onStockFilterChange('todos')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                stockFilter === 'todos' ? 'bg-rose-500 text-slate-950 font-bold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              id="stock-filter-todos"
            >
              Todo Stock
            </button>
            <button
              onClick={() => onStockFilterChange('inmediato')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                stockFilter === 'inmediato' ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50' : 'text-slate-400 hover:text-white'
              }`}
              id="stock-filter-inmediato"
            >
              ⚡ Stock Inmediato
            </button>
            <button
              onClick={() => onStockFilterChange('por_pedido')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                stockFilter === 'por_pedido' ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50' : 'text-slate-400 hover:text-white'
              }`}
              id="stock-filter-porpedido"
            >
              📦 Bajo Pedido
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/90 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-fadeIn text-white">
          {/* Stock filters for mobile */}
          <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-xl border border-white/10 text-xs justify-center">
            <button
              onClick={() => { onStockFilterChange('todos'); setMobileMenuOpen(false); }}
              className={`px-3 py-1 rounded-lg text-xs font-medium ${stockFilter === 'todos' ? 'bg-rose-500 text-slate-950 font-bold' : 'text-slate-300'}`}
            >
              Todos
            </button>
            <button
              onClick={() => { onStockFilterChange('inmediato'); setMobileMenuOpen(false); }}
              className={`px-3 py-1 rounded-lg text-xs font-medium ${stockFilter === 'inmediato' ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50' : 'text-slate-300'}`}
            >
              ⚡ Stock Inmediato
            </button>
            <button
              onClick={() => { onStockFilterChange('por_pedido'); setMobileMenuOpen(false); }}
              className={`px-3 py-1 rounded-lg text-xs font-medium ${stockFilter === 'por_pedido' ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50' : 'text-slate-300'}`}
            >
              📦 Bajo Pedido
            </button>
          </div>

          {/* Categories List */}
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  onSelectCategory(cat.key);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                  currentCategory === cat.key
                    ? 'bg-white/15 border-white/20 text-white font-bold backdrop-blur-md'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => { onOpenStylist(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-purple-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Consultar Asistente de Estilo IA</span>
            </button>
            <a
              href="https://wa.me/584248885968"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs shadow-lg"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Atención por WhatsApp (+58 424-888-59-68)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
