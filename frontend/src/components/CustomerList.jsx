export default function CustomerList({ customers }) {
  return (
    <div>
      <h3>Customer List</h3>

      {customers.length === 0 ? (
        <p>No customers found</p>
      ) : (
        customers.map((customer) => (
          <div
            key={customer.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Email:</strong> {customer.email}</p>
          </div>
        ))
      )}
    </div>
  );
}