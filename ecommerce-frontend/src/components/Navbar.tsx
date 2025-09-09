import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { cart } = useCart();

  const [showModal, setShowModal] = useState(false);


  const handleLogout = () => {
    localStorage.removeItem("token");
      navigate("/login");
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 40px",
          backgroundColor: "#0d47a1",
          color: "#fff",
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          fontFamily: "'Poppins', sans-serif",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          onClick={() => setShowModal(true)}
          style={{
            fontWeight: 700,
            fontSize: "20px",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          Modern Ecommerce
        </div>

        <div style={{ display: "flex", gap: "25px", fontSize: "16px" }}>
          <Link style={{ color: "white", textDecoration: "none" }} to="/">
            Home
          </Link>
          <Link style={{ color: "white", textDecoration: "none" }} to="/cart">
            Cart
          </Link>
        </div>

        
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ position: "relative", cursor: "pointer" }}>
            <img
              src="/Images/cartIcon.png"
              alt="Cart"
              width="28"
              height="28"
              onClick={() => navigate("/cart")}
            />
            {cart.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "3px 7px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {cart.length}
              </span>
            )}
          </div>

          {!token ? (
            <>
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
                to="/login"
              >
                Login
              </Link>
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
                to="/signup"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              style={{
                background: "white",
                color: "#0d47a1",
                border: "none",
                padding: "8px 18px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 500,
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
              maxWidth: "400px",
              boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <h2 style={{ marginBottom: "15px", color: "#0d47a1" }}>
              Welcome to Modern Ecommerce
            </h2>
            <p style={{ marginBottom: "20px", color: "#333" }}>
              Hi, Thank you for choosing Modern Ecommerce.
            </p>
            <button
              onClick={() => setShowModal(false)}
              style={{
                background: "#0d47a1",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
