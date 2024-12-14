import { useState } from 'react';

interface AddProductProps {
  onProductAdd: (product: Product) => void;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const AddProduct: React.FC<AddProductProps> = ({ onProductAdd }) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProduct: Product = {
      id: Date.now(),
      title,
      price: parseFloat(price),
      description,
      category,
      image,
    };

    onProductAdd(newProduct);
    handleCloseForm();
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setPrice('');
    setDescription('');
    setCategory('');
    setImage('');
  };

  return (
    <div className="add-product-container">
      {}
      {!isFormOpen && <button onClick={handleOpenForm}>Add Product</button>}

      {}
      {isFormOpen && (
        <form onSubmit={handleSubmit}>
          <h3>Add New Product</h3>

          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <button type="submit">Add Product</button>
          <button type="button" onClick={handleCloseForm}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default AddProduct;
