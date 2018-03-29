/**
 * 消息类别表
 * @param { [object] } sequelize 
 * @param { [object] } DataTypes 
 * a foreign_key of { message }  每条消息含有一个消息分类的外键
 */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'message_type', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstType: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true
            }, //一级消息分类状态（普通，成功，失败）
            title: {
                type: DataTypes.STRING,
                allowNull:false
            },//二级分类名称(预约成功..等消息的具体标题)
            isUse: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }, //此条记录是否可用
            //默认添加 createAt 和 updateAt 两个字段 
        },{
            tabelName: 'message_type'
        }
    )
}