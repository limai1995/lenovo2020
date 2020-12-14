// 
var oForm = document.querySelector('#registry'); //form表单。
// var username = document.querySelector('.username'); //用户名。
var telphone = document.querySelector('#phone'); //手机号码
var password = document.querySelector('.password'); //密码
var aSpan = document.querySelectorAll('#registry span');
//给每一个表单设置标记
// var userflag = true;
var telflag = true;
var passflag = true;
phone.onfocus = function() {
    message[0].innerHTML = '请输入11位正确的手机号码';
    message[0].style.color = '#666';
};

phone.onblur = function() {
        if (this.value !== '') {
            var reg = /^1[3578]\d{9}$/;
            if (reg.test(this.value)) {
                message[0].innerHTML = '√';
                message[0].style.color = 'green';
                telflag = true;
            } else {

                message[0].innerHTML = '手机号码格式有误';
                message[0].style.color = 'red';
                telflag = false;
            }
        } else {
            message[0].innerHTML = '手机号码不能为空';
            message[0].style.color = 'red';
            telflag = false;
        }
    }
    // 密码
password.onfocus = function() {
    message[1].innerHTML = '请输入密码,长度为8-14个字符';
    message[1].style.color = '#666';
};

password.oninput = function() {
    if (this.value.length >= 8 && this.value.length <= 14) {
        var regnum = /\d+/g;
        var reglower = /[a-z]+/g;
        var regupper = /[A-Z]+/g;
        var other = /[\W\_]+/g;
        var count = 0; //统计字符的种类
        if (regnum.test(this.value)) {
            count++;
        }

        if (reglower.test(this.value)) {
            count++;
        }

        if (regupper.test(this.value)) {
            count++;
        }

        if (other.test(this.value)) {
            count++;
        }

        //通过种类判断输出弱中强
        switch (count) {
            case 1:
                message[1].innerHTML = '弱';
                message[1].style.color = 'red';
                passflag = false;
                break;
            case 2:
            case 3:
                message[1].innerHTML = '中';
                message[1].style.color = 'orange';
                passflag = true;
                break;
            case 4:
                message[1].innerHTML = '强';
                message[1].style.color = 'green';
                passflag = true;
                break;
        }

    } else {
        message[1].innerHTML = '密码长度有问题';
        message[1].style.color = 'red';
        passflag = false;
    }
};

password.onblur = function() {
    if (this.value !== '') {
        if (passflag) {
            message[1].innerHTML = '√';
            message[1].style.color = 'green';
        }
    } else {
        message[1].innerHTML = '密码不能为空';
        message[1].style.color = 'red';
        passflag = false;
    }
};
registry.onsubmit = function() {
    if (telphone.value === '') {
        message[1].innerHTML = '手机号码不能为空';
        message[1].style.color = 'red';
        telflag = false;
    }
    if (password.value === '') {
        message[1].innerHTML = '密码不能为空';
        message[1].style.color = 'red';
        passflag = false;
    }
    if (!hmflag || !passflag) {
        return false; //阻止提交
    }
}





// ! function($) {
//     const $username = $('#username');
//     const $span = $('span');

//     $username.on('blur', function() {
//         $.ajax({
//             type: 'post',
//             url: 'http://localhost/JS2010/week06/Day%2029-Day%2031_jquery/loginregistry/php/reg.php',
//             data: {
//                 xingming: $username.val()
//             }
//         }).done(function(data) { //data就是后端返回的结果
//             if (!data) { //不存在
//                 $span.css('color', 'green').html('√');
//             } else { //存在
//                 $span.css('color', 'red').html('该用户名已存在');
//             }
//         });
//     });

// }(jQuery);