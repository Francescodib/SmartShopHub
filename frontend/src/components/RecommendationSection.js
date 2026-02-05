import React, { useEffect, useState } from 'react';
import { FiTrendingUp, FiZap } from 'react-icons/fi';
import ProductCard from './ProductCard';
import { useAuth } from '../context/AuthContext';
import { getRecommendations, getPopularProducts } from '../services/recommendationService';

const RecommendationSection = () => {
  const { token, user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('Popular Products');
  const [subtitle, setSubtitle] = useState('Trending items in our store');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);

        // If user is logged in and has consent, show personalized recommendations
        if (token && user?.consentToTracking) {
          try {
            const recommendations = await getRecommendations(token, 8);
            setProducts(recommendations);
            setTitle('Recommended For You');
            setSubtitle('Based on your browsing and purchase history');
          } catch (error) {
            // Fallback to popular products
            const popular = await getPopularProducts(8);
            setProducts(popular);
          }
        } else {
          // Show popular products for non-authenticated or non-consenting users
          const popular = await getPopularProducts(8);
          setProducts(popular);
        }
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [token, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center mb-8">
          {user?.consentToTracking ? (
            <FiZap className="text-primary-600 mr-2" size={24} />
          ) : (
            <FiTrendingUp className="text-primary-600 mr-2" size={24} />
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-600 text-sm">{subtitle}</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;
