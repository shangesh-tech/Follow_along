import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: "",
    discountedPrice: "",
    originalPrice: "",
    quantity: "",
    category: "",
  });
  const [errorInput, setInputError] = useState("");
  const [images, setImages] = useState(null);

  const handelImageUpload = (e) => {
    const imageArray = Array.from(e.target.files);
    setImages(imageArray);
  };

  const HandelChange = (e) => {
    setInputError("");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const HandelSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      description,
      rating,
      discountedPrice,
      originalPrice,
      quantity,
      category,
    } = formData;

    if (
      title.length <= 0 ||
      description.length <= 0 ||
      discountedPrice <= 0 ||
      originalPrice <= 0 ||
      quantity <= 0 ||
      category.length <= 0
    ) {
      return setInputError("Enter the correct values");
    }

    let formDataBody = new FormData();
    formDataBody.append("title", title);
    formDataBody.append("description", description);
    formDataBody.append("rating", rating);
    formDataBody.append("discountedPrice", discountedPrice);
    formDataBody.append("originalPrice", originalPrice);
    formDataBody.append("quantity", quantity);
    formDataBody.append("rating", rating);

    images?.map((ele) => {
      formDataBody.append("filepath", ele);
    });

    let requestData = await axios
      .put(`http://localhost:8080/product/update-product/${id}`, formDataBody, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });

    for (let pair of formData.entries()) {
      if (pair[i] instanceof File) {
        console.log(
          `${pair[0]}:File - ${pair[i].name}, ${pair[i].type}, ${pair[i].size} bytes`
        );
      } else {
        console.log(`${pair[o]}:${pair[i]}`);
      }
    }
  };

  useEffect(() => {
    const getDataForId = async () => {
      const singleData = await axios.get(
        `http://localhost:8080/product/get-single/${id}`
      );
      setFormData(singleData.data.data);
      setImages(singleData.data.images);
    };
    getDataForId();
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-8">
      <form onSubmit={HandelSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-semibold text-center">Update Product</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="">
            Enter Title
          </label>
          <input
            type="text"
            onChange={HandelChange}
            value={formData.title}
            name="title"
            placeholder="Enter product title"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="">
            Enter Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={HandelChange}
            placeholder="Enter product description"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="">
            Discount Price
          </label>
          <input
            type="number"
            name="discountedPrice"
            value={formData.discountedPrice}
            onChange={HandelChange}
            placeholder="Discounted price"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="">
            Original Price
          </label>
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={HandelChange}
            placeholder="Original price"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="">
            Stock Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={HandelChange}
            placeholder="Enter Stock quantity"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="">
            Product Image
          </label>
          <input
            type="file"
            multiple
            onChange={handelImageUpload}
            className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="">
            Enter Category
          </label>
          <input
            type="text"
            onChange={HandelChange}
            name="category"
            value={formData.category}
            placeholder="Enter Category"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="">
            Enter Rating of product
          </label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={HandelChange}
            placeholder="Enter Rating of product"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {errorInput && <p className="text-red-500 text-sm">{errorInput}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateForm;
