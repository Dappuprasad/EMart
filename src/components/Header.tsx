"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Search,
  User,
  Heart,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const totalItems = useCartStore((state) => state.getTotalItems());
  const categoriesRef = useRef<HTMLDivElement>(null);

  const categories = [
    { name: "Beauty", href: "/categories/beauty", icon: "💄" },
    { name: "Fragrances", href: "/categories/fragrances", icon: "🌸" },
    { name: "Furniture", href: "/categories/furniture", icon: "🛋️" },
    { name: "Groceries", href: "/categories/groceries", icon: "🛒" },
  ];

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/deals", label: "Deals" },
  ];

  // Close categories dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node)
      ) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            EMart
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}

          {/* Categories Dropdown */}
          <div className="relative" ref={categoriesRef}>
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary"
            >
              <span>Categories</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCategoriesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
              >
                <Link
                  href="/categories"
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  onClick={() => setIsCategoriesOpen(false)}
                >
                  <span className="mr-3">📂</span>
                  All Categories
                </Link>
                <div className="border-t border-gray-100 my-1" />
                {categories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                    onClick={() => setIsCategoriesOpen(false)}
                  >
                    <span className="mr-3">{category.icon}</span>
                    {category.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        </nav>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Wishlist */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/wishlist">
              <Heart className="w-5 h-5" />
            </Link>
          </Button>

          {/* User Account */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account">
              <User className="w-5 h-5" />
            </Link>
          </Button>

          {/* Shopping Cart */}
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isMenuOpen ? "auto" : 0 }}
        className="md:hidden overflow-hidden border-t bg-background"
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>

          {/* Mobile Navigation */}
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-2 py-1 text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Categories */}
            <div className="px-2 py-1">
              <div className="text-sm font-medium text-gray-900 mb-2">
                Categories
              </div>
              <div className="ml-2 space-y-1">
                <Link
                  href="/categories"
                  className="flex items-center px-2 py-1 text-sm text-gray-600 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-2">📂</span>
                  All Categories
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="flex items-center px-2 py-1 text-sm text-gray-600 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
