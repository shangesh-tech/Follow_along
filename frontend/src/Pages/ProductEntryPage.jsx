import { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    discountedPrice: "",
    originalPrice: "",
    stockQuantity: "",
    category: "",
    rating: "",
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value);
    });
    images.forEach((file) => formData.append("images", file));

    try {
      const response = await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("Product added successfully!");
        setProduct({
          name: "",
          description: "",
          discountedPrice: "",
          originalPrice: "",
          stockQuantity: "",
          category: "",
          rating: "",
        });
        setImages([]);
        setPreview([]);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Add a New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Enter Title"
          value={product.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Enter Product description"
          value={product.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <input
          type="number"
          name="discountedPrice"
          placeholder="Discounted Price"
          value={product.discountedPrice}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="originalPrice"
          placeholder="Original Price"
          value={product.originalPrice}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="stockQuantity"
          placeholder="Stock Quantity"
          value={product.stockQuantity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Enter Category"
          value={product.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Enter Rating of Product"
          value={product.rating}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        
        {/* Image Upload */}
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
          accept="image/*"
          required
        />

        {/* Image Previews */}
        <div className="flex flex-wrap gap-2 mt-2">
          {preview.map((src, index) => (
            <img key={index} src={src} alt="preview" className="w-16 h-16 rounded" />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
