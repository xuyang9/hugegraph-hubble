/*
 * @Author: your name
 * @Date: 2022-01-06 16:56:44
 * @LastEditTime: 2022-01-10 14:50:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hubble-fe/src/components/graphManagementHook/graphManagement/index.js
 */
import React, { useState, useContext } from 'react';
import './Resources.less';
import {
    Input,
    Button,
    Table,
    Modal,
    Row,
    Col,
    Form,
    Select,
    Collapse,
    Switch,
    message,
} from 'antd';
import { AppStoreContext } from '../../../../stores';

export default function Resources() {
    const { Search } = Input;
    const { Column } = Table;
    const { Option } = Select;
    const { Panel } = Collapse;
    let appStore = useContext(AppStoreContext);
    const defaultTableData = [
        {
            target_graph: 'test1',
            id: '001',
            target_name: '资源名称',
            target_create: '2020-12-12',
            target_update: '2020-12-12',
            target_creator: 'v_xuyang04'
        }
    ];
    const tableKeyList = [
        {
            key: 'target_graph',
            title: '图'
        },
        {
            key: 'id',
            title: '资源id'
        },
        {
            key: 'target_name',
            title: '资源名称'
        },
        {
            key: 'target_create',
            title: '创建时间'
        },
        {
            key: 'target_update',
            title: '更新时间'
        },
        {
            key: 'target_creator',
            title: '创建人'
        },
    ];
    // 表格数据
    let [tableData, setTableData] = useState(defaultTableData);
    // 创建图弹窗
    const [createKey, setCreateKey] = useState(false);
    // 创建图弹窗时的数据保存
    const [formData, setFormData] = useState({});
    // 创建图时确认弹窗
    const [createConfirmKey, setCreateConfirmKey] = useState(false);
    // 查看schema弹窗
    const [seeVisible, setSeeVisible] = useState(false);
    // 查看schema数据
    const [schemaData, setSchemaData] = useState('');
    // 启用编辑模式
    const [eidtKey, setEidtKey] = useState(false);
    // 清空图确认弹窗
    const [deleteConfirmKey, setDeleteConfirmKey] = useState(false);
    // 清空图弹窗内图名数据
    const [deleteData, setDeleteData] = useState('');

    // 三维数组配置结构
    const collapseListDefault = [
        {
            title: '元数据',
            checked: false,
            isAdd: false,
            key: 'metadata',
            children: [
                {
                    title: '属性类型',
                    checked: false,
                    isAdd: false,
                    key: 'attribute_type',
                },
                {
                    title: '顶点类型',
                    checked: false,
                    isAdd: false,
                    key: 'vertex_type',
                },
                {
                    title: '边类型',
                    checked: false,
                    isAdd: false,
                    key: 'edge_type',
                },
                {
                    title: '索引类型',
                    checked: false,
                    isAdd: false,
                    key: 'index_type',
                }
            ]
        },
        {
            title: '顶点',
            checked: false,
            isAdd: true,
            key: 'vertex',
        },
        {
            title: '边',
            checked: false,
            isAdd: true,
            key: 'edge',
        },
        {
            title: '变量',
            checked: false,
            isAdd: false,
            key: 'variable',
        },
        {
            title: 'GREMLIN',
            checked: false,
            isAdd: false,
            key: 'gremlin',
        },
        {
            title: '异步任务',
            checked: false,
            isAdd: false,
            key: 'asynchronous_task',
        },
    ];

    // 资源三维数据
    const [collapseList, setCollapseList] = useState(collapseListDefault);

    const [switchObj, setSwitchObj] = useState({});
    // 当前点击添加的key名
    const [switchKey, setSwitchKey] = useState('');

    const [addKey, setAddKey] = useState(false);
    // 存放折叠面板所有的key名
    let collapseKeyListDefault = [
        'metadata',
        'vertex',
        'edge',
        'variable',
        'gremlin',
        'asynchronous_task',
        'attribute_type',
        'vertex_type',
        'edge_type',
        'index_type',
    ];
    // 存放折叠面板所有的key名
    const [collapseKeyList, setCollapseKeyList] = useState(collapseKeyListDefault);

    // 搜索
    const onSearch = (e) => {
        console.log(e);
    };
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    // 打开查看schema弹窗
    const openSeeModal = (data) => {
        setSeeVisible(true);
        setSchemaData('11111');
    };
    // 编辑弹窗
    const openEditModal = (data) => {
        setEidtKey(true);
        setCreateKey(true);
        form.setFieldsValue({name: data.name, schema: '22222222'});
    };
    // 打开删除确认弹窗
    const openDeleteConfirm = (data) => {
        setDeleteData(data.name);
        setDeleteConfirmKey(true);
    };
    // 执行清空图操作
    const confirmDelete = () => {
        console.log('确认');
        setDeleteConfirmKey(false);
    };
    // 渲染表格
    const renderTabel = (arr) => {
        if (!arr || !arr.length) {
            return [];
        }
        return arr.map((item) => {
            return (
                <Column
                    title={item.title}
                    dataIndex={item.key}
                    key={item.key}
                />
            )
        });
    };
    // 打开创建图弹窗
    const openCreate = () => {
        setCreateKey(true);
    };
    // 创建
    const onFinish = (values) => {
        setFormData(values);
        setCreateConfirmKey(true);
    };
    // 创建确认操作
    const confirmCreate = () => {
        if (eidtKey) {
            console.log('编辑');
        } else {
            console.log('新增');
        }
        console.log(formData);
        setCreateConfirmKey(false);
        form.setFieldsValue({name: '', schema: null});
        setCreateKey(false);
        setEidtKey(false);
    };
    const switchChange = (value, key) => {
        switchObj[key] = value;
        let obj = JSON.parse(JSON.stringify(switchObj));
        obj[key] = value;
        setSwitchObj(obj);
    };
    const openAddDom = (key) => {
        setSwitchKey(key);
        setAddKey(true);
    };
    // 确认添加操作
    const addDom = (data) => {
        let key = switchKey;
        if (collapseKeyList.indexOf(data.key) !== -1) {
            message.error('key命名重复!');
            return;
        }
        let arr = JSON.parse(JSON.stringify(collapseList));
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].key === key) {
                arr[i].children = arr[i].children ? arr[i].children : [];
                arr[i].children.push({
                    title: data.key + '=' + data.value,
                    checked: false,
                    isAdd: true,
                    key: data.key,
                });
                setCollapseKeyList([...collapseKeyList, data.key]);
                setCollapseList(arr);
                setAddKey(false);
                form1.setFieldsValue({key: '', value: ''});
                return;
            }
            if (arr[i].isAdd && arr[i].children) {
                for (let j = 0; j < arr[i].children.length; j++) {
                    if (arr[i].children[j].key === key) {
                        arr[i].children[j].children = arr[i].children[j].children ? arr[i].children[j].children : [];
                        arr[i].children[j].children.push({
                            title: data.key + '=' + data.value,
                            checked: false,
                            isAdd: false,
                            key: data.key,
                        })
                        setCollapseKeyList([...collapseKeyList, data.key]);
                        setCollapseList(arr);
                        setAddKey(false);
                        form1.setFieldsValue({key: '', value: ''});
                        return;
                    }
                }
            }
        }
    };
    // 选中时勾选children内的数据
    const allChecked = (key) => {
        let arr = JSON.parse(JSON.stringify(collapseList));
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].key === key) {
                arr[i] = mysetChecked(arr[i]);
            }
            if (arr[i].isAdd && arr[i].children) {
                for (let j = 0; j < arr[i].children.length; j++) {
                    if (arr[i].children[j].key === key) {
                        
                    }
                }
            }
        }
    };
    const mysetChecked = (obj) => {
        return {};
    };
    // 渲染折叠面板（三维数组）
    const renderCollapse = (arr) => {
        if (!arr || !arr.length) {
            return [];
        }
        return arr.map((item) => {
            if (!item.children || !item.children.length) {
                if (!item.isAdd) {
                    return (
                        <div style={{padding: '8px 0px'}}>
                            <span style={{margin: '0 20px'}}>{item.title}:</span>
                            <Switch
                                checked={item.checked}
                                onClick={(checked, e) => {
                                    e.stopPropagation();
                                }}
                                onChange={(key) => {switchChange(key, item.key)}}
                            />
                        </div>
                    );
                }
                return (
                    <div style={{padding: '8px 0px'}}>
                        <span style={{margin: '0 20px'}}>{item.title}:</span>
                        <Switch
                            checked={item.checked}
                            onClick={(checked, e) => {
                                e.stopPropagation();
                            }}
                            onChange={(key) => {switchChange(key, item.key)}}
                        />
                        <Button
                            style={{marginLeft: '20px'}}
                            type="primary"
                            size="small"
                            shape="circle"
                            onClick={(e) => {
                                e.stopPropagation();
                                openAddDom(item.key);
                            }}
                        >
                            +
                        </Button>
                    </div>
                );
            }
            if (!item.isAdd) {
                return (
                    <Panel header={
                        <div>
                            <span style={{marginRight: '20px'}}>{item.title}:</span>
                            <Switch
                                checked={item.checked}
                                onClick={(checked, e) => {
                                    e.stopPropagation();
                                }}
                                onChange={(key) => {switchChange(key, item.key)}}
                            />
                        </div>
                    } key={item.key}>
                        <Collapse>
                            {renderCollapse(item.children)}
                        </Collapse>
                    </Panel>
                );
            }
            return (
                <Panel header={
                    <div>
                        <span style={{marginRight: '20px'}}>{item.title}:</span>
                        <Switch
                            checked={item.checked}
                            onClick={(checked, e) => {
                                e.stopPropagation();
                            }}
                            onChange={(key) => {switchChange(key, item.key)}}
                        />
                        <Button
                            style={{marginLeft: '20px'}}
                            type="primary"
                            size="small"
                            shape="circle"
                            onClick={(e) =>{
                                e.stopPropagation();
                                openAddDom(item.key);
                            }}
                        >
                            +
                        </Button>
                    </div>
                } key={item.key}>
                    <Collapse>
                        {renderCollapse(item.children)}
                    </Collapse>
                </Panel>
            );
        });
    };
    return (
        <>
            <Modal
                title="查看schema"
                visible={seeVisible}
                onCancel={()=> {setSeeVisible(false)}}
                footer={null}
            >
                <div style={{minHeight: '200px'}}>
                    <Row>
                        <Col span={4}>schema: </Col>
                        <Col span={20}>{schemaData}</Col>
                    </Row>
                </div>
            </Modal>
            <Modal
                title="确认删除"
                visible={deleteConfirmKey}
                onCancel={()=> {setDeleteConfirmKey(false)}}
                onOk={confirmDelete}
                okText="确认"
                cancelText="取消"
            >
                <div style={{minHeight: '200px'}}>
                    确定要删除{deleteData}吗？
                </div>
            </Modal>
            <Modal
                title={eidtKey ? '确认编辑' : '确认创建'}
                visible={createConfirmKey}
                onCancel={()=> {setCreateConfirmKey(false);}}
                onOk={confirmCreate}
                okText="确认"
                cancelText="取消"
            >
                <div style={{minHeight: '200px'}}>
                    确定要{eidtKey ? '修改' : '创建'}吗？
                </div>
            </Modal>
            {/* 创建资源弹窗 */}
            <Modal
                title={eidtKey ? '编辑' : '创建'}
                width={800}
                visible={createKey}
                onCancel={()=> {
                    setCreateKey(false);
                    setEidtKey(false);
                    form.setFieldsValue({name: '', schema: null});
                }}
                footer={null}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="资源名称"
                        name="target_name"
                        rules={[
                            {required: true, message: '请输入资源名称!' },
                            {pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, message: '请输入正确的格式!'},
                            {max: 48, message: '最大长度为48个字符!'}
                        ]}
                    >
                        <Input placeholder="请输入schema名称" />
                    </Form.Item>
                    <Form.Item
                        label="图"
                        name="target_graph"
                        rules={[{ required: true, message: '请选择图!' }]}
                    >
                        <Select placeholder="请选择图">
                            <Option value="0">1111</Option>
                            <Option value="1">2222</Option>
                        </Select>
                    </Form.Item>
                    <div className='myCollapse'>
                        <Collapse>
                            {renderCollapse(collapseList)}
                        </Collapse>
                    </div>
                    <Form.Item wrapperCol={{ offset: 10, span: 12 }}>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <section className="graphData_wrapper">
                <div className="header_right">
                    <div className='header_right_div'>
                        <Search
                            placeholder="请输入资源名称"
                            onSearch={onSearch}
                            enterButton
                        />
                    </div>
                    <div className="header_right_btn">
                        <Button type="primary" onClick={openCreate}>创建资源</Button>
                    </div>
                </div>
                <div className="graphData_box">
                    <div className='mytable'>
                        <Table dataSource={tableData}>
                            { renderTabel(tableKeyList) }
                            <Column
                                title='操作'
                                dataIndex='operation'
                                key='operation'
                                render={(text, record) => {
                                    return (
                                        <div className='table_btndiv'>
                                            <Button
                                                onClick={()=> {openSeeModal(record)}}
                                            >
                                                查看
                                            </Button>
                                            <Button
                                                onClick={()=> {openEditModal(record)}}
                                            >
                                                编辑
                                            </Button>
                                            <Button
                                                onClick={()=> {openDeleteConfirm(record)}}
                                            >
                                                删除
                                            </Button>
                                        </div>
                                    )
                                }}
                            />
                        </Table>
                    </div>
                </div>
            </section>
            {/* 添加label弹窗 */}
            <Modal
                title="添加"
                width={600}
                visible={addKey}
                onCancel={()=> {
                    setAddKey(false);
                    form1.setFieldsValue({key: '', value: ''});
                }}
                footer={null}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={addDom}
                    autoComplete="off"
                    form={form1}
                >
                    <Form.Item
                        label="key"
                        name="key"
                        rules={[
                            {required: true, message: '请输入key!' }
                        ]}
                    >
                        <Input placeholder="请输入key" />
                    </Form.Item>
                    <Form.Item
                        label="value"
                        name="value"
                        rules={[
                            {required: true, message: '请输入value!' }
                        ]}
                    >
                        <Input placeholder="请输入value" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 10, span: 12 }}>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
