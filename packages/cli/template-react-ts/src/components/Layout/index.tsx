import { Suspense } from 'react';
import type { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingSpin } from '@/components/LoadingSpin';

import { Header } from './Header';
import { Sider } from './Sider';
import styles from './index.module.less';
import { useThemeTokenSelector } from '@/hooks/useThemeTokenSelector';

interface Props {
  children?: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const { sizeSM, colorBgContainer } = useThemeTokenSelector((d) => d);

  return (
    <>
      <Header />

      <div className={styles.main}>
        <Sider />

        <div
          className={styles.content}
          style={{
            padding: sizeSM,
            background: colorBgContainer,
          }}
        >
          <Suspense fallback={<LoadingSpin />}>{children ?? <Outlet />}</Suspense>
        </div>
      </div>
    </>
  );
};

export default Layout;
