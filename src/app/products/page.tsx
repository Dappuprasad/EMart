"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Heart,
  Filter,
  Search,
  ChevronDown,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { productAPI } from "@/lib/api";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { Product } from "@/types";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "default" | "price-asc" | "price-desc" | "rating"
  >("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const addToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productAPI.getProducts(),
          productAPI.getCategories(),
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);

        // Calculate price range
        const prices = productsData.map((p) => p.price);
        const minPrice = Math.floor(Math.min(...prices));
        const maxPrice = Math.ceil(Math.max(...prices));
        setPriceRange([minPrice, maxPrice]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, sortBy, searchQuery, priceRange]);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleAddToWishlist = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-6 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-4">All Products</h1>
          <p className="text-gray-600">
            Discover our complete collection of {products.length} products
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Search */}
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="text-sm font-medium mb-2 block">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="text-center">
              <Badge variant="secondary" className="text-sm">
                {filteredProducts.length} products found
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Link href={`/products/${product.id}`}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border-0">
                  <div className="relative overflow-hidden">
                    <div className="aspect-square bg-white p-4 relative">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Actions */}
                      <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`bg-white/80 backdrop-blur-sm hover:bg-white ${
                            isInWishlist(product.id)
                              ? "text-red-500"
                              : "text-gray-600"
                          }`}
                          onClick={(e) => handleAddToWishlist(product, e)}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isInWishlist(product.id) ? "fill-current" : ""
                            }`}
                          />
                        </Button>
                      </div>

                      {/* Rating */}
                      <Badge className="absolute top-2 left-2 bg-white/90 text-gray-800 border-0">
                        <Star className="w-3 h-3 fill-current text-yellow-400 mr-1" />
                        {product.rating.rate}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          {product.category}
                        </p>
                        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          {product.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                        <Button
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search terms
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSortBy("default");
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
