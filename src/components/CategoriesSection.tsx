"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CategoriesSection = () => {
  const categories = [
    {
      id: "beauty",
      name: "Beauty",
      description: "Cosmetics & skincare",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
      href: "/categories/beauty",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      id: "fragrances",
      name: "Fragrances",
      description: "Luxury perfumes",
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop",
      href: "/categories/fragrances",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      id: "furniture",
      name: "Furniture",
      description: "Modern home decor",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      href: "/categories/furniture",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      id: "groceries",
      name: "Groceries",
      description: "Fresh food & essentials",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
      href: "/categories/groceries",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of products carefully curated for
            your lifestyle
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={category.href}>
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white">
                  <div className="relative">
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`}
                    />

                    {/* Image Placeholder */}
                    <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                      >
                        <span className="text-2xl">
                          {category.id === "beauty"
                            ? "�"
                            : category.id === "fragrances"
                            ? "🌸"
                            : category.id === "furniture"
                            ? "�️"
                            : "�"}
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {category.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
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
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
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

export default CategoriesSection;
