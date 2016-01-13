/* Foundation v2.2 http://foundation.zurb.com */
(function(a){a("a[data-reveal-id]").live("click",function(c){c.preventDefault();var b=a(this).attr("data-reveal-id");a("#"+b).reveal(a(this).data())});a.fn.reveal=function(b){var c={animation:"fadeAndPop",animationSpeed:300,closeOnBackgroundClick:true,dismissModalClass:"close-reveal-modal",open:a.noop,opened:a.noop,close:a.noop,closed:a.noop};b=a.extend({},c,b);return this.each(function(){var m=a(this),g=parseInt(m.css("top"),10),i=m.height()+g,h=false,e=a(".reveal-modal-bg"),d;if(e.length===0){e=a('<div class="reveal-modal-bg" />').insertAfter(m);e.fadeTo("fast",0.8)}function j(){h=false}function n(){h=true}function k(){if(!h){n();if(b.animation==="fadeAndPop"){m.css({top:a(document).scrollTop()-i,opacity:0,visibility:"visible"});e.fadeIn(b.animationSpeed/2);m.delay(b.animationSpeed/2).animate({top:a(document).scrollTop()+g+"px",opacity:1},b.animationSpeed,function(){m.trigger("reveal:opened")})}if(b.animation==="fade"){m.css({opacity:0,visibility:"visible",top:a(document).scrollTop()+g});e.fadeIn(b.animationSpeed/2);m.delay(b.animationSpeed/2).animate({opacity:1},b.animationSpeed,function(){m.trigger("reveal:opened")})}if(b.animation==="none"){m.css({visibility:"visible",top:a(document).scrollTop()+g});e.css({display:"block"});m.trigger("reveal:opened")}}}m.bind("reveal:open.reveal",k);function f(){if(!h){n();if(b.animation==="fadeAndPop"){m.animate({top:a(document).scrollTop()-i+"px",opacity:0},b.animationSpeed/2,function(){m.css({top:g,opacity:1,visibility:"hidden"})});e.delay(b.animationSpeed).fadeOut(b.animationSpeed,function(){m.trigger("reveal:closed")})}if(b.animation==="fade"){m.animate({opacity:0},b.animationSpeed,function(){m.css({opacity:1,visibility:"hidden",top:g})});e.delay(b.animationSpeed).fadeOut(b.animationSpeed,function(){m.trigger("reveal:closed")})}if(b.animation==="none"){m.css({visibility:"hidden",top:g});e.css({display:"none"});m.trigger("reveal:closed")}}}function l(){m.unbind(".reveal");e.unbind(".reveal");a("."+b.dismissModalClass).unbind(".reveal");a("body").unbind(".reveal")}m.bind("reveal:close.reveal",f);m.bind("reveal:opened.reveal reveal:closed.reveal",j);m.bind("reveal:closed.reveal",l);m.bind("reveal:open.reveal",b.open);m.bind("reveal:opened.reveal",b.opened);m.bind("reveal:close.reveal",b.close);m.bind("reveal:closed.reveal",b.closed);m.trigger("reveal:open");d=a("."+b.dismissModalClass).bind("click.reveal",function(){m.trigger("reveal:close")});if(b.closeOnBackgroundClick){e.css({cursor:"pointer"});e.bind("click.reveal",function(){m.trigger("reveal:close")})}a("body").bind("keyup.reveal",function(o){if(o.which===27){m.trigger("reveal:close")}})})}}(jQuery));(function(b){b.fn.findFirstImage=function(){return this.first().find("img").andSelf().filter("img").first()};var a={defaults:{animation:"horizontal-push",animationSpeed:600,timer:true,advanceSpeed:4000,pauseOnHover:false,startClockOnMouseOut:false,startClockOnMouseOutAfter:1000,directionalNav:true,directionalNavRightText:"Right",directionalNavLeftText:"Left",captions:true,captionAnimation:"fade",captionAnimationSpeed:600,bullets:false,bulletThumbs:false,bulletThumbLocation:"",afterSlideChange:b.noop,fluid:true,centerBullets:true},activeSlide:0,numberSlides:0,orbitWidth:null,orbitHeight:null,locked:null,timerRunning:null,degrees:0,wrapperHTML:'<div class="orbit-wrapper" />',timerHTML:'<div class="timer"><span class="mask"><span class="rotator"></span></span><span class="pause"></span></div>',captionHTML:'<div class="orbit-caption"></div>',directionalNavHTML:'<div class="slider-nav"><span class="right"></span><span class="left"></span></div>',bulletHTML:'<ul class="orbit-bullets"></ul>',init:function(f,e){var c,g=0,d=this;this.clickTimer=b.proxy(this.clickTimer,this);this.addBullet=b.proxy(this.addBullet,this);this.resetAndUnlock=b.proxy(this.resetAndUnlock,this);this.stopClock=b.proxy(this.stopClock,this);this.startTimerAfterMouseLeave=b.proxy(this.startTimerAfterMouseLeave,this);this.clearClockMouseLeaveTimer=b.proxy(this.clearClockMouseLeaveTimer,this);this.rotateTimer=b.proxy(this.rotateTimer,this);this.options=b.extend({},this.defaults,e);if(this.options.timer==="false"){this.options.timer=false}if(this.options.captions==="false"){this.options.captions=false}if(this.options.directionalNav==="false"){this.options.directionalNav=false}this.$element=b(f);this.$wrapper=this.$element.wrap(this.wrapperHTML).parent();this.$slides=this.$element.children("img, a, div");this.$element.bind("orbit.next",function(){d.shift("next")});this.$element.bind("orbit.prev",function(){d.shift("prev")});this.$element.bind("orbit.goto",function(i,h){d.shift(h)});this.$element.bind("orbit.start",function(i,h){d.startClock()});this.$element.bind("orbit.stop",function(i,h){d.stopClock()});c=this.$slides.filter("img");if(c.length===0){this.loaded()}else{c.bind("imageready",function(){g+=1;if(g===c.length){d.loaded()}})}},loaded:function(){this.$element.addClass("orbit").css({width:"1px",height:"1px"});this.$slides.addClass("orbit-slide");this.setDimentionsFromLargestSlide();this.updateOptionsIfOnlyOneSlide();this.setupFirstSlide();if(this.options.timer){this.setupTimer();this.startClock()}if(this.options.captions){this.setupCaptions()}if(this.options.directionalNav){this.setupDirectionalNav()}if(this.options.bullets){this.setupBulletNav();this.setActiveBullet()}},currentSlide:function(){return this.$slides.eq(this.activeSlide)},setDimentionsFromLargestSlide:function(){var d=this,c;d.$element.add(d.$wrapper).width(this.$slides.first().width());d.$element.add(d.$wrapper).height(this.$slides.first().height());d.orbitWidth=this.$slides.first().width();d.orbitHeight=this.$slides.first().height();c=this.$slides.first().findFirstImage().clone();this.$slides.each(function(){var e=b(this),g=e.width(),f=e.height();if(g>d.$element.width()){d.$element.add(d.$wrapper).width(g);d.orbitWidth=d.$element.width()}if(f>d.$element.height()){d.$element.add(d.$wrapper).height(f);d.orbitHeight=d.$element.height();c=b(this).findFirstImage().clone()}d.numberSlides+=1});if(this.options.fluid){if(typeof this.options.fluid==="string"){c=b('<img src="http://placehold.it/'+this.options.fluid+'" />')}d.$element.prepend(c);c.addClass("fluid-placeholder");d.$element.add(d.$wrapper).css({width:"inherit"});d.$element.add(d.$wrapper).css({height:"inherit"});b(window).bind("resize",function(){d.orbitWidth=d.$element.width();d.orbitHeight=d.$element.height()})}},lock:function(){this.locked=true},unlock:function(){this.locked=false},updateOptionsIfOnlyOneSlide:function(){if(this.$slides.length===1){this.options.directionalNav=false;this.options.timer=false;this.options.bullets=false}},setupFirstSlide:function(){var c=this;this.$slides.first().css({"z-index":3}).fadeIn(function(){c.$slides.css({display:"block"})})},startClock:function(){var c=this;if(!this.options.timer){return false}if(this.$timer.is(":hidden")){this.clock=setInterval(function(){c.$element.trigger("orbit.next")},this.options.advanceSpeed)}else{this.timerRunning=true;this.$pause.removeClass("active");this.clock=setInterval(this.rotateTimer,this.options.advanceSpeed/180)}},rotateTimer:function(){var c="rotate("+this.degrees+"deg)";this.degrees+=2;this.$rotator.css({"-webkit-transform":c,"-moz-transform":c,"-o-transform":c});if(this.degrees>180){this.$rotator.addClass("move");this.$mask.addClass("move")}if(this.degrees>360){this.$rotator.removeClass("move");this.$mask.removeClass("move");this.degrees=0;this.$element.trigger("orbit.next")}},stopClock:function(){if(!this.options.timer){return false}else{this.timerRunning=false;clearInterval(this.clock);this.$pause.addClass("active")}},setupTimer:function(){this.$timer=b(this.timerHTML);this.$wrapper.append(this.$timer);this.$rotator=this.$timer.find(".rotator");this.$mask=this.$timer.find(".mask");this.$pause=this.$timer.find(".pause");this.$timer.click(this.clickTimer);if(this.options.startClockOnMouseOut){this.$wrapper.mouseleave(this.startTimerAfterMouseLeave);this.$wrapper.mouseenter(this.clearClockMouseLeaveTimer)}if(this.options.pauseOnHover){this.$wrapper.mouseenter(this.stopClock)}},startTimerAfterMouseLeave:function(){var c=this;this.outTimer=setTimeout(function(){if(!c.timerRunning){c.startClock()}},this.options.startClockOnMouseOutAfter)},clearClockMouseLeaveTimer:function(){clearTimeout(this.outTimer)},clickTimer:function(){if(!this.timerRunning){this.startClock()}else{this.stopClock()}},setupCaptions:function(){this.$caption=b(this.captionHTML);this.$wrapper.append(this.$caption);this.setCaption()},setCaption:function(){var d=this.currentSlide().attr("data-caption"),c;if(!this.options.captions){return false}if(d){c=b(d).html();this.$caption.attr("id",d).html(c);switch(this.options.captionAnimation){case"none":this.$caption.show();break;case"fade":this.$caption.fadeIn(this.options.captionAnimationSpeed);break;case"slideOpen":this.$caption.slideDown(this.options.captionAnimationSpeed);break}}else{switch(this.options.captionAnimation){case"none":this.$caption.hide();break;case"fade":this.$caption.fadeOut(this.options.captionAnimationSpeed);break;case"slideOpen":this.$caption.slideUp(this.options.captionAnimationSpeed);break}}},setupDirectionalNav:function(){var c=this,d=b(this.directionalNavHTML);d.find(".right").html(this.options.directionalNavRightText);d.find(".left").html(this.options.directionalNavLeftText);this.$wrapper.append(d);this.$wrapper.find(".left").click(function(){c.stopClock();c.$element.trigger("orbit.prev")});this.$wrapper.find(".right").click(function(){c.stopClock();c.$element.trigger("orbit.next")})},setupBulletNav:function(){this.$bullets=b(this.bulletHTML);this.$wrapper.append(this.$bullets);this.$slides.each(this.addBullet);this.$element.addClass("with-bullets");if(this.options.centerBullets){this.$bullets.css("margin-left",-this.$bullets.width()/2)}},addBullet:function(g,e){var d=g+1,h=b("<li>"+(d)+"</li>"),c,f=this;if(this.options.bulletThumbs){c=b(e).attr("data-thumb");if(c){h.addClass("has-thumb").css({background:"url("+this.options.bulletThumbLocation+c+") no-repeat"})}}this.$bullets.append(h);h.data("index",g);h.click(function(){f.stopClock();f.$element.trigger("orbit.goto",[h.data("index")])})},setActiveBullet:function(){if(!this.options.bullets){return false}else{this.$bullets.find("li").removeClass("active").eq(this.activeSlide).addClass("active")}},resetAndUnlock:function(){this.$slides.eq(this.prevActiveSlide).css({"z-index":1});this.unlock();this.options.afterSlideChange.call(this,this.$slides.eq(this.prevActiveSlide),this.$slides.eq(this.activeSlide))},shift:function(d){var c=d;this.prevActiveSlide=this.activeSlide;if(this.prevActiveSlide==c){return false}if(this.$slides.length=="1"){return false}if(!this.locked){this.lock();if(d=="next"){this.activeSlide++;if(this.activeSlide==this.numberSlides){this.activeSlide=0}}else{if(d=="prev"){this.activeSlide--;if(this.activeSlide<0){this.activeSlide=this.numberSlides-1}}else{this.activeSlide=d;if(this.prevActiveSlide<this.activeSlide){c="next"}else{if(this.prevActiveSlide>this.activeSlide){c="prev"}}}}this.setActiveBullet();this.$slides.eq(this.prevActiveSlide).css({"z-index":2});if(this.options.animation=="fade"){this.$slides.eq(this.activeSlide).css({opacity:0,"z-index":3}).animate({opacity:1},this.options.animationSpeed,this.resetAndUnlock)}if(this.options.animation=="horizontal-slide"){if(c=="next"){this.$slides.eq(this.activeSlide).css({left:this.orbitWidth,"z-index":3}).animate({left:0},this.options.animationSpeed,this.resetAndUnlock)}if(c=="prev"){this.$slides.eq(this.activeSlide).css({left:-this.orbitWidth,"z-index":3}).animate({left:0},this.options.animationSpeed,this.resetAndUnlock)}}if(this.options.animation=="vertical-slide"){if(c=="prev"){this.$slides.eq(this.activeSlide).css({top:this.orbitHeight,"z-index":3}).animate({top:0},this.options.animationSpeed,this.resetAndUnlock)}if(c=="next"){this.$slides.eq(this.activeSlide).css({top:-this.orbitHeight,"z-index":3}).animate({top:0},this.options.animationSpeed,this.resetAndUnlock)}}if(this.options.animation=="horizontal-push"){if(c=="next"){this.$slides.eq(this.activeSlide).css({left:this.orbitWidth,"z-index":3}).animate({left:0},this.options.animationSpeed,this.resetAndUnlock);this.$slides.eq(this.prevActiveSlide).animate({left:-this.orbitWidth},this.options.animationSpeed)}if(c=="prev"){this.$slides.eq(this.activeSlide).css({left:-this.orbitWidth,"z-index":3}).animate({left:0},this.options.animationSpeed,this.resetAndUnlock);this.$slides.eq(this.prevActiveSlide).animate({left:this.orbitWidth},this.options.animationSpeed)}}if(this.options.animation=="vertical-push"){if(c=="next"){this.$slides.eq(this.activeSlide).css({top:-this.orbitHeight,"z-index":3}).animate({top:0},this.options.animationSpeed,this.resetAndUnlock);this.$slides.eq(this.prevActiveSlide).animate({top:this.orbitHeight},this.options.animationSpeed)}if(c=="prev"){this.$slides.eq(this.activeSlide).css({top:this.orbitHeight,"z-index":3}).animate({top:0},this.options.animationSpeed,this.resetAndUnlock);this.$slides.eq(this.prevActiveSlide).animate({top:-this.orbitHeight},this.options.animationSpeed)}}this.setCaption()}}};b.fn.orbit=function(c){return this.each(function(){var d=b.extend({},a);d.init(this,c)})}})(jQuery);
/*!
 * jQuery imageready Plugin
 * http://www.zurb.com/playground/
 *
 * Copyright 2011, ZURB
 * Released under the MIT License
 */
