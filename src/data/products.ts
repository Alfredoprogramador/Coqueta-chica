import { Product } from '../types';
import heroBannerImg from '../assets/images/coqueta_hero_banner_1785093921543.jpg';
import collectionImg from '../assets/images/coqueta_collection_1785093934720.jpg';

export const HERO_BANNER_IMAGE = heroBannerImg;
export const COLLECTION_IMAGE = collectionImg;

export const PRODUCTS: Product[] = [
  // --- ROPA DEPORTIVA (Estilo ALO) ---
  {
    id: 'dep-01',
    name: 'Conjunto Deportivo "Aura Sculpt" Pink Rose',
    description: 'Top deportivo con soporte de alto rendimiento y legging tiro alto moldeador. Estilo chic inspirado en ALO Yoga. Tela supex de tacto suave y secado rápido.',
    priceBRL: 185,
    category: 'deportiva',
    stockType: 'inmediato',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Rosa Pastel', hex: '#F4C2C2' },
      { name: 'Negro Chic', hex: '#1A1A1A' },
      { name: 'Verde Oliva', hex: '#556B2F' }
    ],
    isFeatured: true,
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 38,
    tags: ['Estilo ALO', 'Autoestima', 'Fitness Chic']
  },
  {
    id: 'dep-02',
    name: 'Chaqueta "Aesthetic Flow" Windbreaker',
    description: 'Chaqueta liviana rompevientos para outfits deportivos y casuales. Ajuste entallado en la cintura, capucha ajustable y acabados dorados.',
    priceBRL: 210,
    category: 'deportiva',
    stockType: 'por_pedido',
    image: 'https://images.unsplash.com/photo-1548624149-f1af3492b839?q=80&w=800&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blanco Perla', hex: '#F9F6F0' },
      { name: 'Nude Soft', hex: '#E0C9B6' }
    ],
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 19,
    tags: ['Deportivo', 'Streetwear']
  },
  {
    id: 'dep-03',
    name: 'Top Deportivo "Glow Seamless"',
    description: 'Top sin costuras con escote elegante en espalda. Ideal para entrenamiento, yoga o combinar con un blazer para un outfit diario.',
    priceBRL: 85,
    category: 'deportiva',
    stockType: 'inmediato',
    image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=800&auto=format&fit=crop',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Malva Romántico', hex: '#CDA4DE' },
      { name: 'Blanco', hex: '#FFFFFF' }
    ],
    rating: 4.7,
    reviewsCount: 24
  },

  // --- VESTIDOS Y TOPS ---
  {
    id: 'ves-01',
    name: 'Vestido "Romance Chic" Midi Satinado',
    description: 'Vestido midi en satén premium con escote desbocado y corte favorecedor que resalta tus curvas. Siéntete radiante, hermosa y segura.',
    priceBRL: 260,
    category: 'vestidos_tops',
    stockType: 'inmediato',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Rosa Champagne', hex: '#E8C3B9' },
      { name: 'Negro Azabache', hex: '#0D0D0D' },
      { name: 'Rojo Pasión', hex: '#8B0000' }
    ],
    isFeatured: true,
    isBestSeller: true,
    rating: 5.0,
    reviewsCount: 42,
    tags: ['Elegante', 'Noche', 'Amor Propio']
  },
  {
    id: 'ves-02',
    name: 'Blusa "Seda Glam" Manga Abullonada',
    description: 'Blusa fluida estilo romántico chic con puños elásticos y cuello en V delicado. Perfecta para ocasiones especiales o reuniones casuales.',
    priceBRL: 140,
    category: 'vestidos_tops',
    stockType: 'por_pedido',
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=800&auto=format&fit=crop',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Marfil', hex: '#FFFFF0' },
      { name: 'Rosa Viejita', hex: '#D8A7B1' }
    ],
    rating: 4.8,
    reviewsCount: 15
  },
  {
    id: 'ves-03',
    name: 'Franela Oversized "Self-Love Club"',
    description: 'Franela de algodón 100% peruano con estampado minimalista en dorado: "You Are Beautiful As You Are". Máximo confort y estilo sin esfuerzo.',
    priceBRL: 95,
    category: 'vestidos_tops',
    stockType: 'inmediato',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blanco Algodón', hex: '#FDFDFD' },
      { name: 'Gris Melange', hex: '#BEBEBE' }
    ],
    rating: 4.9,
    reviewsCount: 29
  },

  // --- PANTALONES Y JEANS ---
  {
    id: 'pan-01',
    name: 'Pantalón "Tailored Elegance" High Waist',
    description: 'Pantalón vestir de tiro alto con pinzas frontales y caída recta sofisticada. Eleva tu figura y proyecta poder y elegancia.',
    priceBRL: 230,
    category: 'pantalones_jeans',
    stockType: 'por_pedido',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
    sizes: ['34', '36', '38', '40', '42'],
    colors: [
      { name: 'Beige Camel', hex: '#C19A6B' },
      { name: 'Negro Elegante', hex: '#111111' },
      { name: 'Blanco Crema', hex: '#F5F5DC' }
    ],
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 31
  },
  {
    id: 'pan-02',
    name: 'Jeans "Coqueta Curve" Mom Fit',
    description: 'Jeans rígidos con lavado suave, realce sutil en glúteos y dobladillo en tobillo. El básico infaltable para combinar con tops o blusas.',
    priceBRL: 195,
    category: 'pantalones_jeans',
    stockType: 'inmediato',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
    sizes: ['36', '38', '40', '42'],
    colors: [
      { name: 'Azul Medio', hex: '#4682B4' },
      { name: 'Azul Claro', hex: '#87CEEB' }
    ],
    rating: 4.8,
    reviewsCount: 27
  },

  // --- ACCESORIOS Y BOLSOS ---
  {
    id: 'acc-01',
    name: 'Collar Multi-capa "Aura Dorada" 18K',
    description: 'Hermoso collar triple con baño de oro 18K y dijes de corazón y perla cultivada. Resistente al agua y libre de níquel. El toque brillante perfecto.',
    priceBRL: 115,
    category: 'accesorios_bolsos',
    stockType: 'inmediato',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    isBestSeller: true,
    rating: 5.0,
    reviewsCount: 56
  },
  {
    id: 'acc-02',
    name: 'Bolso de Mano "Chic Quilted" con Cadena',
    description: 'Bolso estructurado acolchado con correa de cadena dorada. Tamaño ideal para teléfono, cosméticos y llaves. Cierre magnético de lujo.',
    priceBRL: 275,
    category: 'accesorios_bolsos',
    stockType: 'por_pedido',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
    colors: [
      { name: 'Nude Rosado', hex: '#E3C1B4' },
      { name: 'Negro Clásico', hex: '#0A0A0A' }
    ],
    rating: 4.9,
    reviewsCount: 33
  },
  {
    id: 'acc-03',
    name: 'Set de Anillos "Minimal Glam" (5 piezas)',
    description: 'Set de anillos ajustables con zirconias brillantes y acabados delicados. Diseñados para combinar juntos o usar individualmente.',
    priceBRL: 75,
    category: 'accesorios_bolsos',
    stockType: 'inmediato',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    reviewsCount: 18
  },

  // --- MAQUILLAJE Y CUIDADO FACIAL ---
  {
    id: 'maq-01',
    name: 'Lip Gloss "Coqueta Glow" Plumping Effect',
    description: 'Brillo labial no pegajoso enriquecido con ácido hialurónico y vitamina E. Aumenta sutilmente el volumen y otorga un acabado rosado deslumbrante.',
    priceBRL: 65,
    category: 'maquillaje_facial',
    stockType: 'inmediato',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop',
    colors: [
      { name: 'Pink Love', hex: '#FFB6C1' },
      { name: 'Nude Shimmer', hex: '#D2B48C' }
    ],
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 61
  },
  {
    id: 'maq-02',
    name: 'Sérum Facial "Luz Radiante" Vitamina C & Rosas',
    description: 'Sérum iluminador e hidratante concentrado. Reduce signos de cansancio, unifica el tono de la piel y aporta una frescura juvenil natural.',
    priceBRL: 125,
    category: 'maquillaje_facial',
    stockType: 'inmediato',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 22
  },

  // --- ROPA HOMBRES (Hombre Chic) ---
  {
    id: 'hom-01',
    name: 'Camisa "Casual Gentleman" 100% Lino',
    description: 'Camisa de lino de cuello maorí, fresca y atemporal. Estilo masculino moderno, cómodo y elegante para paseos o eventos casuales.',
    priceBRL: 220,
    category: 'hombres',
    stockType: 'por_pedido',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blanco Lino', hex: '#FAF9F6' },
      { name: 'Azul Marino', hex: '#000080' },
      { name: 'Verde Caqui', hex: '#C3B091' }
    ],
    rating: 4.8,
    reviewsCount: 14
  },
  {
    id: 'hom-02',
    name: 'Franela "Minimal Urban" Algodón Pima',
    description: 'Franela de corte fit en algodón pima ultra suave. Resiste lavados continuos manteniendo su forma y color vibrante.',
    priceBRL: 98,
    category: 'hombres',
    stockType: 'inmediato',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    sizes: ['M', 'L', 'XL'],
    rating: 4.7,
    reviewsCount: 11
  },

  // --- HOGAR / HOME CHIC ---
  {
    id: 'hog-01',
    name: 'Juego de Sábanas Satinadas "Sueños Rosados"',
    description: 'Juego completo de sábanas en satén suave anti-frizz para el cabello y cuida tu piel mientras duermes. Incluye sábana ajustable, sobre-sábana y 2 fundas.',
    priceBRL: 295,
    category: 'hogar',
    stockType: 'por_pedido',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    sizes: ['Matrimonial', 'Queen', 'King'],
    colors: [
      { name: 'Rosa Viejito', hex: '#E8C3B9' },
      { name: 'Blanco Perlado', hex: '#F9F6F0' },
      { name: 'Champagne Gold', hex: '#F7E7CE' }
    ],
    rating: 5.0,
    reviewsCount: 28
  },
  {
    id: 'hog-02',
    name: 'Manta / Cobija Fluffy "Luxe Hug"',
    description: 'Cobija ultra afelpada de tacto de nube. Añade calidez, estilo y glamour a tu cama o sofá favorito.',
    priceBRL: 165,
    category: 'hogar',
    stockType: 'inmediato',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 35
  },
  {
    id: 'hog-03',
    name: 'Set de Toallas de Baño "Spa Soft" (3 Piezas)',
    description: 'Toallas 100% algodón egipcio de alto gramaje (600 GSM). Súper absorbentes, esponjosas y secado rápido.',
    priceBRL: 180,
    category: 'hogar',
    stockType: 'inmediato',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 16
  }
];

