import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export default function CartPage() {
  const { cart, setCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const token = localStorage.getItem("token"); // Check if user is logged in

  useEffect(() => {
    const initialQuantities = Object.fromEntries(cart.map((item) => [item._id, 1]));
    setQuantities(initialQuantities);
  }, [cart]);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleIncrease = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrease = (id: string) => {
    setQuantities((prev) =>
      prev[id] > 1 ? { ...prev, [id]: prev[id] - 1 } : prev
    );
  };

  const handleRemove = (id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[id];
      return newQuantities;
    });
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * (quantities[item._id] || 1),
    0
  );

  const primary = "#0d47a1";
  const accent = "#1e88e5";

  if (!token) {
    return (
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <p style={{ fontSize: "18px", color: "#555", fontWeight: 500 }}>
          Please login to view your cart.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "90vh",
        backgroundColor: "#f7f9fc",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "28px",
          marginBottom: "30px",
          color: primary,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        Your Cart
      </h2>

      {cart.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <img
            src="public/Images/emptyCart.png"
            alt="Empty Cart"
            style={{ maxWidth: "500px", marginBottom: "20px" }}
          />
          <p style={{ fontSize: "18px", color: "#555", fontWeight: 500 }}>
            Your cart is empty. Start adding products!
          </p>
        </div>
      ) : (
        cart.map((item) => (
          <div
            key={item._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "18px",
              marginBottom: "18px",
              borderRadius: "12px",
              background: "#fff",
              boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
              transition: "transform 180ms ease, box-shadow 180ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 10px 20px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 6px 16px rgba(0,0,0,0.08)";
            }}
          >
            <span
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#333",
                flex: 1,
              }}
            >
              {item.name}
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginRight: "20px",
              }}
            >
              <button
                onClick={() => handleDecrease(item._id)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid #d0d7de",
                  background: "#f8fafc",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                -
              </button>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  minWidth: "20px",
                  textAlign: "center",
                }}
              >
                {quantities[item._id] || 1}
              </span>
              <button
                onClick={() => handleIncrease(item._id)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid #d0d7de",
                  background: "#f8fafc",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                +
              </button>
            </div>

            <span
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: accent,
                marginRight: "20px",
              }}
            >
              Rs.{item.price * (quantities[item._id] || 1)}
            </span>

            <img
              src="/Images/cartDustbin.webp"
              alt="Remove"
              width="26"
              height="26"
              style={{ cursor: "pointer" }}
              onClick={() => handleRemove(item._id)}
            />
          </div>
        ))
      )}

      {cart.length > 0 && (
        <h3
          style={{
            marginTop: "30px",
            fontSize: "22px",
            fontWeight: 700,
            color: primary,
            textAlign: "right",
          }}
        >
          Total: Rs.{totalPrice}
        </h3>
      )}
    </div>
  );
}
