const path =require('path')
const compressing = require('compressing');

/**
 * 文件压缩
 * @param dir
 * @param response
 */
function toTar(dir,response) {
  compressing.tar.compressDir(path.join(path.resolve(__dirname, '..')+'/img/'+dir), path.join(path.resolve(__dirname, '..')+'/zip/'+dir+'.tar'))
	  .then((res)=>{
	    console.log(res);
	    console.log('success');
	    response.download(path.join(path.resolve(__dirname, '..')+'/zip/'+dir+'.tar'))
	  })
	  .catch((error)=>{
	    console.log(error);
	    console.log('failed');
	  });
}
module.exports.tarTool = toTar;