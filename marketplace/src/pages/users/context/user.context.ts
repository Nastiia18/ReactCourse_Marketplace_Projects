import { createContext } from 'react';
import { initialUserState, UserState } from '../store/user.reducer';

interface UserContext extends UserState {
  loading: boolean;
  error: string | null;
}

interface UserDispatch {
    deleteUser: (id: number) => Promise<void>;
    updateUserName: (id: number, firstName: string) => void;
}

const initialUserContext: UserContext = {
  ...initialUserState,
  loading: false,
  error: null,
};

export const UserContext = createContext<UserContext>(initialUserContext);

export const UserDispatchContext = createContext<UserDispatch | null>(null);
