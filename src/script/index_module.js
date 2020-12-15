// 顶部悬浮
// const $box = $('.top_lie');
// $(window).on('scroll', () => {
//     let $scrolltop = $(window).scrollTop(); //获取滚动条top值
//     if ($scrolltop >= 100) {
//         $box.stop(true).animate({
//             top: 80
//         })
//     } else {
//         $box.stop(true).animate({
//             top: 0
//         })
//     }
// });


// 轮播图

! function($) {
    const $lunbo = $('.lunbo');
    const $piclist = $('.lunbo ul li');
    const $btnlist = $('.lunbo ol li');
    const $left = $('#left');
    const $right = $('#right');
    let $num = 0;
    let $timer1 = null;
    let $timer2 = null;
    //1.小圆圈切换
    $btnlist.on('mouseover', function() {
        $num = $(this).index();
        $timer1 = setTimeout(function() {
            tabswitch()
        }, 300);


    });

    $btnlist.on('mouseout', function() {
        clearTimeout($timer1);
    });

    //2.左右箭头切换
    $right.on('click', function() {
        $num++;
        if ($num > $btnlist.length - 1) {
            $num = 0;
        }

        tabswitch()
    });

    $left.on('click', function() {
        $num--;
        if ($num < 0) {
            $num = $btnlist.length - 1;
        }

        tabswitch()
    });

    function tabswitch() {
        $btnlist.eq($num).addClass('active').siblings().removeClass('active');
        $piclist.eq($num).stop(true).animate({
            opacity: 1
        }).siblings().stop(true).animate({
            opacity: 0
        });
    }

    //3.自动轮播
    $timer2 = setInterval(function() {
        $right.click();
    }, 3000);

    //4.鼠标控制定时器停止和开启。
    $lunbo.hover(function() {
        clearInterval($timer2);
    }, function() {
        $timer2 = setInterval(function() {
            $right.click();
        }, 3000);
    });

}(jQuery);

// 图片渲染
! function($) {
    //渲染+懒加载
    const $list = $('.list ul');
    $.ajax({
        url: 'http://localhost/lenovo/php/listdata.php',
        dataType: 'json'
    }).done(function(data) {
        let $strhtml = '';
        $.each(data, function(index, value) {
            $strhtml += `
                <li>
                    <a href="detail.html?sid=${value.sid}">
                        <img class="lazy" src="${value.url}" width="200" height="200"/>
                        <p>${value.title}</p>
                        <span>￥${value.price}</span>
                    </a>
                </li>
            `;
        });
        $list.html($strhtml);
        //渲染的下面进行懒加载操作
        // $(function() { //页面加载完成
        //     $("img.lazy").lazyload({
        //         effect: "fadeIn" //显示方法：谈入
        //     });
        // });
    });
}(jQuery);

// 模块化

// define([], () => {
//     return {
//         init: function() {
//             // //代码实现
//             // //1.鼠标移入左侧的li元素，显示右侧的大盒子。
//             // const $list = $('.menu li');
//             // const $cartlist = $('.cartlist');
//             // const $items = $('.item');
//             // $list.hover(function() {
//             //     $cartlist.show();
//             //     $(this).addClass('active').siblings('li').removeClass('active');
//             //     //切换内容发生改变，不同的li对应不同的内容块。
//             //     $items.eq($(this).index()).show().siblings('.item').hide();

//             //     //改变右侧的大盒子的位置
//             //     let $scrolltop = $(window).scrollTop();
//             //     let $bannertop = $('.banner').offset().top;
//             //     if ($scrolltop > $bannertop) {
//             //         $cartlist.css({
//             //             top: $scrolltop - $bannertop
//             //         });
//             //     } else {
//             //         $cartlist.css({
//             //             top: 0
//             //         });
//             //     }
//             // }, function() {
//             //     $cartlist.hide();
//             // });

//             // //2.鼠标移入右侧的大盒子，大盒子依然显示隐藏
//             // $cartlist.hover(function() {
//             //     $(this).show();
//             // }, function() {
//             //     $(this).hide();
//             // });


//             // //检测是否用户已经登录
//             // if (localStorage.getItem('loginname')) {
//             //     $('.admin').show();
//             //     $('.login').hide();
//             //     $('.admin span').html(localStorage.getItem('loginname'));
//             // }

//             // //退出登录 - 删除本地存储
//             // $('.admin a').on('click', function() {
//             //     $('.admin').hide();
//             //     $('.login').show();
//             //     localStorage.removeItem('loginname');
//             // });



//             // return {
//             //     init: function() {
//             //渲染+懒加载
//             const $list = $('.list ul');
//             $.ajax({
//                 url: 'http://localhost/lenovo/php/listdata.php',
//                 dataType: 'json'
//             }).done(function(data) {
//                 let $strhtml = '';
//                 $.each(data, function(index, value) {
//                     $strhtml += `
//                                 <li>
//                                     <a href="detail.html?sid=${value.sid}">
//                                         <img class="lazy" data-original="${value.url}" width="200" height="200"/>
//                                         <p>${value.title}</p>
//                                         <span>￥${value.price}</span>
//                                     </a>
//                                 </li>
//                             `;
//                 });
//                 $list.html($strhtml);
//                 //渲染的下面进行懒加载操作
//                 $(function() { //页面加载完成
//                     $("img.lazy").lazyload({
//                         effect: "fadeIn" //显示方法：谈入
//                     });
//                 });
//             });
//             //     }
//             // }

//         }


//     }
// });