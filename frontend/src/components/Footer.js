import React from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiTwitter,
  FiLinkedin,
} from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/images/logo.png"
                alt="SmartShop Hub Logo"
                className="w-8 h-8 rounded-lg"
              />
              <h3 className="text-xl font-bold text-white">SmartShop Hub</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your one-stop destination for the latest electronics and gadgets.
              Powered by AI recommendations for a personalized shopping
              experience.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-sm hover:text-white transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=laptops"
                  className="text-sm hover:text-white transition-colors"
                >
                  Laptops
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=smartphones"
                  className="text-sm hover:text-white transition-colors"
                >
                  Smartphones
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=headphones"
                  className="text-sm hover:text-white transition-colors"
                >
                  Headphones
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/profile"
                  className="text-sm hover:text-white transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to="/profile?tab=orders"
                  className="text-sm hover:text-white transition-colors"
                >
                  Order History
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-sm hover:text-white transition-colors"
                >
                  Shopping Cart
                </Link>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-sm hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#shipping"
                  className="text-sm hover:text-white transition-colors"
                >
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiMapPin className="mt-1 flex-shrink-0" size={18} />
                <span className="text-sm">
                  123, Via Verdi
                  <br />
                  Bari - 70132, Italy
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone size={18} className="flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-sm hover:text-white transition-colors"
                >
                  +39 (080) 123-456
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail size={18} className="flex-shrink-0" />
                <a
                  href="mailto:support@smartshophub.com"
                  className="text-sm hover:text-white transition-colors"
                >
                  support@smartshophub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} SmartShop Hub. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#privacy"
                className="text-sm hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-sm hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#cookies"
                className="text-sm hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            This is a demonstration project showcasing full-stack development
            with AI integration.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
