'use strict'
const userService = require('../service/user')

/**
 * 测试Get方法的参数提取
 * @param {*} ctx 
 * @param {*} next 
 */
module.exports.userGet = async (ctx, next) => {
  let getData = ctx.request.body;
  let dataJSON = {
    "id": getData.id
  }
  let result = await userService.userGetUserData(dataJSON,10)
  ctx.body = {
    user:result.user,
    status:result.status,
    message:result.message
  }
  console.log(ctx.body.message)
}

/**
 * 测试 post 方法的参数提取
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.userPost = async (ctx, next) => {
  console.log("再试一下。。")
  let postData = ctx.request.body; //获取数据
  //封装
  let dataJSON = {
    "id": postData.id,
    "user_type": postData.user_type,
    "account": postData.account,
    "password": postData.password,
    "name": postData.name,
    "phone": postData.phone,
    "email": postData.email,
    "isUse": postData.isUse
  }
  let result = await userService.userAddUser(dataJSON)
  console.log("就是就是。。")
  ctx.body = {
    status:result.status,
    message:result.message
    // post:ctx.request.body
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
    
  ctx.body = {
    put: ctx.request.body
  }
}