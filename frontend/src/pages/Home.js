import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiZap } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import RecommendationSection from '../components/RecommendationSection';
import { getFeaturedProducts, getCategories } from '../services/productService';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featured, cats] = await Promise.all([
          getFeaturedProducts(8),
          getCategories()
        ]);
        setFeaturedProducts(featured);
        setCategories(cats);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center mb-4">
              <FiZap className="mr-2" size={32} />
              <span className="text-lg font-semibold">AI-Powered Shopping</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Discover Products You'll Love
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Experience personalized shopping with our AI recommendation engine.
              Find exactly what you need, faster than ever before.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="p-6 bg-gray-50 rounded-lg text-center hover:bg-primary-50 hover:text-primary-600 transition-colors group"
              >
                <div className="text-4xl mb-2">
                  {category === 'laptops' && '💻'}
                  {category === 'smartphones' && '📱'}
                  {category === 'headphones' && '🎧'}
                  {category === 'smartwatches' && '⌚'}
                  {category === 'tablets' && '📱'}
                  {category === 'accessories' && '🔌'}
                </div>
                <h3 className="font-semibold capitalize">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Recommendations Section */}
      <RecommendationSection />

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
            <Link
              to="/products"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center"
            >
              View All
              <FiArrowRight className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiZap className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Recommendations</h3>
              <p className="text-gray-600">
                Our smart algorithm learns your preferences to suggest products you'll love
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable shipping on all orders
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
              <p className="text-gray-600">
                Your data is protected with industry-standard encryption
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
