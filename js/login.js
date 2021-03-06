$(function () {
    /******* 1.判断用户是否已经登录 *******/
    $.ajax({
        type: 'POST',
        url: '/api/login.php',
        dataType: 'json',
        data: {
            cmd: 'islogin'
        },
        success: function (data) {
            switch (data.code) {
                case 0:
                    console.log('用户未登录')
                    break;
                case 1:
                    console.log('用户已登录');
                    window.location.pathname = '/contact.html';
                    break;
                case 2:
                    console.log('无法获取用户信息');
                    break;
                default:
                    console.log('遇到未知错误--' + data.code + data.msg);
                    break;
            }
        },
        error: function () {
            console.log('请求出错')
        }
    });

    /******* 2.表单验证部分 *******/

    //登录表单验证
    $('#login-form').validate({
        rules: {
            phone: {
                required: true,
                digits: true,
                minlength: 11,
                maxlength: 11,
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 12
            }
        },
        messages: {
            phone: {
                required: '请填写手机号!',
                digits: '请输入合法的手机号!',
                minlength: '手机号长度应该是十一位',
                maxlength: '手机号长度应该是十一位',
            },
            password: {
                required: '请填写密码!',
                minlength: '密码最少为6位',
                maxlength: '密码最多为12位'
            }
        },
        //登录表单验证通过
        submitHandler: function (form) {
            console.log('校验正确,已向后台提交信息,等待后台回复');
            $.ajax({
                type: 'POST',
                url: '/api/login.php',
                dataType: 'json',
                data: {
                    cmd: 'login',
                    phone: $('#phone').val(),
                    pwd: $('#password').val()
                },
                success: function (data) {
                    switch (data.code) {
                        case 0:
                        case 1:
                            console.log('登录成功');
                            window.location.pathname = '/contact.html'
                            break;
                        case 2:
                            alert('登录失败!');
                            console.log(data.msg);
                            break;
                        default:
                            alert('出错啦!')
                            console.log('遇到未知错误' + data.code + data.msg);
                            break;
                    }
                },
                error: function () {
                    console.log('请求出错')
                }
            });
            //阻止表单提交
            return false;
        },
        //登录表单验证不通过
        invalidHandler: function (event, validator) {
            console.log('输入有误,无法向后台提交信息,提示用户重新填写')
            //阻止表单提交
            return false;
        }
    });

    //注册表单验证
    $('#register-form').validate({
        rules: {
            usernamesignup: {
                required: true,
                minlength: 2,
                maxlength: 12,
                string: true
            },
            phonesignup: {
                required: true,
                digits: true,
                minlength: 11,
                maxlength: 11
            },
            verifycode: {
                required: true,
                digits: true,
                minlength: 5,
                maxlength: 5
            },
            passwordsignup: {
                required: true,
                minlength: 6,
                maxlength: 12,
                string: true
            },
            passwordsignup_confirm: {
                required: true,
                minlength: 6,
                maxlength: 12,
                equalTo: "#passwordsignup"
            }
        },
        messages: {
            usernamesignup: {
                required: '请填写用户名!',
                minlength: '用户名最少为2个字符',
                maxlength: '用户名最多为12个字符',
            },
            phonesignup: {
                required: '请填写手机号!',
                digits: '请输入合法的手机号!',
                minlength: '手机号长度应该是11位',
                maxlength: '手机号长度应该是11位'
            },
            verifycode: {
                required: '请填写验证码!',
                digits: '请输入合法的验证码!',
                minlength: '验证码长度应该是5位',
                maxlength: '验证码长度应该是5位'
            },
            passwordsignup: {
                required: '请填写密码!',
                minlength: '密码最少为6位',
                maxlength: '密码最多为12位'
            },
            passwordsignup_confirm: {
                required: '请确认密码!',
                equalTo: "密码不一致!",
                minlength: '密码最少为6位',
                maxlength: '密码最多为12位'
            }
        },
        //注册表单验证通过
        submitHandler: function (form) {
            console.log('校验正确,已向后台提交信息,等待后台回复');
            $.ajax({
                type: 'POST',
                url: '/api/login.php',
                dataType: 'json',
                data: {
                    cmd: 'signup',
                    username: $('#usernamesignup').val(),
                    phone: $('#phonesignup').val(),
                    pwd: $('#passwordsignup').val(),
                    code: $('#verifycode').val()
                },
                success: function (data) {
                    switch (data.code) {
                        case -3:
                            alert('存在相同用户名!');
                            break;
                        case -2:
                            alert('存在相同手机号!');
                            break;
                        case 0:
                            alert('出错啦!');
                            console.log('写入数据库失败');
                            break;
                        case 1:
                            alert('注册成功,请登录!');
                            window.location.hash = '#tologin'
                            break;
                        case 2:
                            alert('验证码已过期!');
                            console.log(data.msg);
                            break;
                        case 3:
                            alert('验证码不正确!');
                            console.log(data.msg);
                            break;
                        case 4:
                            alert('发送验证码手机号与注册手机号不一致!');
                            console.log(data.msg);
                            break;
                        default:
                            alert('出错啦!');
                            console.log('遇到未知错误--' + data.code + data.msg);
                            break;
                    }
                },
                error: function () {
                    alert('出错啦!');
                    console.log('请求出错')
                }
            });
            //阻止表单提交
            return false;
        },
        //注册表单验证不通过
        invalidHandler: function (event, validator) {
            alert('您的输入有误,请重新填写.')
            console.log('输入有误,无法向后台提交信息,提示用户重新填写')
            //阻止表单提交
            return false;
        }
    });

    //自定义对用户名和密码的验证方法(只允许汉字、数字、字母和下划线的组合)
    $.validator.addMethod('string', function (value, element, params) {
        var string = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
        return this.optional(element) || (string.test(value));
    }, '输入不合法(只允许汉字、数字、字母和下划线的组合)!');


    /******* 3.验证码部分 *******/

    //点击'获取验证码'按钮
    $(".send-code-button").click(function () {
        //点击后按钮马上失效，防止重复点击
        $(this).attr("disabled", true);
        $(this).addClass("waiting");
        //发送验证码前先检查手机号有没有填写
        var phone = $('#phonesignup').val();
        if (phone == '') {
            alert('请填写手机号!');
            //按钮恢复
            $(this).attr("disabled", false);
            $(this).removeClass("waiting");
        } else if ((/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
            //启动倒计时
            toCount($(this));
            //发送短信
            sendSMS(phone);
        } else {
            alert('请填写合法的手机号!');
            //按钮恢复
            $(this).attr("disabled", false);
            $(this).removeClass("waiting");
        }
    });

    //验证码按钮倒计时处理函数
    function toCount(btn) {
        var num = 60;
        var timer = null;
        timer = setInterval(function () {
            btn.html("重新发送(" + num + "s)");
            num--;
            if (num <= 0) {
                clearInterval(timer);
                //按钮恢复
                btn.attr("disabled", false);
                btn.removeClass("waiting");
                btn.html("获取验证码");
            }
        }, 1000)
    }

    //向后台提交信息
    function sendSMS(phone) {
        $.ajax({
            type: 'POST',
            url: '/api/login.php',
            dataType: 'json',
            data: {
                number: phone,
                cmd: 'verify'
            },
            success: function (data) {
                switch (data.code) {
                    case -2:
                        alert('出错啦!');
                        console.log('没有POST手机号');
                        break;
                    case -1:
                        alert('出错啦!');
                        console.log('两次请求验证码时间小于60秒');
                        break;
                    case 0:
                        alert('出错啦!');
                        console.log('服务端发送短信失败，请稍后重试--' + data.msg);
                        break;
                    case 1:
                        console.log('短信发送成功');
                        break;
                    default:
                        alert('出错啦!');
                        console.log('遇到未知错误--' + data.code + data.msg);
                        break;
                }
            },
            error: function () {
                alert('出错啦!');
                console.log('请求出错')
            }
        });
    }
});

