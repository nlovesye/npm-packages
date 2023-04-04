import { use } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { initialState } from '@/store/global';

import zh_CN_Locale from './zh_CN/translation';
import en_US_Locale from './en_US/translation';

export const resources = {
  zh_CN: {
    translation: zh_CN_Locale,
  },
  en_US: {
    translation: en_US_Locale,
  },
};

export default function initI18n() {
  use(initReactI18next).init({
    lng: initialState.localeType,
    debug: 'development' === import.meta.env.VITE_NODE_ENV,
    resources,
  });
}
