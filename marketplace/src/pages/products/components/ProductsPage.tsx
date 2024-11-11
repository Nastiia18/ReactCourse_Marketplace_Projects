// src/pages/products/ProductsPage.tsx
import { useState, useEffect } from 'react';
import { Product, ProductService } from '../services/productsService';
import { AxiosError } from 'axios';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const productService = new ProductService(signal);

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchedProducts = await productService.getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <h1>Products Page</h1>
      {loading && <p>Loading...</p>} {}
      {error && <p>Error: {error}</p>} {}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>
                <img
                  src={product.image}
                  alt={product.title}
                  width="50"
                  height="50"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
