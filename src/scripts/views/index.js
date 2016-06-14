var indexTpl = require('../tpl/index.string');
var img = 0
SPA.defineView('index', {
	html: indexTpl,
	plugins: ['delegated'],
	
	// 子视图的嵌套定义
	modules: [{
	  name: 'content',
	  container: '.m-index-container',
	  views: ['home', 'jufl', 'taobao' , 'shop' , 'myqu'],
	  defaultTag: 'home'
	}],
		
	// 初始化视图属性和方法
	init: {
	  indexSwiper: null,
	  bannerSwiper: null,
	  ScrollTop:null,
	  setActive: function (obj) {
	    obj.find("b").addClass('active');
	    obj.siblings().find("b").removeClass('active');
	  },
	  setActive2: function (obj) {
	    obj.addClass('active').siblings().removeClass('active');
	  },
	  
	},
	bindActions: {
	    'switch.swiper': function (e) {
	      this.setActive2($(e.el));					//给当前元素添加border；
	      this.indexSwiper.slideTo($(e.el).index());//点击nav 控制下方视图
	    },
	    //回到顶部
	    "scroolTop" : function(e){
	    	this.ScrollTop = new IScroll('#index-scroll', {});
	    	this.ScrollTop.scrollTo(0,-30, 100, IScroll.utils.ease.quadratic   );

	    },
	    
	    'switch.view': function (e) {
	      // 视图切换方法
	      this.modules.content.launch(e.data.tag);//控制主视图切换
	      this.setActive($(e.el));				//给当前元素添加border
	      this. indexSwiper= new Swiper('#containerSwiper', {
		        loop: false,
		        freeModeMomentumRatio : 0.5,
		        threshold : 100,
		        onSlideChangeStart: function (swiper) {					//主题轮播控制导航
		          	$('#index-nav li').eq(swiper.activeIndex)
		            .addClass('active').siblings().removeClass('active');
		            
		        }
		   });
		  this.bannerSwiper = new Swiper('#indexSwiper', {
		        loop: true,
		        autoplay:2000,
		        speed:5,
		        threshold : 100,
		        freeModeMomentumRatio : 0.5,
		        autoplayDisableOnInteraction : false,
		   });
		  //控制站内搜索    
		  if(e.data.tag == "myqu" || e.data.tag == "shop" || e.data.tag == "taobao"){
		  		$(".scroolSearch").css("display","none");
		  }else{
		  		$(".scroolSearch").css("display","block")
		  }
		  
		//----------footer---更换图片
			var len = $("footer > ul").find("li").length
			var arr=["首页","巨返利","淘宝返利","商城返利","我趣"]
			for( var i = 0 ; i < len ; i ++){
				$("footer > ul").find("li").eq(i).find("img").attr("src","../../../images/"+arr[i]+"-1.png");
			}
			$(e.el).find("img").attr("src","../../../images/"+$(e.el)[0].innerText+"-2.png");
		//----结束  
	      
	    },
	},
	
	// 给视图绑定事件
	bindEvents: {
	    'beforeShow': function () {
	    	
	    	var that = this;
		      this.bannerSwiper = new Swiper('#indexSwiper', {
		        loop: true,
		        autoplay:2000,
		        speed:5,
		        freeModeMomentumRatio : 0.5,
		        autoplayDisableOnInteraction : false,
		      });
		      this.indexSwiper = new Swiper('#containerSwiper', {
		        loop: false,
		        threshold : 100,
		        onSlideChangeStart: function (swiper) {
		          	$('#index-nav li').eq(swiper.activeIndex)
		            .addClass('active').siblings().removeClass('active');
						
		        }
		      });
	    },
	    'show': function () {
	    	
	    	var that = this;
		      this.bannerSwiper = new Swiper('#indexSwiper', {
		        loop: true,
		        autoplay:2000,
		        speed:5,
		        freeModeMomentumRatio : 0.5,
		        autoplayDisableOnInteraction : false,
		      });
		      this.indexSwiper = new Swiper('#containerSwiper', {
		        loop: false,
		        threshold : 100,
		        onSlideChangeStart: function (swiper) {
		          	$('#index-nav li').eq(swiper.activeIndex)
		            .addClass('active').siblings().removeClass('active');
						
		        }
		      });
	    },
	   
	    
 	}
	
});
