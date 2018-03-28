'use strict' 

module.exports.testGet = (ctx) => {
  console.log(ctx.res)
  ctx.body = 'tom'
}