'use strict' 
const { Message } = require('../config/models')
const { MessageType } = require('../config/models')
const { User } = require('../config/models')
const { UserType } = require('../config/models')

const { Op } = require('sequelize')
/**
 * 
 * @param { JSON } options 相当于查询的条件
 * @param { Number } limit 限制数据的条数，默认为 comfig 中的条数
 */
const ItemPerPage = 10;
module.exports.getMessageDataById = async (JSON) => {
    try {
        let thisMessage = await Message.findOne({
            where: {
                id: JSON.id
            }
        });
        let thisMessageTpe = await thisMessage.getMessageType();
        let thisMessageUser = await thisMessage.getMessageUser();
        let result = {
            thisMessage: thisMessage,
            user: thisMessageUser.name,
            type: thisMessageTpe.id,
            status: 1,
            message: '查询成功'
        }
        return result;
    } catch (err) {
        let result = {
            status: 1,
            message: `查询失败 由于 ${err}`
        }
        return result;
    }
}

module.exports.getAllMessageData = async () => {
    try{
        let messages = await Message.findAll({
            // offset: (parseInt(ctx.params.page || 1) - 1) * ItemPerPage,
            limit: ItemPerPage
        });
        let messageTypes = await MessageType.findAll()
        let Messages = [];
        let MessageTypes = [];
                // 格式化返回的数据
        for (let index in messages) {
            let messageType = await messages[index].getMessageType();
            let messageUser = await messages[index].getMessageUser();
            
            Messages.push({
                id: messages[index].id,
                content:messages[index].content,
                releaseDate:messages[index].releaseDate,
                isRead:messages[index].isRead,
                isUse:messages[index].isUse,
                message_type:messageType.firstType,
                title:messageType.title,
                name:messageUser.name,
            });
        }
        let count = await Message.count()
        for(let i in messageTypes) {
            MessageTypes.push({
                id:messageTypes[i].id,
                label:messageTypes[i].firstType+'-'+messageTypes[i].title
            })
        }
        let result = {
            counts: count,
            MessageTypes: MessageTypes,
            Messages: Messages,
            status: 1,
            message: '成功获取全部消息'
        }
        return result;
    }catch(err){
        let result = {
            status: 0,
            message: `获取消息失败，由于 ${err}`
        }
        return result;
    }
}
module.exports.getMessageSearch = async (JSON) => {
    try{
      let user;
        if (typeof JSON.message_user == 'string') {
          user = await User.findOne({
              where:{
                  name:JSON.message_user
              }
          })
        } else {
          user = await User.findOne({
            where:{
                id:JSON.message_user
            }
        })
        }
        let searchResult = await Message.findAll({
            where: {message_user:{ [Op.like] : `%${user.id}%`}}
        })
        if(! searchResult || searchResult.length === 0) throw("未匹配到结果")
        let result = []
        for(let i=0;i<searchResult.length; i++){
            result.push({
                content: searchResult[i].content,
                isRead:searchResult[i].isRead,
                title:(await searchResult[i].getMessageType()).title,
                isUse:searchResult[i].isUse,
                id:searchResult[i].id,
                releaseDate:searchResult[i].releaseDate,
                message_type: (await searchResult[i].getMessageType()).id,
                name: (await searchResult[i].getMessageUser()).name
            })
        }
        let res = {
            Message:result,
            status: 1,
            message: '匹配消息成功'
        }
        return res;
    }catch(err){
        let res = {
            status: 0,
            message: `搜索消息失败，由于 ${err}`
        }
        return res;
    }
}

module.exports.addMessage = async (JSON) => {   
    try {
        if(!JSON.selected_user && !JSON.message_type) 
            throw("信息未选择完整")
        for (let index in JSON.selected_user) {
            let newMessage = await Message.create({
                releaseDate: JSON.releaseDate,
                isUse: JSON.isUse,
                isRead: JSON.isRead,
                content: JSON.content
            });
            let messageType = await MessageType.findOne({
                where: {
                    id: JSON.message_type
                }
            });
            let messageUser = await User.findOne({
                where: {
                    id: JSON.selected_user[index]
                }
            });
            await newMessage.setMessageType(messageType);
            await newMessage.setMessageUser(messageUser);
            await newMessage.save();
        }
        let result = {
            status: 1,
            message: '消息创建成功'
        }
        return result;
    } catch (err) {
        let result = {
            status: 0,
            message: `创建失败，由于 ${err}`
        }
        return result;
    }
}

module.exports.deleteMessageById = async (JSON) => {
    try {
        let thisMessage = await Message.findOne({
            where: {
                id: JSON.id
            }
        })
        await thisMessage.update({
            isUse: false
        })
        await thisMessage.save()
        let result = {
            status: 1,
            message: '禁用成功'
        }
        return result;
    } catch (err) {
        let result = {
            status: 0,
            message: `禁用失败 由于 ${err}`
        }
        return result;
    }
}

module.exports.modifyMessageById = async (JSON) => {
    try {
        let thisMessage = await Message.findOne({
            where: {
                id: JSON.id
            }
        });
        let thisMessageType = await MessageType.findOne({
            where: {
                id: JSON.message_type
            }
        });
        await thisMessage.update({
            releaseDate: JSON.releaseDate,
            content: JSON.content,
            isRead: JSON.isRead,
            isUse: JSON.isUse
        });
        await thisMessage.setMessageType(thisMessageType);
        await thisMessage.save()
        let result = {
            status: 1,
            message: '更新成功'
        }
        return result;
    } catch (err) {
        let result = {
            status: 0,
            message: `更新失败， 由于${err}`
        }
        return result;
    }
}

module.exports.modifyMessageByIdFront = async (JSON) => {
    try {
        let thisMessage = await Message.findOne({
            where: {
                id: JSON.id
            }
        });
        let thisMessageType = await MessageType.findOne({
            where: {
                id: thisMessage.message_type
            }
        });
        await thisMessage.update({
            releaseDate: thisMessage.releaseDate,
            content: thisMessage.content,
            isRead:true,
            isUse: thisMessage.isRead
        });
        console.log(thisMessage.isUse)
        await thisMessage.setMessageType(thisMessageType);
        await thisMessage.save()
        let result = {
            status: 1,
            message: '更新成功'
        }
        return result;
    } catch (err) {
        let result = {
            status: 0,
            message: `更新失败， 由于${err}`
        }
        return result;
    }
}
