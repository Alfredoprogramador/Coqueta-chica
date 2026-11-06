import React, { useState } from 'react';
import { X, CheckCircle2, Copy, PhoneCall, CreditCard, QrCode, Send, Truck, ShieldCheck, Heart, Scale, Lock } from 'lucide-react';
import { CartItem, Currency, OrderDetails } from '../types';
import { formatPrice } from '../data/affirmations';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: Currency;
  onClearCart: () => void;
  onOpenDataProtection?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  onClearCart,
  onOpenDataProtection,
}) => {
  if (!isOpen) return null;

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    customerName: '',
    phone: '',
    city: 'Caracas',
    address: '',
    shippingAgency: 'MRW',
    paymentMethod: 'whatsapp',
    notes: '',
  });

  const subtotalBRL = cartItems.reduce(
    (sum, item) => sum + item.product.priceBRL * item.quantity,
    0
  );

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSendOrderWhatsApp = () => {
    if (!orderDetails.customerName || !orderDetails.phone) {
      alert('Por favor ingresa tu Nombre y Teléfono para coordinar tu pedido.');
      return;
    }

    const itemsSummary = cartItems
      .map(
        (it) =>
          `• *${it.product.name}* (x${it.quantity}) ${
            it.selectedSize ? `[Talla: ${it.selectedSize}]` : ''
          } ${it.selectedColor ? `[Color: ${it.selectedColor}]` : ''}`
      )
      .join('\n');

    const paymentLabel =
      orderDetails.paymentMethod === 'binance'
        ? 'Binance Pay'
        : orderDetails.paymentMethod === 'paypal'
        ? 'PayPal'
        : orderDetails.paymentMethod === 'pagomovil'
        ? 'Pago Móvil / Transferencia'
        : 'WhatsApp Directo';

    const text = `✨ *NUEVO PEDIDO - COQUETA CHIC* ✨
-------------------------------------
👤 *Cliente:* ${orderDetails.customerName}
📞 *Teléfono:* ${orderDetails.phone}
📍 *Ciudad / Dirección:* ${orderDetails.city} - ${orderDetails.address || 'A convenir'}
🚚 *Agencia de Envío:* ${orderDetails.shippingAgency} (Cobro a destino)
💳 *Método de Pago:* ${paymentLabel}

🛍️ *PRODUCTOS SELECCIONADOS:*
${itemsSummary}

💰 *TOTAL A PAGAR:* ${formatPrice(subtotalBRL, currency)}
-------------------------------------
${orderDetails.notes ? `📝 *Nota:* ${orderDetails.notes}\n` : ''}
¡Hola Milena! Quedo a la espera para realizar el pago y recibir la confirmación de mi pedido. ❤️`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/584248885968?text=${encoded}`, '_blank');
    setOrderCompleted(true);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-auto border border-white/15 flex flex-col max-h-[90vh] text-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-950/90 via-rose-950/90 to-purple-950/90 text-white p-5 flex items-center justify-between border-b border-white/10">
          <div>
            <h2 className="font-serif font-bold text-xl flex items-center gap-2">
              <span>Finalizar Pedido en Coqueta Chic</span>
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            </h2>
            <p className="text-xs text-slate-300">Completa tus datos y selecciona tu método de pago preferido</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
            id="checkout-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderCompleted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto backdrop-blur-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-white">¡Pedido Enviado con Éxito!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Hemos abierto tu chat de WhatsApp con el resumen de tu compra. Te atenderemos personalmente para confirmar el pago y coordinar el envío de tus productos.
            </p>
            <p className="text-xs text-rose-300 font-semibold italic">
              "Gracias por elegir Coqueta Chic e invertir en ti misma."
            </p>
            <button
              onClick={onClose}
              className="bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs px-8 py-3 rounded-full transition-all shadow-lg shadow-rose-500/20"
            >
              Volver a la Tienda
            </button>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto space-y-6">
            
            {/* Step 1: Customer Details Form */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-rose-300 flex items-center gap-2 border-b border-white/10 pb-2">
                <span>1. Datos del Cliente & Envío Nacional</span>
                <Truck className="w-4 h-4 text-emerald-400" />
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Milena Morales"
                    value={orderDetails.customerName}
                    onChange={(e) => setOrderDetails({ ...orderDetails, customerName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-rose-400/50 focus:bg-white/10 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp / Teléfono *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej: +58 424 1234567"
                    value={orderDetails.phone}
                    onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-rose-400/50 focus:bg-white/10 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Ciudad / Estado</label>
                  <input
                    type="text"
                    placeholder="Ej: Caracas, Valencia, Maracaibo"
                    value={orderDetails.city}
                    onChange={(e) => setOrderDetails({ ...orderDetails, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-rose-400/50 focus:bg-white/10 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Agencia de Envío (Cobro a Destino)</label>
                  <select
                    value={orderDetails.shippingAgency}
                    onChange={(e) => setOrderDetails({ ...orderDetails, shippingAgency: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-rose-400/50 focus:outline-hidden"
                  >
                    <option value="MRW">MRW (Oficina / Retiro)</option>
                    <option value="Zoom">Zoom (Oficina / Retiro)</option>
                    <option value="Retiro Personal">Entrega Personal / A convenir</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Dirección / Oficina de Agencia</label>
                <input
                  type="text"
                  placeholder="Ej: Oficina MRW Las Mercedes, Calle Principal"
                  value={orderDetails.address}
                  onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-rose-400/50 focus:bg-white/10 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Step 2: Select Payment Method */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-rose-300 flex items-center gap-2 border-b border-white/10 pb-2">
                <span>2. Selecciona tu Método de Pago</span>
                <CreditCard className="w-4 h-4 text-emerald-400" />
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'whatsapp', name: 'WhatsApp Directo', icon: <PhoneCall className="w-4 h-4 text-emerald-400" /> },
                  { id: 'binance', name: 'Binance Pay', icon: <QrCode className="w-4 h-4 text-amber-300" /> },
                  { id: 'paypal', name: 'PayPal', icon: <CreditCard className="w-4 h-4 text-sky-400" /> },
                  { id: 'pagomovil', name: 'Pago Móvil / Transf', icon: <CreditCard className="w-4 h-4 text-rose-400" /> },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setOrderDetails({ ...orderDetails, paymentMethod: pm.id as any })}
                    className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                      orderDetails.paymentMethod === pm.id
                        ? 'border-rose-400 bg-rose-500/20 text-white font-bold shadow-lg backdrop-blur-md'
                        : 'border-white/10 hover:border-white/20 text-slate-300 bg-white/5'
                    }`}
                  >
                    {pm.icon}
                    <span className="text-[11px] leading-tight">{pm.name}</span>
                  </button>
                ))}
              </div>

              {/* Payment Details Box */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs space-y-2 backdrop-blur-md text-slate-200">
                {orderDetails.paymentMethod === 'binance' && (
                  <div className="space-y-2">
                    <p className="font-bold text-white flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-amber-300" /> Datos de Binance Pay:
                    </p>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 text-[10px] block">Cuenta / Correo Binance Pay:</span>
                        <span className="font-mono font-bold text-white text-xs sm:text-sm">Milena.recio@gmail.com</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard('Milena.recio@gmail.com', 'binance')}
                        className="flex items-center gap-1 text-rose-300 font-semibold text-[11px] hover:text-white"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copiedField === 'binance' ? '¡Copiado!' : 'Copiar'}
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Envía tu pago en USDT o cripto a través de Binance Pay al correo <strong>Milena.recio@gmail.com</strong> y comparte tu comprobante por WhatsApp.
                    </p>
                  </div>
                )}

                {orderDetails.paymentMethod === 'paypal' && (
                  <div className="space-y-2">
                    <p className="font-bold text-white">Datos de PayPal:</p>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 text-[10px] block">Correo PayPal:</span>
                        <span className="font-mono font-bold text-white text-xs sm:text-sm">Milena.recio@gmail.com</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard('Milena.recio@gmail.com', 'paypal')}
                        className="flex items-center gap-1 text-rose-300 font-semibold text-[11px] hover:text-white"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copiedField === 'paypal' ? '¡Copiado!' : 'Copiar'}
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Envía tu pago a <strong>Milena.recio@gmail.com</strong> y adjunta la captura o ID de transacción.
                    </p>
                  </div>
                )}

                {orderDetails.paymentMethod === 'pagomovil' && (
                  <div className="space-y-2.5">
                    <p className="font-bold text-white flex items-center justify-between">
                      <span>Datos de Pago Móvil (Venezuela):</span>
                      <button
                        onClick={() => copyToClipboard('0102 04248885968 30776123', 'pagomovil_all')}
                        className="text-rose-300 hover:text-white text-[10px] underline font-semibold"
                      >
                        {copiedField === 'pagomovil_all' ? '¡Todo Copiado!' : 'Copiar todo'}
                      </button>
                    </p>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Banco:</span>
                        <span className="font-bold text-white">0102 - Banco de Venezuela</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Teléfono:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-emerald-300">04248885968</span>
                          <button
                            onClick={() => copyToClipboard('04248885968', 'pm_tel')}
                            className="text-slate-400 hover:text-white p-0.5"
                            title="Copiar teléfono"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Cédula:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-white">V-30.776.123 (30776123)</span>
                          <button
                            onClick={() => copyToClipboard('30776123', 'pm_ci')}
                            className="text-slate-400 hover:text-white p-0.5"
                            title="Copiar cédula"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard('0102 04248885968 30776123', 'pagomovil')}
                      className="w-full text-center py-2 bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold text-[11px] rounded-xl hover:bg-rose-500/30 transition-colors"
                    >
                      {copiedField === 'pagomovil' ? '¡Datos de Pago Móvil Copiados!' : 'Copiar Datos de Pago Móvil (0102 04248885968 30776123)'}
                    </button>
                  </div>
                )}

                {orderDetails.paymentMethod === 'whatsapp' && (
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    💬 Al presionar <strong>"Enviar Pedido por WhatsApp"</strong>, se enviará el detalle de tu carrito directamente a nuestro WhatsApp oficial (<strong>+58 424-888-5968</strong>). Te atenderemos al instante para confirmar pago y envío.
                  </p>
                )}
              </div>
            </div>

            {/* Data Protection Notice (Venezuela) */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[11px] text-slate-400 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span>Tus datos de contacto y entrega están protegidos conforme al </span>
                <button
                  type="button"
                  onClick={onOpenDataProtection}
                  className="text-rose-300 hover:text-white underline font-semibold inline-flex items-center gap-0.5"
                >
                  <Scale className="w-3 h-3" />
                  <span>Art. 28 de la CRBV y leyes venezolanas</span>
                </button>
                <span>. Solo serán utilizados para gestionar tu orden, facturación y despacho.</span>
              </div>
            </div>

            {/* Total & WhatsApp Send Button */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
              <div>
                <span className="text-xs text-slate-400 block">Monto Total Estimado</span>
                <span className="text-2xl font-bold text-white">
                  {formatPrice(subtotalBRL, currency)}
                </span>
              </div>

              <button
                onClick={handleSendOrderWhatsApp}
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-8 py-3.5 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                id="checkout-send-whatsapp-btn"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Pedido por WhatsApp</span>
              </button>
            </div>

            <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Compra 100% segura. Atención personalizada por Milena Recio.</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
