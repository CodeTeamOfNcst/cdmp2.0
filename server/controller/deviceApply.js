'use strict'
const deviceApplyService = require('../service/deviceApply')

/**
 * 测试Get方法的参数提取
 * @param {*} ctx 
 * @param {*} next 
 */
module.exports.deviceApplyGetById = async (ctx, next) => {
  let apply = ctx.request.body;
  let result = await deviceApplyService.getApplyById(apply)
  ctx.body = {
    result:result.res,
    status:result.status,
    message:result.message
  }
}

module.exports.deviceApplyGetAll = async (ctx, next) => {
  let result = await deviceApplyService.getAllApplyData()
  ctx.body = {
    counts:result.counts,
    applys:result.applys,
    status:result.status,
    message:result.message
  }
}
module.exports.deviceApplySearch = async (ctx, next) => {
  let search = ctx.request.body
  let result = await deviceApplyService.getApplySearch(search)
  ctx.body = {
    result:result.result,
    status:result.status,
    message:result.message
  }
}

/**
 * 测试 post 方法的参数提取
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.deviceApplyPost = async (ctx, next) => {
  let apply = ctx.request.body;
  let result = await deviceApplyService.addApply(apply)
  ctx.body = {
    status:result.status,
    message:result.message
  }
}

module.exports.deviceApplyPostFront = async (ctx, next) => {
  let apply = ctx.request.body
  let user = ctx.cookies.get("authUser")
  let result = await deviceApplyService.addApplyFront(apply,user)
  ctx.body = {
    status:result.status,
    message:result.message
  }
}

/**
 * 测试 delete 方法
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.deviceApplyDelete = async (ctx, next) => {
  let apply = ctx.request.body
  let result = await deviceApplyService.deleteApplyById(apply)
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
module.exports.deviceApplyPut = async (ctx, next) => {
  let putData = ctx.request.body;
  let result = await deviceApplyService.modifyApplyById(putData)
  ctx.body = {
    status:result.status,
    message:result.message
  }
}
