import { createContext } from "react";
import { User } from "../types/user";

type UserContextValue = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
};

export const UserContext = createContext<UserContextValue>({
  user: undefined,
  setUser: () => {},
});