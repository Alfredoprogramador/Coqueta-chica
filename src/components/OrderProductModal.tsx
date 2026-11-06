import React, { useState, useEffect } from 'react';
import { X, Send, Copy, Check, PhoneCall, Mail, MapPin, User, Package, FileText, ShoppingBag, Zap, Clock, AlertCircle } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatPrice } from '../data/affirmations';

interface OrderProductModalProps {
  product: Product | null;
  currency: Currency;
  isOpen: boolean;
  onClose: () => void;
  initialSize?: string;
  initialColor?: string;
  initialQuantity?: number;
}

export const OrderProductModal: React.FC<OrderProductModalProps> = ({
  product,
  currency,
  isOpen,
  onClose,
  initialSize,
  initialColor,
  initialQuantity = 1,
}) => {
  if (!isOpen || !product) return null;

  const OWNER_NAME = "Milena";
  const OWNER_WHATSAPP_DISPLAY = "0424-888-5968";
  const OWNER_WHATSAPP_CLEAN = "584248885968"; // Formato internacional sem símbolos: +58 424-888-5968
  const OWNER_EMAIL = "Milena.recio@gmail.com";

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState<number>(initialQuantity || 1);
  const [selectedSize, setSelectedSize] = useState<string>(initialSize || product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(initialColor || product.colors?.[0]?.name || '');
  const [address, setAddress] = useState('');
  const [productNotes, setProductNotes] = useState('');

  // UI state
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [orderSent, setOrderSent] = useState(false);

  // Sync initial state when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(initialSize || product.sizes?.[0] || '');
      setSelectedColor(initialColor || product.colors?.[0]?.name || '');
      setQuantity(initialQuantity || 1);
      setErrorMsg(null);
      setOrderSent(false);
      setCopied(false);
    }
  }, [product, initialSize, initialColor, initialQuantity]);

  const unitPrice = product.priceBRL;
  const totalPrice = unitPrice * quantity;
  const formattedTotal = formatPrice(totalPrice, currency);
  const formattedUnit = formatPrice(unitPrice, currency);

  // Build the message text
  const generateWhatsAppMessage = () => {
    return `🌸 *NOVO PEDIDO - COQUETA CHIC* 🌸
-----------------------------------------
👤 *CLIENTE:*
• *Nome:* ${customerName.trim()}
• *Telefone / WhatsApp:* ${phone.trim()}

🛍️ *PRODUTO:*
• *Código / ID:* ${product.id}
• *Nome:* ${product.name}
• *Descrição:* ${product.description}
${selectedSize ? `• *Tamanho:* ${selectedSize}\n` : ''}${selectedColor ? `• *Cor:* ${selectedColor}\n` : ''}• *Quantidade:* ${quantity}
• *Preço Unitário:* ${formattedUnit}
• *Total do Pedido:* ${formattedTotal}
• *Disponibilidade:* ${product.stockType === 'inmediato' ? '⚡ Stock Imediato' : '📦 Sob Pedido'}
${productNotes.trim() ? `• *Observações do Cliente:* ${productNotes.trim()}\n` : ''}
📍 *ENDEREÇO DE ENTREGA:*
${address.trim()}

-----------------------------------------
👩‍💼 *Proprietária:* ${OWNER_NAME}
📱 *WhatsApp:* ${OWNER_WHATSAPP_DISPLAY}
✉️ *E-mail:* ${OWNER_EMAIL}
✨ _Pedido enviado através da Coqueta Chic_`;
  };

  const handleSendWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!customerName.trim()) {
      setErrorMsg('Por favor, informe seu nome completo.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Por favor, informe seu número de telefone ou WhatsApp.');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('Por favor, informe seu endereço de entrega ou agência MRW/Zoom.');
      return;
    }

    setErrorMsg(null);
    const message = generateWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${OWNER_WHATSAPP_CLEAN}?text=${encoded}`;
    
    // Open WhatsApp
    window.open(url, '_blank');
    setOrderSent(true);
  };

  const handleCopyMessage = () => {
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg('Preencha os campos antes de copiar o pedido.');
      return;
    }
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-white/15 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-auto text-white max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-emerald-950/80 p-4 sm:p-5 border-b border-white/10 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                Formulário de Pedido Direto
              </span>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white">
                Fazer Pedido por WhatsApp
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            title="Fechar"
            id="close-order-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Owner Notice Banner */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-emerald-300">
                  Envio direto para a proprietária: <span className="text-white">{OWNER_NAME}</span>
                </p>
                <p className="text-[11px] text-slate-300">
                  WhatsApp: <span className="font-mono text-emerald-200">{OWNER_WHATSAPP_DISPLAY}</span> • {OWNER_EMAIL}
                </p>
              </div>
            </div>
          </div>

          {/* Product Summary Card (Pre-filled product info) */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-white/10 shadow-md shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 space-y-1.5 w-full">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-rose-300 font-bold">
                  CÓDIGO: {product.id}
                </span>
                {product.stockType === 'inmediato' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                    <Zap className="w-3 h-3 fill-emerald-300" /> Stock Imediato
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full">
                    <Clock className="w-3 h-3" /> Sob Pedido
                  </span>
                )}
              </div>

              <h3 className="font-bold text-sm text-white">{product.name}</h3>
              <p className="text-[11px] text-slate-300 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-400">Preço Unitário:</span>
                <span className="text-sm font-bold text-rose-300">{formattedUnit}</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="bg-rose-500/20 border border-rose-500/40 p-3 rounded-xl flex items-center gap-2 text-xs text-rose-200">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSendWhatsApp} className="space-y-4">
            
            {/* Field 1: Customer Name */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-rose-400" />
                <span>1. Seu Nome Completo <span className="text-rose-400">*</span></span>
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Maria Silva / Mariana Pereira"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all"
                id="order-customer-name"
              />
            </div>

            {/* Field 2: Phone / WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>2. Número de Telefone / WhatsApp <span className="text-rose-400">*</span></span>
              </label>
              <input
                type="tel"
                required
                placeholder="Ex: 0424-888-5968 ou +58 412..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all font-mono"
                id="order-customer-phone"
              />
            </div>

            {/* Field 3: Product Code / Description Customization (Size, Color, Notes) */}
            <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                <Package className="w-3.5 h-3.5 text-rose-400" />
                <span>3. Código e Descrição do Produto</span>
              </div>

              {/* Sizes selection if available */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <span className="text-[11px] text-slate-300 block mb-1 font-medium">Tamanho desejado:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((sz) => (
                      <button
                        type="button"
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1 text-xs rounded-lg font-bold border transition-all ${
                          selectedSize === sz
                            ? 'bg-rose-500 text-slate-950 border-rose-400'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors selection if available */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <span className="text-[11px] text-slate-300 block mb-1 font-medium">
                    Cor: <span className="text-rose-300 font-bold">{selectedColor}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((col) => (
                      <button
                        type="button"
                        key={col.name}
                        onClick={() => setSelectedColor(col.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          selectedColor === col.name ? 'scale-110 border-rose-400 shadow-md' : 'border-white/20'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Additional description notes */}
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 flex items-center gap-1">
                  <FileText className="w-3 h-3 text-slate-400" />
                  Observações adicionais sobre o produto (opcional):
                </label>
                <input
                  type="text"
                  placeholder="Ex: Prefiro tom mais escuro / favor confirmar medida"
                  value={productNotes}
                  onChange={(e) => setProductNotes(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950/60 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-rose-400"
                />
              </div>
            </div>

            {/* Field 4: Quantity */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">
                4. Quantidade <span className="text-rose-400">*</span>
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-white/15 bg-white/5 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 text-slate-300 hover:bg-white/10 font-bold active:scale-95"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-bold text-white">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 text-slate-300 hover:bg-white/10 font-bold active:scale-95"
                  >
                    +
                  </button>
                </div>

                <div className="text-xs text-slate-300">
                  Total estimado: <span className="font-bold text-rose-300 text-sm ml-1">{formattedTotal}</span>
                </div>
              </div>
            </div>

            {/* Field 5: Delivery Address */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>5. Endereço de Entrega <span className="text-rose-400">*</span></span>
              </label>
              <textarea
                required
                rows={2}
                placeholder="Ex: Av. Principal, Edifício Sol, Apto 4B, Caracas / ou Retirada na Agência MRW Los Teques"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all resize-none"
                id="order-customer-address"
              />
            </div>

            {/* Actions: Send to WhatsApp */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all uppercase tracking-wide"
                id="submit-order-whatsapp-btn"
              >
                <Send className="w-4 h-4 fill-slate-950" />
                <span>Enviar Pedido via WhatsApp para Milena</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="flex-1 bg-white/10 hover:bg-white/15 text-slate-200 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Informações Copiadas!' : 'Copiar Dados do Pedido'}</span>
                </button>
                <a
                  href={`mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(`Pedido Coqueta Chic: ${product.name}`)}&body=${encodeURIComponent(generateWhatsAppMessage())}`}
                  className="bg-white/10 hover:bg-white/15 text-slate-200 font-semibold px-3 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                  title="Enviar por E-mail"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">E-mail</span>
                </a>
              </div>
            </div>

          </form>

          {/* Feedback if order was already triggered */}
          {orderSent && (
            <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-3 text-center space-y-1">
              <p className="text-xs font-bold text-emerald-300">
                ✨ WhatsApp aberto com todas as informações do seu pedido!
              </p>
              <p className="text-[11px] text-slate-300">
                A proprietária Milena responderá para confirmar os detalhes de pagamento e envio.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
