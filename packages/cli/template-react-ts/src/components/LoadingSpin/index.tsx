import { Spin } from 'antd';
import type { SpinProps } from 'antd';
import type { FC } from 'react';
import classNames from 'classnames';

import styles from './index.module.less';

export interface Props extends Omit<SpinProps, 'spinning'> {
  loading?: boolean;
}

export const LoadingSpin: FC<Props> = ({
  children,
  loading = true,
  className,
  ...restSpinProps
}) => {
  return !loading ? (
    <>{children}</>
  ) : (
    <Spin
      spinning={loading}
      className={classNames(styles.loadingSpin, className)}
      tip="加载中"
      {...restSpinProps}
    />
  );
};
