import { useEffect, useState } from "react";
import API from "../api";

export default function Orders() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customerId, setCustomerId] = useState("");

  const [items, setItems] = useState([
    {
      product_id: "",
      quantity: 1,
    },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [customersRes, productsRes] =
        await Promise.all([
          API.get("/customers"),
          API.get("/products"),
        ]);

      setCustomers(customersRes.data);
      setProducts(productsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        product_id: "",
        quantity: 1,
      },
    ]);
  };

  const updateItem = (
    index,
    field,
    value
  ) => {
    const updated = [...items];

    updated[index][field] = value;

    setItems(updated);
  };

  const removeItem = (index) => {
    setItems(
      items.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/orders", {
        customer_id: Number(customerId),
        items: items.map((item) => ({
          product_id: Number(
            item.product_id
          ),
          quantity: Number(
            item.quantity
          ),
        })),
      });

      alert("Order Created Successfully");

      setCustomerId("");

      setItems([
        {
          product_id: "",
          quantity: 1,
        },
      ]);
    } catch (err) {
      alert(
        err.response?.data?.detail ||
          "Failed to create order"
      );
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f8fafc",
        borderRadius: "16px",
      }}
    >
      <h2>🛒 Create Order</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Customer */}

        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <label>
            Customer
          </label>

          <select
            value={customerId}
            onChange={(e) =>
              setCustomerId(
                e.target.value
              )
            }
            required
            style={inputStyle}
          >
            <option value="">
              Select Customer
            </option>

            {customers.map(
              (customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.name}
                </option>
              )
            )}
          </select>
        </div>

        {/* Order Items */}

        <h3>Order Items</h3>

        {items.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "15px",
              alignItems:
                "center",
            }}
          >
            <select
              value={
                item.product_id
              }
              onChange={(e) =>
                updateItem(
                  index,
                  "product_id",
                  e.target.value
                )
              }
              required
              style={{
                ...inputStyle,
                flex: 2,
              }}
            >
              <option value="">
                Select Product
              </option>

              {products.map(
                (product) => (
                  <option
                    key={
                      product.id
                    }
                    value={
                      product.id
                    }
                  >
                    {product.name} (
                    Stock:
                    {
                      product.stock
                    }
                    )
                  </option>
                )
              )}
            </select>

            <input
              type="number"
              min="1"
              value={
                item.quantity
              }
              onChange={(e) =>
                updateItem(
                  index,
                  "quantity",
                  e.target.value
                )
              }
              style={{
                ...inputStyle,
                width: "120px",
              }}
            />

            <button
              type="button"
              onClick={() =>
                removeItem(
                  index
                )
              }
              style={
                deleteBtn
              }
            >
              Remove
            </button>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            type="button"
            onClick={addItem}
            style={secondaryBtn}
          >
            + Add Product
          </button>

          <button
            type="submit"
            style={primaryBtn}
          >
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "14px",
};

const primaryBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  cursor: "pointer",
};

const secondaryBtn = {
  background: "#10b981",
  color: "#fff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "10px 14px",
  borderRadius: "8px",
  cursor: "pointer",
};