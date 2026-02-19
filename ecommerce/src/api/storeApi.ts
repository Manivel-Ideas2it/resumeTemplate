import type { Product } from '../types/product';

const BASE_URL = 'https://fakestoreapi.com';

export async function fetchProducts(limit = 20): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}
