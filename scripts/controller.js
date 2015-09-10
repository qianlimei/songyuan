/**
 * Created by qlm on 2015/8/11.
 */

var app = angular.module("syApp",['ui.router','pasvaz.bindonce']);

app.config(function($stateProvider,$urlRouterProvider){

    $urlRouterProvider.when("","index");

    $stateProvider.state("index",{
        url:"/index",
        views:{
            "main@":{
                templateUrl:"views/index.html",
                controller:"indexCtrl"
            }
        }
    }).
    state("common",{
       abstract:true,
        url:"/common",
       views:{
           "main@":{
               templateUrl:"views/common.html"
           }
       }
    }).
    state("common.ins",{ //公司简介
        url:"/ins",
        views:{
            "rightMain@common":{
                template:'<div class="mt40 clearfix"><div class="summary-img pull-left"></div>' +
                '<div class="summary-text pull-right">' +
                '<p>盐城市松源机械制造有限公司始建于90年代初，公司成立以来一直专注于通用机械及零部件、电镀机械、化纤机械、环保机械、汽车零部件、输送设备、升降台制造及销售、涂装非标设备的设计、制造、安装。</p>' +
                '<p>公司注册资金300万元后期追加500万元，占地面积1万平方米，员工120余名，各类专业技术人员40余名，下设三个生产车间，拥有车、磨、刨、铣、滚齿、镗、冲压、焊等专用生产设备，年产3000万元。公司以先进的加工设备、完善的检测手段，优良的产品品质，健全的售后服务，一直名列同行业前茅，销售网络遍布全国。</p>' +
                '<p>依靠科技求发展，不断为用户提供满意的产品，是我们永远不变的追求。公司于2000年7月顺利通过ISO9001：2000版质量体系认证，部分产品曾多次荣获盐城市“名牌产品”、“优质产品”等荣誉称号，多次被称为“盐城市工业行业先进单位”，“重合同守信用企业”及“最佳售后服务单位”。'+
                '松源人始终遵循“突破自我，追求卓越，永不满足”的企业文化理念和“努力使顾客感动”的服务理念，不断开拓创新，竭诚为您提供优质的产品和一流的服务，为振兴中国工业做贡献。</p>' +
                '</div></div>',
                controller:"mainCtrl"
            }
        }
    })
    .state("common.honors",{  //公司荣誉
        url:"/honors",
        views:{
            "rightMain@common":{
                templateUrl:"/views/honors.html",
                controller:"honorCtrl"
            }
        }
    })
    .state("common.contact",{ //联系我们
        url:"/contact",
        views:{
            "rightMain@common":{
                templateUrl:"views/contact.html",
                controller:function($scope){
                    $scope.$parent.titleName = "联系我们";
                    $scope.$parent.banner_img = "contact.jpg";
                }
            }
        }
    })
    .state("common.talk",{ //总经理致辞
        url:"/talk",
        views:{
            "rightMain@common":{
                templateUrl:"views/talk.html",
                controller: function($scope) {
                    $scope.$parent.titleName = "总经理致辞";
                    $scope.$parent.banner_img = "talk.jpg";
                }
             }
        }
    })
    .state("common.product",{ //产品列表
        url:"/product/:id",
        views:{
            "rightMain@common" : {
                templateUrl:"views/product.html",
                controller: "productCtrl"
            }
        }
    })
    .state("common.performance",{ //工程业绩
        url:"/performance",
            views:{
                "rightMain@common" : {
                    templateUrl:"views/performance.html",
                    controller:"perCtrl"
                },
                controller:function($scope){
                    $scope.$parent.banner_img = "honor.jpg";
                }
            }
    });
})
.controller("indexCtrl",function($scope,$timeout){
        $scope.news = [];
        $scope.companies = [
            "1.png",
            "2.png",
            "3.png",
            "4.png",
            "5.jpg",
            "6.jpg",
            "7.png",
            "8.png",
            "9.png",
            "10.png",
            "11.jpg",
            "12.png"
        ];

        $scope.banners = [
            "banner01.jpg",
            "banner02.jpg",
            "banner03.jpg"
        ];

        $scope.images = [
            "a1.png",
            "a2.png",
            "a3.png"
        ];

        $scope.p_lists = [
            {
                image:"1.jpg",
                product_id : 4,
                product_name : "电镀设备"
            },
            {
                image:"2.jpg",
                product_id : 5,
                product_name : "电站辅机设备"
            },
            {
                image:"3.jpg",
                product_id : 2,
                product_name : "非标机械设备"
            },
            {
                image:"4.jpg",
                product_id : 3,
                product_name : "喷粉设备"
            },
            {
                image:"5.jpg",
                product_id : 7,
                product_name : "喷砂设备"
            },
            {
                image:"6.jpg",
                product_id : 6,
                product_name : "水处理设备配件"
            },
            {
                image:"7.jpg",
                product_id : 1,
                product_name : "涂装设备"
            }
        ];

        $timeout(function(){
            $("#banner").slide({
                scrollEle : 'li',
                transition : "slide",
                page_list:$(".dot-list").find("li")
            });

            $("#slide1").slide({
                scrollEle:"img",
                transition:"fade",
                timeout:5000
            });

            $("#cxscroll").cxScroll();

            $('#product-rec').scrollable({
                direction:"left",
                scrollCount:0,
                width:"auto",
                duration:15000,
                delay:0
            });
        },0,false);


})
.controller("mainCtrl",function($scope,$http){
    $scope.$parent.titleName = "公司简介";
    $scope.$parent.banner_img = "about.jpg";
    $http.get("/functions/index.php")
        .success(function(result){
            //console.log(result);
        });
})
.controller("productCtrl",function($scope,$http,$stateParams){
    $scope.$parent.banner_img = "product.jpg";
    var id = $stateParams.id,temp=id;
    id = "00" + id;
    $scope.id = id.substr(-3,3);
    $http.get("/functions/products.php?id="+$scope.id)
        .success(function(data){
            $scope.product = data;
            $scope.count = (data && data[0].files) ? data[0].files.length : 0;
            if(temp == 1){
                $scope.$parent.titleName = "涂装设备";
            }else if(temp == 2){
                $scope.$parent.titleName = "非标机械设备";
            }else{
                for(var i=0;i<data.length;i++){
                    if(data[i].product_id == temp){
                        $scope.$parent.titleName = data[i].product_name_ch;
                        break;
                    }
                }
            }


        });

    $scope.current = 0;

    $scope.changeImg = function(index){
        index = index > $scope.product[0].files.length ? 0 : index;
        $scope.current = index;
    };

    $scope.toPrev = function(){
        if($scope.current > 0){
            $scope.current--;
        }
    };

    $scope.toNext = function(){
        if($scope.current < $scope.count-1){
            $scope.current++;
        }
    }

})
.controller("navCtrl",function($rootScope,$scope,$http){
    $scope.lists = [];
    $scope.f_list = [];
    $http.get("/functions/index.php")
        .success(function (result) {
            $scope.lists = result;

            for(var i = 0;i<result.length;i++){
                if(!result[i].parentId){
                    $scope.f_list[$scope.f_list.length] = result[i];
                    getObj($scope.f_list[$scope.f_list.length-1],result);
                }
            }
            $rootScope.products = $scope.f_list;
        });

    function getObj(target,data){
        var id = target.id;
        target.child = [];
        for(var i = 0;i<data.length;i++){
            if(id == data[i].parentId){
                target.child[target.child.length] = data[i];
                getObj(target.child[target.child.length-1],data);
            }
        }
    }
})
.controller("honorCtrl",function($scope){
        $scope.$parent.titleName = "公司荣誉";
        $scope.$parent.banner_img = "honor.jpg";
        $scope.honors = [
            "01.jpg",
            "02.jpg",
            "03.jpg",
            "04.jpg",
            "05.jpg",
            "06.jpg",
            "07.jpg",
            "08.jpg",
            "09.jpg"
        ];

        $scope.c_honor = $scope.honors[0];
        $scope.changeHonor = function(index){
            $scope.c_honor = $scope.honors[index];
        }
})
.controller("perCtrl",function($scope,$http){
        $scope.$parent.titleName = "工程业绩";
        $scope.$parent.banner_img = "performance.jpg";
        $scope.items = [];

        $http.get("/functions/performance.php")
            .success(function (result) {
                $scope.items = result;
            });
});