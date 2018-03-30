'use strict'
const userService = require('../service/user')

/**
 * 测试Get方法的参数提取
 * @param {*} ctx 
 * @param {*} next 
 */
module.exports.userGet = async (ctx, next) => {
  ctx.body = {
    get: 'successfully get'
  }
}

/**
 * 测试 post 方法的参数提取
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.userPost = async (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = {
    post: ctx.request.body
  }
}

/**
 * 测试 delete 方法
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.userDelete = async (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = {
    delete: ctx.request.body
  }
}

/**
 * 测试 put 方法
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.userPut = async (ctx, next) => {
  console.log(ctx.request.body)
  let userData = ctx.request.body; //获取数据

  dataJSON = {
    
  }

  ctx.body = {
    put: ctx.request.body
  }
}