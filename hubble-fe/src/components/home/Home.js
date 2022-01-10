/*
 * @Author: your name
 * @Date: 2022-01-05 14:38:56
 * @LastEditTime: 2022-01-10 17:48:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hubble-fe/src/components/home/home.js
 */
import React, { useState, useContext, useEffect } from 'react';
import './Home.less';
import { Select, Menu, Layout } from 'antd';
import { SnippetsOutlined, QrcodeOutlined, ToolOutlined } from '@ant-design/icons';
import {
    AppStoreContext,
} from '../../stores';
import { Route, Router, useLocation, Redirect } from 'wouter';
import {
    GraphManagement,
    DataAnalyze,
    MetadataConfigs,
    ImportTasks,
    ImportManager,
    JobDetails
} from '../graph-management';
import GraphData from '../graphManagementHook/graphManagement/graphData/GraphData';
import GraphSchema from '../graphManagementHook/graphManagement/graphSchema/GraphSchema';
import Resources from '../graphManagementHook/graphManagement/resources/Resources';
import {
    TaskErrorLogs,
    JobErrorLogs
} from '../graph-management/data-import/import-tasks/error-logs';
import { AsyncTaskList } from '../graph-management';
import AsyncTaskResult from '../graph-management/async-tasks/AsyncTaskResult';
import { useLocationWithConfirmation } from '../../hooks';

const { Option } = Select;
const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

