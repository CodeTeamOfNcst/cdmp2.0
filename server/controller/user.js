'use strict'
const userService = require('../service/user')

/**
 * 测试Get方法的参数提取
 * @param {*} ctx 
 * @param {*} next 
 */
module.exports.userGetAll = async (ctx, next) => {
  let page = ctx.params.page
  let result = await userService.userGetAllData(page)
  ctx.body = {
    counts:result.counts,
    status:result.status,
    message:result.message,
    usersDetail:result.usersDetail,
    userTypeDetail:result.userTypeDetail
  }
}
module.exports.userGetName = async (ctx, next) => {
  let result = await userService.onlyGetAllUser()
  ctx.body = {
    users:result.users,
    status:result.status,
    message:result.message,
  }
}

/**
 * 测试 post 方法的参数提取
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.userPost = async (ctx, next) => {
  let postData = ctx.request.body; //获取数据
  let result = await userService.userAddUser(postData)
  ctx.body = {
    status:result.status,
    message:result.message
  }
}
module.exports.userGet = async (ctx, next) => {
  let getData = ctx.request.body;
  let result = await userService.userGetUserData(getData)
  ctx.body = {
    user:result.user,
    status:result.status,
    message:result.message,
  }
}
module.exports.getApplys = async (ctx,next) => {
  let userId = ctx.request.body.id
  let dataJSON = {
    "id":userId
  }
  let result = await userService.userApply(dataJSON)
  ctx.body = {
    status:result.status,
    message:result.message,
    deviceResult:result.deviceResult,
    computeResult: result.computeResult
  }
}
module.exports.userSearch = async (ctx, next) => {
  let search = ctx.request.body.name;
  let result = await userService.userSearchData(search)
  ctx.body = {
    result:result.result,
    status:result.status,
    message:result.message,
  }
}
module.exports.userPut = async (ctx, next) => {
  let user = ctx.request.body;   //获取数据
  console.log(ctx.request.body)
  let result = await userService.modifyUserById(user)
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
module.exports.userDelete = async (ctx, next) => {
  let userId = ctx.request.body;
  let result = await userService.userDeleteById(userId)
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
