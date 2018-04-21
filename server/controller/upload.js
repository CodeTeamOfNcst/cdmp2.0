'use strict'
const upload = require('../service/upload')

/**
 * 测试 post 方法的参数提取
 * @param {*} ctx 上下文
 * @param {*} next 
 */
module.exports.uploadPost = async (ctx, next) => {
  let res = await upload.imageUploadToTemp(ctx.req.file)
  ctx.body = {
    imgPath:res.imgPath,
    status:res.status,
    message:res.message
  }
}
module.exports.uploadDelete = async (ctx, next) => {
    let postData = ctx.request.body.path
    let res = await upload.deleteTempFile(postData)
    ctx.body = {
      imgPath:res.imgPath,
      status:res.status,
      message:res.message
    }
  }
  module.exports.uploadCope = async (ctx, next) => {
    let postData = ctx.request.body.path
    let res = await upload.copyTempFileToDir(postData)
    ctx.body = {
      imgPath:res.imgPath,
      status:res.status,
      message:res.message
    }
  }
