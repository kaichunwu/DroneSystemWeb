var map;
var markers = [];
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.3530642, lng: -71.0812632},
        zoom: 16.1,
        mapTypeId: 'terrain'
    });
}

$(function () {
    setInterval(function () {
        for(var index in markers){
            markers[index].setMap(null);
        }
        var icon = {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: 'red',
            fillOpacity: .9,
            scale: Math.pow(2, 3) / 2,
            strokeColor: 'red',
            strokeWeight: .5};
        $.ajax({
            url: '/users/data',
            type: 'GET',
            success: function(data){
                setDrones(data);
                setWeather(data);
                setTasks(data);
                var points = data.points;
                // console.log(points);
                for(var p in points){
                    // console.log(points[p].lat+' '+points[p].lng);
                    // psp.append('<span style="top:'+points[p].top+'px;left:'+points[p].left+'px"'+'>'+'.'+'</span>');
                    var latLng = new google.maps.LatLng(points[p].latitude,points[p].longitude);
                    var color = icongen(points[p].drone_id);
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            fillColor: color,
                            fillOpacity: .9,
                            scale: Math.pow(2, 3) * points[p].height / 1000,
                            strokeColor: color,
                            strokeWeight: .5
                        }
                    });
                    markers.push(marker);
                }
            }
        });
    },2000);
});
function setDrones(data){
    var dtb = $('#drones');
    dtb.html('');
    var drones = data.drones;
    for(var d in drones){
        // console.log(d);
        dtb.append('<tr>'
            +'<td>'+drones[d].drone_id+'</td>'
            +'<td>'+drones[d].task_id+'</td>'
            +'<td>'+drones[d].height+'</td>'
            +'<td>'+drones[d].speed_horizontal+'</td>'
            +'<td>'+drones[d].speed_vertical+'</td>'
            +'<td>'+drones[d].direction+'</td>'
            +'</tr>');
    }
}
function setWeather(data){
    var wdv = $('#weather');
    wdv.html('');
    var wea = data.weather;
    for(var w in wea){
        wdv.append('<p>'+wea[w].name+'</p>');
        wdv.append('<img src="'
            +wea[w].address+'" width=200px height=150px />');
    }
}
function setTasks(data) {
    var task = $('#tasks>tbody');
    task.html('');
    var tsks = data.task;
    for(var t in tsks){
        task.append('<tr>' +
            '<td>'+ tsks[t].task_id +'</td>' +
            '<td>'+ tsks[t].drone_id +'</td>' +
            '<td>'+ tsks[t].task_datetime +'</td>' +
            '<td>'+ tsks[t].cargo_id +'</td>' +
            '<td>'+ tsks[t].ongoing +'</td>' +
            '<td>'+ tsks[t].task_notes +'</td>' +
            '</tr>');
    }
}
function icongen(drone_id) {
    // switch (height) {
    //     case 200: return 'yellow';
    //     case 250: return 'green';
    //     case 300: return '#1a73e8';
    //     case 350: return 'orange';
    //     case 400: return 'red';
    //     default: return 'black';
    // }
    var r = Math.floor(drone_id*1000%256);
    var g = Math.floor(drone_id*2000%256);
    var b = Math.floor(drone_id*3000%256);
    return "rgb("+r+','+g+','+b+")";
}