$(function(){
    (function(){
        var $iLoading = $("#iLoading");
        var flagRoll = 1;
        var $wrapper = $("#show-wrapper");
        var $children = $wrapper.children();
        var len = $children.length;
        var range = 50;

        document.onreadystatechange = function () {
            if (document.readyState === "complete") {
                $iLoading.css({
                    "transition": "500ms",
                    "opacity":"0"
                });
                setTimeout(function(){
                    $iLoading.remove();
                },500);
                $children.eq(flagRoll-1).removeClass("iHide");
            }
        }
        

        
        var touchY, oldY, deltaY;
        var posY;
        var duration = $wrapper.css("transition-duration");
            $(window).on({
                mousewheel: function(e){
                    if(e.originalEvent.wheelDelta > 0) {
                        action = "up";
                    }
                    else{
                        action = "down";
                    }
                    roll($wrapper,action);
                },
                touchstart: function(e){
                    var e = e.originalEvent.touches;
                    oldY = e[0].clientY;
                    posY = $wrapper.css("transform").split(",")[5].slice(1,-1) - 0;
                    $wrapper.stop().css({
                        "transition-duration": "0s",
                        "transform":"translate3d(0,"+posY+"px,0)"
                    });
                },
                touchmove: function(e){
                    e.preventDefault();
                    var e = e.originalEvent.touches;
                    touchY = e[0].clientY;
                    deltaY = touchY - oldY;
                    $wrapper.stop().css({
                        "transition-duration": "0s",
                        "transform":"translate3d(0,"+(posY+deltaY)+"px,0)"
                    });
                },
                touchend: function(e){
                    var e = e.originalEvent.touches;
                    action = (deltaY > range) ? "up" :  ((deltaY < -range) ? "down" : "none")
                    // action =  (touchY>oldY)? "up":"down";
                    $wrapper.css({
                        "transition-duration": duration
                    });
                    roll($wrapper,action);
                }
            });
        var roll = function(target,action){
            flagRoll = rollFlag(flagRoll,action);
            scrollTo($wrapper,flagRoll);
        };
        var rollFlag = function(ele,action){
            switch (action) {
                case "up":
                    ele = (ele > 1) ? --ele : 1;
                    break;
                case "down":
                    ele = (ele < len) ? ++ele : ele;
                    break;
                case "none":
                    break;
            }
            return ele;
        };
        var scrollTo  = function(ele,flag){
            --flag;
            $wrapper.children().eq(flag).removeClass("off");
            ele.css({
                "transform": "translate3d(0,-"+flag+"00%,0)",
                "transition": "500ms"
            });
            // $children.addClass("iHide");
            $children.eq(flag).removeClass("iHide");
        }
    })();
});

    