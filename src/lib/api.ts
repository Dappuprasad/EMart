import { Product, Cart } from "@/types";
import productsData from "../../Productsdata.json";
import cartsData from "../../cartdata.json";

// Simulate API delay for better UX
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const productAPI = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    await delay(300);
    return productsData.products;
  },

  // Get single product
  getProduct: async (id: number): Promise<Product> => {
    await delay(200);
    const product = productsData.products.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    await delay(250);
    return productsData.products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    await delay(150);
    const categorySet = new Set(productsData.products.map((p) => p.category));
    const categories = Array.from(categorySet);
    return categories;
  },

  // Get limited products
  getLimitedProducts: async (limit: number): Promise<Product[]> => {
    await delay(200);
    return productsData.products.slice(0, limit);
  },

  // Sort products
  getSortedProducts: async (
    sort: "asc" | "desc" = "asc"
  ): Promise<Product[]> => {
    await delay(300);
    const sorted = [...productsData.products].sort((a, b) => {
      if (sort === "asc") {
        return a.price - b.price;
      }
      return b.price - a.price;
    });
    return sorted;
  },

  // Search products
  searchProducts: async (query: string): Promise<Product[]> => {
    await delay(250);
    const lowerQuery = query.toLowerCase();
    return productsData.products.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  },

  // Get products with pagination
  getProductsPaginated: async (
    page: number = 1,
    limit: number = 10
  ): Promise<{
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    await delay(300);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = productsData.products.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total: productsData.products.length,
      page,
      totalPages: Math.ceil(productsData.products.length / limit),
    };
  },
};

export const cartAPI = {
  // Get all carts
  getCarts: async (): Promise<Cart[]> => {
    await delay(200);
    return cartsData.carts;
  },

  // Get single cart
  getCart: async (id: number): Promise<Cart> => {
    await delay(150);
    const cart = cartsData.carts.find((c) => c.id === id);
    if (!cart) {
      throw new Error(`Cart with id ${id} not found`);
    }
    return cart;
  },

  // Get carts by user ID
  getCartsByUser: async (userId: number): Promise<Cart[]> => {
    await delay(200);
    return cartsData.carts.filter((c) => c.userId === userId);
  },
};
