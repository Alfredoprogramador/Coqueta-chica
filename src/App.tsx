import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  Header, 
  Hero, 
  ProductCard, 
  ProductModal, 
  CartDrawer, 
  CheckoutModal, 
  StylistAI, 
  SelfLoveSection, 
  SizeGuideModal, 
  Footer,
  OrderProductModal,
  WishlistDrawer,
  DataProtectionModal
} from './components';
import { CATEGORY_LABELS, PRODUCTS as INITIAL_PRODUCTS } from './data/products';
import { Product, Category, StockType, Currency, CartItem } from './types';
import { Sparkles, Filter } from 'lucide-react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './lib/firebase';

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  
  const [currentCategory, setCurrentCategory] = useState<Category>('todos');
  const [stockFilter, setStockFilter] = useState<'todos' | 'inmediato' | 'por_pedido'>('todos');
  const [currency, setCurrency] = useState<Currency>('BRL');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Wishlist State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isDataProtectionOpen, setIsDataProtectionOpen] = useState(false);
  
  // WhatsApp Direct Order Modal State
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [orderInitialSize, setOrderInitialSize] = useState<string | undefined>();
  const [orderInitialColor, setOrderInitialColor] = useState<string | undefined>();
  const [orderInitialQuantity, setOrderInitialQuantity] = useState<number>(1);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleOpenOrderModal = (product: Product, size?: string, color?: string, quantity?: number) => {
    setOrderProduct(product);
    setOrderInitialSize(size || product.sizes?.[0]);
    setOrderInitialColor(color || product.colors?.[0]?.name);
    setOrderInitialQuantity(quantity || 1);
    setIsOrderModalOpen(true);
  };

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Fetch products from Firebase with automatic fallback/seeding
  const fetchProducts = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      if (querySnapshot.empty) {
        // Auto-seed initial products if collection is empty
        console.log("Catálogo vacío en Firestore. Sembrando productos iniciales...");
        for (const prod of INITIAL_PRODUCTS) {
          const { id, ...data } = prod;
          await addDoc(collection(db, 'products'), data);
        }
        const seededSnapshot = await getDocs(collection(db, 'products'));
        const prods: Product[] = [];
        seededSnapshot.forEach(doc => {
          prods.push({ id: doc.id, ...doc.data() } as Product);
        });
        setProducts(prods.length > 0 ? prods : INITIAL_PRODUCTS);
      } else {
        const prods: Product[] = [];
        querySnapshot.forEach(doc => {
          prods.push({ id: doc.id, ...doc.data() } as Product);
        });
        setProducts(prods);
      }
    } catch (error) {
      console.warn("Firestore inaccesible o en modo local, usando catálogo base:", error);
      if (products.length === 0) {
        setProducts(INITIAL_PRODUCTS);
      }
    }
  }, [products.length]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category check
      if (currentCategory !== 'todos' && product.category !== currentCategory) {
        return false;
      }
      // Stock type check
      if (stockFilter !== 'todos' && product.stockType !== stockFilter) {
        return false;
      }
      // Search query check
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesTags = product.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesTags) return false;
      }
      return true;
    });
  }, [products, currentCategory, stockFilter, searchQuery]);

  // Cart Actions
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === product.sizes?.[0]
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            quantity: 1,
            selectedSize: product.sizes?.[0] || '',
            selectedColor: product.colors?.[0]?.name || '',
          },
        ];
      }
    });
    showToast(`¡"${product.name}" añadido al carrito! ✨`);
  };

  const handleAddToCartWithSize = (
    product: Product,
    size?: string,
    color?: string,
    quantity: number = 1
  ) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            quantity,
            selectedSize: size || product.sizes?.[0] || '',
            selectedColor: color || product.colors?.[0]?.name || '',
          },
        ];
      }
    });
    showToast(`¡"${product.name}" añadido al carrito! ✨`);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    setCart((prevCart) => {
      const updated = [...prevCart];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // Wishlist Actions
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast('Producto removido de tus favoritos');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`¡"${product.name}" guardado en favoritos! ♥`);
        return [...prev, product];
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500/30 selection:text-rose-200 flex flex-col relative overflow-x-hidden">
      
      {/* Frosted Glass Mesh Ambient Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/25 rounded-full blur-[130px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/20 rounded-full blur-[130px] pointer-events-none z-0"></div>
      <div className="fixed top-[35%] right-[5%] w-[40%] h-[40%] bg-rose-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed top-[70%] left-[5%] w-[45%] h-[45%] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none z-0"></div>

      {/* Header */}
      <div className="relative z-20">
        <Header
          currentCategory={currentCategory}
          onSelectCategory={(cat) => {
            setCurrentCategory(cat);
            window.scrollTo({ top: 500, behavior: 'smooth' });
          }}
          currency={currency}
          onChangeCurrency={setCurrency}
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          wishlistCount={wishlist.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenStylist={() => setIsStylistOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          stockFilter={stockFilter}
          onStockFilterChange={setStockFilter}
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
            <Hero
              onSelectCategory={(cat) => {
                setCurrentCategory(cat);
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenStylist={() => setIsStylistOpen(true)}
            />
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-slate-900/90 text-white backdrop-blur-xl text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-rose-500/40 animate-slideUp">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Main Catalog Content */}
          <main id="catalog-section" className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
        
            {/* Category Heading & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5 bg-white/5 backdrop-blur-xl p-6 rounded-3xl border">
              <div>
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Colección Exclusiva Coqueta Chic</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white capitalize mt-1">
                  {CATEGORY_LABELS[currentCategory]?.title || 'Nuestros Productos'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {filteredProducts.length} producto(s) disponible(s) en esta categoría.
                </p>
              </div>

              {/* Quick Filter Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Filtrar por:
                </span>

                <button
                  onClick={() => setStockFilter('todos')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    stockFilter === 'todos'
                      ? 'bg-rose-500 text-slate-950 border-rose-400 shadow-lg shadow-rose-500/20'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  Todos
                </button>

                <button
                  onClick={() => setStockFilter('inmediato')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    stockFilter === 'inmediato'
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 backdrop-blur-md'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  ⚡ Stock Inmediato
                </button>

                <button
                  onClick={() => setStockFilter('por_pedido')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    stockFilter === 'por_pedido'
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 backdrop-blur-md'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  📦 Bajo Pedido
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 space-y-3">
                <p className="font-serif font-bold text-lg text-slate-200">
                  No se encontraron productos con estos filtros
                </p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Intenta cambiar tu búsqueda o selecciona otra categoría de nuestro catálogo.
                </p>
                <button
                  onClick={() => {
                    setCurrentCategory('todos');
                    setStockFilter('todos');
                    setSearchQuery('');
                  }}
                  className="bg-rose-500 hover:bg-rose-400 text-slate-950 text-xs font-bold px-6 py-2.5 rounded-full transition-colors shadow-lg shadow-rose-500/20"
                >
                  Restablecer Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={currency}
                    isWishlisted={wishlist.some((p) => p.id === product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickView={(p) => setSelectedProduct(p)}
                    onAddToCart={handleAddToCart}
                    onOrderProduct={handleOpenOrderModal}
                  />
                ))}
              </div>
            )}

          </main>

      {/* Brand & Self-Love Affirmations Section */}
      <div className="relative z-10">
        <SelfLoveSection />
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer
          onSelectCategory={(cat) => {
            setCurrentCategory(cat);
            const el = document.getElementById('catalog-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenStylist={() => setIsStylistOpen(true)}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          onOpenDataProtection={() => setIsDataProtectionOpen(true)}
        />
      </div>

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        currency={currency}
        isWishlisted={selectedProduct ? wishlist.some((p) => p.id === selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCartWithSize={handleAddToCartWithSize}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenOrderForm={handleOpenOrderModal}
      />

      {/* Direct Order Form Modal with WhatsApp dispatch to Milena */}
      <OrderProductModal
        isOpen={isOrderModalOpen}
        product={orderProduct}
        currency={currency}
        initialSize={orderInitialSize}
        initialColor={orderInitialColor}
        initialQuantity={orderInitialQuantity}
        onClose={() => {
          setIsOrderModalOpen(false);
          setOrderProduct(null);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        currency={currency}
        onClearCart={() => setCart([])}
        onOpenDataProtection={() => setIsDataProtectionOpen(true)}
      />

      <StylistAI
        isOpen={isStylistOpen}
        onClose={() => setIsStylistOpen(false)}
        onSelectCategory={(cat) => setCurrentCategory(cat)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Venezuelan Data Protection & Habeas Data Modal */}
      <DataProtectionModal
        isOpen={isDataProtectionOpen}
        onClose={() => setIsDataProtectionOpen(false)}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        currency={currency}
        onAddToCart={handleAddToCart}
        onOpenCart={() => setIsCartOpen(true)}
      />

    </div>
  );
}
