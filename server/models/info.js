const moment = require('moment');
/**
 * 公告表
 * @param { [object] } sequelize 
 * @param { [object] } DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'info', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            releaseDate: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                get() {
                    return moment(this.getDataValue('releaseDate')).format('YYYY-MM-DD');
                }
            }, //公告正式发布的日期    --修改了英文名称2018.03.28--
            title: {
                type: DataTypes.TEXT,
                allowNull: false
            }, // 公告的标题
            content: {
                type: DataTypes.TEXT,
                allowNull: false
            }, //公告的具体内容 （后期改为富文本？待定）
            isUse: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            } //此条记录是否可用
            //默认添加 createAt 和 updateAt 两个字段 
        }
    )
}