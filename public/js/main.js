$(function () {
    let fileName
    $('.dropdown-toggle').dropdown()
    $('.dropdown-menu li').click(function () {
        var str = $(this).text()
        $('.dropdown-toggle').html(str + '<span class="caret"></span>')
    })
    $('.loading').hide()
    $('#download').hide()
    $('.searchBtn').click(function () {
        var url = $('.form-control').val()
        var type = $('.btn-default').text().replace(/\s+/g, "");
        if (!IsURL(url)) {
            alert('您好，射鸡师，请输入正确的链接')
            return
        }
        if (url.indexOf('ui.com') > -1) {
            type = 'UI中国'
        } else if (url.indexOf('shijue.me') > -1) {
            type = '视觉ME'
        } else if (url.indexOf('shejipi.com') > -1) {
            type = '设计癖'
        } else if (url.indexOf('gracg.com') > -1) {
            type = '涂鸦王国'
        } else if (url.indexOf('zcool.com.cn') > -1) {
            type = '站酷'
        } else if (url.indexOf('tieba.baidu.com') > -1) {
            type = '百度贴吧'
        } else {
            type = '其他'
        }
        $('#download').hide()
        $('.loading').show()
        $('.searchBtn').hide()
        axios.post('/api/getImg', {
            url: url,
            type: type
        }, {
            responseType: 'blob'
        }).then((res) => {
            $('.loading').hide()
            $('.searchBtn').show()
            console.log('res', res);
            const blob = res.data;
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = (e) => {
                const a = document.createElement('a');
                a.download = `photo.zip`;
                // 后端设置的文件名称在res.headers的 "content-disposition": "form-data; name=\"attachment\"; filename=\"20181211191944.zip\"",
                a.href = e.target.result;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };
        }).catch((err) => {
            console.log(err.message);
        });
    })
    /**
     * @return {boolean}
     */
    function IsURL(str_url) {
        return str_url.includes('http')
    }
})