(function(c){var b={};c.event.special.imageready={setup:function(f,e,d){b=f||b},add:function(d){var e=c(this),f;if(this.nodeType===1&&this.tagName.toLowerCase()==="img"&&this.src!==""){if(b.forceLoad){f=e.attr("src");e.attr("src","");a(this,d.handler);e.attr("src",f)}else{if(this.complete||this.readyState===4){d.handler.apply(this,arguments)}else{a(this,d.handler)}}}},teardown:function(d){c(this).unbind(".imageready")}};function a(d,f){var e=c(d);e.bind("load.imageready",function(){f.apply(d,arguments);e.unbind("load.imageready")})}}(jQuery));jQuery(document).ready(function(c){function b(d){c("form.custom input:"+d).each(function(){var f=c(this).hide(),e=f.next("span.custom."+d);if(e.length===0){e=c('<span class="custom '+d+'"></span>').insertAfter(f)}e.toggleClass("checked",f.is(":checked"));e.toggleClass("disabled",f.is(":disabled"))})}b("checkbox");b("radio");function a(f){var g=c(f),i=g.next("div.custom.dropdown"),d=g.find("option"),e=0,h;if(i.length===0){$customSelectSize="";if(c(f).hasClass("small")){$customSelectSize="small"}else{if(c(f).hasClass("medium")){$customSelectSize="medium"}else{if(c(f).hasClass("large")){$customSelectSize="large"}else{if(c(f).hasClass("expand")){$customSelectSize="expand"}}}}i=c('<div class="custom dropdown '+$customSelectSize+'"><a href="#" class="selector"></a><ul></ul></div>"');d.each(function(){h=c("<li>"+c(this).html()+"</li>");i.find("ul").append(h)});i.prepend('<a href="#" class="current">'+d.first().html()+"</a>");g.after(i);g.hide()}else{i.find("ul").html("");d.each(function(){h=c("<li>"+c(this).html()+"</li>");i.find("ul").append(h)})}i.toggleClass("disabled",g.is(":disabled"));d.each(function(j){if(this.selected){i.find("li").eq(j).addClass("selected");i.find(".current").html(c(this).html())}});i.find("li").each(function(){i.addClass("open");if(c(this).outerWidth()>e){e=c(this).outerWidth()}i.removeClass("open")});if(!i.is(".small, .medium, .large, .expand")){i.css("width",e+18+"px");i.find("ul").css("width",e+16+"px")}}c("form.custom select").each(function(){a(this)})});(function(c){function b(e){var f=0,g=e.next();$options=e.find("option");g.find("ul").html("");$options.each(function(){$li=c("<li>"+c(this).html()+"</li>");g.find("ul").append($li)});$options.each(function(h){if(this.selected){g.find("li").eq(h).addClass("selected");g.find(".current").html(c(this).html())}});g.removeAttr("style").find("ul").removeAttr("style");g.find("li").each(function(){g.addClass("open");if(c(this).outerWidth()>f){f=c(this).outerWidth()}g.removeClass("open")});g.css("width",f+18+"px");g.find("ul").css("width",f+16+"px")}function a(e){var g=e.prev(),f=g[0];if(false==g.is(":disabled")){f.checked=((f.checked)?false:true);e.toggleClass("checked");g.trigger("change")}}function d(e){var g=e.prev(),f=g[0];c('input:radio[name="'+g.attr("name")+'"]').each(function(){c(this).next().removeClass("checked")});f.checked=((f.checked)?false:true);e.toggleClass("checked");g.trigger("change")}c("form.custom span.custom.checkbox").live("click",function(e){e.preventDefault();e.stopPropagation();a(c(this))});c("form.custom span.custom.radio").live("click",function(e){e.preventDefault();e.stopPropagation();d(c(this))});c("form.custom select").live("change",function(e){b(c(this))});c("form.custom label").live("click",function(f){var e=c("#"+c(this).attr("for")),h,g;if(e.length!==0){if(e.attr("type")==="checkbox"){f.preventDefault();h=c(this).find("span.custom.checkbox");a(h)}else{if(e.attr("type")==="radio"){f.preventDefault();g=c(this).find("span.custom.radio");d(g)}}}});c("form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector").live("click",function(f){var h=c(this),g=h.closest("div.custom.dropdown"),e=g.prev();f.preventDefault();if(false==e.is(":disabled")){g.toggleClass("open");if(g.hasClass("open")){c(document).bind("click.customdropdown",function(i){g.removeClass("open");c(document).unbind(".customdropdown")})}else{c(document).unbind(".customdropdown")}}});c("form.custom div.custom.dropdown li").live("click",function(h){var i=c(this),f=i.closest("div.custom.dropdown"),g=f.prev(),e=0;h.preventDefault();h.stopPropagation();i.closest("ul").find("li").removeClass("selected");i.addClass("selected");f.removeClass("open").find("a.current").html(i.html());i.closest("ul").find("li").each(function(j){if(i[0]==this){e=j}});g[0].selectedIndex=e;g.trigger("change")})})(jQuery);
/*! http://mths.be/placeholder v1.8.7 by @mathias */
(function(o,m,r){var t="placeholder" in m.createElement("input"),q="placeholder" in m.createElement("textarea"),l=r.fn,k;if(t&&q){k=l.placeholder=function(){return this};k.input=k.textarea=true}else{k=l.placeholder=function(){return this.filter((t?"textarea":":input")+"[placeholder]").not(".placeholder").bind("focus.placeholder",s).bind("blur.placeholder",p).trigger("blur.placeholder").end()};k.input=t;k.textarea=q;r(function(){r(m).delegate("form","submit.placeholder",function(){var a=r(".placeholder",this).each(s);setTimeout(function(){a.each(p)},10)})});r(o).bind("unload.placeholder",function(){r(".placeholder").val("")})}function n(b){var c={},a=/^jQuery\d+$/;r.each(b.attributes,function(d,e){if(e.specified&&!a.test(e.name)){c[e.name]=e.value}});return c}function s(){var a=r(this);if(a.val()===a.attr("placeholder")&&a.hasClass("placeholder")){if(a.data("placeholder-password")){a.hide().next().show().focus().attr("id",a.removeAttr("id").data("placeholder-id"))}else{a.val("").removeClass("placeholder")}}}function p(){var d,e=r(this),c=e,a=this.id;if(e.val()===""){if(e.is(":password")){if(!e.data("placeholder-textinput")){try{d=e.clone().attr({type:"text"})}catch(b){d=r("<input>").attr(r.extend(n(this),{type:"text"}))}d.removeAttr("name").data("placeholder-password",true).data("placeholder-id",a).bind("focus.placeholder",s);e.data("placeholder-textinput",d).data("placeholder-id",a).before(d)}e=e.removeAttr("id").hide().prev().attr("id",a).show()}e.addClass("placeholder").val(e.attr("placeholder"))}else{e.removeClass("placeholder")}}}(this,document,jQuery));(function(c){var b={bodyHeight:0,pollInterval:1000};var a={init:function(d){return this.each(function(){var f=c(".has-tip"),e=c(".tooltip"),g=function(j,i){return'<span data-id="'+j+'" class="tooltip">'+i+'<span class="nub"></span></span>'},h=setInterval(a.isDomResized,b.pollInterval);if(e.length<1){f.each(function(k){var n=c(this),o="foundationTooltip"+k,l=n.attr("title"),j=n.attr("class");n.data("id",o);var m=c(g(o,l));m.addClass(j).removeClass("has-tip").appendTo("body");if(Modernizr.touch){m.append('<span class="tap-to-close">tap to close </span>')}a.reposition(n,m,j);m.fadeOut(150)})}c(window).resize(function(){var i=c(".tooltip");i.each(function(){var j=c(this).data();target=f=c(".has-tip"),tip=c(this),classes=tip.attr("class");f.each(function(){(c(this).data().id==j.id)?target=c(this):target=target});a.reposition(target,tip,classes)})});if(Modernizr.touch){c(".tooltip").live("click touchstart touchend",function(i){i.preventDefault();c(this).fadeOut(150)});f.live("click touchstart touchend",function(i){i.preventDefault();c(".tooltip").hide();c("span[data-id="+c(this).data("id")+"].tooltip").fadeIn(150);f.attr("title","")})}else{f.hover(function(){c("span[data-id="+c(this).data("id")+"].tooltip").fadeIn(150);f.attr("title","")},function(){c("span[data-id="+c(this).data("id")+"].tooltip").fadeOut(150)})}})},reposition:function(g,k,e){var d=g.data("width"),l=k.children(".nub"),h=l.outerHeight(),f=l.outerWidth();function j(o,r,p,n,q){o.css({top:r,bottom:n,left:q,right:p})}k.css({top:(g.offset().top+g.outerHeight()+10),left:g.offset().left,width:d});j(l,-h,"auto","auto",10);if(c(window).width()<767){var m=g.parents(".row");k.width(m.outerWidth()-20).css("left",m.offset().left).addClass("tip-override");j(l,-h,"auto","auto",g.offset().left)}else{if(e.indexOf("tip-top")>-1){var i=g.offset().top-k.outerHeight()-h;k.css({top:i,left:g.offset().left,width:d}).removeClass("tip-override");j(l,"auto","auto",-h,"auto")}else{if(e.indexOf("tip-left")>-1){k.css({top:g.offset().top-(g.outerHeight()/2)-(h/2),left:g.offset().left-k.outerWidth()-10,width:d}).removeClass("tip-override");j(l,(k.outerHeight()/2)-(h/2),-h,"auto","auto")}else{if(e.indexOf("tip-right")>-1){k.css({top:g.offset().top-(g.outerHeight()/2)-(h/2),left:g.offset().left+g.outerWidth()+10,width:d}).removeClass("tip-override");j(l,(k.outerHeight()/2)-(h/2),"auto","auto",-h)}}}}},isDomResized:function(){$body=c("body");if(b.bodyHeight!=$body.height()){b.bodyHeight=$body.height();c(window).trigger("resize")}}};c.fn.tooltips=function(d){if(a[d]){return a[d].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof d==="object"||!d){return a.init.apply(this,arguments)}else{c.error("Method "+d+" does not exist on jQuery.tooltips")}}}})(jQuery);



