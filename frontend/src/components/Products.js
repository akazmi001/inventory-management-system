import { useEffect, useState } from "react";
import API from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p.id}>{p.name} - {p.stock}</div>
      ))}
    </div>
  );
}