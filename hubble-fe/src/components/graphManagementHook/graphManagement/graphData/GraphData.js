/*
 * @Author: your name
 * @Date: 2022-01-06 16:56:44
 * @LastEditTime: 2022-01-10 11:19:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hubble-fe/src/components/graphManagementHook/graphManagement/index.js
 */
import React, { useState, useEffect, useContext } from 'react';
import './GraphData.less';
import api from '../../../../api/api';
import {
    Input,
    Button,
    Table,
    Modal,
    Row,
    Col,
    Checkbox,
    Form,
    Switch,
    Select,
    message
} from 'antd';
import { AppStoreContext } from '../../../../stores';


export default function GraphData() {
    const { Search } = Input;
    const { Column } = Table;
    const { Option } = Select;
    let appStore = useContext(AppStoreContext);
    const tableKeyList = [
        {
            key: 'name',
            title: '图名称'
        },
        {
            key: 'graphspace',
            title: '图空间'
        },
        {
            key: 'graph_create',
            title: '创建时间'
        },
        {
            key: 'graph_update',
            title: '更新时间'
        },
        {
            key: 'graph_creator',
            title: '创建人'
        },
    ];
    const defaultPageObj = {
        current: 1,
        total: 0,
        pageSize: 10
    };
    useEffect(() => {
        onSearch();
        getSchemaNameList();
    }, []);
    // 表格数据
    let [tableData, setTableData] = useState([]);
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
    // 清空图弹窗
    const [deleteVisible, setDeleteVisible] = useState(false);
    // 清空图确认弹窗
    const [deleteConfirmKey, setDeleteConfirmKey] = useState(false);
    // 清空图弹窗内图名数据
    const [deleteData, setDeleteData] = useState('');
    // 清空图弹窗内是否选择删除schema值
    const [radioKey, setRadioKey] = useState(true);
    // pageObj表格页码数据
    let [pageObj, setPageObj] = useState(defaultPageObj);
    // pageObj表格页码数据
    let [schemaNameList, setSchemaNameList] = useState([]);

    // 搜索
    const onSearch = (value) => {
        const obj = {
            page_no: pageObj.current,
            page_size: pageObj.pageSize,
            query: value
        };
        api.getGraphs(appStore.tenant, obj).then((res) => {
            if (res.status === 200) {
                setPageObj({
                    current: res.data.current,
                    total: res.data.total,
                    pageSize: res.data.size
                });
                setTableData(res.data.records);
            }
        });
    };
    const [form] = Form.useForm();
    // 打开查看schema弹窗
    const openSeeModal = (data) => {
        api.getSeeSchema(appStore.tenant, data.name).then((res) => {
            if (res.status === 200) {
                setSeeVisible(true);
                setSchemaData(res.data.schema);
            }
        });
    };
    // 导出schema点击事件
    const exportSchema = (data) => {
        api.exportSchema(appStore.tenant, data.name);
    };
    // 打开清空图弹窗
    const openDeleteModal = (data) => {
        setDeleteVisible(true);
        setDeleteData(data.name);
    };
    // 打开删除确认弹窗
    const openDeleteConfirm = () => {
        setDeleteConfirmKey(true);
    };
    // 是否选中删除schema
    const checkboxChange = (e) => {
        setRadioKey(e.target.checked);
    };
    // 获取schema名列表
    const getSchemaNameList = () => {
        api.getSchemaNameList(appStore.tenant).then((res) => {
            if (res.status === 200) {
                setSchemaNameList(res.data.schemas);
            }
        });
    };
    // 执行清空图操作
    const confirmDelete = () => {
        api.deleteSchema(appStore.tenant, deleteData, {clear_schema: radioKey}).then((res) => {
            if (res.status === 200) {
                message.success(res.message);
                onSearch('');
                setDeleteVisible(false);
                setDeleteConfirmKey(false);
                setPageObj(defaultPageObj);
            }
        });
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
    const pageChange = (pagination) => {
        let obj = {
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total
        };
        setPageObj(obj);
        // 需要后面补充参数值
        onSearch('');
    };
    // 打开创建图弹窗
    const openCreate = () => {
        setCreateKey(true);
    };
    // 创建
    const onFinish = (values) => {
        if (values.auth === undefined) {
            values.auth = false;
        }
        setFormData(values);
        setCreateConfirmKey(true);
    };
    // 创建确认操作
    const confirmCreate = () => {
        api.createGraph(appStore.tenant, formData).then((res) => {
            if (res.status === 200) {
                message.success(res.message);
                setCreateConfirmKey(false);
                form.setFieldsValue({graph: '', schema: null, auth: true});
                setCreateKey(false);
                onSearch('');
                setPageObj(defaultPageObj);
            }
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
                title="清空图"
                visible={deleteVisible}
                onCancel={() => {setDeleteVisible(false)}}
                onOk={openDeleteConfirm}
                okText="确认"
                cancelText="取消"
            >
                <div style={{minHeight: '200px'}}>
                    <p style={{marginBottom: '20px'}}>
                        图名:
                        <span style={{marginLeft: '20px'}}>
                            {deleteData}
                        </span>
                    </p>
                    <Checkbox
                        defaultChecked={true}
                        checked={radioKey}
                        onClick={checkboxChange}
                    >
                        删除schema
                    </Checkbox>
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
                    确定要删除图{deleteData}吗？
                </div>
            </Modal>
            <Modal
                title="确认创建"
                visible={createConfirmKey}
                onCancel={()=> {setCreateConfirmKey(false)}}
                onOk={confirmCreate}
                okText="确认"
                cancelText="取消"
            >
                <div style={{minHeight: '200px'}}>
                    确定要创建吗？
                </div>
            </Modal>
            {/* 创建图弹窗 */}
            <Modal
                title="创建"
                width={600}
                visible={createKey}
                onCancel={()=> {
                    setCreateKey(false);
                    form.setFieldsValue({graph: '', schema: null, auth: true});
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
                        label="图名"
                        name="graph"
                        rules={[
                            {required: true, message: '请输入图名!' },
                            {pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, message: '请输入正确的格式!'},
                            {max: 48, message: '最大长度为48个字符!'}
                        ]}
                    >
                        <Input placeholder="请输入图名" />
                    </Form.Item>
                    <Form.Item
                        label="是否开启鉴权"
                        name="auth"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                    <Form.Item
                        label="schema"
                        name="schema"
                    >
                        <Select placeholder="请选择schema">
                            {
                                schemaNameList.map((item) => {
                                    return (
                                        <Option value={item}>{item}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>

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
                            placeholder="请输入图名称"
                            onSearch={onSearch}
                            enterButton
                        />
                    </div>
                    <div className="header_right_btn">
                        <Button type="primary" onClick={openCreate}>创建图</Button>
                    </div>
                </div>
                <div className="graphData_box">
                    <div className='mytable'>
                        <Table
                            dataSource={tableData}
                            pagination={{
                                defaultCurrent: pageObj.current,
                                total: pageObj.total
                            }}
                            onChange={pageChange}
                        >
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
                                                查看schema
                                            </Button>
                                            <Button
                                                onClick={()=> {exportSchema(record)}}
                                            >
                                                导出schema
                                            </Button>
                                            <Button
                                                onClick={()=> {openDeleteModal(record)}}
                                            >清空图</Button>
                                        </div>
                                    )
                                }}
                            />
                        </Table>
                    </div>
                </div>
            </section>
        </>
    )
}
