import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import { Product, ProductService } from '../../services/productsService';
import ProductTable from './ProductTable';
import Loading from '../../../../components/layout/Loading';
import ErrorMessage from '../../../../components/layout/ErrorMessage';

const ProductTableContainer = () => {
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

  const memoizedProductDeleteCallback = useCallback(async (id: number) => {
    try {
      setLoading(true);

      await new ProductService().deleteProductById(id);

      setProducts((prev) => prev.filter((product) => product.id !== id));

      setLoading(false);
    } catch (error) {
      setError((error as AxiosError).message);
      setLoading(false);
    }
  }, []);

  const memoizedSaveProductButtonClickCallback = useCallback(
    (productTitle: string, id: number) => {
      try {
        if (!productTitle) {
          return;
        }

        setProducts((prev) =>
          prev.map((product) => {
            if (product.id === id) {
              return {
                ...product,
                title: productTitle,
              };
            }
            return product;
          })
        );
      } catch (error) {
        setError((error as AxiosError).message);
      }
    },
    []
  );

  return (
    <div>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      <ProductTable
        products={products}
        onProductDelete={memoizedProductDeleteCallback}
        onSaveProductButtonClick={memoizedSaveProductButtonClickCallback}
      />
    </div>
  );
};

export default ProductTableContainer;
