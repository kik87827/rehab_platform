document.addEventListener("DOMContentLoaded", function() {
  commonInit();
  commonEvent();
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

  function mobileMenuEvent(){
    // if(window.innerWidth > 1023){return;}
    btn_mobile_menu_call.addEventListener("click",(e)=>{
      e.preventDefault();
      header_gnb_row.classList.toggle("active");
      searchClose();
    });
    header_gnb_row.addEventListener("click",(e)=>{
      e.preventDefault();
      if(e.target.closest(".header_pix") !== null){return;}
      header_gnb_row.classList.remove("active");
    });
    btn_gnb_close.addEventListener("click",(e)=>{
      e.preventDefault();

      header_gnb_row.classList.remove("active");
    });
    btn_mobile_search_call.addEventListener("click",(e)=>{
      e.preventDefault();
      let thisEventObj = e.currentTarget;
      thisEventObj.classList.toggle("close");
      header_search_zone.classList.toggle("active");
      if(header_gnb_row !== null){
        header_gnb_row.classList.remove("active");
      }
    });
    header_search_zone.addEventListener("click",(e)=>{
      e.preventDefault();
      if(e.target.closest(".header_search_wrap") !== null){return;}
      searchClose();
    });
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