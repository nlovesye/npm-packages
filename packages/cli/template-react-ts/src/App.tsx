import { Provider } from 'react-redux';
import { App as AntdApp } from 'antd';

import store from '@/store';
import MainView from '@/views';

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
