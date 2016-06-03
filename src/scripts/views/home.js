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
	    
 	}
});