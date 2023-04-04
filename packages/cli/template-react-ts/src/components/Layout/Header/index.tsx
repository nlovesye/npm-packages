import { Link } from 'react-router-dom';
import type { FC } from 'react';
import { Avatar, Button, Spin } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store';
import { changeLocaleType, changeThemeType } from '@/store/global/asyncAction';
import { useThemeTokenSelector } from '@/hooks/useThemeTokenSelector';
import logo from '@/assets/favicon.png';

import styles from './index.module.less';

export const Header: FC = () => {
  const dispatch = useAppDispatch();

  const [{ loading: userLoading }, { themeType, localeType, loading: globalLoading }] =
    useAppSelector((state) => [state.user, state.global]);

  const { boxShadowTertiary, marginXS } = useThemeTokenSelector((d) => d);

  return (
    <header className={styles.header} style={{ boxShadow: boxShadowTertiary }}>
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
              dispatch(changeLocaleType('zh_CN' === localeType ? 'en_US' : 'zh_CN'));
            }}
            style={{ marginRight: marginXS }}
          >
            {localeType}
          </Button>
          <Button
            type="primary"
            onClick={() => {
              dispatch(changeThemeType('default' === themeType ? 'dark' : 'default'));
            }}
          >
            切换主题
          </Button>
        </div>
      )}
    </header>
  );
};
