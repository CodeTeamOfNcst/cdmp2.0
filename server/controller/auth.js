'use strict'
const authService = require('../service/auth')

/**
 * 测试Get方法的参数提取
 * @param {*} ctx 
 * @param {*} next 
 */
module.exports.authGetUser = async (ctx, next) => {
  let apply = ctx.request.body;
  let result = await authService.getUser(apply)
  ctx.body = {
    result:result.res,
    status:result.status,
    message:result.message
  }
}

module.exports.authCheckLogin = async (ctx, next) => {
  let result = await authService.checkLogIn()
  ctx.body = {
    counts:result.counts,
    applys:result.applys,
    status:result.status,
    message:result.message
  }
}

/**
 * 测试 post 方法的参数提取
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.authRegist = async (ctx, next) => {
  let apply = ctx.request.body;
  let result = await authService.regist(apply)
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


/**
 * 测试 put 方法
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.authLogin = async (ctx, next) => {
  let putData = ctx.request.body;
  let result = await authService.logIn(putData)
  ctx.body = {
    status:result.status,
    message:result.message
  }
}
module.exports.authLogOut = async (ctx, next) => {
    let putData = ctx.request.body;
    let result = await authService.logOut(putData)
    ctx.body = {
      status:result.status,
      message:result.message
    }
  }

