"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  Share2,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productAPI } from "@/lib/api";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { Product } from "@/types";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const addToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const productData = await productAPI.getProduct(Number(id));
        setProduct(productData);

        // Fetch related products from the same category
        const categoryProducts = await productAPI.getProductsByCategory(
          productData.category
        );
        const related = categoryProducts
          .filter((p) => p.id !== productData.id)
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-200 h-96 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">
              The product you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Button asChild>
              <Link href="/products">Back to Products</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: Shield,
      title: "Warranty",
      description: "1-year manufacturer warranty",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-gray-600 mb-8"
        >
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">
            Products
          </Link>
          <span>/</span>
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-primary capitalize"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 truncate">{product.title}</span>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button variant="ghost" asChild>
            <Link href="/products">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Products
            </Link>
          </Button>
        </motion.div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-lg p-8 shadow-sm border sticky top-8">
              <div className="aspect-square relative mb-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Image thumbnails would go here in a real implementation */}
              <div className="flex gap-2 justify-center">
                <div className="w-16 h-16 border-2 border-primary rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={64}
                    height={64}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <Badge variant="secondary" className="mb-2 capitalize">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating.rate)
                          ? "fill-current text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-primary mb-6">
                ${product.price.toFixed(2)}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={incrementQuantity}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-600">
                    Total: ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={handleAddToCart} className="flex-1">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant={isInWishlist(product.id) ? "default" : "outline"}
                  size="lg"
                  onClick={handleAddToWishlist}
                >
                  <Heart
                    className={`w-4 h-4 mr-2 ${
                      isInWishlist(product.id) ? "fill-current" : ""
                    }`}
                  />
                  {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              {features.map((feature) => (
                <div key={feature.title} className="text-center">
                  <feature.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-medium text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-t pt-16"
          >
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                >
                  <Card className="group hover:shadow-lg transition-shadow">
                    <div className="aspect-square p-4 relative">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-sm line-clamp-2 mb-2">
                        {relatedProduct.title}
                      </h3>
                      <p className="text-lg font-bold text-primary">
                        ${relatedProduct.price.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
