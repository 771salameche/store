import type { Product, Order } from "./types.js";

const BASE_URL = "http://localhost:8080";

export interface OrderPayload {
  customerName: string;
  customerEmail: string;
  items: { productId: number; quantity: number }[];
}

export interface Credentials {
  username: string;
  password: string;
}

function basicAuthHeader(credentials: Credentials): string {
  return "Basic " + btoa(`${credentials.username}:${credentials.password}`);
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/api/products`);
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  return res.json();
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/api/products/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);
  return res.json();
}

export async function placeOrder(
  payload: OrderPayload,
  credentials: Credentials
): Promise<Order> {
  const res = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: basicAuthHeader(credentials),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to place order: ${res.status}`);
  return res.json();
}

export async function getOrders(credentials: Credentials): Promise<Order[]> {
  const res = await fetch(`${BASE_URL}/api/orders`, {
    headers: {
      Authorization: basicAuthHeader(credentials),
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`);
  return res.json();
}
