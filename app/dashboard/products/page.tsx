type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

export default async function ProductsPage() {
  // This runs on the SERVER (SSR by default)
  const products: Product[] = [
    { id: 1, name: "Laptop", price: 70000, stock: 12 },
    { id: 2, name: "Smartphone", price: 40000, stock: 25 },
    { id: 3, name: "Headphones", price: 3000, stock: 50 },
  ];

  return (
    <main style={{ padding: "40px" }}>
      <h1>Products</h1>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
