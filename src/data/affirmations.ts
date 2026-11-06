import { Currency } from '../types';

export const AFFIRMATIONS = [
  "Eres hermosa tal cual eres, sin filtros ni condiciones.",
  "Nunca te olvides de ti misma: tu luz interior es tu mejor accesorio.",
  "Invertir en tu bienestar y autoimagen es tu mayor acto de amor propio.",
  "Un outfit no cambia quién eres, pero resalta la diosa que ya habitas.",
  "Camina con la frente en alto. El mundo es tu pasarela.",
  "La elegancia comienza en el momento en que decides ser tú misma."
];

// Conversion factors for BRL, USD, and VES (Approximate live rates for display)
const BRL_TO_USD = 0.20; // 1 BRL ≈ 0.20 USD (e.g. 100 BRL = $20 USD)
const BRL_TO_VES = 10.5; // 1 BRL ≈ 10.5 VES

export function formatPrice(priceBRL: number, currency: Currency): string {
  switch (currency) {
    case 'BRL':
      return `R$ ${priceBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case 'USD':
      const usd = priceBRL * BRL_TO_USD;
      return `$ ${usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
    case 'VES':
      const ves = priceBRL * BRL_TO_VES;
      return `Bs. ${ves.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    default:
      return `R$ ${priceBRL}`;
  }
}
