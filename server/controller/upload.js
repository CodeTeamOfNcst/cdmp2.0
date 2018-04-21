'use strict'
const uploadService = require('../service/upload')

/**
 * 测试 post 方法的参数提取
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.uploadPost = async (ctx, next) => {
  let postData = ctx.req.file
  let res = await uploadService.imageUploadToTemp(postData)
  ctx.body = {
    imgPath:res.imgPath,
    status:res.status,
    message:res.message
  }
}
module.exports.uploadDelete = async (ctx, next) => {
    let postData = ctx.request.body.path
    let res = await uploadService.deleteTempFile(postData)
    ctx.body = {
      imgPath:res.imgPath,
      status:res.status,
      message:res.message
    }
  }
  module.exports.uploadCope = async (ctx, next) => {
    let postData = ctx.request.body.path
    let res = await uploadService.copyTempFileToDir(postData)
    ctx.body = {
      imgPath:res.imgPath,
      status:res.status,
      message:res.message
    }
  }
