import Products from "./components/Products";
import Customers from "./components/Customers";
import Orders from "./components/Orders";

function App() {
  return (
    <div>
      <h1>Inventory System</h1>
      <Products />
      <Customers />
      <Orders />
    </div>
  );
}

export default App;