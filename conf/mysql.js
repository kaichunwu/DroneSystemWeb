var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     port: '3306',
//     user: 'root',
//     password: 'password',
//     database: 'test'
// });
// connection.connect();
//
// connection.query('select * from users',function(error, results, fields){
//     if(error) throw error;
//     // console.log(results);
// });
//
// var userrole = 'select u.username as username,password,authority as role from users u left join authorities a on a.username = u.username';
//
// connection.query(userrole,function(error, results, fields){
//     if(error) throw error;
//     // console.log(results);
// });

var pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'test',
    connectionLimit: 100
});

var acl = require('./acl');
pool.query('select * from user',function(error, results, fields){
    if(error) throw error;
    console.log(results);
    for(var i in results){
        acl.addUserRoles(results[i].username,results[i].role);
    }
});

module.exports = pool;