import { useEffect, useState } from "react";
import API from "../api";
import CustomerList from "./CustomerList"
import CustomerForm from "./CustomerForm"

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error("Failed to fetch customers", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customers</h2>

      <CustomerForm onCustomerAdded={fetchCustomers} />

      <hr />

      <CustomerList customers={customers} />
    </div>
  );
}