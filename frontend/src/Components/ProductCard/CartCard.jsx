import { RotateCcw, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartCard({
  title,
  image,
  Index,
  description,
  originalPrice,
  discountedPrice,
  rating,
  id,
  createdBy,
}) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-4">
      <div className="flex gap-6">
        {/* Product Image */}
        <div className="relative w-64">
          <Link to={`/product-details/${id}`}>
            <img
              src={image}
              alt="Product Image"
              className="rounded-lg object-cover"
            />
          </Link>
        </div>
        {/* Product Details */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
              <p className="text-lg text-gray-600">{description}</p>
              <p className="text-gray-500 mt-1">Sold by: {createdBy}</p>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          {/* Size and Quantity Selectors */}
          {/* Price Information */}
          <div className="mt-6 flex items-center gap-3">
            <span className="text-2xl font-bold">₹{originalPrice}</span>
            <span className="text-gray-500 line-through">
              ₹{discountedPrice}
            </span>
            <span className="text-red-500">{discountedPrice}% OFF</span>
          </div>
          {/* Return Policy */}
          <div className="mt-4 flex items-center gap-2 text-gray-600">
            <RotateCcw className="w-5 h-5" />
            <span>14 days return available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
