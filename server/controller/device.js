'use strict'
const deviceService = require('../service/device')

/**
 * 测试Get方法的参数提取
 * @param {*} ctx 
 * @param {*} next 
 */

module.exports.deviceGetAllData = async (ctx, next) => {
  let page = ctx.params.page
  let result = await deviceService.getAllDeviceData(page)
  ctx.body = {
    counts:result.counts,
    Devices:result.Devices,
    DeviceTypes:result.DeviceTypes,
    status:result.status,
    message:result.message
  }
}

module.exports.deviceGetOnlyData = async (ctx, next) => {
  let result = await deviceService.getDeviceOnlyData()
  ctx.body = {
    devices:result.devices,
    status:result.status,
    message:result.message
  }
}

/**
 * 测试 post 方法的参数提取
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.devicePost = async (ctx, next) => {
  let postData = ctx.request.body;
  let dataJSON = {
    "name":postData.name,
    "deviceType":postData.device_type,
    "device_manager":postData.UserId,
    "imgFilePath":postData.imgFilePath,
    "location":postData.location,
    "description":postData.description,
    "purchaseDate":postData.purchaseDate,
    "needRepair":postData.needRepair,
    "canReserve":postData.canReserve,
    "isUse":postData.isUse
  }
  let result = await deviceService.AddDevice(dataJSON)
  ctx.body = {
    status:result.status,
    message:result.message
  }
}
module.exports.deviceGetById = async (ctx, next) => {
  let device = ctx.request.body;
  let result = await deviceService.getDeviceDataById(device)
  ctx.body = {
    device:result.device,
    TypesDevice:result.TypesDevice,
    status:result.status,
    message:result.message
  }
}
module.exports.deviceGetByName = async (ctx, next) => {
  let device = ctx.request.body;
  let result = await deviceService.getDeviceDataByName(device)
  ctx.body = {
    device:result.device,
    status:result.status,
    message:result.message
  }
}
module.exports.deviceSearch = async (ctx, next) => {
  let search = ctx.request.body
  let result = await deviceService.getDeviceSearch(search)
  ctx.body = {
    result:result.result,
    status:result.status,
    message:result.message
  }
}
/**
 * 测试 delete 方法
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.deviceDelete = async (ctx, next) => {
  let postData = ctx.request.body;
  let result = await deviceService.deleteDeviceById(postData)
  ctx.body = {
    status:result.status,
    message:result.message
  }
}

/**
 * 测试 put 方法
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.devicePut = async (ctx, next) => {
  let postData = ctx.request.body;
  let result = await deviceService.modifyDeviceById(postData)
  ctx.body = {
    status:result.status,
    message:result.message
  }
}
