import { theme } from 'antd';
import type { GlobalToken } from 'antd';
import type { CSSProperties } from 'react';

const { useToken } = theme;

interface Selector {
  (token: GlobalToken): CSSProperties | GlobalToken;
}

export function useThemeTokenSelector(selector: Selector): ReturnType<Selector> {
  const { token } = useToken();

  // console.log('useThemeTokenSelector: ', token);

  return selector(token);
}
