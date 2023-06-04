/*
	Created by Wilfer Daniel Ciro Maya
*/

import constantStore from "@/data/constantStore";
import { UserSchema } from "@/domain/schemas/UserSchema";
import {
  useState,
  createContext,
  ReactElement,
  useContext,
  useEffect,
} from "react";

interface ContextInterface {
  isLoading: boolean;
  currentUser: UserSchema | undefined;
  login: (token: string, user: UserSchema) => void;
  logout: () => void;
}

export const ContextAuth = createContext<ContextInterface>({
  isLoading: true,
  currentUser: undefined,
  login: (token: string, user: UserSchema) => {},
  logout: () => {},
});

interface IAuthProvider {
  children: ReactElement;
}

const ContextProviderAuth = ({ children }: IAuthProvider) => {
  const [currentUser, setCurrentUser] = useState<UserSchema | undefined>(
    constantStore.user.get() || undefined
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(false);
  }, []);

  const login = (token: string, userData: UserSchema) => {
    setCurrentUser(userData);
    constantStore.user.set(userData);
    constantStore.token.set(token)
  };

  const logout = () => {
    setCurrentUser(undefined);
    constantStore.user.remove();
    constantStore.token.remove();
  };

  return (
    <ContextAuth.Provider
      value={{
        currentUser,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </ContextAuth.Provider>
  );
};
const useAuth = () => useContext(ContextAuth);

export { ContextProviderAuth, useAuth };
