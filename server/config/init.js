const path = require('path')
const sequelize = require('../config/config')

// 这边后期应该加上 循环自动导入model，先放着(人手不足 -_-! )
const ComputeApply = sequelize.import('../server/models/computeApply')
const Device = sequelize.import('../server/models/device')
const DeviceApply = sequelize.import('../server/models/deviceApply')
const DeviceType = sequelize.import('../server/models/deviceType')
const Message = sequelize.import('../server/models/message')
const MessageType = sequelize.import('../server/models/messageType')
const Info = sequelize.import('../server/models/info')
const User = sequelize.import('../server/models/user')
const UserType = sequelize.import('../server/models/userType')
    
       
Message.belongsTo(MessageType, {
    as: "MessageType",
    foreignKey: 'message_type',
    foreignKeyContraints: false
})
MessageType.hasMany(Message, {
    as: "Message",
    foreignKey: 'message_type',
    foreignKeyContraints: false
})
Message.belongsTo(User, {
    as: "MessageUser",
    foreignKey: 'message_user',
    foreignKeyContraints: false
})
User.hasOne(Message, {
    as: "UserMessage",
    foreignKey: 'message_user',
    foreignKeyContraints: false
})
User.belongsTo(UserType, {
    as: "UserType",
    foreignKey: "user_type",
    foreignKeyContraints: false
})
UserType.hasMany(User, {
    as: "User",
    foreignKey: "user_type",
    foreignKeyContraints: false
})

// <--新增-->
Device.hasOne(User,{
    as: "DeviceUser",
    foreignKey: "device_manager",
    foreignKeyContraints: false
})  //设备联系人
User.hasMany(Device,{
    as: "UserDevice",
    foreignKey: "device_manager",
    foreignKeyContraints: false
})
// <---->

Device.belongsTo(DeviceType, {
    as: "DeviceType",
    foreignKey: "device_type",
    foreignKeyContraints: false
})
DeviceType.hasMany(Device, {
    as: "Device",
    foreignKey: "device_type",
    foreignKeyContraints: false,
})
DeviceApply.belongsTo(Device, {
    as: "ApplyDevice",
    foreignKey: "apply_device",
    foreignKeyContraints: false
})
Device.hasOne(DeviceApply, {  
    as: "DeviceApply",
    foreignKey: "apply_device",
    foreignKeyContraints: false
})

//一份预约申请表属于一个预约用户，属于(有？)一个审批人员check_user
DeviceApply.belongsTo(User, {
    as: "DeviceApplyer",
    foreignKey: "apply_user",
    foreignKeyContraints: false
})
User.hasMany(DeviceApply, {
    as: "DeviceApply",
    foreignKey: "apply_user",
    foreignKeyContraints: false
})


ComputeApply.belongsTo(User,{
    as: "ComputeApplyer",
    foreignKey: "apply_user",
    foreignKeyContraints: false
})
User.hasOne(ComputeApply,{
    as: "UserComputeApply",
    foreignKey: "apply_user",
    foreignKeyContraints: false
})

module.exports = {
    ComputeApply,
    DeviceApply,
    Device,
    DeviceType,
    Message,
    MessageType,
    Info,
    User,
    UserType,

    sequelize
}