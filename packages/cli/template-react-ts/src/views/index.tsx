import type { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import Router from '@/router';
import { useActions } from '@/hooks/useActions';
import { useAppSelector } from '@/store';

const MainView: FC = () => {
  const { theme } = useAppSelector((state) => state.global);

  useActions();

  return (
    <ConfigProvider theme={theme} locale={zhCN}>
      <Router />
    </ConfigProvider>
  );
};

export default MainView;
