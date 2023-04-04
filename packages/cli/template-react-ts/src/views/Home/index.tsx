import Layout from '@/components/Layout';
import { useThemeTokenSelector } from '@/hooks/useThemeTokenSelector';

import styles from './index.module.less';
import { useTranslation } from 'react-i18next';
import { DatePicker, TimePicker } from 'antd';

const { RangePicker } = DatePicker;

export default function Home() {
  const { colorPrimary } = useThemeTokenSelector((d) => d);
  const { t } = useTranslation();

  return (
    <Layout>
      <section className={styles.home}>
        <h2>{t('title')}</h2>
        <p style={{ color: colorPrimary }}>welcome to home</p>
        <DatePicker />
        <TimePicker />
        <RangePicker />
      </section>
    </Layout>
  );
}
