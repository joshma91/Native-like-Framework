angular.module("nlFramework",[]).factory("$nlFramework",["$nlConfig","$nlDrawer","$nlBurger","$nlRefresh","$nlToast","$nlMenu","$nlFab","$nlHelpers","$nlElements",function(e,n,t,o,i,r,s,a,l){var d={init:function(c){d.set(c),l.body=document.body,c.burger&&t.init(),document.body.insertAdjacentHTML("beforeend",'<div id="nlDimm"></div>'),l.drawerDimm=document.getElementById("nlDimm"),l.drawerDimmH=new Hammer(l.drawerDimm),c.refresh&&o.init(),c.drawer&&(document.body.insertAdjacentHTML("beforeend",'<div id="nlSwipe"></div>'),n.init(c.drawer)),c.toast&&(document.body.insertAdjacentHTML("beforeend",'<div id="nlToast"></div>'),i.init()),c.secMenu&&r.init(),c.actionButton&&s.init(),c.content.modify&&(l.viewContent=document.getElementById("nlContent"),l.viewContentH=new Hammer(l.viewContent),l.viewContent.style["margin-top"]=e.options.content.topBarHeight+"px",l.viewContent.style["min-height"]=e.deviceH-e.options.content.topBarHeight+"px",l.viewContent.style.width=e.deviceW+"px"),window.onresize=function(t){e.deviceW=Math.max(document.documentElement.clientWidth,window.innerWidth||0),e.deviceH=Math.max(document.documentElement.clientHeight,window.innerHeight||0),c.content.modify&&(l.viewContent.style.width=e.deviceW+"px",l.viewContent.style["min-height"]=e.deviceH-e.options.content.topBarHeight+"px"),c.drawer&&(n.openned?a.translate(l.drawer,0,"",0,"",0,"",e.maxWidth):a.translate(l.drawer,e.maxWidth,"-",0,"",0,"",e.maxWidth))}},drawer:n,burger:t,refresh:o,toast:i,menu:r,config:e,fab:s,set:function(n){var t=e.options;e.options=a.merge(t,n),console.log(e.options)}};return d}]).factory("$nlElements",function(){var e={};return e}).factory("$nlConfig",function(){return{openned:!1,plusActive:!1,holdPos:null,reverse:!1,scroll:{},nlRefresh:{},options:{speed:.2,animation:"ease",actionButton:!1,toast:!1,secMenu:!1,burger:{endY:6,startScale:1,endScale:.7},content:{topBarHeight:0,modify:!1},drawer:{maxWidth:300,openCb:function(){console.log("nlDrawer: openned")},closeCb:function(){console.log("nlDrawer closed")}},refresh:{defaultColor:"#aa3344",activeColor:"#558844",callback:function(){$nlRefresh.syncEnd()}}}}}).factory("$nlHelpers",function(){return{translate:function(e,n,t,o,i,r,s,a,l,d,c){var n=n||0,o=o||0,t=t||"",i=i||"",s=s||"",a=a||!1,u=e;l="nlRefresh"===u.id?l?"scale3d("+l+","+l+",1)":"scale3d(1,1,1)":l?"scale3d("+l+",1,1)":"","burger-top"===u.id?u.style.transformOrigin="100% 100%":"burger-bottom"===u.id&&(u.style.transformOrigin="100% 0%"),u.style.transform="translate3d("+t+n+"px, "+i+o+"px, 0) rotate3d( 0, 0, 1, "+s+r+"deg ) "+l,u.style.webkitTransform="translate("+t+n+"px, "+i+o+"px) translateZ(0) rotate("+s+r+"deg) "+l,a&&(u.style.width=a+"px"),c&&(u.style.opacity=c),a&&(u.style["max-width"]=a+"px"),d&&(u.style.msTransform=u.style.MozTransform=u.style.OTransform="translateX("+t+n+"px) translateY("+i+o+"px) rotate("+s+r+"deg)")},merge:function(e,n){var t={};for(var o in e)t[o]=e[o];for(var o in n)t[o]=n[o];return t}}}).factory("$nlBurger",["$nlConfig","$nlHelpers","$nlElements",function(e,n,t){var o={animate:function(o){var i=e.maxWidth,r=i-Math.abs(o),s=Math.floor(100/i*r);if(s>0){var a=e.options.burger.startScale-Math.abs((1-e.options.burger.endScale)/100*s).toFixed(2),l=Math.floor(.45*s);console.log(e.options.burger.endY);var d=Math.floor(e.options.burger.endY/100*s);d=d<e.options.burger.endY?d:e.options.burger.endY;var c=Math.floor(1.8*s);e.options.reverse&&(c=180+(180-c)),t.burger.style.transition="none",t.burgerTop.style.transition="none",t.burgerBottom.style.transition="none",n.translate(t.burger,0,"",0,"",c,"",""),n.translate(t.burgerTop,0,"",d,"",l,"","",a),n.translate(t.burgerBottom,0,"",d,"-",l,"-","",a)}},toggle:function(n){t.burger.style.transition="all "+e.options.speed+"s "+e.options.animation,t.burgerTop.style.transition="all "+e.options.speed+"s "+e.options.animation,t.burgerBottom.style.transition="all "+e.options.speed+"s "+e.options.animation,n||n&&!o.isOn?o.setOn():o.setOff()},toggleEnd:function(){setTimeout(function(){t.burger.style.transition="none",t.burgerTop.style.transition="none",t.burgerBottom.style.transition="none",o.isOn?e.options.reverse=!0:(n.translate(t.burger,0,"",0,"-",0,""),e.options.reverse=!1)},1e3*e.options.speed)},setOn:function(){n.translate(t.burgerTop,0,"",e.options.burger.endY,"",45,"","",e.options.burger.endScale),n.translate(t.burgerBottom,0,"",e.options.burger.endY,"-",45,"-","",e.options.burger.endScale),n.translate(t.burger,0,"",0,"-",180,""),o.isOn=!0,o.toggleEnd()},setOff:function(){n.translate(t.burgerTop,0,"",0,"",0,"","",e.options.burger.startScale),n.translate(t.burgerBottom,0,"",0,"",0,"","",e.options.burger.startScale),e.options.reverse?n.translate(t.burger,0,"",0,"-",360,""):n.translate(t.burger,0,"",0,"-",0,""),o.isOn=!1,o.toggleEnd()},init:function(){var n='<div id="nlBurger"><div id="burger-top"></div><div id="burger-center"></div><div id="burger-bottom"></div></div>';null===document.getElementById("nlBurger")&&document.body.insertAdjacentHTML("beforeend",n),t.burger=document.getElementById("nlBurger"),t.burgerH=new Hammer(t.burger),t.burgerTop=document.getElementById("burger-top"),t.burgerBottom=document.getElementById("burger-bottom"),"object"!=typeof e.options.drawer&&t.burgerH.on("tap",function(e){o.toggle()})}};return o}]).factory("$nlDrawer",["$nlConfig","$nlBurger","$nlHelpers","$nlElements","$nlFab",function(e,n,t,o,i){var r={init:function(n){n.openCb&&(r.on.show=n.openCb),n.closeCb&&(r.on.hide=n.closeCb),e.options=t.merge(e.options,n),o.body=document.body,o.bodyH=new Hammer(o.body),o.swipe=document.getElementById("nlSwipe"),o.swipeH=new Hammer(o.swipe),o.drawer=document.getElementById("nlDrawer"),o.drawerH=new Hammer(o.drawer),o.drawerDimm=document.getElementById("nlDimm"),o.drawerDimmH=new Hammer(o.drawerDimm),e.deviceW=Math.max(document.documentElement.clientWidth,window.innerWidth||0),e.deviceH=Math.max(document.documentElement.clientHeight,window.innerHeight||0),e.maxWidth=e.options.drawer.maxWidth>e.deviceW-56?e.deviceW-56:e.options.drawer.maxWidth,t.translate(o.drawer,e.maxWidth,"-",0,"",0,"",e.maxWidth),o.drawerH.on("panleft panright",function(e){r.openned&&r.move(e,!0)}),o.drawerDimmH.on("panleft panright",function(e){r.openned&&r.move(e)}),o.swipeH.on("panleft panright",function(e){r.move(e)}),o.drawerH.on("tap",function(e){r.hide()}),o.drawerDimmH.on("tap",function(e){r.hide()}),e.options.burger&&o.burgerH.on("tap",function(e){o.burger.hasAttribute("ng-click")||r.toggle()}),r.touchEnd(o.swipe),r.touchEnd(o.drawer),r.touchEnd(o.drawerDimm)},on:{show:function(){},hide:function(){}},show:function(){o.drawer.style.transition="all "+e.options.speed+"s "+e.options.animation,e.maxWidth=e.options.drawer.maxWidth>e.deviceW-56?e.deviceW-56:e.options.drawer.maxWidth,t.translate(o.drawer,0,"",0,"",0,"",e.maxWidth),o.drawerDimm.style.transition="all "+e.options.speed+"s "+e.options.animation,o.drawerDimm.style.visibility="visible",o.drawerDimm.style.opacity="1",r.openned=!0,e.options.reverse=!0,e.options.burger&&n.toggle(!0),setTimeout(function(){r.on.show()},1e3*e.options.speed)},hide:function(){o.drawer.style.transition="all "+e.options.speed+"s "+e.options.animation,t.translate(o.drawer,e.maxWidth,"-",0,"",0,""),o.drawerDimm.style.transition="all "+e.options.speed+"s "+e.options.animation,o.drawerDimm.style.visibility="hidden",o.drawerDimm.style.opacity="0",(r.openned||e.options.burger)&&n.toggle(!1),i.toggle(!0),r.openned=!1,setTimeout(function(){r.on.hide()},1e3*e.options.speed)},toggle:function(){r.openned?r.hide():r.show()},move:function(i,s){e.options.direction="panleft"===i.type?"left":"right";var a=i.center.x-e.maxWidth;s&&(e.options.holdPos=e.options.holdPos?e.options.holdPos:a,a+=Math.abs(e.options.holdPos)),a=0>a?a:0;var l=e.options.drawer.maxWidth-Math.abs(a),d=(l/(e.options.drawer.maxWidth/100)/100).toFixed(2);d=1>d?d:1,n.animate(a),o.drawerDimm.style.transition="none",o.drawerDimm.style.visibility="visible",o.drawerDimm.style.opacity=d,o.drawer.style.transition="none",e.maxWidth=e.options.drawer.maxWidth>e.deviceW-56?e.deviceW-56:e.options.drawer.maxWidth,t.translate(o.drawer,a,"",0,"",0,"",e.maxWidth),i.isFinal?("left"===e.options.direction?r.hide():"right"===e.options.direction?r.show():r.onEnd(i,!1),e.options.holdPos=null,e.options.endTrue=!1):e.options.endTrue=!0},touchEnd:function(n){e.onTouch="ontouchstart"in window?!0:!1,e.onTouch?n.addEventListener("touchend",function(e){r.onEnd(e,!0)},!1):n.addEventListener("mouseup",function(e){r.onEnd(e,!1)},!1)},onEnd:function(n,t){var o=t?n.changedTouches[0]:n,i=o.clientX>e.options.drawer.maxWidth/2,s="left"===e.options.direction,a="right"===e.options.direction,l=e.options.endTrue;i&&s&&l||i&&a&&l?r.show():(!i&&s&&l||!i&&a&&l)&&r.hide(),e.options.direction=!1,e.options.endTrue=!1,e.options.holdPos=null,n.preventDefault()}};return r}]).factory("$nlRefresh",["$nlConfig","$nlHelpers","$nlElements",function(e,n,t){var o={init:function(){e.onTouch="ontouchstart"in window?!0:!1,document.body.insertAdjacentHTML("afterbegin",'<div id="nlRefresh"><svg version="1.1" id="reload-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 342.5 342.5" style="enable-background:new 0 0 342.5 342.5;" xml:space="preserve"><path d="M254.37,22.255c-1.161-0.642-2.53-0.795-3.803-0.428c-1.274,0.367-2.35,1.226-2.992,2.387l-21.758,39.391c-1.335,2.417-0.458,5.459,1.96,6.794C264.616,90.748,287.5,129.495,287.5,171.52c0,63.649-51.782,115.431-115.431,115.431S56.638,235.169,56.638,171.52c0-23.888,7.557-47.427,21.382-66.897l34.478,34.478c1.338,1.337,3.315,1.806,5.109,1.21c1.795-0.596,3.101-2.152,3.374-4.024L139.963,6.271c0.228-1.563-0.295-3.141-1.412-4.258c-1.117-1.117-2.7-1.639-4.258-1.412L4.278,19.584c-1.872,0.273-3.428,1.579-4.023,3.374c-0.596,1.795-0.127,3.772,1.21,5.109l37.292,37.292C14.788,95.484,1.638,133,1.638,171.52c0,93.976,76.455,170.431,170.431,170.431c93.976,0,170.431-76.455,170.431-170.431C342.5,109.478,308.731,52.283,254.37,22.255z"/></svg></div>'),t.topbar=document.getElementById("nlTopbar"),t.topbarH=new Hammer(t.topbar),t.refEl=document.getElementById("nlRefresh"),t.refIcon=document.getElementById("reload-icon"),t.refIcon.style.transition="all "+e.options.speed+"s "+e.options.animation,e.syncTrue=!1,e.scroll.top=0,e.center=e.deviceW/2-t.refEl.offsetWidth/2,t.topbarH.on("pan",function(e){o.move(e)}),o.touchEnd(t.body)},move:function(o){if(e.center=e.deviceW/2-t.refEl.offsetWidth/2,!e.syncing){t.refEl.style.transition="none";var i=Math.floor(e.deviceH/2),r=100/e.deviceH*o.center.y;if(o.center.y<i){e.syncTrue=!1;var s=r/2*(i/100),a=2*r*.005,l=.36*(i/100*o.center.y);t.refIcon.style.transition="none",t.refIcon.style.fill=e.options.refresh.defaultColor,n.translate(t.refIcon,"","","","","","","","","",a),n.translate(t.refEl,e.center,"",s,"",l)}else{t.refIcon.style.transition="fill "+4*e.options.speed+"s "+e.options.animation,e.syncTrue=!0;var r=i/100*(o.center.y-i),d=100/e.deviceH*o.center.y,c=100/(e.deviceH/2)*(o.center.y-i),s=d/2*(i/100);s-=s/100*c/3.5;var l=.36*(i/100*o.center.y);t.refIcon.style.fill=e.options.refresh.activeColor,n.translate(t.refIcon,"","","","","","","","","","1"),n.translate(t.refEl,e.center,"",s,"",l)}}},touchEnd:function(i){e.onTouch?i.addEventListener("touchend",function(e){r(e,!0)},!1):i.addEventListener("mouseup",function(e){r(e,!1)},!1);var r=function(i,r){var s=Math.floor(e.deviceH/2),a=r?i.changedTouches[0]:i;setTimeout(function(){if(t.refEl.style.transition="all "+e.options.speed/2+"s "+e.options.animation,a.clientY>s&&e.syncTrue&&!e.syncing){e.syncTrue=!1,e.syncing=!0,e.nlRefresh.ended=!1,o.callback();var i=0,r=0,l=.36*(s/100*(a.clientY-s))+360;e.nlRefresh.minY=e.options.content.topBarHeight+e.options.content.topBarHeight/3,n.translate(t.refEl,e.center,"",e.nlRefresh.minY,"",l,""),setTimeout(function(){t.refEl.style.transition="all "+e.options.speed/2+"s linear";var o=setInterval(function(){if(e.nlRefresh.ended)clearInterval(o);else{var s=l+r;n.translate(t.refEl,e.center,"",e.nlRefresh.minY,"",s,""),i+=.1,r+=6+i}},25)},1e3*e.options.speed)}else t.refEl.style.transition="all "+e.options.speed+"s "+e.options.animation,n.translate(t.refEl,e.center,"",0,"",0,""),e.syncTrue=!1,e.syncing=!1},50)}},callback:function(){setTimeout(function(){e.syncEndTrue()},2500)},syncEnd:function(){e.nlRefresh.ended=!0,setTimeout(function(){t.refEl.style.transition="all "+e.options.speed/2+"s "+e.options.animation,n.translate(t.refEl,e.center,"",e.nlRefresh.minY,"",0,"","","1.2")},100),setTimeout(function(){n.translate(t.refEl,e.center,"",e.nlRefresh.minY,"",0,"","","0")},200),setTimeout(function(){n.translate(t.refEl,e.center,"",0,"",0,"","","0")},300),e.syncTrue=!1,e.syncing=!1}};return o}]).factory("$nlToast",["$nlConfig","$nlHelpers","$nlElements",function(e,n,t){var o={init:function(i){e.options=n.merge(e.options,i),t.toast=document.getElementById("nlToast"),t.toastH=new Hammer(t.toast),t.toastH.on("panleft panright",function(e){o.move(e)}),o.touchEnd(t.toast)},show:function(i){var r=i.title||"I'm a Toast! Yummy!",s=i.position||null,a=i.trueCallback,l=i.falseCallback,d=i.timeout;e.runnigTimeout&&clearTimeout(e.runnigTimeout),"top"===s?(t.toast.style.top="75px",t.toast.style.bottom="auto"):(t.toast.style.top="",t.toast.style.bottom="1rem"),"function"==typeof a?o.trueCb=a:o.trueCb=function(){},"function"==typeof l?o.falseCb=l:o.falseCb=function(){},r&&(t.toast.innerHTML=r),"top"===s?(t.toast.style.transition="none",n.translate(t.toast,0,"",e.deviceH,"-",0,"")):(t.toast.style.transition="none",n.translate(t.toast,0,"",e.deviceH,"",0,"")),setTimeout(function(){t.toast.style.transition="all "+e.options.speed/2+"s "+e.options.animation,n.translate(t.toast,0,"",0,"",0,"")},100),d&&(e.runnigTimeout=setTimeout(function(){o.hide(!0)},d))},center:function(){t.toast.style.transition="all "+e.options.speed/2+"s "+e.options.animation,n.translate(t.toast,0,"",0,"",0,"")},right:function(){o.trueCb(),t.toast.style.transition="all "+e.options.speed/2+"s "+e.options.animation,n.translate(t.toast,e.deviceW,"",0,"",0,""),setTimeout(function(){o.hide()},e.options.speed/2*1e3)},left:function(){o.falseCb(),t.toast.style.transition="all "+e.options.speed/2+"s "+e.options.animation,n.translate(t.toast,e.deviceW,"-",0,"",0,""),setTimeout(function(){o.hide()},e.options.speed/2*1e3)},hide:function(o){o?t.toast.style.transition="all "+e.options.speed+"s "+e.options.animation:t.toast.style.transition="none",setTimeout(function(){n.translate(t.toast,0,"",e.deviceH,"",0,"")},100)},move:function(i){t.toast.style.transition="none",o.direction="panleft"===i.type?"left":"right";var r=i.center.x-e.deviceW;o.holdPos=o.holdPos?o.holdPos:r,r+=Math.abs(o.holdPos),n.translate(t.toast,r,"",0,"",0),i.isFinal?("left"===o.direction?o.left():o.right(),o.holdPos=null,o.endTrue=!1):o.endTrue=!0},touchEnd:function(n){e.onTouch="ontouchstart"in window?!0:!1,e.onTouch?n.addEventListener("touchend",function(e){t(e,!0)},!1):n.addEventListener("mouseup",function(e){t(e,!1)},!1);var t=function(n,t){var i=t?n.changedTouches[0]:n,r=(i.clientX>e.deviceW/2,"left"===o.direction,"right"===o.direction,o.endTrue);r&&o.center(),o.direction=!1,o.endTrue=!1,o.holdPos=null,n.preventDefault()}},trueCb:function(){console.log("True Callback")},falseCb:function(){console.log("False Callback")}};return o}]).factory("$nlMenu",["$nlConfig","$nlHelpers","$nlElements",function(e,n,t){var o={openned:!1,init:function(){t.menu=document.getElementById("nlMenu"),t.menu.insertAdjacentHTML("afterbegin",'<div id="nlIcon"><div id="dot-top"></div><div id="dot-center"></div><div id="dot-bottom"></div></div>'),t.menuContent=document.getElementById("nlMenuContent"),t.menuContentH=new Hammer(t.menuContent),t.menuIcon=document.getElementById("nlIcon"),t.menuIconH=new Hammer(t.menuIcon),t.bodyH.on("tap",function(e){o.openned&&o.hide()}),t.menuIconH.on("tap",function(e){o.show()})},show:function(){t.menuContent.style.visibility="visible",t.menuContent.style.opacity="1",n.translate(t.menuContent,0,"",0,"",0),setTimeout(function(){o.openned=!0},50)},hide:function(){t.menuContent.style.visibility="hidden",t.menuContent.style.opacity="0",n.translate(t.menuContent,0,"",0,"",0),o.openned=!1}};return o}]).factory("$nlFab",["$nlConfig","$nlHelpers","$nlElements",function(e,n,t){var o={openned:!1,init:function(){t.actionPanel=document.getElementById("nlActionButton"),t.actionPanelH=new Hammer(t.actionPanel),t.actionPlus=document.getElementById("nlPlus"),t.actionPlusH=new Hammer(t.actionPlus),t.actionPanelH.on("tap",function(e){t.actionPlus.hasAttribute("ng-click")||o.toggle()})},toggle:function(n){e.options.actionButton&&(t.drawerDimm.style.transition="all "+e.options.speed+"s "+e.options.animation,o.active||n?(o.active=!1,t.burger.style["z-index"]="1106",t.drawerDimm.style.visibility="hidden",t.drawerDimm.style.opacity="0",t.actionPlus.style["z-index"]="1104",t.actionPanel.classList.remove("active")):(o.active=!0,t.burger.style["z-index"]="1104",t.actionPlus.style["z-index"]="1106",t.actionPanel.classList.add("active"),setTimeout(function(){t.drawerDimm.style.visibility="visible",t.drawerDimm.style.opacity="1"},100)))}};return o}]);