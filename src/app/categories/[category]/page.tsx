"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart, ArrowLeft, Filter } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { productAPI } from "@/lib/api";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { Product } from "@/types";

const CategoryPage = () => {
  const params = useParams();
  const router = useRouter();
  const categoryName = decodeURIComponent(params.category as string);

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "default" | "price-asc" | "price-desc" | "rating"
  >("default");

  const addToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const categoryProducts = await productAPI.getProductsByCategory(
          categoryName
        );
        setProducts(categoryProducts);
        setFilteredProducts(categoryProducts);
      } catch (error) {
        console.error("Failed to fetch category products:", error);
        // If category doesn't exist, redirect to all products
        router.push("/products");
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchCategoryProducts();
    }
  }, [categoryName, router]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, sortBy]);

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

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "beauty":
        return "💄";
      case "fragrances":
        return "🌸";
      case "furniture":
        return "🛋️";
      case "groceries":
        return "🛒";
      default:
        return "📦";
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
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
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button variant="ghost" asChild>
            <Link href="/categories">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Categories
            </Link>
          </Button>
        </motion.div>

        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-3">
              {getCategoryIcon(categoryName)}
            </span>
            <h1 className="text-4xl font-bold capitalize">{categoryName}</h1>
          </div>
          <p className="text-lg text-gray-600">
            Discover our collection of {products.length} {categoryName} products
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Search */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Search in {categoryName}
              </label>
              <div className="relative">
                <Input
                  placeholder={`Search ${categoryName} products...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
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
                        src={product.thumbnail}
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
                        {product.rating.toFixed(1)}
                      </Badge>

                      {/* Discount Badge */}
                      {product.discountPercentage > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute bottom-2 left-2"
                        >
                          -{Math.round(product.discountPercentage)}%
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          {product.title}
                        </h3>
                        {product.brand && (
                          <p className="text-xs text-gray-500 mt-1">
                            {product.brand}
                          </p>
                        )}
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

                      {/* Stock Info */}
                      {product.stock < 10 && (
                        <p className="text-xs text-orange-600">
                          Only {product.stock} left in stock
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredProducts.length === 0 && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or browse all {categoryName}{" "}
              products.
            </p>
            <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
          </motion.div>
        )}

        {/* No Products in Category */}
        {products.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">{getCategoryIcon(categoryName)}</div>
            <h3 className="text-xl font-semibold mb-2">
              No products in this category
            </h3>
            <p className="text-gray-600 mb-6">
              We're working on adding more {categoryName} products. Check back
              soon!
            </p>
            <Button asChild>
              <Link href="/products">Browse All Products</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
