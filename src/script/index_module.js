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

// ! function($) {
//     //1.滚轮事件控制左侧楼梯的显示和隐藏
//     //直接刷新，满足情况
//     function scroll() {
//         let top = $(window).scrollTop(); //滚动条的top值。
//         top >= 500 ? $('#right').show() : $('#right').hide();
//         $('.louceng').each(function(index, element) {
//             let loucengtop = $(this).offset().top; //每一个楼层的top值
//             if (loucengtop >= top) {
//                 $('#right li').removeClass('active');
//                 $('#right li').eq($(this).index()).addClass('active');
//                 return false; //返回 'false' 将停止循环，有一个满足条件终止循环。
//             }
//         });
//     }
//     scroll();
//     //滚轮事件触发
//     $(window).on('scroll', function() {
//         scroll();
//     });
// }(jQuery);


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