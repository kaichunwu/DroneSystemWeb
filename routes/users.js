var express = require('express');
var router = express.Router();

var pool = require('../conf/mysql');

var dposition;
pool.query('select lng, lat from intersection',function(error, results, fields){
    if(error) throw error;
    dposition = results;
});
var drone;
pool.query('select * from drones',function(error, results, fields){
    if(error) throw error;
    drone = results;
});

var row = (sql,param) => {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if(err){
                reject(err);
                return;
            }
            connection.query(sql,param,function (err, res) {
                connection.release();
                if(err){
                    reject(err);
                    return;
                }
                resolve(res);
            })
        })
    })
};

// var index = 1;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('map',{user: req.session.user});
});

router.get('/data', function(req, res, next) {

    var drones = [{
        ID: 1,
        Speed: 20,
        lng: -71,
        lat: 42,
        height: 200,
        company_id: 1
    }];
    var company_id = req.session.user.company;
    // pool.query('select * from drones where company_id = ?',[company_id],function(error, results, fields){
    //     if(error) throw error;
    //     // console.log(results);
    //     drones = results;
    //     var data = {
    //         drones: drones,
    //         points: drones,
    //         weather: weather
    //     };
    //     res.send(data);
    // });

    var sql = 'select * from drones where company_id = ?';
    (async () => {
        let task = await row('select * from tasks where company_id = ?',company_id);
        drones = await row(sql,company_id);
        let data = {
            drones: drones,
            points: drones,
            weather: weather,
            task: task
        };
        res.send(data);
    })();

    var weather = [{
        name : 'humidity',
        address : '/uploadfile/map.png'
    },{
        name : 'temperature',
        address : '/uploadfile/map.png'
    },{
        name: 'windspeed',
        address: '/uploadfile/map.png'
    }];
    // console.log(drones);
    // if(index<7) index++;
});


module.exports = router;
