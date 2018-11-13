const cheerio = require('cheerio');

/**
 * 解析 DOM 得到图片地址
 *
 * @param {*} dom
 * @param {*} type
 * @param {*} imgDir
 * @param {*} callback
 */
function findImg(dom,type,imgDir,callback) {
  console.log('type',type);
  if(type=='站酷'){
    analyzeZhan(dom,imgDir,callback)
  }else if(type=='UI中国'){
    analyzeUi(dom,imgDir,callback)
  }else if(type=='涂鸦王国'){
	analyzeTuYa(dom,imgDir,callback)
  }else if(type=='设计癖'){
	analyzeSheJiPi(dom,imgDir,callback)
  }else if(type=='视觉ME'){
	analyzeSheShiJueMi(dom,imgDir,callback)
  }else {
	analyzeOther(dom,imgDir,callback)
  }
};

/**
 * 解析其他网页图片
 * @param dom
 * @param imgDir
 * @param callback
 */
function analyzeOther(dom,imgDir,callback) {
  let $ = cheerio.load(dom);
  $('body img').each(function(i, elem) {
	let imgSrc = $(this).attr('src');
	console.log(imgSrc);
	if(imgSrc){
	  if(imgSrc.indexOf('http')>-1||imgSrc.indexOf('https')>-1){
		callback(imgSrc, i,imgDir);
	  }
	}
  });
}
/**
 * 解析站酷图片
 * @param dom
 * @param imgDir
 * @param callback
 */
function analyzeZhan(dom,imgDir,callback) {
  let $ = cheerio.load(dom);
  $('#lightbox-img-wrap img').each(function(i, elem) {
	let imgSrc = $(this).attr('data-src');
	console.log(imgSrc);
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
 */
function analyzeUi(dom,imgDir,callback) {
  let $ = cheerio.load(dom);
  $('.works-cont img').each(function(i, elem) {
	let imgSrc = $(this).attr('src').split('?')[0];
	console.log(imgSrc);
	if(imgSrc){
	  if(imgSrc.indexOf('http')>-1||imgSrc.indexOf('https')>-1){
		callback(imgSrc, i,imgDir);
	  }
	}
  });
}

/**
 * 解析涂鸦中国
 * @param dom
 * @param imgDir
 * @param callback
 */
function analyzeTuYa(dom,imgDir,callback) {
  let $ = cheerio.load(dom);
  $('.workPage-images img').each(function(i, elem) {
	let imgSrc = $(this).attr('src');
	console.log(imgSrc);
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
 */
function analyzeSheJiPi(dom,imgDir,callback) {
  let $ = cheerio.load(dom);
  $('.entry-content img').each(function(i, elem) {
	let imgSrc = $(this).attr('src');
	console.log(imgSrc);
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
 */
function analyzeSheShiJueMi(dom,imgDir,callback) {
  let $ = cheerio.load(dom);
  $('.content img').each(function(i, elem) {
	let imgSrc = $(this).attr('src');
	console.log(imgSrc);
	if(imgSrc){
	  if(imgSrc.indexOf('http')>-1||imgSrc.indexOf('https')>-1){
		callback(imgSrc, i,imgDir);
	  }
	}
  });
}
module.exports.findImg = findImg;