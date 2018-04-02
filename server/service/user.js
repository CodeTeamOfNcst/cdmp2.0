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
module.exports.userGetUserData = async (JSON, limit) => {
  try{
    let user = await user.findOne({
      where: {
        id: JSON.id
      } 
    })
    let userType = await user.getUserType()
    let userData = {
      id: user.id,
      name: user.name,
      account: user.account,
      password: user.password,
      userType: userType.id,
      phone: user.phone,
      email: user.email,
      isUse: user.isUse
    };
    let res = {
        user: userData,
        status: 1,
        message: '获取用户信息成功'
    }
    return res
  }catch(err){
    let res = {
      status: 0,
      message: '查询失败，原因：${err}'
    }
    return res
  }
}

module.exports.userAddUser = async (JSON) => {
  try {
    let userType = await UserType.findOne({
      where: {
        id: JSON.user_type
      }
    });
    let newUser = await user.create({
      account: JSON.account,
      password: JSON.password,
      name: JSON.name,
      phone: JSON.phone,
      email: JSON.email,
      isUse: JSON.isUse
    })
    await newUser.setUserType(userType)
    newUser.save()
    let res = {
      status: 1,
      message: '创建成功'
    }
    return res
  }catch (err) {
    let res = {
      status: 0,
      message: '创建失败，原因：${err}'
    }
    return res
  }
}