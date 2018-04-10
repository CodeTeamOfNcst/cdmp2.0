'use strict' 
const { User } = require('../config/models')
const { UserType } = require('../config/models')
/**
 * 
 * @param { JSON } options 相当于查询的条件
 * @param { Number } limit 限制数据的条数，默认为 comfig 中的条数
 */
module.exports.getUser = async ( ctx, next ) => {
    let user
    jsonwebtoken.verify(ctx.cookies.get('account'), 'secretKey', function (err, decoded) {
        if (!err){
             //会输出123，如果过了60秒，则有错误。
                user = decoded
         }
    })
    let res = {
        user: user
    }  
    return res;
}
module.exports.checkLogIn = async (ctx, next) => {
    console.log(ctx.cookies.get("authUser"))
    if(ctx.cookies.get("authUser")){
        let user = await User.findOne({
            where: { account: ctx.cookies.get("authUser") }
        })
        let userType = await user.getUserType()
        let user_is_admin = userType.id === 1? true: false
        ctx.bdoy = {
            user: user,
            user_is_admin: user_is_admin,
            status: 1,
            message: '用户已经登陆'
        }
    }else{
        ctx.body = {
            status: 0,
            message: "用户暂未登陆"
        }
    }
}

module.exports.regist =  async (ctx, next) => {
    let userAccount = ctx.request.body.account
    let userPasswd = ctx.request.body.passwd
    let thisUser = await User.findOne({ where:{account: userAccount}})
    console.log(thisUser)
    if(thisUser){
        ctx.body = {
            status :0,
            message: "用户已经存在"
        }
    }else{
        let thisUser = await User.create({
            account: userAccount,
            password: userPasswd
        })
        ctx.body = {
            user: thisUser,
            status: 1,
            message: "创建成功"
        }
    }
}

module.exports.logIn = async (ctx, next) => {
    console.log(ctx.request.body)
    let account = ctx.request.body.account;
    let password = ctx.request.body.passwd;
    let user = await User.findOne({
        where: {
            account: account
        }
    });
    if (user && user.password === password) {
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

        ctx.body = {
            user: accessToken,
            user_is_admin: userIsAdmin,
            status: 1,
            message: '登陆成功'
        }
    } else {
        ctx.body = {
            status: 0,
            message: '用户名或密码错误'
        }
    }
};

module.exports.logOut = async (ctx, next) => {
    ctx.cookies.set('account', null)
    ctx.body = {
        status: 'ok'
    }
};



