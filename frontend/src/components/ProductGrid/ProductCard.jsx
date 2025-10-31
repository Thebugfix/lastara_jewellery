import { useState } from 'react';
import { Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    _id,
    title,
    images = [],
    purity,
    weight,
    pricePerGram,
    category,
    sku
  } = product;

  const totalPrice = pricePerGram && weight 
    ? (pricePerGram * weight).toLocaleString('en-IN')
    : null;

  const displayImage = images[currentImageIndex]?.url || 
    'https://via.placeholder.com/400x400?text=No+Image';

  const handleImageHover = () => {
    if (images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleImageLeave = () => {
    setCurrentImageIndex(0);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-square">
        <Link to={`/product/${_id}`}>
          <img
            src={displayImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
          />
        </Link>

        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-3">
            <Link
              to={`/product/${_id}`}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-[#c9a341] hover:text-white transition-colors"
              title="Quick View"
            >
              <Eye size={20} />
            </Link>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isFavorite
                  ? 'bg-red-500 text-white'
                  : 'bg-white hover:bg-[#c9a341] hover:text-white'
              }`}
              title="Add to Wishlist"
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {category && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-[#0d2844] text-white text-xs font-medium rounded-full">
            {category}
          </div>
        )}

        {purity && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-[#c9a341] text-white text-xs font-bold rounded-full">
            {purity}
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {images.slice(0, 3).map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4">
        {sku && (
          <p className="text-xs text-gray-500 mb-1">SKU: {sku}</p>
        )}

        <Link to={`/product/${_id}`}>
          <h3 className="text-lg font-semibold text-[#0d2844] mb-2 line-clamp-2 hover:text-[#c9a341] transition-colors">
            {title}
          </h3>
        </Link>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          {weight && (
            <span className="flex items-center gap-1">
              <span className="font-medium">Weight:</span> {weight}g
            </span>
          )}
        </div>

        {totalPrice && (
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-500">Total Price</p>
              <p className="text-xl font-bold text-[#c9a341]">₹{totalPrice}</p>
            </div>
            {pricePerGram && (
              <div className="text-right">
                <p className="text-xs text-gray-500">Per Gram</p>
                <p className="text-sm font-semibold text-gray-700">
                  ₹{pricePerGram.toLocaleString('en-IN')}
                </p>
              </div>
            )}
          </div>
        )}

        <Link
          to={`/product/${_id}`}
          className="block w-full py-2 text-center bg-[#0d2844] text-white rounded-lg hover:bg-[#c9a341] transition-colors font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;