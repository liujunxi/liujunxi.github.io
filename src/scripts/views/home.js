var tplHome = require('../tpl/home.string');

// 定义一个视图
SPA.defineView('home', {
	html: tplHome,
	// 给视图绑定事件
	bindEvents: {
	    
	    'show': function () {
	      	console.log(this.widgets.navScroll);
	    	var navScroll = this.widgets.navScroll
	    	navScroll.options.scrollX = true;
	    	navScroll.options.scrollY = false;
	    }
	    
 	},
 	bindActions: {
	    'switch.swiper': function (e) {
	      this.setActive2($(e.el));					//给当前元素添加border；
	      this.indexSwiper.slideTo($(e.el).index());//点击nav 控制下方视图
	    
	    },
 	}

});