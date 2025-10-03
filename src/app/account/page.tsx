"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  LogOut,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AccountPage = () => {
  const accountSections = [
    {
      title: "Personal Information",
      description: "Update your profile details and preferences",
      icon: User,
      href: "/account/profile",
      color: "text-blue-600",
    },
    {
      title: "Order History",
      description: "View your past orders and track current ones",
      icon: ShoppingBag,
      href: "/account/orders",
      color: "text-green-600",
    },
    {
      title: "Wishlist",
      description: "Manage your saved items",
      icon: Heart,
      href: "/wishlist",
      color: "text-red-600",
    },
    {
      title: "Addresses",
      description: "Manage your shipping addresses",
      icon: MapPin,
      href: "/account/addresses",
      color: "text-purple-600",
    },
    {
      title: "Settings",
      description: "Privacy, notifications, and security settings",
      icon: Settings,
      href: "/account/settings",
      color: "text-gray-600",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-4">My Account</h1>
          <p className="text-gray-600">
            Manage your EMart account and preferences
          </p>
        </motion.div>

        {/* Account Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {accountSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Link href={section.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gray-50`}>
                        <section.icon className={`w-6 h-6 ${section.color}`} />
                      </div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {section.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AccountPage;
