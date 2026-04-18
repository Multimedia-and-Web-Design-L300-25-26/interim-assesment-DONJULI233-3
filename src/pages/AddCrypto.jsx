import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cryptoAPI } from "../lib/api";

export default function AddCrypto() {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    price: "",
    image: "",
    change24h: "",
    isNew: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (
      !formData.name ||
      !formData.symbol ||
      !formData.price ||
      formData.change24h === ""
    ) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      await cryptoAPI.addCrypto({
        name: formData.name,
        symbol: formData.symbol,
        price: parseFloat(formData.price),
        image: formData.image,
        change24h: parseFloat(formData.change24h),
        isNew: formData.isNew,
      });

      setSuccess("Cryptocurrency added successfully! Redirecting...");
      setFormData({
        name: "",
        symbol: "",
        price: "",
        image: "",
        change24h: "",
        isNew: false,
      });

      setTimeout(() => {
        navigate("/crypto");
      }, 2000);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to add cryptocurrency";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Add Cryptocurrency</h1>
          <p className="text-gray-600 mt-2">
            Add a new cryptocurrency to the platform
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Cryptocurrency Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Bitcoin"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                disabled={loading}
                required
              />
            </div>

            {/* Symbol */}
            <div>
              <label
                htmlFor="symbol"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Symbol *
              </label>
              <input
                type="text"
                id="symbol"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                placeholder="e.g., BTC"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                disabled={loading}
                required
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Price (USD) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 43500.50"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                disabled={loading}
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.png"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                disabled={loading}
              />
            </div>

            {/* 24h Change */}
            <div>
              <label
                htmlFor="change24h"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                24h Change (%) *
              </label>
              <input
                type="number"
                id="change24h"
                name="change24h"
                value={formData.change24h}
                onChange={handleChange}
                placeholder="e.g., 2.5 or -1.25"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                disabled={loading}
                required
              />
            </div>

            {/* Is New Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isNew"
                name="isNew"
                checked={formData.isNew}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
                disabled={loading}
              />
              <label
                htmlFor="isNew"
                className="ml-2 block text-sm text-gray-700"
              >
                Mark as new listing
              </label>
            </div>

            {/* Submit Button */}
            <div className="border-t border-gray-200 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Adding cryptocurrency..." : "Add Cryptocurrency"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
