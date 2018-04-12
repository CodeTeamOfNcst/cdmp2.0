'use strict' 

module.exports.testGet = (ctx) => {
  let user=[]
  let userDetail
  let User = [{id:'1',acc:'22',pass:'123'},{id:'2',acc:'89',pass:'123'}]
  for(let index in User){
    user.push({
      userDetail:User[index],
    })
  }
  let res = {
    user:user
  }
  return res;
}

module.exports.testPost = (ctx) => {

}

module.exports.testPut = (ctx) => {

}

module.exports.testDelete = (ctx) => {

}

/**
 * 
 * @param { JSON } options 相当于查询的条件
 * @param { Number } limit 限制数据的条数，默认为 comfig 中的条数
 */
module.exports.testGetUserData = (options, limit) => {

}
