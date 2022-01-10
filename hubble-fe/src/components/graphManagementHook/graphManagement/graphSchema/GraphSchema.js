/*
 * @Author: your name
 * @Date: 2022-01-06 16:56:44
 * @LastEditTime: 2022-01-10 11:22:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hubble-fe/src/components/graphManagementHook/graphManagement/index.js
 */
import React, { useState, useEffect, useContext } from 'react';
import './GraphSchema.less';
import api from '../../../../api/api';
import {
    Input,
    Button,
    Table,
    Modal,
    Row,
    Col,
    Form,
    message,
} from 'antd';
import { AppStoreContext } from '../../../../stores';

export default function GraphSchema() {
    const { Search } = Input;
    const { Column } = Table;
    const { TextArea } = Input;
    let appStore = useContext(AppStoreContext);
    const tableKeyList = [
        {
            key: 'name',
            title: 'schema名称'
        },
        {
            key: 'create_time',
            title: '创建时间'
        },
        {
            key: 'update_time',
            title: '更新时间'
        },
        {
            key: 'creator',
            title: '创建人'
        },
    ];
    const defaultPageObj = {
        current: 1,
        total: 0,
        pageSize: 10
    };
    useEffect(()=>{
        onSearch();
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
    // 启用编辑模式
    const [eidtKey, setEidtKey] = useState(false);
    // 清空图确认弹窗
    const [deleteConfirmKey, setDeleteConfirmKey] = useState(false);
    // 清空图弹窗内图名数据
    const [deleteData, setDeleteData] = useState('');
    // pageObj表格页码数据
    let [pageObj, setPageObj] = useState(defaultPageObj);

    // 搜索
    const onSearch = (value) => {
        const obj = {
            page_no: pageObj.current,
            page_size: pageObj.pageSize,
            query: value
        };
        api.getSchemaList(appStore.tenant, obj).then((res) => {
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
    // 表格切换页码
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
    const [form] = Form.useForm();
    // 打开查看schema弹窗
    const openSeeModal = (data) => {
        api.seeSchema(appStore.tenant, data.name).then((res) => {
            if (res.status === 200) {
                setSeeVisible(true);
                setSchemaData(res.data.schema);
            }
        });
    };
    // 编辑弹窗
    const openEditModal = (data) => {
        api.seeSchema(appStore.tenant, data.name).then((res) => {
            if (res.status === 200) {
                setEidtKey(true);
                setCreateKey(true);
                setDeleteData(data.name);
                form.setFieldsValue({name: data.name, schema: res.data.name});
                form.setFieldsValue({name: data.name, schema: res.data.schema});
            }
        });
    };
    // 打开删除确认弹窗
    const openDeleteConfirm = (data) => {
        setDeleteData(data.name);
        setDeleteConfirmKey(true);
    };
    // 执行清空图操作
    const confirmDelete = () => {
        api.mydeleteSchema(appStore.tenant, deleteData).then((res) => {
            if (res.status === 200) {
                setDeleteConfirmKey(false);
                message.success(res.message);
                onSearch('');
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
            api.editSchema(appStore.tenant, deleteData, formData).then((res) => {
                if (res.status === 200) {
                    message.success(res.message);
                    setCreateConfirmKey(false);
                    form.setFieldsValue({name: '', schema: null});
                    setCreateKey(false);
                    setEidtKey(false);
                    onSearch('');
                    setPageObj(defaultPageObj);
                }
            });
            return;
        }
        api.createSchema(appStore.tenant, formData).then((res) => {
            if (res.status === 200) {
                message.success(res.message);
                setCreateConfirmKey(false);
                form.setFieldsValue({name: '', schema: null});
                setCreateKey(false);
                setEidtKey(false);
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
            {/* 创建图弹窗 */}
            <Modal
                title={eidtKey ? '编辑' : '创建'}
                width={600}
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
                        label="schema名称"
                        name="name"
                        rules={[
                            {required: true, message: '请输入schema名称!' },
                            {pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, message: '请输入正确的格式!'},
                            {max: 48, message: '最大长度为48个字符!'}
                        ]}
                    >
                        <Input placeholder="请输入schema名称" />
                    </Form.Item>
                    <Form.Item
                        label="schema"
                        name="schema"
                        rules={[{ required: true, message: '请输入schema!' }]}
                    >
                        <TextArea placeholder="请输入schema" />
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
                            placeholder="请输入schema"
                            onSearch={onSearch}
                            enterButton
                        />
                    </div>
                    <div className="header_right_btn">
                        <Button type="primary" onClick={openCreate}>创建schema</Button>
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
        </>
    )
}
