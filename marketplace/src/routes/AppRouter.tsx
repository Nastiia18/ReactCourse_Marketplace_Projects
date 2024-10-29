import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import ProductsPage from "../pages/products/components/ProductsPage";
import CategoriesPage from "../pages/categories/CategoriesPage";
import UsersPage from "../pages/users/components/Users";
import Cart from "../pages/cart/Cart";
import NotFoundPage from "../components/NotFoundPage";
import Layout from "../components/Layout";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const AppRouter = () => {
  return <RouterProvider router={route} />;
};

export default AppRouter;