/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 *
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 * That said, it is hardly a one-person project. Many people have submitted bugs, code, and offered their advice freely. Their support is greatly appreciated.
 *
 * Version: 1.3.4 (11/11/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(a){var b,c,d,e,f,g,h,i,j,k,l=0,m={},n=[],o=0,p={},q=[],r=null,s=new Image,t=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,u=/[^\.]\.(swf)\s*$/i,v,w=1,x=0,y="",z,A,B=false,C=a.extend(a("<div/>")[0],{prop:0}),D=a.browser.msie&&a.browser.version<7&&!window.XMLHttpRequest,E=function(){c.hide();s.onerror=s.onload=null;if(r){r.abort()}b.empty()},F=function(){if(false===m.onError(n,l,m)){c.hide();B=false;return}m.titleShow=false;m.width="auto";m.height="auto";b.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');H()},G=function(){var d=n[l],e,f,h,i,j,k;E();m=a.extend({},a.fn.fancybox.defaults,typeof a(d).data("fancybox")=="undefined"?m:a(d).data("fancybox"));k=m.onStart(n,l,m);if(k===false){B=false;return}else if(typeof k=="object"){m=a.extend(m,k)}h=m.title||(d.nodeName?a(d).attr("title"):d.title)||"";if(d.nodeName&&!m.orig){m.orig=a(d).children("img:first").length?a(d).children("img:first"):a(d)}if(h===""&&m.orig&&m.titleFromAlt){h=m.orig.attr("alt")}e=m.href||(d.nodeName?a(d).attr("href"):d.href)||null;if(/^(?:javascript)/i.test(e)||e=="#"){e=null}if(m.type){f=m.type;if(!e){e=m.content}}else if(m.content){f="html"}else if(e){if(e.match(t)){f="image"}else if(e.match(u)){f="swf"}else if(a(d).hasClass("iframe")){f="iframe"}else if(e.indexOf("#")===0){f="inline"}else{f="ajax"}}if(!f){F();return}if(f=="inline"){d=e.substr(e.indexOf("#"));f=a(d).length>0?"inline":"ajax"}m.type=f;m.href=e;m.title=h;if(m.autoDimensions){if(m.type=="html"||m.type=="inline"||m.type=="ajax"){m.width="auto";m.height="auto"}else{m.autoDimensions=false}}if(m.modal){m.overlayShow=true;m.hideOnOverlayClick=false;m.hideOnContentClick=false;m.enableEscapeButton=false;m.showCloseButton=false}m.padding=parseInt(m.padding,10);m.margin=parseInt(m.margin,10);b.css("padding",m.padding+m.margin);a(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){a(this).replaceWith(g.children())});switch(f){case"html":b.html(m.content);H();break;case"inline":if(a(d).parent().is("#fancybox-content")===true){B=false;return}a('<div class="fancybox-inline-tmp" />').hide().insertBefore(a(d)).bind("fancybox-cleanup",function(){a(this).replaceWith(g.children())}).bind("fancybox-cancel",function(){a(this).replaceWith(b.children())});a(d).appendTo(b);H();break;case"image":B=false;a.fancybox.showActivity();s=new Image;s.onerror=function(){F()};s.onload=function(){B=true;s.onerror=s.onload=null;I()};s.src=e;break;case"swf":m.scrolling="no";i='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+m.width+'" height="'+m.height+'"><param name="movie" value="'+e+'"></param>';j="";a.each(m.swf,function(a,b){i+='<param name="'+a+'" value="'+b+'"></param>';j+=" "+a+'="'+b+'"'});i+='<embed src="'+e+'" type="application/x-shockwave-flash" width="'+m.width+'" height="'+m.height+'"'+j+"></embed></object>";b.html(i);H();break;case"ajax":B=false;a.fancybox.showActivity();m.ajax.win=m.ajax.success;r=a.ajax(a.extend({},m.ajax,{url:e,data:m.ajax.data||{},error:function(a,b,c){if(a.status>0){F()}},success:function(a,d,f){var g=typeof f=="object"?f:r;if(g.status==200){if(typeof m.ajax.win=="function"){k=m.ajax.win(e,a,d,f);if(k===false){c.hide();return}else if(typeof k=="string"||typeof k=="object"){a=k}}b.html(a);H()}}}));break;case"iframe":J();break}},H=function(){var c=m.width,d=m.height;if(c.toString().indexOf("%")>-1){c=parseInt((a(window).width()-m.margin*2)*parseFloat(c)/100,10)+"px"}else{c=c=="auto"?"auto":c+"px"}if(d.toString().indexOf("%")>-1){d=parseInt((a(window).height()-m.margin*2)*parseFloat(d)/100,10)+"px"}else{d=d=="auto"?"auto":d+"px"}b.wrapInner('<div style="width:'+c+";height:"+d+";overflow: "+(m.scrolling=="auto"?"auto":m.scrolling=="yes"?"scroll":"hidden")+';position:relative;"></div>');m.width=b.width();m.height=b.height();J()},I=function(){m.width=s.width;m.height=s.height;a("<img />").attr({id:"fancybox-img",src:s.src,alt:m.title}).appendTo(b);J()},J=function(){var f,r;c.hide();if(e.is(":visible")&&false===p.onCleanup(q,o,p)){a.event.trigger("fancybox-cancel");B=false;return}B=true;a(g.add(d)).unbind();a(window).unbind("resize.fb scroll.fb");a(document).unbind("keydown.fb");if(e.is(":visible")&&p.titlePosition!=="outside"){e.css("height",e.height())}q=n;o=l;p=m;if(p.overlayShow){d.css({"background-color":p.overlayColor,opacity:p.overlayOpacity,cursor:p.hideOnOverlayClick?"pointer":"auto",height:a(document).height()});if(!d.is(":visible")){if(D){a("select:not(#fancybox-tmp select)").filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one("fancybox-cleanup",function(){this.style.visibility="inherit"})}d.show()}}else{d.hide()}A=R();L();if(e.is(":visible")){a(h.add(j).add(k)).hide();f=e.position(),z={top:f.top,left:f.left,width:e.width(),height:e.height()};r=z.width==A.width&&z.height==A.height;g.fadeTo(p.changeFade,.3,function(){var c=function(){g.html(b.contents()).fadeTo(p.changeFade,1,N)};a.event.trigger("fancybox-change");g.empty().removeAttr("filter").css({"border-width":p.padding,width:A.width-p.padding*2,height:m.autoDimensions?"auto":A.height-x-p.padding*2});if(r){c()}else{C.prop=0;a(C).animate({prop:1},{duration:p.changeSpeed,easing:p.easingChange,step:P,complete:c})}});return}e.removeAttr("style");g.css("border-width",p.padding);if(p.transitionIn=="elastic"){z=T();g.html(b.contents());e.show();if(p.opacity){A.opacity=0}C.prop=0;a(C).animate({prop:1},{duration:p.speedIn,easing:p.easingIn,step:P,complete:N});return}if(p.titlePosition=="inside"&&x>0){i.show()}g.css({width:A.width-p.padding*2,height:m.autoDimensions?"auto":A.height-x-p.padding*2}).html(b.contents());e.css(A).fadeIn(p.transitionIn=="none"?0:p.speedIn,N)},K=function(a){if(a&&a.length){if(p.titlePosition=="float"){return'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">'+a+'</td><td id="fancybox-title-float-right"></td></tr></table>'}return'<div id="fancybox-title-'+p.titlePosition+'">'+a+"</div>"}return false},L=function(){y=p.title||"";x=0;i.empty().removeAttr("style").removeClass();if(p.titleShow===false){i.hide();return}y=a.isFunction(p.titleFormat)?p.titleFormat(y,q,o,p):K(y);if(!y||y===""){i.hide();return}i.addClass("fancybox-title-"+p.titlePosition).html(y).appendTo("body").show();switch(p.titlePosition){case"inside":i.css({width:A.width-p.padding*2,marginLeft:p.padding,marginRight:p.padding});x=i.outerHeight(true);i.appendTo(f);A.height+=x;break;case"over":i.css({marginLeft:p.padding,width:A.width-p.padding*2,bottom:p.padding}).appendTo(f);break;case"float":i.css("left",parseInt((i.width()-A.width-40)/2,10)*-1).appendTo(e);break;default:i.css({width:A.width-p.padding*2,paddingLeft:p.padding,paddingRight:p.padding}).appendTo(e);break}i.hide()},M=function(){if(p.enableEscapeButton||p.enableKeyboardNav){a(document).bind("keydown.fb",function(b){if(b.keyCode==27&&p.enableEscapeButton){b.preventDefault();a.fancybox.close()}else if((b.keyCode==37||b.keyCode==39)&&p.enableKeyboardNav&&b.target.tagName!=="INPUT"&&b.target.tagName!=="TEXTAREA"&&b.target.tagName!=="SELECT"){b.preventDefault();a.fancybox[b.keyCode==37?"prev":"next"]()}})}if(!p.showNavArrows){j.hide();k.hide();return}if(p.cyclic&&q.length>1||o!==0){j.show()}if(p.cyclic&&q.length>1||o!=q.length-1){k.show()}},N=function(){if(!a.support.opacity){g.get(0).style.removeAttribute("filter");e.get(0).style.removeAttribute("filter")}if(m.autoDimensions){g.css("height","auto")}e.css("height","auto");if(y&&y.length){i.show()}if(p.showCloseButton){h.show()}M();if(p.hideOnContentClick){g.bind("click",a.fancybox.close)}if(p.hideOnOverlayClick){d.bind("click",a.fancybox.close)}a(window).bind("resize.fb",a.fancybox.resize);if(p.centerOnScroll){a(window).bind("scroll.fb",a.fancybox.center)}if(p.type=="iframe"){a('<iframe id="fancybox-frame" name="fancybox-frame'+(new Date).getTime()+'" frameborder="0" hspace="0" '+(a.browser.msie?'allowtransparency="true""':"")+' scrolling="'+m.scrolling+'" src="'+p.href+'"></iframe>').appendTo(g)}e.show();B=false;a.fancybox.center();p.onComplete(q,o,p);O()},O=function(){var a,b;if(q.length-1>o){a=q[o+1].href;if(typeof a!=="undefined"&&a.match(t)){b=new Image;b.src=a}}if(o>0){a=q[o-1].href;if(typeof a!=="undefined"&&a.match(t)){b=new Image;b.src=a}}},P=function(a){var b={width:parseInt(z.width+(A.width-z.width)*a,10),height:parseInt(z.height+(A.height-z.height)*a,10),top:parseInt(z.top+(A.top-z.top)*a,10),left:parseInt(z.left+(A.left-z.left)*a,10)};if(typeof A.opacity!=="undefined"){b.opacity=a<.5?.5:a}e.css(b);g.css({width:b.width-p.padding*2,height:b.height-x*a-p.padding*2})},Q=function(){return[a(window).width()-p.margin*2,a(window).height()-p.margin*2,a(document).scrollLeft()+p.margin,a(document).scrollTop()+p.margin]},R=function(){var a=Q(),b={},c=p.autoScale,d=p.padding*2,e;if(p.width.toString().indexOf("%")>-1){b.width=parseInt(a[0]*parseFloat(p.width)/100,10)}else{b.width=p.width+d}if(p.height.toString().indexOf("%")>-1){b.height=parseInt(a[1]*parseFloat(p.height)/100,10)}else{b.height=p.height+d}if(c&&(b.width>a[0]||b.height>a[1])){if(m.type=="image"||m.type=="swf"){e=p.width/p.height;if(b.width>a[0]){b.width=a[0];b.height=parseInt((b.width-d)/e+d,10)}if(b.height>a[1]){b.height=a[1];b.width=parseInt((b.height-d)*e+d,10)}}else{b.width=Math.min(b.width,a[0]);b.height=Math.min(b.height,a[1])}}b.top=parseInt(Math.max(a[3]-20,a[3]+(a[1]-b.height-40)*.5),10);b.left=parseInt(Math.max(a[2]-20,a[2]+(a[0]-b.width-40)*.5),10);return b},S=function(a){var b=a.offset();b.top+=parseInt(a.css("paddingTop"),10)||0;b.left+=parseInt(a.css("paddingLeft"),10)||0;b.top+=parseInt(a.css("border-top-width"),10)||0;b.left+=parseInt(a.css("border-left-width"),10)||0;b.width=a.width();b.height=a.height();return b},T=function(){var b=m.orig?a(m.orig):false,c={},d,e;if(b&&b.length){d=S(b);c={width:d.width+p.padding*2,height:d.height+p.padding*2,top:d.top-p.padding-20,left:d.left-p.padding-20}}else{e=Q();c={width:p.padding*2,height:p.padding*2,top:parseInt(e[3]+e[1]*.5,10),left:parseInt(e[2]+e[0]*.5,10)}}return c},U=function(){if(!c.is(":visible")){clearInterval(v);return}a("div",c).css("top",w*-40+"px");w=(w+1)%12};a.fn.fancybox=function(b){if(!a(this).length){return this}a(this).data("fancybox",a.extend({},b,a.metadata?a(this).metadata():{})).unbind("click.fb").bind("click.fb",function(b){b.preventDefault();if(B){return}B=true;a(this).blur();n=[];l=0;var c=a(this).attr("rel")||"";if(!c||c==""||c==="nofollow"){n.push(this)}else{n=a("a[rel="+c+"], area[rel="+c+"]");l=n.index(this)}G();return});return this};a.fancybox=function(b){var c;if(B){return}B=true;c=typeof arguments[1]!=="undefined"?arguments[1]:{};n=[];l=parseInt(c.index,10)||0;if(a.isArray(b)){for(var d=0,e=b.length;d<e;d++){if(typeof b[d]=="object"){a(b[d]).data("fancybox",a.extend({},c,b[d]))}else{b[d]=a({}).data("fancybox",a.extend({content:b[d]},c))}}n=jQuery.merge(n,b)}else{if(typeof b=="object"){a(b).data("fancybox",a.extend({},c,b))}else{b=a({}).data("fancybox",a.extend({content:b},c))}n.push(b)}if(l>n.length||l<0){l=0}G()};a.fancybox.showActivity=function(){clearInterval(v);c.show();v=setInterval(U,66)};a.fancybox.hideActivity=function(){c.hide()};a.fancybox.next=function(){return a.fancybox.pos(o+1)};a.fancybox.prev=function(){return a.fancybox.pos(o-1)};a.fancybox.pos=function(a){if(B){return}a=parseInt(a);n=q;if(a>-1&&a<q.length){l=a;G()}else if(p.cyclic&&q.length>1){l=a>=q.length?0:q.length-1;G()}return};a.fancybox.cancel=function(){if(B){return}B=true;a.event.trigger("fancybox-cancel");E();m.onCancel(n,l,m);B=false};a.fancybox.close=function(){function b(){d.fadeOut("fast");i.empty().hide();e.hide();a.event.trigger("fancybox-cleanup");g.empty();p.onClosed(q,o,p);q=m=[];o=l=0;p=m={};B=false}if(B||e.is(":hidden")){return}B=true;if(p&&false===p.onCleanup(q,o,p)){B=false;return}E();a(h.add(j).add(k)).hide();a(g.add(d)).unbind();a(window).unbind("resize.fb scroll.fb");a(document).unbind("keydown.fb");g.find("iframe").attr("src",D&&/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank");if(p.titlePosition!=="inside"){i.empty()}e.stop();if(p.transitionOut=="elastic"){z=T();var c=e.position();A={top:c.top,left:c.left,width:e.width(),height:e.height()};if(p.opacity){A.opacity=1}i.empty().hide();C.prop=1;a(C).animate({prop:0},{duration:p.speedOut,easing:p.easingOut,step:P,complete:b})}else{e.fadeOut(p.transitionOut=="none"?0:p.speedOut,b)}};a.fancybox.resize=function(){if(d.is(":visible")){d.css("height",a(document).height())}a.fancybox.center(true)};a.fancybox.center=function(){var a,b;if(B){return}b=arguments[0]===true?1:0;a=Q();if(!b&&(e.width()>a[0]||e.height()>a[1])){return}e.stop().animate({top:parseInt(Math.max(a[3]-20,a[3]+(a[1]-g.height()-40)*.5-p.padding)),left:parseInt(Math.max(a[2]-20,a[2]+(a[0]-g.width()-40)*.5-p.padding))},typeof arguments[0]=="number"?arguments[0]:200)};a.fancybox.init=function(){if(a("#fancybox-wrap").length){return}a("body").append(b=a('<div id="fancybox-tmp"></div>'),c=a('<div id="fancybox-loading"><div></div></div>'),d=a('<div id="fancybox-overlay"></div>'),e=a('<div id="fancybox-wrap"></div>'));f=a('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(e);f.append(g=a('<div id="fancybox-content"></div>'),h=a('<a id="fancybox-close"></a>'),i=a('<div id="fancybox-title"></div>'),j=a('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),k=a('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));h.click(a.fancybox.close);c.click(a.fancybox.cancel);j.click(function(b){b.preventDefault();a.fancybox.prev()});k.click(function(b){b.preventDefault();a.fancybox.next()});if(a.fn.mousewheel){e.bind("mousewheel.fb",function(b,c){if(B){b.preventDefault()}else if(a(b.target).get(0).clientHeight==0||a(b.target).get(0).scrollHeight===a(b.target).get(0).clientHeight){b.preventDefault();a.fancybox[c>0?"prev":"next"]()}})}if(!a.support.opacity){e.addClass("fancybox-ie")}if(D){c.addClass("fancybox-ie6");e.addClass("fancybox-ie6");a('<iframe id="fancybox-hide-sel-frame" src="'+(/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank")+'" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(f)}};a.fn.fancybox.defaults={padding:10,margin:40,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:.7,overlayColor:"#777",titleShow:true,titlePosition:"float",titleFormat:null,titleFromAlt:false,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,enableKeyboardNav:true,onStart:function(){},onCancel:function(){},onComplete:function(){},onCleanup:function(){},onClosed:function(){},onError:function(){}};a(document).ready(function(){a.fancybox.init()})})(jQuery)