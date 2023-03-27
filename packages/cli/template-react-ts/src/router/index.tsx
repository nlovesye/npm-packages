import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import type { FC } from 'react';

import { LoadingSpin } from '@/components/LoadingSpin';
import Routes from './routes';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpin tip="loading..." />}>
        <Routes />
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
