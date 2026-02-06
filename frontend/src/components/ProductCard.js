import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { trackInteraction } from '../services/recommendationService';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { token, user } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success('Added to cart!');

    // Track interaction
    if (token && user?.consentToTracking) {
      await trackInteraction(token, product._id, 'add_to_cart');
    }
  };

  const handleClick = async () => {
    // Track click interaction
    if (token && user?.consentToTracking) {
      await trackInteraction(token, product._id, 'click');
    }
  };

  return (
    <Link
      to={`/products/${product._id}`}
      onClick={handleClick}
      className="card group"
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = `https://via.placeholder.com/400x400/e5e7eb/6b7280?text=${encodeURIComponent(product.category)}`;
          }}
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>

        {/* Name */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <FiStar className="text-yellow-400 fill-current" size={16} />
          <span className="text-sm text-gray-600 ml-1">
            {product.rating.average.toFixed(1)} ({product.rating.count})
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn-primary flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiShoppingCart size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
