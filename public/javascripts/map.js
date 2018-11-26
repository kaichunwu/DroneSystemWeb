$(function () {
    // getData();
    //
    setInterval(function () {
        getData();

    },15000);

});

function getData(){
    $.ajax({
        url: '/users/data',
        type: 'get',
        success: function(data){
            setDrones(data);
            setPoints(data);
        }
    });
}

function setDrones(data){
    var dtb = $('#drones');
    dtb.html('');
    var drones = data.drones;
    for(var d in drones){
        // console.log(d);
        dtb.append('<tr>'
            +'<td>'+drones[d].drone_id+'</td>'
            +'<td>'+drones[d].Speed+'</td>'
            +'<td>'+drones[d].Location+'</td>'
            +'</tr>');
    }
}

function setPoints(data){
    var psp = $('div.map#points');
    psp.html('');
    var points = data.points;
    for(var p in points){
        // console.log(p);
        psp.append('<span style="top:'+points[p].top+'px;left:'+points[p].left+'px"'+'>'+'.'+'</span>');
    }
}
var drones = [{
    ID : 1,
    Speed : 20,
    Location : '(300,300)'
},{
    ID : 2,
    Speed : 20,
    Location : '(300,300)'
},{
    ID : 3,
    Speed : 20,
    Location : '(300,300)'
}];
var points = [{
    top : 0,
    left : 0
},{
    top : 600,
    left : 1089
},{
    top : 300,
    left : 200
}];