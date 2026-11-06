export type Category = 
  | 'todos'
  | 'deportiva' 
  | 'vestidos_tops' 
  | 'pantalones_jeans' 
  | 'accesorios_bolsos' 
  | 'maquillaje_facial' 
  | 'hombres' 
  | 'hogar';

export type StockType = 'inmediato' | 'por_pedido';

export type Currency = 'BRL' | 'USD' | 'VES';

export interface Product {
  id: string;
  name: string;
  description: string;
  priceBRL: number; // Price in BRL ($50 a $300 BRL range)
  category: Category;
  stockType: StockType;
  image: string;
  images?: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewsCount: number;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface OrderDetails {
  customerName: string;
  phone: string;
  city: string;
  address: string;
  shippingAgency: 'MRW' | 'Zoom' | 'Retiro Personal';
  paymentMethod: 'binance' | 'paypal' | 'pagomovil' | 'whatsapp';
  notes?: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  comment: string;
  rating: number;
  date: string;
  productName: string;
}
