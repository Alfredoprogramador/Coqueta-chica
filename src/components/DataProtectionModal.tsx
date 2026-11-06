import React from 'react';
import { X, ShieldCheck, Scale, FileText, CheckCircle2, Lock, UserCheck, Mail, PhoneCall } from 'lucide-react';

interface DataProtectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataProtectionModal: React.FC<DataProtectionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="bg-slate-900/95 backdrop-blur-2xl rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-white/15 text-white max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                Protección de Datos Personales
              </h2>
              <p className="text-xs text-rose-300/90 font-medium">
                Conformidad con la Legislación de la República Bolivariana de Venezuela
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body (Scrollable) */}
        <div className="overflow-y-auto space-y-6 py-4 pr-1 text-xs text-slate-300 leading-relaxed custom-scrollbar">
          
          {/* Intro highlight */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Compromiso de Privacidad & Confidencialidad</span>
            </div>
            <p>
              En <strong>Coqueta Chic</strong> (representada por Milena Recio), garantizamos el tratamiento lícito, seguro y transparente de los datos personales de nuestras usuarias y clientes, en estricto apego a las disposiciones constitucionales y leyes especiales vigentes en Venezuela.
            </p>
          </div>

          {/* Section 1: Marco Legal */}
          <div className="space-y-3">
            <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-rose-400" />
              1. Marco Jurídico Aplicable
            </h3>
            <p className="text-slate-400">
              El tratamiento de su información personal se fundamenta en las siguientes normativas de la República Bolivariana de Venezuela:
            </p>
            <ul className="space-y-2 pl-2">
              <li className="flex items-start gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                <span className="text-rose-400 font-bold">•</span>
                <div>
                  <strong className="text-white">Constitución de la República Bolivariana de Venezuela (CRBV):</strong>
                  <p className="text-slate-400 mt-0.5">
                    <strong>Artículo 28 (Garantía de Hábeas Data):</strong> Reconoce el derecho de toda persona de acceder a la información que sobre sí misma conste en registros públicos o privados, conocer su uso y finalidad, y solicitar su actualización, rectificación o destrucción.
                  </p>
                  <p className="text-slate-400 mt-0.5">
                    <strong>Artículo 60:</strong> Garantiza la protección al honor, la vida privada, la intimidad, la confidencialidad y la reputación.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                <span className="text-rose-400 font-bold">•</span>
                <div>
                  <strong className="text-white">Ley Especial contra los Delitos Informáticos (G.O. Nº 37.313):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Artículos 20, 21 y 22: Salvaguarda la privacidad de la data y las comunicaciones, sancionando el acceso indebido, la interceptación, revelación ilícita o difusión no autorizada de datos personales.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                <span className="text-rose-400 font-bold">•</span>
                <div>
                  <strong className="text-white">Ley sobre Mensajes de Datos y Firmas Electrónicas:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Otorga plena validez jurídica, eficacia probatoria y seguridad contractual a las transacciones, pedidos y comprobantes emitidos electrónicamente en nuestra plataforma.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Section 2: Datos Recopilados y Finalidad */}
          <div className="space-y-3">
            <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-rose-400" />
              2. Finalidad del Tratamiento de los Datos
            </h3>
            <p>
              Los datos solicitados al momento de registrarse, consultar con el Asistente de Estilo o procesar una orden de compra (nombre completo, número de cédula/RIF, teléfono, correo electrónico, dirección de entrega o agencia de encomiendas) son recabados con las siguientes finalidades exclusivas:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Facturación y Pagos
                </p>
                <p className="text-slate-400 text-[11px]">
                  Verificar pagos vía Pago Móvil (0102 BDV), Binance Pay o PayPal de forma transparente y fidedigna.
                </p>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Envíos Nacionales
                </p>
                <p className="text-slate-400 text-[11px]">
                  Emitir guías de despacho legítimas con agencias de encomienda autorizadas (MRW, Zoom, Tealca).
                </p>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Atención Personalizada
                </p>
                <p className="text-slate-400 text-[11px]">
                  Brindar soporte inmediato a través de WhatsApp oficial (+58 424-888-5968) y seguimiento a compras.
                </p>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Seguridad & No Venta
                </p>
                <p className="text-slate-400 text-[11px]">
                  <strong>No vendemos ni compartimos</strong> bases de datos con terceros con fines publicitarios externos.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Derechos de Habeas Data (ARCO) */}
          <div className="space-y-3">
            <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-rose-400" />
              3. Ejercicio de los Derechos de Habeas Data (Acceso, Rectificación y Supresión)
            </h3>
            <p>
              En cumplimiento del Artículo 28 de la CRBV, todo titular de datos tiene derecho a:
            </p>
            <div className="space-y-1.5 text-slate-300">
              <p>• <strong>Acceso:</strong> Consultar qué información personal se encuentra registrada.</p>
              <p>• <strong>Rectificación:</strong> Actualizar o corregir datos incompletos o erróneos.</p>
              <p>• <strong>Supresión o Cancelación:</strong> Solicitar la eliminación total de su cuenta y registros cuando no exista obligación legal de conservación fiscal.</p>
              <p>• <strong>Revocatoria del Consentimiento:</strong> Retirar la autorización de tratamiento de datos en cualquier instante.</p>
            </div>
            
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-slate-300 space-y-1">
              <p className="font-bold text-white">Canales oficiales para ejercer sus derechos:</p>
              <div className="flex flex-col sm:flex-row gap-3 pt-1 text-xs">
                <a href="mailto:Milena.recio@gmail.com" className="flex items-center gap-1.5 text-rose-300 hover:text-white">
                  <Mail className="w-3.5 h-3.5" /> Milena.recio@gmail.com
                </a>
                <a href="https://wa.me/584248885968" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-emerald-300 hover:text-white">
                  <PhoneCall className="w-3.5 h-3.5" /> WhatsApp: +58 424-888-5968
                </a>
              </div>
            </div>
          </div>

          {/* Section 4: Almacenamiento Seguro */}
          <div className="space-y-2">
            <h3 className="text-sm font-serif font-bold text-white">
              4. Medidas de Seguridad Informática
            </h3>
            <p className="text-slate-400">
              Implementamos protocolos de cifrado y estándares de autenticación robustos mediante Firebase de Google Cloud Platform y conexiones seguras HTTPS/TLS para proteger la integridad, confidencialidad e indisponibilidad de la data contra accesos no autorizados.
            </p>
          </div>

        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] text-slate-400">
            Coqueta Chic © {new Date().getFullYear()} • República Bolivariana de Venezuela
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-rose-500/20"
          >
            Entendido y Acepto
          </button>
        </div>

      </div>
    </div>
  );
};
