import { useEffect, useState } from "react";
import API from "../api";
import ProductForm from "./ProductsForm";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, product) => sum + product.stock,
    0
  );

  const inventoryValue = products.reduce(
    (sum, product) => sum + product.stock * product.price,
    0
  );

  const lowStockProducts = products.filter(
    (product) => product.stock < 10
  ).length;

  return (
    <div
      style={{
        padding: "30px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          marginBottom: "25px",
          color: "#0f172a",
        }}
      >
        📦 Product Management
      </h2>

      {/* Create Product Form */}
      <ProductForm onProductAdded={fetchProducts} />

      {/* Dashboard Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <DashboardCard
          title="Total Products"
          value={totalProducts}
          icon="📦"
        />

        <DashboardCard
          title="Stock Units"
          value={totalStock}
          icon="🏬"
        />

        <DashboardCard
          title="Low Stock"
          value={lowStockProducts}
          icon="⚠️"
        />

        <DashboardCard
          title="Inventory Value"
          value={`$${inventoryValue.toFixed(2)}`}
          icon="💰"
        />
      </div>

      {/* Products Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow:
            "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <h3
            style={{
              margin: 0,
            }}
          >
            Product Inventory
          </h3>
        </div>

        {loading ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
            }}
          >
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
            }}
          >
            No products found
          </div>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#1e293b",
                  color: "#fff",
                }}
              >
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Product</th>
                <th style={thStyle}>SKU</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Stock</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td style={tdStyle}>
                    {product.id}
                  </td>

                  <td style={tdStyle}>
                    <strong>
                      {product.name}
                    </strong>
                  </td>

                  <td style={tdStyle}>
                    {product.sku}
                  </td>

                  <td style={tdStyle}>
                    $
                    {Number(
                      product.price
                    ).toFixed(2)}
                  </td>

                  <td style={tdStyle}>
                    {product.stock}
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        background:
                          product.stock < 10
                            ? "#ef4444"
                            : "#22c55e",
                        color: "#fff",
                        padding:
                          "6px 12px",
                        borderRadius:
                          "999px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {product.stock < 10
                        ? "Low Stock"
                        : "In Stock"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  icon,
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "14px",
        padding: "20px",
        boxShadow:
          "0 6px 18px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          fontSize: "30px",
          marginBottom: "10px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          color: "#64748b",
          fontSize: "14px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginTop: "5px",
        }}
      >
        {value}
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "14px",
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #e2e8f0",
};