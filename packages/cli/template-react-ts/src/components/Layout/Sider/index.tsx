import { useMemo, useCallback, useState } from 'react';
import type { FC } from 'react';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import type { MenuClickEventHandler } from 'rc-menu/lib/interface';
import classNames from 'classnames';

import { useThemeTokenSelector } from '@/hooks/useThemeTokenSelector';
import { getSiderMenuRoutes } from '@/router/routes';
// import { isAdminSelector } from '@/store/user/selector';
// import { useAppSelector } from '@/store';

import styles from './index.module.less';
import { MenuFoldOutlined } from '@ant-design/icons';
import { useVisible } from '@/hooks/useVisible';

const defaultPath = '';

export const Sider: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { visible: collapsed, setVisible: setCollapsed } = useVisible();

  // const isAdmin = useAppSelector(isAdminSelector);

  const [openKey, selectedKey] = useMemo(() => {
    const paths = pathname.split('/');
    return paths.slice(1);
  }, [pathname]);

  const [openKeys, setOpenKeys] = useState<string[]>([`/${openKey}`]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([`/${openKey}/${selectedKey}`]);

  const { boxShadowTertiary } = useThemeTokenSelector((d) => d);

  const menuItems = useMemo(() => {
    const routes = getSiderMenuRoutes();
    return routes.map(({ path, label, icon, children }) => {
      const childrenItems = (children || []).map(({ path: cPath, ...restObj }) => ({
        key: `${path}/${cPath}`,
        ...restObj,
      }));

      return {
        key: path || defaultPath,
        label,
        icon,
        children: childrenItems,
      };
    });
  }, []);

  const onMenuClick: MenuClickEventHandler = useCallback(
    ({ key }) => {
      navigate(key);
      setSelectedKeys([key]);
    },
    [navigate],
  );

  return (
    <aside
      className={classNames(styles.sider, {
        [styles.collapsed]: collapsed,
      })}
      style={{
        boxShadow: boxShadowTertiary,
      }}
    >
      <Menu
        className={styles.menu}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        mode="inline"
        onOpenChange={setOpenKeys}
        onClick={onMenuClick}
        items={menuItems}
      />

      <div className={styles.collapseButton} onClick={() => setCollapsed((c) => !c)}>
        <MenuFoldOutlined className={styles.collapseIcon} />
      </div>
    </aside>
  );
};
