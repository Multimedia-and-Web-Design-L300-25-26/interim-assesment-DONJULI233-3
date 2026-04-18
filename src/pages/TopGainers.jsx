import { useState, useEffect } from "react";
import { cryptoAPI } from "../lib/api";

export default function TopGainers() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGainers = async () => {
      try {
        const response = await cryptoAPI.getGainers();
        setCryptos(response.data.data);
      } catch (err) {
        const message = err.response?.data?.message || "Failed to fetch top gainers";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchGainers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading top gainers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Top Gainers</h1>
          <p className="text-gray-600 mt-2">
            Cryptocurrencies with the highest 24h percentage gain
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
              No gainers found at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cryptos.map((crypto) => (
              <div
                key={crypto._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center flex-1">
                    {crypto.image && (
                      <img
                        src={crypto.image}
                        alt={crypto.name}
                        className="h-12 w-12 rounded-full mr-4"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {crypto.name}
                      </h3>
                      <p className="text-sm text-gray-600">{crypto.symbol}</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                    +{crypto.change24h.toFixed(2)}%
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="text-2xl font-bold text-gray-900">
                    ${crypto.price.toFixed(2)}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    24h change: <span className="font-semibold text-green-600">+{crypto.change24h.toFixed(2)}%</span>
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
