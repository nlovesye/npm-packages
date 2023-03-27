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
  const contentStyle = useThemeTokenSelector(({ sizeSM, colorBgContainer }) => ({
    padding: sizeSM,
    background: colorBgContainer,
  }));

  return (
    <>
      <Header />

      <div className={styles.main}>
        <Sider />

        <div className={styles.content} style={contentStyle}>
          <Suspense fallback={<LoadingSpin />}>{children ?? <Outlet />}</Suspense>
        </div>
      </div>
    </>
  );
};

export default Layout;
