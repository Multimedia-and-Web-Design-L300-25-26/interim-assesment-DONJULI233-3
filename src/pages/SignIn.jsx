import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI, setToken } from "../lib/api";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!email) return "Email is required.";
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) return "Please enter a valid email address.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      setSuccess(true);
      setError(null);
      setToken(response.data.token);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Header with logo */}
      <div className="flex items-center justify-start px-6 py-6 border-b border-gray-200">
        <svg
          aria-label="Crypto App logo"
          className="w-8 h-8"
          role="img"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Crypto App logo</title>
          <path
            d="M24,36c-6.63,0-12-5.37-12-12s5.37-12,12-12c5.94,0,10.87,4.33,11.82,10h12.09C46.89,9.68,36.58,0,24,0 C10.75,0,0,10.75,0,24s10.75,24,24,24c12.58,0,22.89-9.68,23.91-22H35.82C34.87,31.67,29.94,36,24,36z"
            fill="#0052FF"
          />
        </svg>
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Heading */}
          <h1 className="text-3xl font-semibold text-center mb-8 text-gray-900">
            Sign in to Crypto App
          </h1>

          {/* Demo Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-blue-800 text-center">
              <strong>Demo app</strong> – do not use your real password
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="Your email address"
                disabled={loading}
              />
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="Your password"
                disabled={loading}
              />
            </div>

            {error && (
              <div role="alert" className="text-sm text-red-600 bg-red-50 p-3 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="text-sm text-green-600 bg-green-50 p-3 rounded">
                Signed in successfully! Redirecting...
              </div>
            )}

            {/* Continue button */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full py-3 px-4 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold transition-colors duration-200"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-4">
              <span className="text-gray-600 text-sm">
                Don't have an account?{" "}
              </span>
              <Link
                to="/signup"
                className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors"
              >
                Sign up
              </Link>
            </div>

            {/* Privacy Notice */}
            <div className="text-center text-xs text-gray-500 pt-4">
              <p>
                Not your device? Use a private window. See our{" "}
                <a
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-700 underline"
                >
                  Privacy Policy
                </a>{" "}
                for more info.
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
