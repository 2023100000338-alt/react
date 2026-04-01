import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const loadProducts = async () => {
    try {
      const res = await axios.get("https://reactbackend-production-006c.up.railway.app/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error loading products", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async () => {
    if (!name || !price) return alert("Please fill in all fields");
    
    await axios.post("https://reactbackend-production-006c.up.railway.app/api/products", {
      name,
      price: parseFloat(price)
    });

    setName("");
    setPrice("");
    loadProducts();
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    alert("Logged out successfully");
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* MOBILE TOPBAR - LIKE WHATSAPP/INSTAGRAM */}
      <div className="mobile-topbar">
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          ☰
        </button>
        <h2 className="mobile-logo">Admin Panel</h2>
        <button className="mobile-logout-btn" onClick={handleLogout}>
          🚪
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu">
            <h3>Navigation</h3>
            <ul>
              <li>Dashboard</li>
              <li>Products</li>
              <li>Orders</li>
              <li>Users</li>
              <li>Settings</li>
            </ul>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}

      <div className="layout">
        {/* DESKTOP SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-top">
            <h2>Admin Panel</h2>
            <ul className="nav-links">
              <li>Dashboard</li>
              <li>Products</li>
              <li>Orders</li>
              <li>Users</li>
              <li>Settings</li>
            </ul>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="main">
          <div className="topbar">
            <h3>Product Dashboard</h3>
          </div>

          <div className="product-form">
            <input
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price ($)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <button onClick={addProduct}>Add Product</button>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.25rem' }}>
              Product List ({products.length})
            </h3>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                      No products found. Add your first product!
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id}>
                      <td>#{p.id}</td>
                      <td>{p.name}</td>
                      <td>${parseFloat(p.price).toFixed(2)}</td>
                      <td>
                        <button 
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                          onClick={() => {
                            if (window.confirm(`Delete ${p.name}?`)) {
                              // Add delete API call here
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ADDITIONAL MOBILE CSS - ADD TO YOUR CSS FILE */}
      <style jsx>{`
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 10002;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 1rem;
        }

        .mobile-menu {
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
          border-radius: 1rem;
          padding: 2rem;
          width: 80%;
          max-width: 350px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .mobile-menu h3 {
          color: #38bdf8;
          margin-bottom: 1.5rem;
          font-size: 1.3rem;
        }

        .mobile-menu ul {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
        }

        .mobile-menu li {
          padding: 1rem;
          margin-bottom: 0.5rem;
          color: #cbd5e1;
          font-weight: 500;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mobile-menu li:hover {
          background: rgba(56, 189, 248, 0.2);
          color: white;
          transform: translateX(8px);
        }

        @media (min-width: 769px) {
          .mobile-menu-overlay,
          .mobile-topbar {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

export default Dashboard;