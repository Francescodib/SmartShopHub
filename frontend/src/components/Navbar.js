import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiLogOut, FiHome, FiPackage, FiMenu, FiX, FiSearch, FiChevronDown, FiShoppingBag } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Laptops', slug: 'laptops' },
    { name: 'Smartphones', slug: 'smartphones' },
    { name: 'Headphones', slug: 'headphones' },
    { name: 'Smartwatches', slug: 'smartwatches' },
    { name: 'Tablets', slug: 'tablets' },
    { name: 'Accessories', slug: 'accessories' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const handleCategoryClick = (slug) => {
    navigate(`/products?category=${slug}`);
    setCategoriesOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/images/logo.png"
              alt="SmartShop Hub Logo"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="text-xl font-bold text-gray-800 hidden sm:inline">SmartShop Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <FiHome size={18} />
              <span>Home</span>
            </Link>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <FiPackage size={18} />
                <span>Categories</span>
                <FiChevronDown size={16} className={`transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/products"
                    onClick={() => setCategoriesOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
                  >
                    All Products
                  </Link>
                  <div className="border-t my-2"></div>
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => handleCategoryClick(cat.slug)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isAuthenticated && (
              <Link
                to="/profile?tab=orders"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <FiShoppingBag size={18} />
                <span>Orders</span>
              </Link>
            )}
          </div>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </form>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <FiShoppingCart size={20} />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {/* User Menu (Desktop) */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <FiUser size={20} />
                    <span className="hidden lg:inline">{user?.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <FiLogOut size={20} />
                    <span className="hidden lg:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-primary-600"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="px-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </form>

            {/* Mobile Nav Links */}
            <div className="space-y-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
              >
                <FiHome size={18} />
                <span>Home</span>
              </Link>

              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
              >
                <FiPackage size={18} />
                <span>All Products</span>
              </Link>

              {/* Mobile Categories */}
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Categories</p>
                <div className="space-y-1 pl-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => handleCategoryClick(cat.slug)}
                      className="block w-full text-left py-1 text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {isAuthenticated && (
                <Link
                  to="/profile?tab=orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
                >
                  <FiShoppingBag size={18} />
                  <span>My Orders</span>
                </Link>
              )}

              {/* Mobile User Menu */}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
                  >
                    <FiUser size={18} />
                    <span>{user?.name}</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
                  >
                    <FiLogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="px-4 py-2 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center btn-primary"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Close dropdown when clicking outside */}
      {categoriesOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setCategoriesOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