export const CATEGORY_LABELS: Record<string, { title: string; iconName: string }> = {
  todos: { title: 'Ver Todo', iconName: 'Sparkles' },
  deportiva: { title: 'Ropa Deportiva (ALO Vibe)', iconName: 'Dumbbell' },
  vestidos_tops: { title: 'Vestidos & Blusas', iconName: 'Shirt' },
  pantalones_jeans: { title: 'Jeans & Pantalones', iconName: 'Scissors' },
  accesorios_bolsos: { title: 'Accesorios & Bolsos', iconName: 'ShoppingBag' },
  maquillaje_facial: { title: 'Maquillaje & Cuidado Facial', iconName: 'Smile' },
  hombres: { title: 'Sección Hombre', iconName: 'User' },
  hogar: { title: 'Hogar & Confort', iconName: 'Home' }
};

export const REVIEWS: Record<string, any>[] = [
  {
    id: 'rev-1',
    userName: 'Valeria M.',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    comment: '¡El conjunto deportivo Pink Rose me hizo sentir tan segura! La calidad es igual o mejor que ALO Yoga. Llegó súper rápido a Caracas vía MRW.',
    rating: 5,
    date: 'Hace 3 días',
    productName: 'Conjunto Deportivo "Aura Sculpt"'
  },
  {
    id: 'rev-2',
    userName: 'Camila R.',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop',
    comment: 'Coqueta Chic es mi tienda favorita. El empaque huele delicioso y las telas son de ensueño. Invertir en mí valió cada centavo.',
    rating: 5,
    date: 'Hace 1 semana',
    productName: 'Vestido "Romance Chic"'
  },
  {
    id: 'rev-3',
    userName: 'Sofia B.',
    userAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=150&auto=format&fit=crop',
    comment: 'Compré las sábanas satinadas y el lip gloss glow. ¡Pagué por Binance en 2 minutos y la atención por WhatsApp fue súper atenta!',
    rating: 5,
    date: 'Hace 2 semanas',
    productName: 'Juego de Sábanas Satinadas'
  }
];
