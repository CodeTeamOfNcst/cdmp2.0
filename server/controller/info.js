'use strict'
const infoService = require('../service/info')

/**
 * 测试Get方法的参数提取
 * @param {*} ctx 
 * @param {*} next 
 */

module.exports.infoGetAll = async (ctx, next) => {
  let page = ctx.params.page
  let result = await infoService.getAllInfoData(page)
  ctx.body = {
    counts:result.counts,
    infoDetail:result.infoDetail,
    indexInfo:result.indexInfo,
    status:result.status,
    message:result.message
  }
}

/**
 * 测试 post 方法的参数提取
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.infoPost = async (ctx, next) => {
  let info = ctx.request.body;
  let result = await infoService.addInfo(info)
  ctx.body = {
    status:result.status,
    message:result.message
  }
}
module.exports.infoGetById = async (ctx, next) => {
  let info = ctx.request.body;
  let result = await infoService.getInfoDataById(info)
  ctx.body = {
    infoDetails:result.infoDetails,
    status:result.status,
    message:result.message
  }
}
module.exports.infoSearch = async (ctx, next) => {
  let search = ctx.request.body
  let result = await infoService.getInfoSearch(search)
  ctx.body = {
    details:result.result,
    status:result.status,
    message:result.message
  }
}

/**
 * 测试 delete 方法
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.infoDelete = async (ctx, next) => {
    let info = ctx.request.body
    let result = await infoService.deleteInfoById(info)
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
module.exports.infoPut = async (ctx, next) => {
  let putData = ctx.request.body;
  let result = await infoService.modifyInfoById(putData)
  ctx.body = {
    status:result.status,
    message:result.message
  }
}
