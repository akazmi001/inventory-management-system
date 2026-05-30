import { useState } from "react";
import API from "../api";

export default function ProductForm({ onProductAdded }) {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", {
        name: form.name,
        sku: form.sku,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      });

      setForm({
        name: "",
        sku: "",
        price: "",
        stock: "",
      });

      onProductAdded();
    } catch (err) {
      alert(
        err.response?.data?.detail ||
        "Failed to create product"
      );
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        marginBottom: "30px",
      }}
    >
      <h3>Add Product</h3>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "15px",
        }}
      >
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="sku"
          placeholder="SKU"
          value={form.sku}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={buttonStyle}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "14px",
};

const buttonStyle = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "12px",
  cursor: "pointer",
  fontWeight: "600",
};