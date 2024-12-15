import { createContext } from "react";
import { User } from "../services/UserService";
import { initialUserState, UserState } from "../store/user.reducer";

interface UserContext extends UserState {
  loading: boolean;
  error: string | null;
}

interface UserDispatch {
  memoizedAddUser: (newUser: User) => void;
  memoizedDeleteUser: (id: number) => Promise<void>;
  memoizedSaveUser: (id: number, firstName: string) => void;
  memoizedSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const initialUserContext: UserContext = {
  ...initialUserState,
  loading: false,
  error: null,
};

export const UserContext = createContext<UserContext>(initialUserContext);
export const UserDispatchContext = createContext<UserDispatch | null>(null);
