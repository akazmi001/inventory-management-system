import { useState } from "react";
import API from "../api";

export default function CustomerForm({ onCustomerAdded }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
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
      await API.post("/customers", form);

      setForm({
        name: "",
        email: "",
      });

      onCustomerAdded();
    } catch (err) {
      alert(err.response?.data?.detail || "Error creating customer");
    }
  };

  return (
    <div
        style={{
        maxWidth: "500px",
        margin: "30px auto",
        padding: "24px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
    >
        <h2
        style={{
            marginBottom: "20px",
            textAlign: "center",
        }}
        >
        Add Customer
        </h2>

        <form
        onSubmit={handleSubmit}
        style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
        }}
        >
        <div>
            <label
            style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
            }}
            >
            Customer Name
            </label>

            <input
            type="text"
            name="name"
            placeholder="Enter customer name"
            value={form.name}
            onChange={handleChange}
            style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
            }}
            />
        </div>

        <div>
            <label
            style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
            }}
            >
            Email Address
            </label>

            <input
            type="email"
            name="email"
            placeholder="Enter customer email"
            value={form.email}
            onChange={handleChange}
            style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
            }}
            />
        </div>

        <button
            type="submit"
            style={{
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            background: "#2563eb",
            color: "#fff",
            }}
        >
            Add Customer
        </button>
        </form>
    </div>
    );
}