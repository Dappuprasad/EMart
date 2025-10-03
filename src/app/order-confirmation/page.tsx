"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Package, Truck, Mail, Home } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const OrderConfirmationPage = () => {
  // In a real app, you'd get this from the order API or route params
  const orderDetails = {
    orderNumber: "EMT-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    email: "customer@example.com",
    estimatedDelivery: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000
    ).toDateString(),
  };

  const timeline = [
    {
      step: "Order Placed",
      description: "We've received your order",
      icon: Check,
      status: "completed",
      time: "Just now",
    },
    {
      step: "Processing",
      description: "Preparing your items",
      icon: Package,
      status: "current",
      time: "Within 2 hours",
    },
    {
      step: "Shipped",
      description: "Your order is on the way",
      icon: Truck,
      status: "upcoming",
      time: "1-2 business days",
    },
    {
      step: "Delivered",
      description: "Package delivered",
      icon: Home,
      status: "upcoming",
      time: "3-5 business days",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.2,
            }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Check className="w-10 h-10 text-green-600" />
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold mb-4"
            >
              Order Confirmed!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-2"
            >
              Thank you for your purchase. Your order has been successfully
              placed.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-gray-500"
            >
              Order #{orderDetails.orderNumber}
            </motion.p>
          </motion.div>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Order Number</p>
                    <p className="font-medium">{orderDetails.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-medium">{orderDetails.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Estimated Delivery</p>
                    <p className="font-medium">
                      {orderDetails.estimatedDelivery}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Shipping Method</p>
                    <p className="font-medium">Standard Shipping</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800 mb-2">
                    <Mail className="w-4 h-4" />
                    <span className="font-medium">Confirmation Email Sent</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    A confirmation email with order details and tracking
                    information has been sent to your email address.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div
                        className={`
                        w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                        ${
                          item.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : item.status === "current"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-400"
                        }
                      `}
                      >
                        <item.icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`
                            font-medium
                            ${
                              item.status === "completed"
                                ? "text-green-800"
                                : item.status === "current"
                                ? "text-blue-800"
                                : "text-gray-600"
                            }
                          `}
                          >
                            {item.step}
                          </h4>
                          <Badge
                            variant={
                              item.status === "completed"
                                ? "default"
                                : item.status === "current"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {item.time}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="flex-1" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button variant="outline" size="lg" className="flex-1" asChild>
              <Link href="/account/orders">View Orders</Link>
            </Button>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-12 text-center"
          >
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  If you have any questions about your order, feel free to
                  contact us.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/faq">View FAQ</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;
