const path =require('path')
const compressing = require('compressing');

/**
 * 文件压缩
 * @param dir
 * @param response
 */
function toTar(dir,response) {
  compressing.tar.compressDir(path.join(path.resolve(__dirname, '..')+'/output/img/'+dir), path.join(path.resolve(__dirname, '..')+'/output/zip/'+dir+'.tar'))
	  .then((res)=>{
	    console.log('success to create tar');
	    response.download(path.join(path.resolve(__dirname, '..')+'/output/zip/'+dir+'.tar'))
	  })
	  .catch((error)=>{
	    console.log(error);
	    console.log('failed to create tar');
	  });
}
module.exports.tarTool = toTar;