import { useContext } from "react";
import { UserContext, UserDispatchContext } from "./user.context";

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserTableProvider");
  }

  return context;
};

export const useUserDispatchContext = () => {
  const context = useContext(UserDispatchContext);

  if (!context) {
    throw new Error(
      "useUserDispatchContext must be used within a UserDispatchContextProvider"
    );
  }

  return context;
};
