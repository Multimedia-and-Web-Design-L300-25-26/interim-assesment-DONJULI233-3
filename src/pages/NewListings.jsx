import { useState, useEffect } from "react";
import { cryptoAPI } from "../lib/api";

export default function NewListings() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNewListings = async () => {
      try {
        const response = await cryptoAPI.getNewListings();
        setCryptos(response.data.data);
      } catch (err) {
        const message = err.response?.data?.message || "Failed to fetch new listings";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewListings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading new listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">New Listings</h1>
          <p className="text-gray-600 mt-2">
            Recently added cryptocurrencies
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {cryptos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No new listings at the moment.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {cryptos.map((crypto) => (
              <div
                key={crypto._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    {crypto.image && (
                      <img
                        src={crypto.image}
                        alt={crypto.name}
                        className="h-12 w-12 rounded-full mr-4"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {crypto.name}
                      </h3>
                      <p className="text-sm text-gray-600">{crypto.symbol}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ${crypto.price.toFixed(2)}
                    </div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                        crypto.change24h >= 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {crypto.change24h >= 0 ? "+" : ""}
                      {crypto.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Listed on {new Date(crypto.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
