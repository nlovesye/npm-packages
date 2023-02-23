import { createContext } from "react";
import type { User } from "@/models";
import { LS } from "@/utils";

interface UserContextShape {
  userName: string;
  passWord: string;
  update: (payload: User) => void;
  clear: () => void;
}

export const UserContext = createContext<UserContextShape>({
  ...getLocalStorageUser(),
  update: emptyFn,
  clear: emptyFn,
});

export function getLocalStorageUser(): User {
  return {
    userName: LS.get("userName") || "",
    passWord: LS.get("passWord") || "",
  };
}

function emptyFn() {}
