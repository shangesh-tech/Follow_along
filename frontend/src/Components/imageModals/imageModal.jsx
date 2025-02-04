import { ArrowLeft, ArrowRight, X } from "lucide-react";

function imageModal({
  product,
  selectedImage,
  setSelectedImage,
  setShowImageModal,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <button
        onClick={() => setShowImageModal(false)}
        className="absolute top-4 right-4 text-white"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full max-w-4xl">
        <img
          src={product.images[selectedImage]}
          alt={product.title}
          className="w-full h-auto"
        />

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {product.images.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full ${
                selectedImage === idx ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => setSelectedImage(idx)}
            />
          ))}
        </div>

        {selectedImage > 0 && (
          <button
            onClick={() => setSelectedImage((prev) => prev - 1)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}

        {selectedImage < product.images.length - 1 && (
          <button
            onClick={() => setSelectedImage((prev) => prev + 1)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}

export default imageModal;
