'use strict'
const deviceService = require('../service/device')

/**
 * 测试Get方法的参数提取
 * @param {*} ctx 
 * @param {*} next 
 */
module.exports.deviceGet = async (ctx, next) => {
  ctx.body = {
    get: 'successfully get'
  }
}

/**
 * 测试 post 方法的参数提取
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.devicePost = async (ctx, next) => {
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
module.exports.deviceDelete = async (ctx, next) => {
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
module.exports.devicePut = async (ctx, next) => {
  console.log(ctx.request.body)
  let postData = ctx.request.body; //获取数据
  ctx.body = {
    put: ctx.request.body
  }
}