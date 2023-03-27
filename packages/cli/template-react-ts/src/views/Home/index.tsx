import Layout from '@/components/Layout';
import { useThemeTokenSelector } from '@/hooks/useThemeTokenSelector';

import styles from './index.module.less';

export default function Home() {
  const pStyle = useThemeTokenSelector(({ colorPrimary }) => ({ color: colorPrimary }));

  return (
    <Layout>
      <section className={styles.home}>
        <p style={pStyle}>welcome to home</p>
      </section>
    </Layout>
  );
}
