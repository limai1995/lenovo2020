! function($) {
    const $username = $('.haoma');
    const $password = $('.password');
    const $login = $('.dengl'); //登录按钮

    $login.on('click', function() {
        $.ajax({
            type: 'post',
            url: 'http://10.31.161.37/lenovo/php/detail.php',
            data: {
                user: $username.val(),
                pass: $password.val()
            }
        }).done(function(data) {
            if (!data) { //登录失败
                alert('用户名或者密码有误!');
                $password.val(''); //密码清空
            } else { //登录成功
                location.href = 'index.html'; //前端和前端进行页面的通信，相对路径即可，如果是前后端的通信一定是觉对路径。
                //存储用户名，方便首页获取。
                localStorage.setItem('loginname', $username.val());
            }
        })
    });

}(jQuery);









var haoma = document.querySelector('.haoma');
var password = document.querySelector('.password');
var message = document.querySelector('#registry span')

var hmflag = true;
var passflag = true;

// 手机号码
haoma.onfocus = function() {
    message[0].innerHTML = '请输入11位正确的手机号码';
    message[0].style.color = '#666';
};

haoma.onblur = function() {
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
        message[0].innerHTML = '手机号码不能为空';
        message[0].style.color = 'red';
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
//     const $haoma = $('.haoma');
//     const $password = $('.password');
//     const $login = $('#login'); //登录按钮

//     $login.on('click', function() {
//         $.ajax({
//             type: 'post',
//             url: 'http://localhost/lenovo/php/login.php',
//             data: {
//                 user: $haoma.val(),
//                 pass: $password.val()
//             }
//         }).done(function(data) {
//             if (!data) { //登录失败
//                 alert('用户名或者密码有误!');
//                 $password.val(''); //密码清空
//             } else { //登录成功
//                 location.href = 'index.html'; //前端和前端进行页面的通信，相对路径即可，如果是前后端的通信一定是觉对路径。
//                 //存储用户名，方便首页获取。
//                 localStorage.setItem('loginname', $haoma.val());
//             }
//         })
//     });

// }(jQuery);