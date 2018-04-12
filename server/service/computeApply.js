'use strict' 
const { User } = require('../config/models')
const { ComputeApply } = require('../config/models')
const { Op } = require('sequelize')
/**
 * 
 * @param { JSON } options 相当于查询的条件
 * @param { Number } limit 限制数据的条数，默认为 comfig 中的条数
 */
const ItemPerPage = 10;
module.exports.getApplyById = async (JSON) => {
    try{
        let thisApply = await ComputeApply.findOne({
            where: { id: JSON.id }
        });
        let res = {
            startDate:thisApply.startDate,
            endDate:thisApply.endDate,
            hours:thisApply.hours,
            account:thisApply.account,
            password:thisApply.password,
            isAgree:thisApply.isAgree,
            isUse:thisApply.isUse,
            apply_user:thisApply.apply_user,
            check_user:thisApply.check_user,
        }
        let result = {
            res:res,
            status : 1,
            message: '成功获取该设备申请信息'
        }
        return result;
    }catch (err){
        let result = {
            status : 0,
            message: `获取信息失败， 由于 ${err}`
        }
        return result;
    }
}

module.exports.getAllApplyData = async () => {
    try{
        let applys = await ComputeApply.findAll({ 
            // offset: (parseInt(ctx.params.page || 1) - 1) * ItemPerPage, 
            limit: ItemPerPage 
        });
        // let applys = await ComputeApply.findAll({ offset: 5, limit: 5 }); // 分页查询
        // 教程上说由于原型链方法的原因不鼓励使用for in
        let Applys = [];
        for(let i=0; i<applys.length; i++){
            Applys.push({
                apply: applys[i],
                applyUser: applys[i].apply_user,
                checkUser: applys[i].check_user,
            })
        }
        let count =  await ComputeApply.count();
        let result = {
            counts: count,
            applys: Applys,
            status: 1,
            message: '成功获取信息'
        }
        return result;
    }catch(err){
        let result = {
            status : 0,
            message: `获取信息失败， 由于 ${err}`
        }
        return result;
    }
}

module.exports.getApplySearch = async (JSON) => {
    try{
        //以申请人搜索
        let searchResult = await ComputeApply.findAll({
            where: { apply_user:{ [Op.like] : `%${JSON.apply_user}%`}}
        })
        if(! searchResult || searchResult.length === 0) throw("未匹配到结果")
        let result = []
        for(let i =0; i< searchResult.length; i++){
            result.push({
                apply: searchResult[i],
                applyUser: searchResult[i].apply_user,
            })
        }
        let res = {
            result: result,
            status: 1,
            message: '申请搜索成功！'
        }
        return res;
    }catch(err){
        let res = {
            status : 0,
            message: `获取信息失败， 由于 ${err}`
        }
        return res;
    }
}

module.exports.addApply = async (JSON) => {   
    try{
        if((!JSON.hours) || 
            (!JSON.apply_user)) throw("预约信息填写有误")
        let newDevice = await ComputeApply.create({
            startDate: JSON.date[0],
            endDate: JSON.date[1],
            isAgree: JSON.isAgree,
            hours: JSON.hours,
            account: JSON.account,
            password: JSON.password,
            isUse: JSON.isUse
        });
        let applyer = await User.findOne({
            where:{id: JSON.apply_user }
        });
        await newDevice.setComputeApplyer(applyer);
        await newDevice.save();
        let result ={
            status: 1,
            message: '创建成功'
        }
        return result;
    }catch (err){
        let result ={
            status: 0,
            message: `创建失败，由于 ${err}`
        }
        return result;
    }
}

module.exports.addApplyFront = async (JSON,userJSON) => {   
    if(userJSON){
        try{
            let thisUserAccount = userJSON;
            let thisUser = await User.findOne({
                where: { account:thisUserAccount }
            });
            if(thisUser){
                let thisApply = await ComputeApply.create({
                    hours: JSON.hours,
                    startDate: JSON.startDate,
                    endDate: JSON.endDate
                })
                thisApply.setComputeApplyer(thisUser);
                let result = {
                    status: 1,
                    message: '成功'
                }
                return result;
            }else{
                let result = {
                    status: 0,
                    message: '用户不存在'
                }
                return result;
            }
        }catch(err){       
            let result = {
                status: 0,
                message: `异常，由于 ${err}`
            }
            return result;
        }
    }else{
        let result = {
            status: 0,
            message: '用户未登陆 '
        }
        return result;
    }
}

module.exports.deleteApplyById = async (JSON) => {
    try{
        let thisApply = await ComputeApply.findOne({
            where: {id: JSON.id }
        });
        await thisApply.update({
            isUse: false
        });
        let result = {
            status: 1,
            message: '禁用成功'
        }
        return result;
    }catch (err){
        let result = {
            status: 0,
            message: `禁用失败 由于 ${err}`
        }
        return result;
    }   
}

module.exports.modifyApplyById = async (JSON) => {
    try{
        let thisApply = await ComputeApply.findOne({
            where: {id: JSON.id}
        });
        await thisApply.update({
            hours: JSON.hours,
            isAgree: JSON.isAgree,
            isUse: JSON.isUse,
            startDate: JSON.date[0],
            endDate: JSON.date[1]
        });
        await thisApply.save();
        let result = {
            status: 1,
            message: '修改成功'
        }
        return result;
    }catch (err){
        let result = {
            status: 1,
            message: `修改异常，原因 ${err}`
        }
        return result;
    }
}
        