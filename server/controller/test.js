'use strict'
const test = require('../service/test')
/**
 * 测试Get方法的参数提取
 * @param {*} ctx 
 * @param {*} next 
 */
module.exports.testGet = async (ctx, next) => {
  let res = await test.testGet()
  ctx.body = {
    get: res.user
  }
}

/**
 * 测试 post 方法的参数提取
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.testPost = async (ctx, next) => {
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
module.exports.testDelete = async (ctx, next) => {
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
module.exports.testPut = async (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = {
    put: ctx.request.body
  }
}