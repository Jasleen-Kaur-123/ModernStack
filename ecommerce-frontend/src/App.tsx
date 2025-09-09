import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ListingPage from "./pages/ListingPage";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ListingPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}
