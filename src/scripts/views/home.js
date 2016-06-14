var tplHome = require('../tpl/home.string');

// 定义一个视图
SPA.defineView('home', {
	html: tplHome,
	plugins: ['delegated', {
	    name: 'avalon',
	    options: function(vm) {
	      vm.livelist = [];
	      vm.isShowlLoading = true;
	      
	    }
	}],
	
	init:{
		navScroll:null,
		formatData:function(data){
			var temp=[];
			for(var i = 0 ; i < Math.ceil(data.length/2) ; i++){
				temp[i] =[];
				temp[i][0] = data[2*i]; 
				temp[i][1] = data[2*i+1]; 
			}
			return temp;
		},
		liveListArr:[]
	},
	
	bindActions:{
		
		"scroolTop" : function(e){
	    	this.ScrollTop = new IScroll('#index-scroll', {});
	    	this.ScrollTop.scrollTo(0,0, 100, IScroll.utils.ease.quadratic   );
				setTimeout(function(){
					$(".scroolTop").css({"display":"none"});
				},100)
	    },
		
		"switch.swiper" : function(e,data){
			var _win = window.innerWidth;
			var _width = $(e.el).offset().width;
			var _offset = $(e.el).offset().left;
			var center = (_win - _width)/2;
			var go = center - _offset;
			
			if( $(e.el).index() == 0){
				this.navScroll.scrollTo( 0 , 0 );
			}
			if( $(e.el).index() == 1){
				this.navScroll.scrollTo( 0 , 0 );
			}
			if( $(e.el).index() == 2){
				this.navScroll.scrollTo( -31 , 0 );
			}
			if( $(e.el).index() == 3){
				this.navScroll.scrollTo( -85 , 0 );
			}
			if( $(e.el).index() == 4){
				this.navScroll.scrollTo( -139 , 0 );
			}
			if( $(e.el).index() == 5){
				this.navScroll.scrollTo( -193 , 0 );
			}
			if( $(e.el).index() == 6){
				this.navScroll.scrollTo( -247 , 0 );
			}
			if( $(e.el).index() == 7){
				this.navScroll.scrollTo( -329 , 0 );
			}
			if( $(e.el).index() == 8){
				this.navScroll.scrollTo( -383 , 0 );
			}
			if( $(e.el).index() == 9){
				this.navScroll.scrollTo( -465 , 0 );
			}
			if( $(e.el).index() == 10){
				this.navScroll.scrollTo( -465, 0 );
			}
		}
	},
	
  
	// 给视图绑定事件
	bindEvents: {
	    'show': function () {
	    	//--------
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
		        threshold : 200,
		        onSlideChangeStart: function (swiper) {
		          	$('#index-nav li').eq(swiper.activeIndex)
		            .addClass('active').siblings().removeClass('active');
		        }
		      });
	    	//------
	    	 	this.navScroll = this.widgets.navScroll
		    	this.navScroll.options.scrollX = true;
		    	this.navScroll.options.scrollY = false;
		    	
	    	var vm = this.getVM();
	    	var that = this;
	    		$.ajax({
	    			url:"../../../mock/livelist.json",
	    			success:function(res){
	    				vm.isShowlLoading = false;
	    				var data = res.data;
	    				
	    				//----------初次复制
	    				that.liveListArr = data; 
	    				
	    				//格式化数据斌复制----
							vm.livelist = that.formatData(data); 
							
	    			}
	    		});
	    		
	    	      // pull to refresh
	      var myScroll = this.widgets.indexScroll;//引用当前isscroll对象
	      var topSize = 30;
	
	      myScroll.scrollBy(0, -topSize);
	
	      var head = $('.head img'),
	          topImgHasClass = head.hasClass('up');
	      var foot = $('.foot img'),
	          bottomImgHasClass = head.hasClass('down');
	
	      // 判断顶部与底部的边界
	      myScroll.on('scroll', function () {
	          var y = this.y,
	              maxY = this.maxScrollY - y;
	          if (y >= 0) {
	              !topImgHasClass && head.addClass('up');
	             
	              return '';
	          }
	          if (maxY >= 0) {
	              !bottomImgHasClass && foot.addClass('down');
	              return '';
	          }
	          if(y < -100){
	          	$(".scroolTop").css("display","block")
	          }
	      });
	
	      // 拖拽停止后的处理
	      myScroll.on('scrollEnd', function () {
	          // 松开到了上边界，弹回
//	          if (this.y >= -topSize && this.y < 0) {
//	              myScroll.scrollTo(0, -topSize);
//	              head.removeClass('up');
//	              
//	          } 
//	          else if (this.y >= 0) {
//	          	$('.scroolTop').css("display","none");
//	              head.attr('src', '../../../images/ajax-loader.gif');
//	              // ajax下拉刷新数据
//	              $.ajax({
//	                url: '../../../mock/livelist.json',
//	                data: {
//	                  type: 'new'
//	                },
//	                success: function (res) {
//	                  // 将新数据prepend到临时的一维数组liveListArr里
//	                  that.liveListArr = res.data.concat(that.liveListArr);
//	
//	                  // 格式化最新的一维数组，进行avalon数组渲染
//	                  vm.livelist = that.formatData(that.liveListArr);
//	
//	                  // 恢复现场
//	                  setTimeout(function () {
//	                    myScroll.scrollTo(0, -topSize);
//	                    head.removeClass('up');
//	                    head.attr('src', '../../../images/arrow.png');
//	                  }, 0);
//	                }
//	              });
//	          }
	
	          var maxY = this.maxScrollY - this.y;
	          var self = this;
	
	          // 底部收回
	          if (maxY > -topSize && maxY < 0) {
	              myScroll.scrollTo(0, self.maxScrollY + topSize);
	              foot.removeClass('down')
	          } else if (maxY >= 0) {
	              foot.attr('src', '../../../images/ajax-loader.gif');
	
	              // ajax上拉加载数据
	              $.ajax({
	                url: '../../../mock/livelist.json',
//	                data: {
//	                  type: 'more'
//	                },
	                success: function (res) {
	                  // 追加新数据
	                  that.liveListArr = that.liveListArr.concat(res.data);
	
	                  // 格式化数据再次赋值
	                  var moreArray = that.formatData(that.liveListArr);
	                  vm.livelist = moreArray;
	
	                  // 恢复现场
	                  setTimeout(function () {
	                    myScroll.scrollTo(0, self.y + topSize);
	                    foot.removeClass('down');
	                    foot.attr('src', '../../../images/arrow.png');
	                  }, 0);
	                  
	                }
	              });
	          }
	      });	
		    	
	    	
	    }
	    
   	}
});

