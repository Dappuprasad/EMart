"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Zap, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const features = [
    {
      icon: ShoppingBag,
      title: "Wide Selection",
      description: "Thousands of products across all categories",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Same-day delivery in select areas",
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Your data and payments are protected",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              ✨ Welcome to EMart
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl lg:text-6xl font-bold tracking-tight"
            >
              Shop Smart,
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Live Better
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              Discover amazing products at unbeatable prices. From electronics
              to fashion, we&apos;ve got everything you need for a modern
              lifestyle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="group" asChild>
                <Link href="/products">
                  Start Shopping
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center gap-8 pt-8 border-t"
            >
              <div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">99%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image/Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-400 to-purple-600 p-8">
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 h-full flex items-center justify-center">
                <motion.div
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [-1, 1, -1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-white text-center"
                >
                  <ShoppingBag className="w-24 h-24 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">
                    Premium Shopping Experience
                  </h3>
                  <p className="text-blue-100">
                    Quality products, competitive prices
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border"
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
