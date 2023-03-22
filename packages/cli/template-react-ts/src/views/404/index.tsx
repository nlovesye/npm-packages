import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

import styles from './index.module.less';

export default function NotFountPage() {
  return (
    <Result
      status="404"
      title="404"
      className={styles.result}
      extra={
        <Link to="/">
          <Button type="primary">返回首页</Button>
        </Link>
      }
    />
  );
}
