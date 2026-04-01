import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

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
      price
    });

    setName("");
    setPrice("");
    loadProducts();
  };

  // Logout Function
  const handleLogout = () => {
    // If you use localStorage.removeItem("token") do it here
    alert("Logged out successfully");
    navigate("/"); // Redirect to Login page
  };

  return (
    <div className="layout">
      {/* Sidebar */}
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
  
  {/* Ensure the className is exactly 'logout-btn' */}
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
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button onClick={addProduct}>Add Product</button>
        </div>

        <h3>Product List</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;