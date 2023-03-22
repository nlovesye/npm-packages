import { Link } from 'react-router-dom';
import type { FC } from 'react';
import { Avatar, Button, Spin } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store';
import { changeThemeType } from '@/store/global/asyncAction';
import { useThemeTokenSelector } from '@/hooks/useThemeTokenSelector';
import logo from '@/assets/favicon.png';

import styles from './index.module.less';

export const Header: FC = () => {
  const dispatch = useAppDispatch();

  const [{ name, loading: userLoading }, { themeType, loading: globalLoading }] = useAppSelector(
    (state) => [state.user, state.global],
  );

  const headerStyle = useThemeTokenSelector(({ boxShadowTertiary }) => ({
    boxShadow: boxShadowTertiary,
  }));

  return (
    <header className={styles.header} style={headerStyle}>
      <Link to="/" className={styles.logo}>
        <Avatar src={logo} alt="logo" />
      </Link>

      {userLoading || globalLoading ? (
        <Spin />
      ) : (
        <div>
          <Button
            type="primary"
            onClick={() => {
              dispatch(changeThemeType('default' === themeType ? 'dark' : 'default'));
            }}
          >
            切换主题
          </Button>
          user: {name}
        </div>
      )}
    </header>
  );
};
