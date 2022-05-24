import React from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { message, ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'tailwindcss/tailwind.css';
import history from './routes/history';
import Routes from './routes/Routes';
import './main.css';

import MenuContextProvider from '@/store/menu';

// 时间处理库本地化
dayjs.locale('zh-cn');

// 消息提示窗位置调整
message.config({ top: 100 });

function App() {
  return (
    <HistoryRouter history={history}>
      <ConfigProvider getPopupContainer={() => document.getElementById('ant-modal-root')!}>
        <MenuContextProvider>
          <Routes />
        </MenuContextProvider>
      </ConfigProvider>
    </HistoryRouter>
  );
}

export default App;
