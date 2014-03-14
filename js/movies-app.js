$(function(){
	function setContentSize() {
		$('.swiper-content').css({
			height: $(window).height()-$('.swiper-nav').height()-42 // 50 = tamanho do header
		});
        
        $('.scroll-overflow').css({
			height: $(window).height()-$('.swiper-nav').height()-192 // 50 = tamanho do header
		});
        
	}
	setContentSize()
	$(window).resize(function(){
		setContentSize()
	})

	//Swiper Content
	var contentSwiper = $('.swiper-content').swiper({
		onSlideChangeStart: function(){
			updateNavPosition()
		}
	})
	//Nav
	var navSwiper = $('.swiper-nav').swiper({
		visibilityFullFit: true,
		slidesPerView:'auto',
		//Thumbnails Clicks
		onSlideClick: function(){
			contentSwiper.swipeTo( navSwiper.clickedSlideIndex )
		}
	})

	//Update Nav Position
	function updateNavPosition(){
		$('.swiper-nav .active-nav').removeClass('active-nav')
		var activeNav = $('.swiper-nav .swiper-slide').eq(contentSwiper.activeIndex).addClass('active-nav')
		if (!activeNav.hasClass('swiper-slide-visible')) {
			if (activeNav.index()>navSwiper.activeIndex) {
				var thumbsPerNav = Math.floor(navSwiper.width/activeNav.width())-1
				navSwiper.swipeTo(activeNav.index()-thumbsPerNav)
			}
			else {
				navSwiper.swipeTo(activeNav.index())
			}	
		}
	}
    
    var position = $('.scroll-overflow').scrollTop(); 
    
    $('.scroll-overflow').each(function(){
    
        $(this).scroll(function() {
            st = $(this).scrollTop();

            if(st > position){            
                $(this).parent('.inner').children('img').stop().css({
                    '-webkit-transform': 'translate(0px,-50px)',  
                    'opacity': '0.5',  
                    'transition': 'all 2s ease'
                });
            }else{
                $(this).parent('.inner').children('img').stop().css({
                    '-webkit-transform': 'translate(0px,0px)',  
                    'opacity': '1',  
                    'transition': 'all 2s ease'
                });
            }  

            position = st;
        });
        
    });
})
