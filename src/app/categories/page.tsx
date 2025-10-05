"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { productAPI } from "@/lib/api";
import { Product } from "@/types";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryData, setCategoryData] = useState<{
    [key: string]: { products: Product[]; count: number };
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const [categoriesResponse, allProducts] = await Promise.all([
          productAPI.getCategories(),
          productAPI.getProducts(),
        ]);

        setCategories(categoriesResponse);

        // Group products by category and get featured product for each
        const categoryMap: {
          [key: string]: { products: Product[]; count: number };
        } = {};

        categoriesResponse.forEach((category) => {
          const categoryProducts = allProducts.filter(
            (product) => product.category === category
          );
          categoryMap[category] = {
            products: categoryProducts,
            count: categoryProducts.length,
          };
        });

        setCategoryData(categoryMap);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesData();
  }, []);

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

  const getCategoryGradient = (category: string) => {
    switch (category.toLowerCase()) {
      case "beauty":
        return "from-pink-500 to-rose-500";
      case "fragrances":
        return "from-purple-500 to-violet-500";
      case "furniture":
        return "from-amber-500 to-orange-500";
      case "groceries":
        return "from-green-500 to-emerald-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border">
                  <div className="bg-gray-200 h-32 rounded-lg mb-4"></div>
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
          <h1 className="text-4xl font-bold mb-4">Shop by Categories</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of products organized by categories.
            Find exactly what you're looking for with ease.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => {
            const data = categoryData[category];
            const featuredProduct = data?.products?.[0];

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/products?category=${category}`}>
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border-0 h-full">
                    {/* Category Header */}
                    <div
                      className={`relative p-8 bg-gradient-to-br ${getCategoryGradient(
                        category
                      )} text-white`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl mb-2">
                            {getCategoryIcon(category)}
                          </div>
                          <h3 className="text-2xl font-bold capitalize">
                            {category}
                          </h3>
                          <Badge
                            variant="secondary"
                            className="mt-2 bg-white/20 text-white border-0"
                          >
                            {data?.count || 0} products
                          </Badge>
                        </div>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Featured Products Preview */}
                    <CardContent className="p-6">
                      {featuredProduct ? (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-800 mb-3">
                            Featured Product
                          </h4>
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={featuredProduct.thumbnail}
                                alt={featuredProduct.title}
                                width={64}
                                height={64}
                                className="object-contain w-full h-full"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {featuredProduct.title}
                              </p>
                              <p className="text-lg font-bold text-primary">
                                ${featuredProduct.price.toFixed(2)}
                              </p>
                            </div>
                          </div>

                          {/* Product Count Summary */}
                          <div className="pt-4 border-t">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span>Available Products:</span>
                              <span className="font-semibold">
                                {data.count}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center py-8 text-gray-500">
                          <Package className="w-8 h-8 mr-2" />
                          <span>No products available</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-gray-600 mb-6">
            Browse all our products or use our search feature to find specific
            items.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/products">
                Browse All Products
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
