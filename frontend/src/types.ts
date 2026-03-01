export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  total: number;
  createdAt: string;
  status: string;
  items: OrderItem[];
}

export interface User {
  id: number;
  username: string;
  role: string;
}
