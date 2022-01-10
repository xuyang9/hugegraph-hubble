/*
 * @Author: your name
 * @Date: 2021-12-28 10:59:07
 * @LastEditTime: 2022-01-05 14:20:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hubble-fe/src/components/common/AppBar.tsx
 */
import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { useLocation } from 'wouter';

import './AppBar.less';

const AppBar: React.FC = observer(() => {
  const [_, setLocation] = useLocation();

  const setRoute = useCallback(
    (route: string) => () => {
      setLocation(route);
    },
    [setLocation]
  );

  return (
    <nav className="navigator">
      <div className="navigator-logo" onClick={setRoute('/')}></div>
      {/* <div className="navigator-items">
        <div
          className="navigator-item active"
          onClick={setRoute('/graph-management')}
        >
          <span>图管理1</span>
        </div>
      </div> */}
      <div className="navigator-additions">
        <span className="navigator-additions-img"></span>
        <span>v_xuyang04</span>
      </div>
    </nav>
  );
});

export default AppBar;
