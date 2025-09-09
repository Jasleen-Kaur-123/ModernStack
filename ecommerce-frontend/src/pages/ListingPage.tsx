import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import productsData from "../products.json";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

export default function ListingPage() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [items, setItems] = useState<Product[]>([]);
  const [filters, setFilters] = useState({ category: "", maxPrice: "" });
  const [showModal, setShowModal] = useState(false);

  // Filter Logic 
  const loadItems = () => {
    let filtered = [...productsData];

    if (filters.category.trim() !== "") {
      const keyword = filters.category.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.category.toLowerCase().includes(keyword) ||
          item.name.toLowerCase().includes(keyword)
      );
    }

    if (filters.maxPrice.trim() !== "") {
      const max = Number(filters.maxPrice);
      if (!isNaN(max)) {
        filtered = filtered.filter((item) => item.price <= max);
      }
    }

    setItems(filtered);
  };

  useEffect(() => {
    setItems(productsData);
  }, []);

  const handleAddToCart = (product: Product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowModal(true);
      return;
    }
    addToCart(product);
  };

  const primary = "#0d47a1"; 
  const accent = "#1e88e5";

  return (
    <div style={{ backgroundColor: "#f7f9fc", minHeight: "100vh", padding: "36px", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ color: primary, fontSize: 28, margin: 0, fontWeight: 700 }}>Explore Products</h2>
          <p style={{ margin: 0, color: "#516076" }}>Discover your next Favorite</p>
        </header>

        <div style={{ display: "flex", gap: 12, marginBottom: 28, alignItems: "center", flexWrap: "wrap" }}>
          <input
            placeholder="Search by Category or Name"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            style={{
              padding: "12px 14px",
              borderRadius: 10,
              border: "1px solid #e2e8f0",
              flex: 1,
              minWidth: 220,
              boxShadow: "inset 0 1px 2px rgba(16,24,40,0.03)",
              fontSize: 14
            }}
            aria-label="Search by category or name"
          />
          <input
            type="number"
            placeholder="Max Price (Rs)"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            style={{
              padding: "12px 14px",
              borderRadius: 10,
              border: "1px solid #e2e8f0",
              width: 160,
              boxShadow: "inset 0 1px 2px rgba(16,24,40,0.03)",
              fontSize: 14
            }}
            aria-label="Max price"
          />

          <button
            onClick={loadItems}
            style={{
              padding: "10px 18px",
              backgroundColor: accent,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(30,136,229,0.18)",
            }}
            aria-label="Apply filters"
          >
            Apply Filters
          </button>

          <button
            onClick={() => {
              setFilters({ category: "", maxPrice: "" });
              setItems(productsData);
            }}
            style={{
              padding: "10px 14px",
              backgroundColor: "#fff",
              color: primary,
              border: "1px solid #dbeafe",
              borderRadius: 10,
              fontWeight: 600,
              cursor: "pointer",
            }}
            aria-label="Clear filters"
          >
            Clear
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20
          }}
        >
          {items.map((item) => (
            <article
              key={item._id}
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 8px 20px rgba(16,24,40,0.06)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 180ms ease, box-shadow 180ms ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 30px rgba(16,24,40,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 20px rgba(16,24,40,0.06)";
              }}
            >
              <div style={{ height: 180, width: "100%", overflow: "hidden" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              <div style={{ padding: 16, flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 16, color: "#111827" }}>{item.name}</h3>
                  <span style={{ fontSize: 14, color: "#64748b", fontWeight: 600 }}>{item.category}</span>
                </div>

                <p style={{ margin: 0, color: "#475569", fontSize: 13, flex: 1 }}></p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
                  <div style={{ fontWeight: 700, color: accent, fontSize: 16 }}>Rs.{item.price}</div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    style={{
                      padding: "10px 14px",
                      backgroundColor: primary,
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: "0 6px 14px rgba(13,71,161,0.12)"
                    }}
                    aria-label={`Add ${item.name} to cart`}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0b3f84")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = primary)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {showModal && (
          <div
            role="dialog"
            aria-modal="true"
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(2,6,23,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 4000
            }}
          >
            <div style={{ width: 360, background: "#fff", borderRadius: 12, padding: 22, textAlign: "center", boxShadow: "0 12px 40px rgba(2,6,23,0.3)" }}>
              <h3 style={{ marginTop: 0, color: primary }}>New to Modern Ecommerce?</h3>
              <p style={{ color: "#526075", marginBottom: 20 }}>Kindly Signup or Login to add items to your cart.</p>

              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button
                  onClick={() => { setShowModal(false); navigate("/signup"); }}
                  style={{
                    padding: "10px 14px",
                    backgroundColor: accent,
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Signup
                </button>

                <button
                  onClick={() => { setShowModal(false); navigate("/login"); }}
                  style={{
                    padding: "10px 14px",
                    backgroundColor: "#fff",
                    color: primary,
                    border: `1px solid ${accent}`,
                    borderRadius: 10,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Login
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "10px 14px",
                    backgroundColor: "#fff",
                    color: "#64748b",
                    border: "1px solid #e6eefc",
                    borderRadius: 10,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