export default function Home() {
    useEffect(()=>{
    });
    let appStore = useContext(AppStoreContext);
    appStore.setTenant('DEFAULT');
    let userList = [
        {
            name: 'DEFAULT',
            value: 'DEFAULT'
        },
        {
            name: '许阳',
            value: 'xuyang'
        },
        {
            name: '胡闳焘',
            value: 'huhongtao'
        },
        {
            name: '何洋',
            value: 'heyang'
        },
    ];
    const defaultMenuList = [
        {
            tab: 'dataAnalysis',
            data: [
                {
                    key: '0',
                    name: 'Gremlin分析'
                },
                {
                    key: '1',
                    name: '任务管理'
                },
            ]
        },
        {
            tab: 'dataMaintenance',
            data: [
                {
                    key: '0',
                    name: '原数据配置'
                },
                {
                    key: '1',
                    name: '数据导入'
                },
                {
                    key: '2',
                    name: '图管理'
                },
                {
                    key: '3',
                    name: 'schema管理'
                },
            ]
        },
        {
            tab: 'jurisdiction',
            data: [
                {
                    key: '0',
                    name: '角色管理'
                },
                {
                    key: '1',
                    name: '资源管理'
                },
                {
                    key: '2',
                    name: '用户管理'
                },
            ]
        },
    ];
    const [_, setLocation] = useLocation();
    // 当前租户列表
    let [userListSelect, setUserListSelect] = useState(userList);
    // 头部导航当前选中值
    let [current, setCurrent] = useState('0');
    // 头部导航菜单数据
    let [menuList, setMenuList] = useState(defaultMenuList[0].data);
    // 头部导航点击事件
    const handleClick = (e) => {
        setCurrent(e.key);
        if (appStore.menuObj.c_key === '1') {
            if (e.key === '0') {
                setLocation(`/graph-management/0/data-analyze`);
            } else if (e.key === '1') {
                setLocation(`/graph-management/0/async-tasks`);
            }
        } else if (appStore.menuObj.c_key === '2') {
            if (e.key === '0') {
                setLocation(`/graph-management/0/metadata-configs`);
            } else if (e.key === '1') {
                setLocation(`/graph-management/0/data-import/import-manager`);
            } else if (e.key === '2') {
                setLocation(`/graph-management/management`);
            } else if (e.key === '3') {
                setLocation(`/graph-management/schema`);
            }
        } else if (appStore.menuObj.c_key === '3') {
            if (e.key === '1') {
                setLocation(`/graph-management/resources`);
            }
        }
    };
    // 左侧菜单栏点击事件
    const menuLeftClick = (e) => {
        if (e.key === appStore.menuObj.c_key) {
            return;
        }
        setCurrent('0');
        appStore.setMenuObj({
            c_key: e.key,
            f_key: e.keyPath[1]
        });
        setMenuList(defaultMenuList[e.key - 1].data);
        if (e.key === '1') {
            setLocation(`/graph-management/0/data-analyze`);
        } else if (e.key === '2') {
            setLocation(`/graph-management/0/metadata-configs`);
        }
    };
    // 截取域名
    // const getUrlRelativePath  = () => {
    //     let url = document.location.toString();
    //     let arrUrl = url.split('//');

    //     let start = arrUrl[1].indexOf('/');
    //     let relUrl = arrUrl[1].substring(start); // stop省略，截取从start开始到结尾的所有字符

    //     if(relUrl.indexOf('?') != -1){
    //         relUrl = relUrl.split('?')[0];
    //     }
    //     return relUrl;
    // }
    // 租户选择器渲染函数
    const selectRender = (arr) => {
        if (!arr.length) {
            return [];
        }
        return arr.map((item) => {
            return (
                <Option
                    key={item.value}
                    value={item.value}
                >
                    {item.name}
                </Option>
            );
        });
    };
    // 切换租户时触发
    const selectChange = (value) => {
        appStore.setTenant(value);
    };
    // 头部导航菜单栏渲染函数
    const menuRender = (arr) => {
        if (!arr.length) {
            return [];
        }
        return arr.map((item) => {
            return (
                <Menu.Item key={item.key}>
                    {item.name}
                </Menu.Item>
            );
        });
    };
    return (
        <div className='wrapper'>
            <Layout>
                <Header>
                    <div className="header">
                        <div className="header_user">
                            <Select
                                defaultValue={appStore.tenant}
                                style={{ width: 120 }}
                                bordered={false}
                                onChange={selectChange}
                            >
                                { selectRender(userListSelect) }
                            </Select>
                        </div>
                        <div className="header_menu">
                            <Menu
                                onClick={handleClick}
                                selectedKeys={[current]}
                                mode="horizontal"
                            >
                                { menuRender(menuList) }
                            </Menu>
                        </div>
                    </div>
                </Header>
                <Layout>
                    <Sider>
                        <div className="leftTab">
                            <Menu
                                onClick={menuLeftClick}
                                style={{ width: 256 }}
                                defaultSelectedKeys={[appStore.menuObj.c_key]}
                                defaultOpenKeys={[appStore.menuObj.f_key]}
                                mode="inline"
                            >
                                <SubMenu key="sub1" icon={<SnippetsOutlined />} title="图管理">
                                    <Menu.Item key="1">数据分析</Menu.Item>
                                    <Menu.Item key="2">数据维护</Menu.Item>
                                    <Menu.Item key="3">权限管理</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<QrcodeOutlined />} title="运维管理">
                                    <Menu.Item key="4">服务</Menu.Item>
                                    <Menu.Item key="5">监控报警</Menu.Item>
                                    <Menu.Item key="6">日志</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<ToolOutlined />} title="系统管理">
                                    <Menu.Item key="7">租户管理</Menu.Item>
                                    <Menu.Item key="8">用户管理</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </div>
                    </Sider>
                    <Content>
                        <div className="right_content">
                            <Router hook={useLocationWithConfirmation}>
                                <Route
                                    path="/graph-management/:id/data-import/:jobId/task-error-log/:taskId"
                                    component={TaskErrorLogs}
                                />
                                <Route
                                    path="/graph-management/:id/data-import/job-error-log/:jobId"
                                    component={JobErrorLogs}
                                />
                                <Route
                                    path="/graph-management/:id/async-tasks/:taskId/result"
                                    component={AsyncTaskResult}
                                />
                                <Route
                                    path="/graph-management/:id/data-analyze"
                                    component={DataAnalyze}
                                />
                                <Route
                                    path="/graph-management/:id/metadata-configs"
                                    component={MetadataConfigs}
                                />
                                <Route
                                    path="/graph-management/:id/data-import/:jobId/import-tasks"
                                    component={ImportTasks}
                                />
                                <Route
                                    path="/graph-management/:id/data-import/import-manager/:rest*"
                                    component={ImportManager}
                                />
                                <Route
                                    path="/graph-management/:id/async-tasks"
                                    component={AsyncTaskList}
                                />
                                {/* <Route path="/graph-management" component={GraphManagement} /> */}
                                <Route
                                    path="/graph-management/management"
                                    component={GraphData}
                                />
                                <Route
                                    path="/graph-management/schema"
                                    component={GraphSchema}
                                />
                                <Route
                                    path="/graph-management/resources"
                                    component={Resources}
                                />
                                <Redirect from="/" to="/graph-management/0/data-analyze" />
                                {/* <Route path="/" component={GraphManagement} /> */}
                            </Router>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}
