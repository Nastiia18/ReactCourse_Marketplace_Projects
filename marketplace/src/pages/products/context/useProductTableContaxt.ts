import { useContext } from "react";
import { ProductContext, ProductDispatchContext } from "./product.context";

export const useProductContext = () => {
  const context = useContext(ProductContext);
  return context;
};

export const useProductDispatchContext = () => {
  const context = useContext(ProductDispatchContext);
  if (!context) {
    throw new Error(
      "useProductDispatchContext must be used within a ProductDispatchContextProvider"
    );
  }
  return context;
};
