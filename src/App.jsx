import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AssetDetail from "./pages/AssetDetail.jsx";
import Explore from "./pages/Explore.jsx";
import Home from "./pages/Home.jsx";
import Learn from "./pages/Learn.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import CryptoList from "./pages/CryptoList.jsx";
import TopGainers from "./pages/TopGainers.jsx";
import NewListings from "./pages/NewListings.jsx";
import AddCrypto from "./pages/AddCrypto.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import WarningBanner from "./components/common/WarningBanner.jsx";

function App() {
  return (
    <BrowserRouter>
      <WarningBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/explore" element={<Explore />} />
        <Route path="/crypto" element={<CryptoList />} />
        <Route path="/crypto/gainers" element={<TopGainers />} />
        <Route path="/crypto/new" element={<NewListings />} />
        <Route
          path="/crypto/add"
          element={
            <ProtectedRoute>
              <AddCrypto />
            </ProtectedRoute>
          }
        />
        <Route path="/asset/:id" element={<AssetDetail />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
