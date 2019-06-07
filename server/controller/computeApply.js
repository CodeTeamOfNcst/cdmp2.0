'use strict'
const computeApplyService = require('../service/computeApply')

/**
 * 测试Get方法的参数提取
 * @param {*} ctx 
 * @param {*} next 
 */


module.exports.computeApplyGetAll = async (ctx, next) => {
  let page = ctx.params.page
  let result = await computeApplyService.getAllApplyData(page)
  ctx.body = {
    counts:result.counts,
    applys:result.applys,
    ApplysOk:result.ApplysOk,
    status:result.status,
    message:result.message
  }
}

/**
 * 测试 post 方法的参数提取
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.computeApplyPost = async (ctx, next) => {
  let apply = ctx.request.body;
  let result = await computeApplyService.addApply(apply)
  ctx.body = {
    status:result.status,
    message:result.message
  }
}

module.exports.computeApplyPostFront = async (ctx, next) => {
  let apply = ctx.request.body
  let user = ctx.cookies.get("authUser")
  let result = await computeApplyService.addApplyFront(apply,user)
  ctx.body = {
    status:result.status,
    message:result.message
  }
}
module.exports.computeApplyGetById = async (ctx, next) => {
  let apply = ctx.request.body;
  let result = await computeApplyService.getApplyById(apply)
  ctx.body = {
    result:result.res,
    status:result.status,
    message:result.message
  }
}
module.exports.computeApplySearchFront = async (ctx, next) => {
  let search = ctx.request.body
  let result = await computeApplyService.getApplySearchFront(search)
  ctx.body = {
    result:result.result,
    status:result.status,
    message:result.message
  }
}
module.exports.computeApplySearch = async (ctx, next) => {
  let search = ctx.request.body
  let result = await computeApplyService.getApplySearch(search)
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
module.exports.computeApplyDelete = async (ctx, next) => {
  let apply = ctx.request.body
  let result = await computeApplyService.deleteApplyById(apply)
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
module.exports.computeApplyPut = async (ctx, next) => {
  let putData = ctx.request.body;
  let result = await computeApplyService.modifyApplyById(putData)
  ctx.body = {
    status:result.status,
    message:result.message
  }
}
