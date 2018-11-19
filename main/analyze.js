const cheerio = require('cheerio');
const parse = require('url-parse')
/**
 * 解析 DOM 得到图片地址
 *
 * @param {*} dom
 * @param {*} type
 * @param {*} imgDir
 * @param {*} callback
 * @param originUrl
 */
function findImg(dom,type,imgDir,callback,originUrl) {
  console.log('type',type);
  if(type=='站酷'){
    analyzeZhan(dom,imgDir,callback,originUrl)
  }else if(type=='UI中国'){
    analyzeUi(dom,imgDir,callback,originUrl)
  }else if(type=='涂鸦王国'){
	analyzeTuYa(dom,imgDir,callback,originUrl)
  }else if(type=='设计癖'){
	analyzeSheJiPi(dom,imgDir,callback,originUrl)
  }else if(type=='视觉ME'){
	analyzeSheShiJueMi(dom,imgDir,callback,originUrl)
  }else if(type=='百度贴吧'){
	analyzeBaiDuTieBa(dom,imgDir,callback,originUrl)
  }else {
	analyzeOther(dom,imgDir,callback,originUrl)
  }
};

/**
 * 解析其他网页图片
 * @param dom
 * @param imgDir
 * @param callback
 * @param originUrl
 */
function analyzeOther(dom,imgDir,callback,originUrl) {
  let $ = cheerio.load(dom);
  $('body img').each(function(i, elem) {
	let imgSrc = $(this).attr('src');
	if(imgSrc){
	  if(imgSrc.indexOf('http')>-1||imgSrc.indexOf('https')>-1){
		callback(imgSrc, i,imgDir);
	  }else {
	    console.log('无http网址');
		let url = new parse(originUrl)
		let origin = url.origin
		imgSrc=origin+imgSrc
		callback(imgSrc,i,imgDir)
	  }
	}
  });
}
/**
 * 解析站酷图片
 * @param dom
 * @param imgDir
 * @param callback
 * @param originUrl
 */
function analyzeZhan(dom,imgDir,callback,originUrl) {
  let $ = cheerio.load(dom);
  $('#lightbox-img-wrap img').each(function(i, elem) {
	let imgSrc = $(this).attr('data-src');
	if(imgSrc){
	  if(imgSrc.indexOf('http')>-1||imgSrc.indexOf('https')>-1){
		callback(imgSrc, i,imgDir);
	  }
	}
  });
}

/**
 * 解析Ui中国
 * @param dom
 * @param imgDir
 * @param callback
 * @param originUrl
 */
function analyzeUi(dom,imgDir,callback,originUrl) {
  let $ = cheerio.load(dom);
  $('.works-cont img').each(function(i, elem) {
	let imgSrc = $(this).attr('src').split('?')[0];
	if(imgSrc){
	  if(imgSrc.indexOf('http')>-1||imgSrc.indexOf('https')>-1){
		callback(imgSrc, i,imgDir);
	  }
	}
  });
}

/**
 * 解析涂鸦王国
 * @param dom
 * @param imgDir
 * @param callback
 * @param originUrl
 */
function analyzeTuYa(dom,imgDir,callback,originUrl) {
  let $ = cheerio.load(dom);
  $('.workPage-images img').each(function(i, elem) {
	let imgSrc = $(this).attr('src');
	if(imgSrc){
	  if(imgSrc.indexOf('http')>-1||imgSrc.indexOf('https')>-1){
		callback(imgSrc, i,imgDir);
	  }
	}
  });
}
/**
 * 解析设计癖
 * @param dom
 * @param imgDir
 * @param callback
 * @param originUrl
 */
function analyzeSheJiPi(dom,imgDir,callback,originUrl) {
  let $ = cheerio.load(dom);
  $('.entry-content img').each(function(i, elem) {
	let imgSrc = $(this).attr('src');
	if(imgSrc){
	  if(imgSrc.indexOf('http')>-1||imgSrc.indexOf('https')>-1){
		callback(imgSrc, i,imgDir);
	  }
	}
  });
}

/**
 * 解析视觉me
 * @param dom
 * @param imgDir
 * @param callback
 * @param originUrl
 */
function analyzeSheShiJueMi(dom,imgDir,callback,originUrl) {
  let $ = cheerio.load(dom);
  $('.content img').each(function(i, elem) {
	let imgSrc = $(this).attr('src');
	if(imgSrc){
	  if(imgSrc.indexOf('http')>-1||imgSrc.indexOf('https')>-1){
		callback(imgSrc, i,imgDir);
	  }
	}
  });
}

/**
 * 解析百度贴吧图片
 * @param dom
 * @param imgDir
 * @param callback
 * @param originUrl
 */
function analyzeBaiDuTieBa(dom,imgDir,callback,originUrl) {
  let $ = cheerio.load(dom);
  $('.left_section .p_content .BDE_Image').each(function(i, elem) {
	let imgSrc = $(this).attr('src');
	if(imgSrc){
	  if(imgSrc.indexOf('http')>-1||imgSrc.indexOf('https')>-1){
	    imgSrc = 'http://imgsrc.baidu.com/forum/pic/item/'+imgSrc.split('/').pop()
		callback(imgSrc, i,imgDir);
	  }
	}
  });
}
module.exports.findImg = findImg;