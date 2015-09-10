/**
 * Created by qlm on 2015/7/8.
 * 通用轮播效果集成
* */

(function($){
    function Slide(element,options){
        var defaults = {
            prev:null,         //prev按钮选择器
            next:null,         //next按钮选择器
            scrollEle:null,    //滚动元素
            timeout:3000,      //动画间隔时间
            auto:true,         //是否自动启动动画
            speed:500,         //动画速度
            page_list:null,     //分页选择器
            transition:"normal",  //切换效果 fade,slide,normal
            hover_stop:true     //鼠标悬停是否停止动画
        };

        this.option = $.extend({},defaults,options);
        this.element = element;
        this.current = 0;
        this.scrollEle = typeof this.option.scrollEle === "string" ? element.find(this.option.scrollEle) : $(this.option.scrollEle);
        this.count = this.scrollEle.length;
        this.timeout = null;

        this.init();
    }

    //初始化
    Slide.prototype.init = function () {
        var self = this,
            option = this.option,
            prev = typeof  option.prev === "string" ? self.element.find(option.prev) : $(option.prev),
            next = typeof option.next === "string" ? self.element.find(option.next) : $(option.next),
            page_list = typeof option.page_list === "string" ? self.element.find(option.page_list) : $(option.page_list);

        if(self.count <= 1) return false;

        switch(this.option.transition){
            case "fade" :
                this.func = this.fade;
                break;
            case "slide" :
                this.func = this.slide;
                break;
            default :
                this.func = this.normal;
                break;
        }
        prev.on("click",function(){
            self.prev();
        });

        next.on("click",function(){
            self.next();
        });

        page_list.each(function(index,ele){
            $(ele).on("click",function(){
                self.func(index);
            })
        });

        if(option.hover_stop){
            this.scrollEle.on("mouseenter",function(){
                clearTimeout(self.timeout);
            })
                .on("mouseleave", function () {
                    self.timeout = setTimeout(function(){
                        self.next();
                    },option.timeout);
                });
        }

        self.autoSlide();
    };

    //动画开始
    Slide.prototype.autoSlide = function(){
        var self = this,
            option = this.option;

        if(option.auto){
            self.timeout = setTimeout(function(){
                self.func(self.current + 1);
            },option.timeout);
        }
    };

    //普通轮转
    Slide.prototype.normal = function (index) {
        var self = this,
            target = index;

        if(self.timeout){
            clearTimeout(self.timeout);
        }

        if(index < 0){
            target = self.count - 1;
        }else if(index >= self.count){
            target = 0;
        }

        self.scrollEle.eq(target).css({"left" : 0,"top" : "0"}).show();
        self.scrollEle.eq(self.current).hide();
        self.current = target;
        self.changePage(self.current);
        self.autoSlide();
    };

    //滑动
    Slide.prototype.slide = function(index){
        var self = this,
            target = index,
            dir = 1,
            option = self.option;

        if(self.scrollEle.filter(":animated").length > 0){
            return false;
        }

        if(self.timeout) {
            clearTimeout(self.timeout);
        }
        if(index < self.current){
            dir = -1;
        }

        if(index < 0){
            target = self.count - 1;
        }else if(index >= self.count){
            target = 0;
        }

        self.scrollEle.eq(target)
            .css({
                "left" : dir * self.element.outerWidth() + "px"
            }).show().animate({
                "left" : 0
            },option.speed);
        self.scrollEle.eq(self.current)
            .animate({
                "left" : dir*(-1)*self.element.outerWidth() + "px"
            },option.speed, function () {
                $(this).hide();
            });

        self.current = target;
        self.changePage(self.current);

        self.autoSlide();
    };

    Slide.prototype.next = function(){
        this.func(this.current + 1);
    };

    Slide.prototype.prev = function(){
        this.func(this.current - 1);
    };

    //淡入淡出
    Slide.prototype.fade = function (index) {
        var self = this,
            target = index,
            option = self.option;

        if(self.scrollEle.filter(":animated").length > 0){
            return false;
        }

        if(self.timeout){
            clearTimeout(self.timeout);
        }

        if(index < 0){
            target = self.count - 1;
        }else if(index >= self.count){
            target = 0;
        }

        self.scrollEle.eq(target).css({"left":0,"top":0}).fadeIn(option.speed);
        self.scrollEle.eq(self.current).fadeOut(option.speed);

        self.current = target;
        self.changePage(self.current);

        self.autoSlide();
    };

    Slide.prototype.changePage = function(index){
        var  option = this.option;
        if(!option.page_list) return false;
        var page_list = typeof option.page_list === "string" ? self.element.find(option.page_list) : $(option.page_list);
        page_list.removeClass("active").eq(index).addClass("active");
    };

    function Plugin(options){
        return this.each(function(index,ele){
            var data = $(ele).data("slide");
            if(!data){
                $(ele).data("slide",(new Slide($(ele),options)));
            }
        });
    }

    $.fn.slide = Plugin;
})(jQuery);
