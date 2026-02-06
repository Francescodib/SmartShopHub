import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getProducts, getCategories, getBrands } from '../services/productService';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  // Filters state
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    search: searchParams.get('search') || '',
    page: parseInt(searchParams.get('page')) || 1
  });

  // Sync filters with URL params when URL changes
  useEffect(() => {
    setFilters({
      category: searchParams.get('category') || '',
      brand: searchParams.get('brand') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      search: searchParams.get('search') || '',
      page: parseInt(searchParams.get('page')) || 1
    });
  }, [searchParams]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [cats, brandsList] = await Promise.all([
          getCategories(),
          getBrands()
        ]);
        setCategories(cats);
        setBrands(brandsList);
      } catch (error) {
        console.error('Failed to fetch filters:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts(filters);
        setProducts(data.data);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: value,
      page: 1 // Reset to first page when filters change
    };

    setFilters(newFilters);

    // Update URL params
    const params = {};
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params[k] = v;
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    const newFilters = {
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      search: '',
      page: 1
    };

    setFilters(newFilters);
    setSearchParams({}); // Clear URL params
  };

  const handlePageChange = (newPage) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);

    // Update URL params
    const params = {};
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params[k] = v;
    });
    setSearchParams(params);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeFilter = (key) => {
    handleFilterChange(key, '');
  };

  // Check if any filters are active
  const hasActiveFilters = filters.category || filters.brand || filters.search || filters.minPrice || filters.maxPrice;

  const formatCategoryName = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">
              {pagination.total || 0} products found
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden btn-primary flex items-center space-x-2"
          >
            <FiFilter />
            <span>Filters</span>
          </button>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Active Filters:</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <div className="flex items-center space-x-2 bg-primary-100 text-primary-800 px-3 py-1.5 rounded-full text-sm">
                  <span>Search: <span className="font-medium">{filters.search}</span></span>
                  <button
                    onClick={() => removeFilter('search')}
                    className="hover:text-primary-900"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              )}
              {filters.category && (
                <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm">
                  <span>Category: <span className="font-medium">{formatCategoryName(filters.category)}</span></span>
                  <button
                    onClick={() => removeFilter('category')}
                    className="hover:text-blue-900"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              )}
              {filters.brand && (
                <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm">
                  <span>Brand: <span className="font-medium">{filters.brand}</span></span>
                  <button
                    onClick={() => removeFilter('brand')}
                    className="hover:text-green-900"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              )}
              {(filters.minPrice || filters.maxPrice) && (
                <div className="flex items-center space-x-2 bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-sm">
                  <span>Price: <span className="font-medium">
                    {filters.minPrice && `$${filters.minPrice}`}
                    {filters.minPrice && filters.maxPrice && ' - '}
                    {filters.maxPrice && `$${filters.maxPrice}`}
                  </span></span>
                  <button
                    onClick={() => {
                      removeFilter('minPrice');
                      removeFilter('maxPrice');
                    }}
                    className="hover:text-purple-900"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search products..."
                  className="input-field"
                />
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    placeholder="Min"
                    className="input-field"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    placeholder="Max"
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <LoadingSpinner />
            ) : products.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">No products found</p>
                <button onClick={clearFilters} className="btn-primary mt-4">
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex items-center justify-center space-x-2 mt-8">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    <div className="flex items-center space-x-2">
                      {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            page === pagination.page
                              ? 'bg-primary-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.pages}
                      className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
