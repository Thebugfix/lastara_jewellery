import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import api from '../../lib/api';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPurity, setSelectedPurity] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', 'Necklaces', 'Earrings', 'Rings', 'Bangles', 'Bracelets'];
  const purities = ['all', '22K', '24K', '18K', '14K'];

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchTerm) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Purity filter
    if (selectedPurity !== 'all') {
      result = result.filter(product => product.purity === selectedPurity);
    }

    // Price filter (if pricePerGram exists)
    result = result.filter(product => {
      if (!product.pricePerGram || !product.weight) return true;
      const totalPrice = product.pricePerGram * product.weight;
      return totalPrice >= priceRange.min && totalPrice <= priceRange.max;
    });

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, selectedPurity, priceRange, products]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedPurity('all');
    setPriceRange({ min: 0, max: 100000 });
  };

  return (
    <section className="py-16 px-4 bg-[#FFF9F3]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0d2844] mb-4">Our Collection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our exquisite collection of handcrafted jewelry pieces
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a341]"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-6 py-3 bg-[#0d2844] text-white rounded-lg hover:bg-opacity-90"
            >
              <Filter size={20} />
              Filters
            </button>

            {/* Category Dropdown (Desktop) */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="hidden md:block px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a341]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            {/* Purity Dropdown (Desktop) */}
            <select
              value={selectedPurity}
              onChange={(e) => setSelectedPurity(e.target.value)}
              className="hidden md:block px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a341]"
            >
              {purities.map(purity => (
                <option key={purity} value={purity}>
                  {purity === 'all' ? 'All Purities' : purity}
                </option>
              ))}
            </select>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory !== 'all' || selectedPurity !== 'all') && (
              <button
                onClick={clearFilters}
                className="hidden md:flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <X size={20} />
                Clear
              </button>
            )}
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="md:hidden mt-4 pt-4 border-t space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purity</label>
                <select
                  value={selectedPurity}
                  onChange={(e) => setSelectedPurity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                >
                  {purities.map(purity => (
                    <option key={purity} value={purity}>
                      {purity === 'all' ? 'All Purities' : purity}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={clearFilters}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <X size={20} />
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-600">
          Showing <span className="font-semibold">{filteredProducts.length}</span> of{' '}
          <span className="font-semibold">{products.length}</span> products
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-64 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-6 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💎</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-[#0d2844] text-white rounded-lg hover:bg-opacity-90"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;