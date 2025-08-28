import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('authenticated');
    navigate('/login');
  };

  return (
    <div style={{
      padding: "40px",
      maxWidth: "900px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Contract Generator
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {/* Listing Agreement Card */}
        <Link to="/listing-agreement" style={{ textDecoration: "none" }}>
          <div style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            background: "#f9f9f9",
            textAlign: "center",
            transition: "transform 0.2s ease, box-shadow 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
          >
            <h3 style={{ marginBottom: "10px" }}>📄 Listing Agreement</h3>
            <p style={{ color: "#555" }}>Generate a professional listing agreement document.</p>
          </div>
        </Link>

        {/* Future contracts can be added here the same way */}
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button 
          onClick={logout} 
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#e63946",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
