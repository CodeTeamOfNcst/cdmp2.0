'use strict'
const userService = require('../service/user')

/**
 * 测试Get方法的参数提取
 * @param {*} ctx 
 * @param {*} next 
 */
module.exports.userGetAll = async (ctx, next) => {
  let result = await userService.userGetAllData()
  ctx.body = {
    counts:result.counts,
    status:result.status,
    message:result.message,
    usersDetail:result.usersDetail,
    userTypeDetail:result.userTypeDetail
  }
  console.log(ctx.body)
}
module.exports.userGetName = async (ctx, next) => {
  let result = await userService.onlyGetAllUser()
  ctx.body = {
    users:result.users,
    status:result.status,
    message:result.message,
  }
  console.log(ctx.body)

}

/**
 * 测试 post 方法的参数提取
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.userPost = async (ctx, next) => {
  let postData = ctx.request.body.post; //获取数据
  //封装
  let dataJSON = {
    "user_type": postData.user_type,
    "account": postData.account,
    "password": postData.password,
    "name": postData.name,
    "phone": postData.phone,
    "email": postData.email,
    "isUse": postData.isUse
  }
  let result = await userService.userAddUser(dataJSON)
  ctx.body = {
    status:result.status,
    message:result.message
  }
  console.log(ctx.body)
}
module.exports.userGet = async (ctx, next) => {
  let getData = ctx.request.body;
  let dataJSON = {
    "id": getData.id,
  }
  let result = await userService.userGetUserData(dataJSON,10)
  ctx.body = {
    user:result.user,
    status:result.status,
    message:result.message,
  }
  console.log(ctx.body)
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
  console.log(ctx.body)

}
module.exports.userSearch = async (ctx, next) => {
  let search = ctx.request.body.search;
  let dataJSON = {
    "name":search,
  }
  let result = await userService.userSearchData(dataJSON)
  ctx.body = {
    result:result.result,
    status:result.status,
    message:result.message,
  }
}
module.exports.userPut = async (ctx, next) => {
  let user = ctx.request.body;   //获取数据
  let dataJSON = {
    "id":user.id,
    "user_type":user.userType,
    "account": user.account,
    "name": user.name,
    "phone": user.phone,
    "email": user.email,
    "isUse": user.isUse
  }
  let result = await userService.modifyUserById(dataJSON)
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
  let dataJSON = {
    "id":userId.id
  }
  let result = await userService.userDeleteById(dataJSON)
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
