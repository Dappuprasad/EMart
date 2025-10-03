import axios from "axios";
import { Product } from "@/types";

const API_BASE_URL = "https://fakestoreapi.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const productAPI = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get("/products");
    return response.data;
  },

  // Get single product
  getProduct: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    const response = await api.get("/products/categories");
    return response.data;
  },

  // Get limited products
  getLimitedProducts: async (limit: number): Promise<Product[]> => {
    const response = await api.get(`/products?limit=${limit}`);
    return response.data;
  },

  // Sort products
  getSortedProducts: async (
    sort: "asc" | "desc" = "asc"
  ): Promise<Product[]> => {
    const response = await api.get(`/products?sort=${sort}`);
    return response.data;
  },
};

export default api;
