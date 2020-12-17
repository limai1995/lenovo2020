! function($) {

    var $loutinav = $('#loutinav'); //整个楼梯
    var $louti = $('#loutinav li').not('.last'); //获取9个li，排除last
    var $louceng = $('.louceng'); //9个楼层
    //第一步：显示隐藏左侧的楼梯：触发滚轮，根据对应的scrollTop值确定是否显示左侧的楼梯。
    //滚动条top>=400 显示左侧楼梯

    //封装函数
    function scroll() {
        var $scrolltop = $(window).scrollTop(); //获取滚动条的top值
        if ($scrolltop >= 400) {
            $loutinav.show();
        } else {
            $loutinav.hide();
        }
        $('title').html($scrolltop);
        // 第四步：通过触发滚动条，通过楼层将对应的楼梯添加激活的样式。
        // 如果楼层的top值>滚动条的top值,给楼层对应的楼梯添加激活状态。
        $louceng.each(function(index, element) {
            var $loucengtop = $(element).offset().top; //每一个楼层的top值。
            if ($loucengtop >= $scrolltop) {
                //每次触发滚动条，滚动条的top值都会发生变化。
                $louti.removeClass('active'); //移除前面所有的激活状态
                $louti.eq(index).addClass('active'); //给满足条件的添加状态
                return false; //终止循环
            }
        });

    }
    scroll();


    $(window).on('scroll', function() {
        scroll();
    });
}(jQuery);


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
// ! function($) {
//     //渲染+懒加载
//     const $list = $('.list ul');
//     $.ajax({
//         url: 'http://10.31.161.37/lenovo/php/listdata.php',
//         dataType: 'json'
//     }).done(function(data) {
//         let $strhtml = '';
//         $.each(data, function(index, value) {
//             $strhtml += `
//                 <li>
//                     <a href="detail.html?sid=${value.sid}">
//                         <img class="lazy" src="${value.url}" width="200" height="200"/>
//                         <p>${value.title}</p>
//                         <span>￥${value.price}</span>
//                     </a>
//                 </li>
//             `;
//         });
//         $list.html($strhtml);
//         //渲染的下面进行懒加载操作
//         // $(function() { //页面加载完成
//         //     $("img.lazy").lazyload({
//         //         effect: "fadeIn" //显示方法：谈入
//         //     });
//         // });
//     });
// }(jQuery);