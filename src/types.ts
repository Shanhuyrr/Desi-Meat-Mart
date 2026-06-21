export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  spiceLevel?: 0 | 1 | 2 | 3; // 0 = None, 1 = Mild, 2 = Medium, 3 = Hot
  prepTime?: string; // e.g. "15 mins"
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  role: string;
  location: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface OrderFormData {
  fullName: string;
  phone: string;
  address: string;
  deliveryInstructions: string;
  paymentMethod: 'COD' | 'BankTransfer';
}

export interface ShopInfo {
  name: string;
  phone: string;
  whatsappNumber: string; // international format without spaces/plus, e.g. "923001234567"
  address: string;
  googleMapEmbedUrl?: string;
  email: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  openingHours: string;
}
