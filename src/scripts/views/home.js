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
 	 "scroolTop" : function(e){
	    	var myScroll = new IScroll('#index-scroll', {});
	    	myScroll.scrollTo(0, 0, 100, IScroll.utils.ease.quadratic   );
	    },
	}
});