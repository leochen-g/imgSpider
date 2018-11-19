const request = require('request');
const path = require('path');
const fs = require('fs');
const analyze = require('./analyze');
const tarTool = require('./tarTool')
const uuid =require('node-uuid')
/**
 * 根据hash值创建文件夹
 * @param path
 */
function write(path) {
  fs.exists(path, function (exists) {  //path为文件夹路径
	if (!exists) {
	  fs.mkdir(path, function (err) {
		if (err) {
		  console.log('创建失败');
		  return false;
		} else {
		  console.log('创建成功');
		}
	  })
	}
  })
}
/**
 * 请求图片地址
 * @param response
 * @param req
 * @param next
 */
function start(req,response,next) {
  const hash = uuid.v1().replace(/-/g, "")
  const imgDir = path.join(path.resolve(__dirname, '..'), 'output/img/'+hash);
  write(imgDir)
  // 发起请求获取 DOM
  console.log('请求地址',req.url);
  request(req.url, function(err, res, body) {
	if (!err && res) {
	  console.log('start');
	  // 将 downLoad 函数作为参数传递给 analyze 模块的 findImg 方法
	  analyze.findImg(body,req.type,imgDir,downLoad,req.url);
	  response.json({head: {code: 0, msg: 'ok'}, data: hash})
	}else {
	  response.json({head: {code: 1000, msg: err}, data: ''})
	}
  });
}


/**
 * 获取到 findImg 函数返回的图片地址后，利用 request 再次发起请求，将数据写入本地。
 *
 * @param {*} imgUrl
 * @param {*} i
 * @param {*} imgDir
 */
function downLoad(imgUrl, i,imgDir) {
  console.log('图片地址',imgUrl);
  let ext = imgUrl.split('.').pop();
  // 再次发起请求，写文件
  request(imgUrl).pipe(fs.createWriteStream(path.join(imgDir, i + '.' + ext), {
	'encoding': 'utf8',
  }));
}
/**
 * 下载图片到本地后，利用tar压缩成一个压缩包，并返回路径
 * @param {*} req
 * @param {*} response
 * @param {*} next
 */
function tarFile(req,response,next) {
  console.log('接收',req);
  tarTool.tarTool(req.path,response)
}
module.exports= {
  getImg:start,
  tarTool:tarFile
}