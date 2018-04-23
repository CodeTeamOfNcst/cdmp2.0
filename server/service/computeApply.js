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
        let applyUser = await thisApply.getComputeApplyer()
        let res = {
            startDate:thisApply.startDate,
            endDate:thisApply.endDate,
            hours:thisApply.hours,
            account:thisApply.account,
            password:thisApply.password,
            isAgree:thisApply.isAgree,
            isUse:thisApply.isUse,
            apply_user:thisApply.apply_user,
            applyUser:applyUser,
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
        let Applys = [];
        let ApplysOk = [];
        for(let i=0; i<applys.length; i++){
            let apply_user = await applys[i].getComputeApplyer()
            let check_user = await applys[i].getComputeApplyChecker()
            Applys.push({
                id: applys[i].id,
                startTime:applys[i].startDate,
                endTime:applys[i].endDate,
                timeLimit:applys[i].hours,
                isAgree:applys[i].isAgree,
                isUse:applys[i].isUse,
                createdAt:applys[i].createdAt,
                updatedAt:applys[i].updatedAt,
                chargePerson: apply_user.name,
                checkUser: check_user.name,
            });
            if(applys[i].isAgree){
                ApplysOk.push({
                    id: applys[i].id,
                    startTime:applys[i].startDate,
                    endTime:applys[i].endDate,
                    timeLimit:applys[i].hours,
                    isAgree:applys[i].isAgree,
                    account:applys[i].account,
                    password:applys[i].password,
                    isUse:applys[i].isUse,
                    createdAt:applys[i].createdAt,
                    updatedAt:applys[i].updatedAt,
                    chargePerson: apply_user.name,
                    checkUser: check_user.name,
                })
            }

        }
        let count =  await ComputeApply.count();
        let result = {
            counts: count,
            applys: Applys,
            ApplysOk:ApplysOk,
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

module.exports.getApplySearchFront = async (JSON) => {
    try{
        //以申请人搜索
        let user = await User.findOne({
            where: { account:{ [Op.like] : `%${JSON.account.user}%`}}
        })
        let searchResult = await ComputeApply.findAll({
            where: { apply_user:{ [Op.like] : `%${user.id}%`}}
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
            startDate: JSON.startDate,
            endDate: JSON.endDate,
            isAgree: JSON.isAgree,
            account:JSON.account,
            password:JSON.password,
            hours: JSON.hours,
            isUse: JSON.isUse
        });
        let applyer = await User.findOne({
            where:{id: JSON.apply_user }
        });
        let check_user = await User.findOne({
            where:{id:JSON.check_user }
        })
        await newDevice.setComputeApplyer(applyer);
        await newDevice.setComputeApplyChecker(check_user);
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
        
        let apply_user = await thisApply.getComputeApplyer()
        let check_er = await thisApply.getComputeApplyChecker()  
        await thisApply.update({
            hours: JSON.hours,
            isUse: JSON.isAgree,
            startDate: JSON.startDate,
            endDate: JSON.endDate,
            apply_user:apply_user.id,
            check_er:check_er.id,
        });
        await thisApply.save();
        let result = {
            status: 1,
            message: '修改成功'
        }
        return result;
    }catch (err){
        let result = {
            status: 0,
            message: `修改异常，原因 ${err}`
        }
        return result;
    }
}
        