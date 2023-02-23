import { ADMIN_USER } from "@/config";
import { UserContext } from "@/context/UserContext";
import { FC, useContext, useMemo } from "react";
import { useRoutes } from "react-router";
import { ROUTES } from "./routes";

export const Router: FC = () => {
  const { userName, passWord } = useContext(UserContext);

  const isAdmin = useMemo(
    () => userName === ADMIN_USER.userName && passWord === ADMIN_USER.passWord,
    [userName, passWord]
  );

  const routes = useMemo(
    () => (!isAdmin ? ROUTES.filter((o) => !o.isAdmin) : ROUTES),
    [isAdmin]
  );

  const routesElement = useRoutes(
    routes.map((r) => {
      const { element } = r;
      return {
        ...r,
        element,
      };
    })
  );
  return routesElement;
};
