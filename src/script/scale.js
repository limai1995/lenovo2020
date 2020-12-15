;
! function() {
    function Fdj() {
        this.wrap = document.querySelector('.wrap');
        this.spic = document.querySelector('#spic');
        this.sf = document.querySelector('#sf');
        this.bf = document.querySelector('#bf');
        this.bpic = document.querySelector('#bpic');
        this.left = document.querySelector('#left');
        this.right = document.querySelector('#right');
        this.ul = document.querySelector('#list ul');
        this.lis = document.querySelectorAll('#list li');
    }
    Fdj.prototype = {
        init: function() {
            var that = this;
            //1.鼠标经过和移出spic
            this.spic.onmouseover = function() {
                that.showfdj();
                //获取小放大镜的尺寸
                that.sfsize();
                //鼠标在spic移动
                this.onmousemove = function(ev) {
                    var ev = ev || window.event;
                    that.clientmove(ev)
                };
            };
            this.spic.onmouseout = function() {
                that.hidefdj();
            };

            //2.给li添加点击事件
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].onclick = function() {
                    var url = this.children[0].src; //当前li下面img的src
                    that.spic.children[0].src = url;
                    that.bpic.src = url;
                }
            }
            //3.给ul设置宽度
            this.liwidth = this.lis[0].offsetWidth; //1个li尺寸
            this.ul.style.width = this.lis.length * this.liwidth + 'px';
            //4.点击左右箭头ul移动
            //当移动的图片个数少于6个，左右箭头都无法点击
            this.num = 6;
            if (this.lis.length <= 6) {
                this.right.style.color = '#fff';
            }
            this.right.onclick = function() {
                that.rightclick();
            }
            this.left.onclick = function() {
                that.leftclick();
            }
        },
        showfdj: function() {
            this.sf.style.visibility = 'visible';
            this.bf.style.visibility = 'visible';
        },
        hidefdj: function() {
            this.sf.style.visibility = 'hidden';
            this.bf.style.visibility = 'hidden';
        },
        sfsize: function() {
            this.sf.style.width = this.spic.offsetWidth * this.bf.offsetWidth / this.bpic.offsetWidth + 'px';
            this.sf.style.height = this.spic.offsetHeight * this.bf.offsetHeight / this.bpic.offsetHeight + 'px';
            this.bili = this.bpic.offsetWidth / this.spic.offsetWidth;
        },
        clientmove: function(ev) {
            var l = ev.clientX - this.wrap.offsetLeft - this.sf.offsetWidth / 2;
            var t = ev.clientY - this.wrap.offsetTop - this.sf.offsetHeight / 2;
            if (l < 0) {
                l = 0;
            } else if (l >= this.spic.offsetWidth - this.sf.offsetWidth) {
                l = this.spic.offsetWidth - this.sf.offsetWidth - 2;
            }
            if (t < 0) {
                t = 0;
            } else if (t >= this.spic.offsetHeight - this.sf.offsetHeight) {
                t = this.spic.offsetHeight - this.sf.offsetHeight - 2;
            }
            this.sf.style.left = l + 'px';
            this.sf.style.top = t + 'px';
            this.bpic.style.left = -l * this.bili + 'px';
            this.bpic.style.top = -t * this.bili + 'px';
        },
        rightclick: function() {
            if (this.lis.length > this.num) {
                this.left.style.color = '#333';
                this.num++;
                if (this.num == this.lis.length) {
                    this.right.style.color = '#fff';
                }
                buffermove(this.ul, { left: -(this.num - 6) * this.liwidth })
            }
        },
        leftclick: function() {
            if (this.num > 6) {
                this.right.style.color = '#333';
                this.num--;
                if (this.num <= 6) {
                    this.left.style.color = '#fff';
                }
                buffermove(this.ul, { left: -(this.num - 6) * this.liwidth })
            }
        }
    }

    new Fdj().init();
}();