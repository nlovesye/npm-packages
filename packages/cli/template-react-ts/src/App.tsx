import { Provider } from 'react-redux';
import { App as AntdApp } from 'antd';

import store from '@/store';
import MainView from '@/views';
import initI18n from './locale';

initI18n();

function App() {
  return (
    <Provider store={store}>
      <AntdApp>
        <MainView />
      </AntdApp>
    </Provider>
  );
}

export default App;
