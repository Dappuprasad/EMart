import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const quickLinks = [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/shipping", label: "Shipping Info" },
    { href: "/returns", label: "Returns" },
    { href: "/faq", label: "FAQ" },
  ];

  const categories = [
    { href: "/products/electronics", label: "Electronics" },
    { href: "/products/fashion", label: "Fashion" },
    { href: "/products/home", label: "Home & Garden" },
    { href: "/products/sports", label: "Sports" },
    { href: "/products/books", label: "Books" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EMart
            </h3>
            <p className="text-sm text-gray-600">
              Your trusted online shopping destination for quality products at
              unbeatable prices.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>support@emart.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>123 Commerce St, City, State 12345</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold">Categories</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold">Stay Updated</h4>
            <p className="text-sm text-gray-600">
              Subscribe to our newsletter for exclusive deals and updates.
            </p>
            <div className="space-y-2">
              <Input placeholder="Enter your email" />
              <Button className="w-full">Subscribe</Button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-2 pt-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <Link href={social.href} aria-label={social.label}>
                    <social.icon className="w-4 h-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © 2024 EMart. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
