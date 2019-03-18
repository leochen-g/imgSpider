$(function () {
  let fileName
  $('.dropdown-toggle').dropdown()
  $('.dropdown-menu li').click(function () {
	var str = $(this).text()
	$('.dropdown-toggle').html(str+'<span class="caret"></span>')
  })
  $('.loading').hide()
  $('#download').hide()
  $('.searchBtn').click(function () {
    var url = $('.form-control').val()
	var type = $('.btn-default').text().replace(/\s+/g, "");
	if(!IsURL(url)){
	  alert('您好，射鸡师，请输入正确的链接')
	  return
	}
	if(url.indexOf('ui.com')>-1){
	  type='UI中国'
	}else if(url.indexOf('shijue.me')>-1){
	  type='视觉ME'
	}else if(url.indexOf('shejipi.com')>-1){
	  type='设计癖'
	}else if(url.indexOf('gracg.com')>-1){
	  type= '涂鸦王国'
	}else if(url.indexOf('zcool.com.cn')>-1){
	  type='站酷'
	}else if(url.indexOf('tieba.baidu.com')>-1){
	  type='百度贴吧'
	}else {
	  type='其他'
	}
	$('#download').hide()
	$('.loading').show()
	$('.searchBtn').hide()
	$.ajax({
	  type:'POST',
	  url:'https://tufu.xkboke.com/api/getImg',
	  dataType : "json",
	  data:{
		url:url,
		type:type
	  },
	  success:function (res) {
	    $('.loading').hide()
		if(res.head.code==0){
		  $('#download').show()
		  $('.searchBtn').show()
		  fileName = res.data
		}else {
		  $('#download').hide()
		  $('.searchBtn').show()
		}
	  }
	})
  })
  $('#download').click(function () {
    window.location.href = 'https://tufu.xkboke.com/api/download?path='+fileName
  })
  function IsURL (str_url) {
	var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
		+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
		+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
		+ "|" // 允许IP和DOMAIN（域名）
		+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
		+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
		+ "[a-z]{2,6})" // first level domain- .com or .museum
		+ "(:[0-9]{1,4})?" // 端口- :80
		+ "((/?)|" // 如果没有文件名，则不需要斜杠
		+ "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
	var re=new RegExp(strRegex);
	if (re.test(str_url)) {
	  return (true);
	} else {
	  return (false);
	}
  }
})
