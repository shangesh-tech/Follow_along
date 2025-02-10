import React, { useState } from 'react';
import axios from 'axios';

const AddressCard = () => {
  const [formData, setFormData] = useState({
    city: '',
    country: '',
    add1: '',
    add2: '',
    zipCode: '',
    addressType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/addresses', formData);
      console.log('Address submitted:', response.data);
    } catch (error) {
      console.error('Error submitting address:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Address Card</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-600">City</label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-600">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="add1" className="block text-sm font-medium text-gray-600">Address Line 1</label>
          <input
            type="text"
            name="add1"
            id="add1"
            placeholder="Address Line 1"
            value={formData.add1}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="add2" className="block text-sm font-medium text-gray-600">Address Line 2</label>
          <input
            type="text"
            name="add2"
            id="add2"
            placeholder="Address Line 2 (Optional)"
            value={formData.add2}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-600">Zip Code</label>
          <input
            type="text"
            name="zipCode"
            id="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="addressType" className="block text-sm font-medium text-gray-600">Address Type</label>
          <select
            name="addressType"
            id="addressType"
            value={formData.addressType}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Address Type</option>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressCard;
