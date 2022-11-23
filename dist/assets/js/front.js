document.addEventListener("DOMContentLoaded", function() {
  commonInit();
  commonEvent();
});
$(function(){
  dimLayerControl();
});
window.addEventListener("load", function() {});

function commonInit() {
  let touchstart = "ontouchstart" in window;
  let userAgent = navigator.userAgent.toLowerCase();
  if (touchstart) {
    browserAdd("touchmode");
  }
  if (userAgent.indexOf('samsung') > -1) {
    browserAdd("samsung");
  }

  if (navigator.platform.indexOf('Win') > -1 || navigator.platform.indexOf('win') > -1) {
    browserAdd("window");
  }

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    // iPad or iPhone
    browserAdd("ios");
  }


  function browserAdd(opt) {
    document.querySelector("html").classList.add(opt);
  }
}

function commonEvent() {
  const btn_mobile_menu_call = document.querySelector(".btn_mobile_menu_call");
  const btn_mobile_search_call = document.querySelector(".btn_mobile_search_call");
  const header_gnb_row = document.querySelector(".header_gnb_row");
  const header_search_zone = document.querySelector(".header_search_zone");
  const btn_gnb_close = document.querySelector(".btn_gnb_close");
  const btn_gotop = document.querySelector(".btn_gotop");

  function resizeCommon(){
    let windowWidth = 0;
    window.addEventListener("resize", () => {
      if (windowWidth === window.innerWidth) {
        return;
      }
      mobileResize();
      windowWidth = window.innerWidth;
    });
  }

  function eventFunc(){
    if(btn_gotop !== null){
      btn_gotop.addEventListener("click",(e)=>{
        e.preventDefault();
        setTimeout(()=>{
          window.scrollTo(0,0);
        },30);
      });
    }
  }

  function mobileMenuEvent(){
    // if(window.innerWidth > 1023){return;}
    if(btn_mobile_menu_call !== null){
      btn_mobile_menu_call.addEventListener("click",(e)=>{
        e.preventDefault();
        header_gnb_row.classList.toggle("active");
        searchClose();
      });
    }
    if(header_gnb_row !== null){
      header_gnb_row.addEventListener("click",(e)=>{
        e.preventDefault();
        if(e.target.closest(".header_pix") !== null){return;}
        header_gnb_row.classList.remove("active");
      });
    }
    if(btn_gnb_close !== null){
      btn_gnb_close.addEventListener("click",(e)=>{
        e.preventDefault();

        header_gnb_row.classList.remove("active");
      });
    }
    if(btn_mobile_search_call !== null){
    
      btn_mobile_search_call.addEventListener("click",(e)=>{
        e.preventDefault();
        let thisEventObj = e.currentTarget;
        thisEventObj.classList.toggle("close");
        header_search_zone.classList.toggle("active");
        if(header_gnb_row !== null){
          header_gnb_row.classList.remove("active");
        }
      });
    }
    if(header_search_zone !== null){
      header_search_zone.addEventListener("click",(e)=>{
        e.preventDefault();
        if(e.target.closest(".header_search_wrap") !== null){return;}
        searchClose();
      });
    }
  }
  function mobileResize(){
      if(window.innerWidth > 1023){
        if(header_gnb_row !== null){
          header_gnb_row.classList.remove("active");
        }
        searchClose();
      }
  }

  function searchClose(){
    if(header_search_zone !== null){
      header_search_zone.classList.remove("active");
      btn_mobile_search_call.classList.remove("close");
    }
  }

  resizeCommon();
  mobileMenuEvent();
  eventFunc();
}


function subTab(){
  const subtab = document.querySelectorAll(".subtab");
  subtab.forEach((element)=>{
      element.addEventListener("click",(e)=>{
        e.preventDefault();
        let this_event_obj = e.currentTarget;
        let this_target = this_event_obj.getAttribute("href");
        let this_target_dom = document.querySelector(this_target);
        let this_event_obj_parent = this_event_obj.closest("li");
        let li_si = siblings(this_event_obj_parent);
        let cont_si = siblings(this_target_dom);

        li_si.forEach((element)=>{
          element.classList.remove("active");
        });
        this_event_obj_parent.classList.add("active");


        cont_si.forEach((element)=>{
          element.classList.remove("active");
        });
        this_target_dom.classList.add("active");

      });


  });
}


