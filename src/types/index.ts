export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  addresses?: Address[];
  orders?: Order[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: Address;
  orderDate: string;
  estimatedDelivery?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
}
