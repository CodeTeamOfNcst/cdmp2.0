const { fs } = require('fs')
const { uuid } = require('uuid')

/**
 * 保存用户上传的图片到临时文件目录下
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
module.exports.imageUploadToTemp = async (JSON) => {
    let {
        originalname,
        path,
        mimetype
    } = JSON;
    let temPath = path;
    let randomNumber = Math.random();
    let targetPath = 'static/uploads/avatars/' + randomNumber + originalname;
    let imgUrlPath = 'uploads/avatars/' + randomNumber + originalname;
    fs.readFile(temPath, (err, data) => {
        if (err) console.log(err);
        fs.writeFile(targetPath, data, (err) => {
            if (err) console.log(err)
        })
    });
    if (fs.existsSync(temPath)) {
        fs.unlink(path)
    }
    let res = {
        imgPath: imgUrlPath,
        status: 1,
        message: '文件接收成功'
    }
    return res;
};

/**
 * 用于删除临时上传的文件
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
module.exports.deleteTempFile = async (JSON) => {
    let deletePath = 'static/' + JSON;
    if (deletePath.indexOf('avatars') > -1 && fs.existsSync(deletePath)) {
        console.log(deletePath);
        fs.unlink(deletePath);
        ctx.body = {
            status: 1,
            message: '删除成功'
        }
    } else {
        ctx.body = {
            status: 0,
            message: '图片链接不存在'
        }
    }
};

/**
 * 测试用
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
module.exports.copyTempFileToDir = async (JSON) => {
    let filePath = 'static/' + JSON;
    console.log(filePath);
    let targetPath = 'static/uploads/deviceImages/' + uuid.v1() + '.jpg';
    console.log(targetPath);
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, (err, data) => {
            fs.writeFile(targetPath, data, (err) => {
                if (err) console.log(err)
            })
        });
        ctx.body = {
            status: 1,
            message: '成功保存文件'
        }
    } else {
        ctx.body = {
            status: 0,
            message: '文件目录不存在'
        }
    }
};