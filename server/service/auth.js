'use strict' 
const { User } = require('../config/models')
const { UserType } = require('../config/models')
const { jsonwebtoken } = require('jsonwebtoken')
/**
 * 
 * @param { JSON } options 相当于查询的条件
 * @param { Number } limit 限制数据的条数，默认为 comfig 中的条数
 */
module.exports.getUser = async ( JSON ) => {
    let user;
    jsonwebtoken.verify(JSON, 'secretKey', function (err, decoded) {
        if (!err){
             //会输出123，如果过了60秒，则有错误。
                user = decoded
         }
    })

    // let user = await User.findOne({
    //     where: { account:JSON }
    // })
    // let userType = await user.getUserType()
    let res = {
        user: user,
    }  
    return res;
}
module.exports.checkLogIn = async (JSON) => {
    if(JSON){
        let user = await User.findOne({
            where: { account: JSON }
        })
        let userType = await user.getUserType()
        let user_is_admin = userType.id === 1? true: false
        let res = {
            user: user,
            user_is_admin: user_is_admin,
            status: 1,
            message: '用户已经登陆'
        }
        return res;
    }else{
        let res = {
            status: 0,
            message: "用户暂未登陆"
        }
        return res;
    }
}

module.exports.regist =  async (JSON) => {
    let userAccount = JSON.account
    let userPassword = JSON.password
    let thisUser = await User.findOne({ where:{account: userAccount}})
    if(thisUser){
        let res = {
            status :0,
            message: "用户已经存在"
        }
        return res;
    }else{
        let thisUser = await User.create({
            account: userAccount,
            password: userPassword
        })
        let res = {
            user: thisUser,
            status: 1,
            message: "创建成功"
        }
        return res;
    }
}

module.exports.logIn = async (JSON) => {
    let account = JSON.account;
    let password = JSON.password;
    let user = await User.findOne({
        where: {
            account: account
        }
    });
    if (user.password == password) {
        let userType = await user.getUserType()
        let userIsAdmin = false
        if(userType.id === 1){
            userIsAdmin = true
        }else{
            userIsAdmin = false
        }
        const accessToken = jsonwebtoken.sign(
            {
                login_account: user.account,
                rand: Math.random() * 1000,
                scope: ['test', 'user', userIsAdmin?'admin':null]
            },
            'secretKey'
        )
        let res = {
            user: user,
            user_is_admin: userIsAdmin,
            status: 1,
            message: '登陆成功'
        }
        return res;
    } else {
        let res = {
            status: 0,
            message: '用户名或密码错误'
        }
        return res;
    }
};

module.exports.logOut = async (JSON) => {
    JSON.set('account', null)
    let res = {
        status: 'ok'
    }
    return res;
};



