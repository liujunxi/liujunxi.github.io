var tplJufl = require('../tpl/jufl.string');

// 定义一个视图
SPA.defineView('jufl', {
	html: tplJufl,
	
	
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