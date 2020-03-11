const request = require('request');
const analyze = require('./analyze');
const JSZip = require('jszip')
const axios = require('axios')

/**
 * 请求图片地址
 * @param response
 * @param req
 * @param next
 */
async function start(req, response, next) {
    // 发起请求获取 DOM
    console.log('请求地址', req.url);
    try {
        request(req.url, async function (err, res, body) {
            if (!err && res) {
                console.log('start');
                // 将 downLoad 函数作为参数传递给 analyze 模块的 findImg 方法
                let res = analyze.findImg(body, req.type, req.url);
                let file = await handleBatchDownload(res)
                response.set('Content-disposition', 'attachment;filename=' + 'photo.zip')
                response.end(file)
            } else {
                response.json({head: {code: 1000, msg: err}, data: ''})
            }
        });
    } catch (e) {
        console.log('error', e)
    }
}

getFile = (url) => {
    let src = encodeURI(url)
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: src,
            responseType: 'arraybuffer'
        }).then(data => {
            resolve(data.data)
        }).catch(error => {
            console.log('t热天他拖拖', error)
            reject(error.toString())
        })
    })
}
// 批量下载
handleBatchDownload = async (selectImgList) => {
    const data = selectImgList;
    const zip = new JSZip()
    const cache = {}
    const promises = []
    await data.forEach((item, index) => {
        console.log('img', item)
        const promise = getFile(item).then(data => { // 下载文件, 并存成ArrayBuffer对象
            const arr_name = item.split("/");
            let file_name = index + '-' + arr_name[arr_name.length - 1] // 获取文件名
            // if (file_name.indexOf('.png') == -1) {
            //    file_name = file_name + '.png'
            // }
            zip.file(file_name, data, {
                binary: true
            }) // 逐个添加文件
            cache[file_name] = data
        })
        promises.push(promise)
    })
    await Promise.all(promises)
    return await zip.generateAsync({
        type: "nodebuffer",
        compression: "DEFLATE",
        compressionOptions: {
            level: 9
        }
    })

};
module.exports = {
    getImg: start,
}
