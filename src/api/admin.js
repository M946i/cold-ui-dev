import request from '@/utils/request'
// 企业管理 - 列表
export const getCompanyList = (params) =>
  request({
    url: 'system/getAllCompany',
    method: 'get',
    headers:{
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    params
  })

// 企业管理 - 新增
export const addCompany = (params) =>
  request({
    url: 'system/addCompany',
    method: 'post',
    headers: {
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    data: params
  })
// 企业管理 - 修改
export const putCompany = (params) =>
  request({
    url: `system/updateCompanyById`,
    method: 'post',
    headers: {
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    data: params
  })
// 企业管理 - 删除
export const delCompany = (params) =>
  request({
    url: `system/deleteCompanyByCompanyNumber`,
    method: 'post',
    headers: {
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    params
  })
// 库房管理 - 列表
export const getWarehouseList = (params) =>
  request({
    url: `system/getAllWarehouse`,
    method: 'get',
    headers:{
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    params
  })
// 库房管理 - 新增
export const addWarehouse = (params) =>
  request({
    url: `system/addWarehouse`,
    method: 'post',
    headers: {
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    data: params
  })
// 库房管理 - 修改
export const putWarehouse = (params) =>
  request({
    url: `system/updateWarehouseById`,
    method: 'post',
    headers: {
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    data: params
  })

// 库房管理 - 删除
export const delWarehouse = (params) =>
  request({
    url: `system/deleteWarehouseByWarehouseNumber`,
    method: 'post',
    headers: {
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    params
  })
// 主机管理 - 列表
export const getHostList = (params) =>
  request({
    url: 'system/getAllHost',
    method: 'get',
    headers:{
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    params
  })
// 主机管理 - 新增
export const addHost = (params) =>
  request({
    url: 'system/addHost',
    method: 'post',
    headers: {
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    data: params
  })
// 主机管理 - 修改
export const putHost = (params) =>
  request({
    url: 'system/updateHostById',
    method: 'post',
    headers: {
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    data: params
  })
// 主机管理 - 删除
export const delHost = (params) =>
  request({
    url: `system/deleteHostByHostNumber`,
    method: 'post',
    headers: {
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    params
  })

// 仪表管理 -列表
export const getMeterList = (params) =>
  request({
    url: 'system/getAllMeter',
    method: 'get',
    headers:{
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    params
  })
// 仪表管理 -新增
export const addMeter = (params) =>
  request({
    url: 'system/addMeter',
    method: 'post',
    headers: {
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    data: params
  })
// 仪表管理 -修改
export const putMeter = (params) =>
  request({
    url: `system/updateMeterById`,
    method: 'post',
    headers: {
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    data: params
  })
// 仪表管理 -删除
export const delMeter = (params) =>
  request({
    url: `system/deleteMeterByMeterNumber`,
    method: 'post',
    headers: {
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    params
  })
