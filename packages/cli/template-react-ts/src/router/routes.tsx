import { lazy, useMemo } from 'react';
import type { FC, ReactNode } from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { AppstoreOutlined } from '@ant-design/icons';

import NotFound from '@/views/404';
import { useAppSelector } from '@/store';
import { isAdminSelector } from '@/store/user/selector';
import { Layout } from '@/components/Layout';

const Home = lazy(() => import('@/views/Home'));

interface RouteObj {
  children?: RouteExtendObject[];
  label?: string;
  icon?: ReactNode;
  authenticaionCode?: string;
}

type RouteExtendObject = RouteObject & RouteObj;

const adminPage = ['admin1'];

export const ROUTES: RouteExtendObject[] = [
  {
    path: `/`,
    element: <Home />,
  },
  {
    path: `/manage`,
    element: <Layout />,
    authenticaionCode: 'admin1',
    label: '系统管理',
    children: [
      {
        path: 'department',
        element: <div>部门管理</div>,
        label: '部门管理',
        icon: <AppstoreOutlined />,
      },
      {
        path: 'user',
        element: <div>成员管理</div>,
        label: '成员管理',
        icon: <AppstoreOutlined />,
      },
      {
        path: 'permission',
        element: <div>权限管理</div>,
        label: '权限管理',
        icon: <AppstoreOutlined />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const Routes: FC = () => {
  const isAdmin = useAppSelector(isAdminSelector);

  const routes = useMemo(
    () =>
      !isAdmin
        ? ROUTES.filter(
            ({ authenticaionCode }) => !authenticaionCode || adminPage.includes(authenticaionCode),
          )
        : ROUTES,
    [isAdmin],
  );

  const routesElement = useRoutes(
    routes.map((r) => {
      const { element } = r;
      return {
        ...r,
        element,
      };
    }),
  );
  return routesElement;
};

export default Routes;

export function getSiderMenuRoutes(): RouteExtendObject[] {
  return ROUTES.filter((o) => !!o.label);
}
