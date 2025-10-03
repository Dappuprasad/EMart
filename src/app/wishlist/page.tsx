"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore, useWishlistStore } from "@/lib/store";

const WishlistPage = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleRemoveFromWishlist = (productId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeItem(productId);
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="text-gray-400 mb-6">
              <Heart className="w-24 h-24 mx-auto" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your wishlist is empty</h1>
            <p className="text-gray-600 mb-8">
              Save your favorite items here so you don&apos;t lose them!
            </p>
            <Button size="lg" asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </motion.div>
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
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Wishlist</h1>
              <p className="text-gray-600 mt-2">
                {items.length} {items.length === 1 ? "item" : "items"} saved for
                later
              </p>
            </div>
            {items.length > 0 && (
              <Button
                variant="outline"
                onClick={clearWishlist}
                className="text-red-600 hover:text-red-700 hover:border-red-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </motion.div>

        {/* Wishlist Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {items.map((product, index) => (
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

                      {/* Remove from Wishlist */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white text-red-500"
                        onClick={(e) => handleRemoveFromWishlist(product.id, e)}
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <Badge
                          variant="secondary"
                          className="text-xs mb-1 capitalize"
                        >
                          {product.category}
                        </Badge>
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
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Add All to Cart */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              onClick={() => items.forEach((product) => addToCart(product, 1))}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add All to Cart ({items.length} items)
            </Button>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default WishlistPage;
