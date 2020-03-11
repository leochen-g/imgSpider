const cheerio = require('cheerio');
const parse = require('url-parse')

/**
 * 解析 DOM 得到图片地址
 *
 * @param {*} dom
 * @param {*} type
 * @param originUrl
 */
function findImg(dom, type,originUrl) {
    let res = []
    if (type == '站酷') {
        res = analyzeZhan(dom, originUrl)
    } else if (type == 'UI中国') {
        res = analyzeUi(dom, originUrl)
    } else if (type == '涂鸦王国') {
        res = analyzeTuYa(dom, originUrl)
    } else if (type == '设计癖') {
       res =  analyzeSheJiPi(dom, originUrl)
    } else if (type == '视觉ME') {
       res = analyzeSheShiJueMi(dom, originUrl)
    } else if (type == '百度贴吧') {
        res = analyzeBaiDuTieBa(dom, originUrl)
    } else {
        res = analyzeOther(dom, originUrl)
    }
    return res
};

/**
 * 解析其他网页图片
 * @param dom
 * @param originUrl
 */
function analyzeOther(dom, originUrl) {
    let $ = cheerio.load(dom);
    let arr = []
    $('body img').each(function (i, elem) {
        let imgSrc = $(this).attr('src');
        if (imgSrc) {
            if (imgSrc.indexOf('http') > -1 || imgSrc.indexOf('https') > -1) {
                arr.push(imgSrc)
            } else {
                console.log('无http网址');
                let url = new parse(originUrl)
                let origin = url.origin
                imgSrc = origin + imgSrc
                arr.push(imgSrc)
            }
        }
    });
    return arr
}

/**
 * 解析站酷图片
 * @param dom
 * @param originUrl
 */
function analyzeZhan(dom, originUrl) {
    let $ = cheerio.load(dom);
    let arr = []
    $('#lightbox-img-wrap img').each(function (i, elem) {
        let imgSrc = $(this).attr('data-src');
        if (imgSrc) {
            if (imgSrc.indexOf('http') > -1 || imgSrc.indexOf('https') > -1) {
            	arr.push(imgSrc)
            }
        }
    });
    return arr
}

/**
 * 解析Ui中国
 * @param dom
 * @param originUrl
 */
function analyzeUi(dom, originUrl) {
    let $ = cheerio.load(dom);
    let arr = []
    $('.works-cont img').each(function (i, elem) {
        let imgSrc = $(this).attr('src').split('?')[0];
        if (imgSrc) {
            if (imgSrc.indexOf('http') > -1 || imgSrc.indexOf('https') > -1) {
                arr.push(imgSrc)
            }
        }
    });
    return arr
}

/**
 * 解析涂鸦王国
 * @param dom
 * @param originUrl
 */
function analyzeTuYa(dom, originUrl) {
    let $ = cheerio.load(dom);
    let arr = []
    $('.workPage-images img').each(function (i, elem) {
        let imgSrc = $(this).attr('src');
        if (imgSrc) {
            if (imgSrc.indexOf('http') > -1 || imgSrc.indexOf('https') > -1) {
                arr.push(imgSrc)
            }
        }
    });
    return arr
}

/**
 * 解析设计癖
 * @param dom
 * @param originUrl
 */
function analyzeSheJiPi(dom, originUrl) {
    let $ = cheerio.load(dom);
    let arr = []
    $('.entry-content img').each(function (i, elem) {
        let imgSrc = $(this).attr('src');
        if (imgSrc) {
            if (imgSrc.indexOf('http') > -1 || imgSrc.indexOf('https') > -1) {
                arr.push(imgSrc)
            }
        }
    });
    return arr
}

/**
 * 解析视觉me
 * @param dom
 * @param originUrl
 */
function analyzeSheShiJueMi(dom, originUrl) {
    let $ = cheerio.load(dom);
    let arr = []
    console.log(dom)
    $('.content img').each(function (i, elem) {
        let imgSrc = $(this).attr('src');
        if (imgSrc) {
            if (imgSrc.indexOf('http') > -1 || imgSrc.indexOf('https') > -1) {
                arr.push(imgSrc)
            }
        }
    });
    console.log('视觉me', arr)
    return arr
}

/**
 * 解析百度贴吧图片
 * @param dom
 * @param originUrl
 */
function analyzeBaiDuTieBa(dom, originUrl) {
    let $ = cheerio.load(dom);
    let arr = []
    $('.left_section .p_content .BDE_Image').each(function (i, elem) {
        let imgSrc = $(this).attr('src');
        if (imgSrc) {
            if (imgSrc.indexOf('http') > -1 || imgSrc.indexOf('https') > -1) {
                imgSrc = 'http://imgsrc.baidu.com/forum/pic/item/' + imgSrc.split('/').pop()
                arr.push(imgSrc)
            }
        }
    });
    return arr
}

module.exports.findImg = findImg;
