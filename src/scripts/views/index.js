var indexTpl = require('../tpl/index.string');

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
//	    "scroolTop" : function(e){
//	    	var myScroll = new IScroll('#index-scroll', {});
//	    	myScroll.scrollTo(0, 0, 100, IScroll.utils.ease.quadratic   );
//	    },
	    
	    'switch.view': function (e) {
	      // 视图切换方法
	      
	      this.modules.content.launch(e.data.tag);//控制主视图切换
	      this.setActive($(e.el));				//给当前元素添加border
	      this.indexSwiper = new Swiper('#containerSwiper', {
		        loop: false,
		        onSlideChangeStart: function (swiper) {					//主题轮播控制导航
		          	$('#index-nav li').eq(swiper.activeIndex)
		            .addClass('active').siblings().removeClass('active');
		        }
		      });
	      
	    },
	},
	
	// 给视图绑定事件
	bindEvents: {
	    'beforeShow': function () {
		      var iSwiper = new Swiper('#indexSwiper', {
		        loop: true,
		        autoplay:2000,
		        speed:5,
		        autoplayDisableOnInteraction : false,
		      });
		      this.indexSwiper = new Swiper('#containerSwiper', {
		        loop: false,
		        onSlideChangeStart: function (swiper) {
		        	
		          	$('#index-nav li').eq(swiper.activeIndex)
		            .addClass('active').siblings().removeClass('active');
		        }
		      });
	    },
	   
	    
 	}
	
});
