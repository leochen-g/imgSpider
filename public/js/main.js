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
	}else {
	  type='其他'
	}
	$('.loading').show()
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
		  fileName = res.data
		}else {
		  $('#download').hide()
		}
	  }
	})
  })
  $('#download').click(function () {
    window.location.href = 'https://tufu.xkboke.com/api/download?path='+fileName
  })
  function IsURL (str_url) {
	var strRegex = '[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?';
	var re=new RegExp(strRegex);
	if (re.test(str_url)) {
	  return (true);
	} else {
	  return (false);
	}
  }
})