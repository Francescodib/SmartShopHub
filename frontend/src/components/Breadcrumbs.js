import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const [productInfo, setProductInfo] = useState(null);

  const isMongoId = (value) => {
    // MongoDB ObjectId is 24 characters hex string
    return /^[a-f\d]{24}$/i.test(value);
  };

  // Fetch product info when we detect a product ID in the URL
  useEffect(() => {
    const fetchProductInfo = async () => {
      const paths = location.pathname.split('/').filter((x) => x);

      // Check if we're on a product detail page
      if (paths.length >= 2 && paths[0] === 'products' && isMongoId(paths[1])) {
        try {
          const response = await axios.get(`${API_URL}/products/${paths[1]}`);
          if (response.data.success && response.data.data) {
            setProductInfo({
              name: response.data.data.name,
              category: response.data.data.category
            });
          }
        } catch (error) {
          console.error('Failed to fetch product info for breadcrumbs:', error);
          setProductInfo(null);
        }
      } else {
        setProductInfo(null);
      }
    };

    fetchProductInfo();
  }, [location.pathname]);

  // Don't show breadcrumbs on homepage
  if (pathnames.length === 0) {
    return null;
  }

  const formatBreadcrumb = (value) => {
    // Format normal breadcrumb
    return value
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const renderBreadcrumbItems = () => {
    const items = [];

    pathnames.forEach((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;

      // If this is a product ID and we have product info, show category and product name
      if (isMongoId(value) && productInfo && productInfo.category && productInfo.name) {
        // Add category breadcrumb first
        items.push(
          <li key={`category-${index}`} className="flex items-center space-x-2">
            <FiChevronRight size={16} className="text-gray-400" />
            <Link
              to={`/products?category=${productInfo.category}`}
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              {formatBreadcrumb(productInfo.category)}
            </Link>
          </li>
        );

        // Add product name (truncated if too long)
        const displayName = productInfo.name.length > 40
          ? productInfo.name.substring(0, 40) + '...'
          : productInfo.name;

        items.push(
          <li key={to} className="flex items-center space-x-2">
            <FiChevronRight size={16} className="text-gray-400" />
            <span className="text-gray-900 font-medium">
              {displayName}
            </span>
          </li>
        );
      } else if (isMongoId(value)) {
        // If it's a product ID but we don't have info yet, show loading or placeholder
        items.push(
          <li key={to} className="flex items-center space-x-2">
            <FiChevronRight size={16} className="text-gray-400" />
            <span className="text-gray-900 font-medium">
              Loading...
            </span>
          </li>
        );
      } else {
        // Regular breadcrumb
        items.push(
          <li key={to} className="flex items-center space-x-2">
            <FiChevronRight size={16} className="text-gray-400" />
            {isLast ? (
              <span className="text-gray-900 font-medium">
                {formatBreadcrumb(value)}
              </span>
            ) : (
              <Link
                to={to}
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                {formatBreadcrumb(value)}
              </Link>
            )}
          </li>
        );
      }
    });

    return items;
  };

  return (
    <nav className="bg-gray-50 border-b">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm flex-wrap">
          {/* Home */}
          <li>
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
            >
              <FiHome size={16} />
              <span className="ml-1">Home</span>
            </Link>
          </li>

          {renderBreadcrumbItems()}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
