import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../service/api.service";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      alert("Login failed!");
    }
  };

  const primary = "#0d47a1";
  const accent = "#1e88e5";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        backgroundColor: "#f7f9fc",
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "50px 40px",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            marginBottom: "30px",
            color: primary,
            fontWeight: 700,
            fontSize: "28px",
          }}
        >
          Welcome Back
        </h2>
        <p style={{ color: "#64748b", marginBottom: "30px", textAlign: "center" }}>
          Login to access your Modern Ecommerce account
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 16px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
            fontSize: 14,
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 16px",
            marginBottom: "25px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
            fontSize: 14,
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            backgroundColor: accent,
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 16,
            boxShadow: "0 6px 16px rgba(30,136,229,0.2)",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = primary)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = accent)}
        >
          Login
        </button>

        <p style={{ fontSize: 14, color: "#64748b" }}>
          New to Modern Ecommerce?{" "}
          <span
            style={{ color: accent, cursor: "pointer", fontWeight: 600 }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
