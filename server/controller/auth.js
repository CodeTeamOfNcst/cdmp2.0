'use strict'
const authService = require('../service/auth')
const jsonwebtoken  = require('jsonwebtoken')
/**
 * 测试Get方法的参数提取
 * @param {*} ctx 
 * @param {*} next 
 */
module.exports.authGetUser = async (ctx, next) => {
  let getData =  ctx.cookies.get('token');
  let result =  authService.user(getData)
  ctx.body = {
    user:result.user,
  }
}

module.exports.authCheckLogin = async (ctx, next) => {
    let getData = ctx.cookies.get('user');
    let result =  authService.checkLogIn(getData)
    ctx.body = {
        user:result.user,
        user_is_admin:result.user_is_admin,
        status:result.status,
        message:result.message
    }
}
module.exports.authLogOut = async (ctx, next) => {
    let putData = ctx.cookies;
    let result =  authService.logOut(putData)
    ctx.body = {
      status:result.status,
    }
  }
/**
 * 测试 post 方法的参数提取
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.authRegist = async (ctx, next) => {
  let postData = ctx.request.body;
  let result = await authService.regist(postData)
  ctx.body = {
    user:result.user,
    status:result.status,
    message:result.message
  }
}
module.exports.authLogin = async (ctx, next) => {
  let putData = ctx.request.body;
  let result = await authService.logIn(putData)
  ctx.body = {
    user:result.user, 
    user_is_admin:result.user_is_admin,
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