function siblings(t) {
    var children = t.parentElement.children;
    var tempArr = [];

    for (var i = 0; i < children.length; i++) {
        tempArr.push(children[i]);
    }

    return tempArr.filter(function(e){
        return e != t;
    });
}



function menuRock(item){
	const itemObj = document.querySelector(item);

	if(itemObj !== undefined){
		itemObj.classList.add("active");
	}
}




 
/* layer popup event */
function dimLayerControl(){
	var touchIs = "ontouchstart" in window,
		$modal = $(".dimlayer_z");
	if($modal.length===0){return;}
	
	var readywidth = $(window).width();
	
	var objThis = this;
	$modal.on("click",".btn_layerclose,.closetrigger,.fullpop_dim",function(e){
		var $this = $(this),
			$t_p = $this.parents(".dimlayer_z");
		e.preventDefault();
		objThis.dimLayerHide({ 
			target : $t_p,
			closeCallback : function(){
				
			}
		});
	});
};
/* layer popup show */
function dimLayerShow(option){
	var $callbtn = null,
		touchIs = "ontouchstart" in window,
		$modal = null,
		$target = null,
		transis = "TransitionEvent" in window,
		$t_box = null,
		$t_td = null,
		$page_wrap = null,
		$fullpop_item = null,
		$fullpop_titlow = null,
		$fullpop_contlow = null,
		$page_wrap = null,
		$t_tpt = 0,
		$t_tpb = 0,
		$res_value = 0;
	
	$(function(){
		$modal = $(".dimlayer_z");
		
		$target = $(option.target);
		$page_wrap = $(".page_wrap");
		
		
		if($modal.length===0){return;}
		$modal.removeClass("active");
		$target.addClass("active");
		setTimeout(function(){
			$target.addClass("motion");
		},30);

		
		$page_wrap.css({"z-index":0});
		$page_wrap.append($target);
		heightcheck();

		
		if ($target.hasClass("fulltype")) {
			$fullpop_titlow = $target.find(".fullpop_titlow");
			$fullpop_contlow = $target.find(".fullpop_contlow");
			$fullpop_item = $target.find(".fullpop_item");
		}

		if("openCallback" in option){
			option.openCallback();
		}
		function fullContHeight(){
			if ($target.hasClass("fulltype")) {
				$fullpop_titlow = $target.find(".fullpop_titlow");
				$fullpop_contlow = $target.find(".fullpop_contlow");
				$fullpop_item = $target.find(".fullpop_item");
				if ($fullpop_titlow.length) {
					$fullpop_contlow.css({height : ""});
					if ($(window).width() > 1023) {
						$res_value = 60;
					} else {
						$res_value = 40;
					}
					$fullpop_contlow.css({
						height: $fullpop_item.outerHeight() - $fullpop_titlow.outerHeight() - $res_value
					});
				}
			}
		}
		function heightcheck(){
			if(touchIs){
				$("body").data("data-scr",$(window).scrollTop()).css({"margin-top":-$(window).scrollTop()}).append($target);
				$("html").addClass("touchDis");
			}
		}
		// var $windowWid = 0;
		// $(window).on("resize", function () {
		// 	if ($windowWid == $(window).width() && touchIs) {
		// 		return;
		// 	}
		// 	$windowWid = $(window).width();
		// });
	});
};
/* layer popup hide */
function dimLayerHide(option){
	var $callbtn = null,
		touchIs = "ontouchstart" in window,
		$modal = null,
		$target = null,
		transis = "TransitionEvent" in window,
		$t_box = null,
		$t_box_duration = 0;
		
	$(function(){
		$modal = $(".dimlayer_z");
		
		$target = $(option.target);
		$t_box = $target.find(".layer_box");
		$t_td = $target.find(".dimlayer_td");
		$t_tpt = parseInt($t_td.css("padding-top"));
		$t_tpb = parseInt($t_td.css("padding-bottom"));
		
		if($modal.length===0){return;}
		$target.removeClass("motion");
		setTimeout(function(){
			$target.removeClass("active");
			$(".page_wrap").css({"z-index":""});
			$("html,body").removeClass("touchDis touchDis2");
			scrollEnd();
			if("closeCallback" in option){
				option.closeCallback();
			}
		},530);
		
		
		function scrollEnd(){
			if(touchIs){
				$("body").css({"margin-top":0});
				window.scrollTo(0,Number($("body").data("data-scr")));
			}
		}
	});
}
