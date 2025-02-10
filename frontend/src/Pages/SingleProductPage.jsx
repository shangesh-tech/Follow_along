import axios from "axios";
import { HeartIcon, ShoppingBagIcon, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageModal from "../Components/imageModals/imageModal";

function SinglePageProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const getProductSingleDetail = async () => {
      const response = await axios.get(
        `http://localhost:8080/product/get-single/${id}`
      );

      setProduct(response.data.data);
    };

    getProductSingleDetail();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {product?.images?.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImage(idx);
                    setShowImageModal(true);
                  }}
                  className="aspect-[3/4] relative group overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`${product.title} - view ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">{product.brand}</h1>
              <p className="text-gray-600 mt-1">{product.title}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded">
                <span className="font-semibold">{product.rating}</span>
                <Star className="w-4 h-4 fill-green-700 text-green-700" />
              </div>
            </div>

            <div className="border-t border-b py-4 space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-2xl font-bold">
                  ₹{product.discountedPrice}
                </span>
                <span className="text-gray-500 line-through">
                  MRP ₹{product.originalPrice}
                </span>
                <span className="text-orange-500">
                  ({product.discount}% OFF)
                </span>
              </div>
              <p className="text-green-600 text-sm">inclusive of all taxes</p>
            </div>

            {/* Size Selection */}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-pink-500 text-white py-4 rounded font-semibold flex items-center justify-center gap-2">
                <ShoppingBagIcon className="w-5 h-5" />
                ADD TO CART
              </button>
              <button className="flex-1 border border-gray-300 py-4 rounded font-semibold flex items-center justify-center gap-2">
                <HeartIcon className="w-5 h-5" />
                WISHLIST
              </button>
            </div>

            {/* Delivery Options */}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <ImageModal
          product={product}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setShowImageModal={setShowImageModal}
        />
      )}
    </div>
  );
}

export default SinglePageProduct;
