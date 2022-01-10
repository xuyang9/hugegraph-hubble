/*
 * @Author: your name
 * @Date: 2022-01-08 16:50:39
 * @LastEditTime: 2022-01-10 11:05:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hubble-fe/src/api/api.js
 */

import myaxios from './index';

// 获取用户信息
const getUser = (data) => {
    return new Promise((resolve, reject) => {
        myaxios.post('/auth/login', data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 获取图列表
const getGraphs = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/graphs`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 查看图的schema
const getSeeSchema = (graphspace, graph, data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/graphs/${graph}/schema/groovy`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 导出图的schema
const exportSchema = (graphspace, graph) => {
    window.open(`${myaxios.baseURL}/graphspaces/${graphspace}/graphs/${graph}/schema/groovy/export`);
};

// 创建图
const createGraph = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.postForm(`/graphspaces/${graphspace}/graphs`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// 清空图
const deleteSchema = (graphspace, graph, data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/graphs/${graph}/truncate`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// schema列表
const getSchemaList = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/schematemplates`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// 查看schema模板
const seeSchema = (graphspace, name, data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/schematemplates/${name}`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// 获取schema名列表
const getSchemaNameList = (graphspace) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/schematemplates/list`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// 创建Schema
const createSchema = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.post(`/graphspaces/${graphspace}/schematemplates`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// 编辑Schema
const editSchema = (graphspace, name, data) => {
    return new Promise((resolve, reject) => {
        myaxios.put(`/graphspaces/${graphspace}/schematemplates/${name}`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// 删除Schema
const mydeleteSchema = (graphspace, name, data) => {
    return new Promise((resolve, reject) => {
        myaxios.delete(`/graphspaces/${graphspace}/schematemplates/${name}`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};



const obj = {
    getUser,
    getGraphs,
    getSeeSchema,
    createGraph,
    exportSchema,
    deleteSchema,
    getSchemaList,
    seeSchema,
    createSchema,
    editSchema,
    getSchemaNameList,
    mydeleteSchema,
};
export default obj;