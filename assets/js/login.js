$(function() {
    $('#link-reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show()


    })
    $('#link-login').on('click', function() {
            $('.reg-box').hide();
            $('.login-box').show()

        })
        //从layui获取from对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
            myRule: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            pwd: function() {
                var num = $('#bb').val().trim()
                var str = $('#aa').val().trim()
                if (num !== str) return '两次密码输入不一致'

            },

        })
        //注册数据请求
    $('#form-reg').on('submit', function(e) {
        // alert("ooo")
        e.preventDefault();
        var username = $('#user-name1').val();
        var password = $('#aa').val();
        $.post('/api/reguser', {
            username: username,
            password: password
        }, function(res) {
            if (res.status !== 0) return layer.msg('注册失败！')
            if (res.status == 0) {
                layer.msg('注册成功请登录！')
                $('#link-login').click()
            }
            console.log(res)

        })
    })

    // 登录数据请求
    $('#form-login').on('submit', function(e) {
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        $.post('/api/login', {
            username: username,
            password: password,
        }, function(res) {
            if (res.status !== 0) return layer.msg('登录失败')
            layer.msg('登录成功！');
            console.log(res.token)
                //将登录成功得到的token值保存到本地本地中
            localStorage.setItem('token', res.token)
                //跳转到本地页面
            location.href = './index.html'

        })
    })
})