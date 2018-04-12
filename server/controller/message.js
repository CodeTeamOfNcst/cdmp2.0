'use strict'
const messageService = require('../service/message')

/**
 * 测试Get方法的参数提取
 * @param {*} ctx 
 * @param {*} next 
 */


module.exports.messageGetAll = async (ctx, next) => {
    let result = await messageService.getAllMessageData()
    ctx.body = {
        counts:result.counts,
        messageTypes:result.MessageTypes,
        Messages:result.Messages,
        status:result.status,
        message:result.message
    }
}



/**
 * 测试 post 方法的参数提取
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.messagePost = async (ctx, next) => {
  let Message = ctx.request.body;
  let result = await messageService.addMessage(Message)
  ctx.body = {
    status:result.status,
    message:result.message
  }
}
module.exports.messageGetById = async (ctx, next) => {
  let Message = ctx.request.body;
  let result = await messageService.getMessageDataById(Message)
  ctx.body = {
    thisMessage:result.thisMessage,
    thisMessageUser:result.user,
    thisMessageTpe:result.type,
    status:result.status,
    message:result.message
  }
}
module.exports.messageSearch = async (ctx, next) => {
  let search = ctx.request.body
  let result = await messageService.getMessageSearch(search)
  ctx.body = {
    Message:result.Message,
    status:result.status,
    message:result.message
  }
  console.log(ctx.body)
}

/**
 * 测试 delete 方法
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.messageDelete = async (ctx, next) => {
    let message = ctx.request.body
    let result = await messageService.deleteMessageById(message)
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
module.exports.messagePut = async (ctx, next) => {
  let putData = ctx.request.body;
  let result = await messageService.modifyMessageById(putData)
  ctx.body = {
    status:result.status,
    message:result.message
  }
}
