import { useEffect, useState } from "react";
import API from "../api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    API.get("/customers").then(res => setCustomers(res.data));
  }, []);

  return (
    <div>
      <h2>Customers</h2>
      {customers.map(c => (
        <div key={c.id}>{c.name}</div>
      ))}
    </div>
  );
}