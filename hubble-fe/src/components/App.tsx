/*
 * @Author: your name
 * @Date: 2021-12-28 10:53:00
 * @LastEditTime: 2022-01-06 10:28:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hubble-fe/src/components/App.tsx
 */
import React, { useEffect } from 'react';

import { AppBar } from './common';
import 'antd/dist/antd.css';
import GraphManagementSidebar from './graph-management/GraphManagementSidebar';
import Home from './home/Home.js';

const App: React.FC = () => {
  return (
    <div>
      <AppBar />
      <GraphManagementSidebar />
      <Home />
    </div>
  );
};

export default App;
