"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { productAPI } from "@/lib/api";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { Product } from "@/types";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const data = await productAPI.getLimitedProducts(8);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
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

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Featured Products
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 animate-pulse"
              >
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-6 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products at amazing
            prices
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
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
                      {/* Wishlist Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white ${
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

                      {/* Rating Badge */}
                      <Badge className="absolute top-2 left-2 bg-white/90 text-gray-800 border-0">
                        <Star className="w-3 h-3 fill-current text-yellow-400 mr-1" />
                        {product.rating.rate}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" asChild>
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
