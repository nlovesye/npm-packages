import type { FC } from 'react';
import { ConfigProvider } from 'antd';

import Router from '@/router';
import { useActions } from '@/hooks/useActions';
import { useAppSelector } from '@/store';

const MainView: FC = () => {
  const { theme, antdLocale } = useAppSelector((state) => state.global);

  useActions();

  return (
    <ConfigProvider theme={theme} locale={antdLocale}>
      <Router />
    </ConfigProvider>
  );
};

export default MainView;
