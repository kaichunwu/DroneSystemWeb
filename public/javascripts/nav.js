function opt(){
    if(document.getElementById("text").style.display=="none"){
        document.getElementById("text").style.display="block";}
    else{document.getElementById("text").style.display="none";}
}
$(function(){
    $("body").click(function(e){
        var divTop = $("div.dropdown");
        if(!divTop.is(e.target)&&divTop.has(e.target).length===0){
            document.getElementById("text").style.display="none";
        }
    });
    $(".nav-link").mouseover(function(){
        $(this).attr("style","color:black;");
    });
    $(".nav-link").mouseout(function(){
        $(this).attr("style","color:white;");
    });
    $(".nav-link").click(function(){
        $(this).attr("style","color:black;");
    });
    var nav = $(".navbar");
    var win = $(window);
    var sc = $(document);
    var css = {
        'position': 'fixed',
        'top': '0px',
        'left': '0px',
        'width': '100%',
        'z-index': 999
    };
    var div = $("<div style='padding: 1px 1px;'><p>&ensp;</p></div>");
    win.scroll(function(){
        if(sc.scrollTop()>=0){
            div.insertBefore(nav);
            nav.css(css);
        }else{
            div.remove();
            nav.attr("style","background-color: #1a73e8;");
        }
    });
});