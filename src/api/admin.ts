import request from '@/utils/request'
// 企业管理 - 列表
export const getCompanyList = (params: any) =>
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
export const addCompany = (params: any) =>
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
export const putCompany = (params: any) =>
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
export const delCompany = (params: any) =>
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
export const getWarehouseList = (params: any) =>
  request({
    url: `system/getAllWarehouse`,
    method: 'get',
    headers: {
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    params
  })
// 库房管理 - 新增
export const addWarehouse = (params: any) =>
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
export const putWarehouse = (params: any) =>
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
export const delWarehouse = (params: any) =>
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
export const getHostList = (params: any) =>
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
export const addHost = (params: any) =>
  request({
    url: 'system/addHost',
    method: 'post',
    headers:{
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    data: params
  })
// 主机管理 - 修改
export const putHost = (params: any) =>
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
export const delHost = (params: any) =>
  request({
    url: `system/deleteHostByHostNumber`,
    method: 'post',
    headers:{
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    params
  })

// 仪表管理 -列表
export const getMeterList = (params: any) =>
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
export const addMeter = (params: any) =>
  request({
    url: 'system/addMeter',
    method: 'post',
    headers:{
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    data: params
  })
// 仪表管理 -修改
export const putMeter = (params: any) =>
  request({
    url: `system/updateMeterById`,
    method: 'post',
    headers:{
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    data: params
  })
// 仪表管理 -删除
export const delMeter = (params: any) =>
  request({
    url: `system/deleteMeterByMeterNumber`,
    method: 'post',
    headers:{
      "Content-Type": "application/json;",
      'token':localStorage.getItem('token')
    },
    params
  })
