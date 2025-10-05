"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart, Tag, Zap } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { productAPI } from "@/lib/api";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { Product } from "@/types";

const DealsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const addToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const allProducts = await productAPI.getProducts();

        // Filter products with significant discounts (>10%) and sort by discount percentage
        const dealsProducts = allProducts
          .filter((product) => product.discountPercentage > 10)
          .sort((a, b) => b.discountPercentage - a.discountPercentage);

        setProducts(dealsProducts);
      } catch (error) {
        console.error("Failed to fetch deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

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

  const calculateDiscountedPrice = (
    price: number,
    discountPercentage: number
  ) => {
    return price - (price * discountPercentage) / 100;
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-yellow-500 mr-2" />
            <h1 className="text-4xl font-bold">Hot Deals</h1>
            <Zap className="w-8 h-8 text-yellow-500 ml-2" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these amazing deals! Save big on quality products
            with discounts up to{" "}
            {products.length > 0 &&
              Math.round(
                Math.max(...products.map((p) => p.discountPercentage))
              )}
            % off.
          </p>
          <Badge variant="destructive" className="mt-4 text-lg px-4 py-2">
            <Tag className="w-4 h-4 mr-1" />
            {products.length} deals available
          </Badge>
        </motion.div>

        {/* Deals Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {products.map((product, index) => {
            const discountedPrice = calculateDiscountedPrice(
              product.price,
              product.discountPercentage
            );
            const savings = product.price - discountedPrice;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/products/${product.id}`}>
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border-0 relative">
                    {/* Discount Badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <Badge variant="destructive" className="font-bold">
                        -{Math.round(product.discountPercentage)}%
                      </Badge>
                    </div>

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
                        <Badge className="absolute bottom-2 left-2 bg-white/90 text-gray-800 border-0">
                          <Star className="w-3 h-3 fill-current text-yellow-400 mr-1" />
                          {product.rating.toFixed(1)}
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

                        {/* Price Section */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-primary">
                                ${discountedPrice.toFixed(2)}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ${product.price.toFixed(2)}
                              </span>
                            </div>
                            <Button
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => handleAddToCart(product, e)}
                            >
                              <ShoppingCart className="w-3 h-3 mr-1" />
                              Add
                            </Button>
                          </div>
                          <p className="text-xs text-green-600 font-medium">
                            Save ${savings.toFixed(2)}
                          </p>
                        </div>

                        {/* Stock Status */}
                        {product.stock < 20 && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-xs text-orange-600 font-medium">
                              Only {product.stock} left in stock
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Deals Message */}
        {products.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              No deals available right now
            </h3>
            <p className="text-gray-600 mb-6">
              Check back later or browse our regular products for great value.
            </p>
            <Button asChild>
              <Link href="/products">Browse All Products</Link>
            </Button>
          </motion.div>
        )}

        {/* Call to Action */}
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold mb-4">Want more great deals?</h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter and never miss out on exclusive offers
              and flash sales.
            </p>
            <Button size="lg">Subscribe for Deals</Button>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default DealsPage;
