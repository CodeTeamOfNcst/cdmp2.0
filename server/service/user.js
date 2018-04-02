'use strict' 

module.exports.userGet = (ctx) => {
  ctx.body = 'tom'
}

module.exports.userPost = (ctx) => {

}

module.exports.userPut = (ctx) => {

}

module.exports.userDelete = (ctx) => {

}

/**
 * 
 * @param { JSON } options 相当于查询的条件
 * @param { Number } limit 限制数据的条数，默认为 comfig 中的条数
 */
module.exports.userGetUserData = (options, limit) => {

}

module.exports.userAddUser = async (JSON) => {
  try {
    let newUser = await user.create({
      account: JSON.account,
      password: JSON.password,
      name: JSON.name,
      phone: JSON.phone,
      email: JSON.email,
      isUse: JSON.isUse
    })
    let userType = await UserType.findOne({
      where: {
        id: JSON.id
      }
    });
    await newUser.setUserType(userType)
    newUser.save()
    ctx.body = {
      status: 1,
      message: '创建成功'
    }
  } catch (err) {
    ctx.body = {
      status: 0,
      message: '创建失败，原因：${err}'
    }
  }
}