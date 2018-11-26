var images = document.getElementsByClassName('imgcl');
var yuan = document.getElementsByTagName('font');
var pos = 0;

window.onload = function(){

    var len = images.length;
    var autoPlay = function(){
        yuan[pos].style.backgroundColor = 'white';
        images[pos].style.display = 'none';
        pos = (++pos == len) ? 0 : pos;
        images[pos].style.display = 'inline';
        yuan[pos].style.backgroundColor = 'red';
    }
    var start = setInterval(autoPlay,3000);
    $('#tab').mouseover(function(){
        clearInterval(start);
    });
    $('#tab').mouseout(function(){
        start = setInterval(autoPlay,3000);
    });
    $('font').mouseover(function(){
        clearInterval(start);
        yuan[pos].style.backgroundColor = 'white';
        images[pos].style.display = 'none';

        pos = $(this).index();
        images[pos].style.display = 'inline';
        yuan[pos].style.backgroundColor = 'red';
    });
};