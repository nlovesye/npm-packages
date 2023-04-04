import { theme } from 'antd';
import type { GlobalToken } from 'antd';

const { useToken } = theme;

interface Selector {
  (token: GlobalToken): GlobalToken;
}

export function useThemeTokenSelector(selector: Selector): ReturnType<Selector> {
  const { token } = useToken();

  // console.log('useThemeTokenSelector: ', token);

  return selector(token);
}
