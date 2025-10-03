"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/store";

const CartPage = () => {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

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
              <ShoppingBag className="w-24 h-24 mx-auto" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added anything to your cart yet. Start
              shopping to fill it up!
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
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} in your
            cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          width={128}
                          height={128}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between">
                          <div>
                            <Badge
                              variant="secondary"
                              className="text-xs mb-1 capitalize"
                            >
                              {item.product.category}
                            </Badge>
                            <h3 className="font-medium line-clamp-2">
                              <Link
                                href={`/products/${item.product.id}`}
                                className="hover:text-primary transition-colors"
                              >
                                {item.product.title}
                              </Link>
                            </h3>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.product.id)}
                            className="text-gray-400 hover:text-red-500 flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="h-8 w-8"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="h-8 w-8"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-sm text-gray-600">
                              ${item.product.price.toFixed(2)} each
                            </p>
                            <p className="font-bold text-primary">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Clear Cart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center pt-4"
            >
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 hover:border-red-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Summary Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal ({getTotalItems()} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600 font-medium">
                            FREE
                          </span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Free Shipping Notice */}
                  {subtotal < 50 && (
                    <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                      Add ${(50 - subtotal).toFixed(2)} more for FREE shipping!
                    </div>
                  )}

                  {/* Checkout Button */}
                  <Button size="lg" className="w-full" asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>

                  {/* Security Notice */}
                  <p className="text-xs text-gray-500 text-center">
                    Secure checkout powered by industry-standard encryption
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
