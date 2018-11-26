var express = require('express');
var router = express.Router();

/* signup index */
router.get('/',function (req,res) {
    if(req.session.user){
        res.redirect('/');
    }else{
        res.render('signup',{title: 'Create An Account Here'});
    }
})

var fs = require('fs');
var multer = require('multer');


var createdir = function(filedir){
    try{
        fs.accessSync(filedir);
    }catch(e){
        fs.mkdirSync(filedir);
    }
};

var uploaddir = './public/uploadfile/';

createdir(uploaddir);

var storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,uploaddir);
    },
    filename: function (req,file,cb) {
        // cb(null,file.fieldname + '-' +Date.now() + '-' + file.originalname);
        var orignalname = file.originalname;
        var suffix = orignalname.substring(orignalname.lastIndexOf('.'),orignalname.length);
        cb(null,file.fieldname + '-' +Date.now() + suffix);
    }
});

var upload = multer({ storage: storage});


router.post('/photo',upload.single('file') ,function (req,res,next) {
    var file = req.file;
    var type = file.mimetype;
    // console.log('Type: %s',type);
    // console.log('Path: %s',file.path);
    if(type.indexOf('image') > -1){
        res.send(file.path.replace('public/',''));
    }else {
        res.redirect('/signup');
    }
})

router.post('/test',function (req,res) {
    console.log(req.body);
    res.render('signup',{title: 'Signup here'});
})

var acl = require('../conf/acl');
var pool = require('../conf/mysql');
router.post('/submit',function (req,res) {
    var psw = getMD5Password(req.body.password);
    console.log(psw);
    var usr = {
        username: req.body.username,
        password: psw,
        role: req.body.role,
        company: req.body.company,
        purl: req.body.purl
    };
    pool.getConnection(function (err,connection) {
        var userAdd = 'INSERT INTO user(username,password,company_id,role,purl) VALUES(?,?,?,?,?)';
        var userAdd_Params = [usr.username,usr.password,usr.company,usr.role,usr.purl];
        connection.query(userAdd,userAdd_Params,function (err,result) {
            if (err) {
                throw err;
                res.render('error');
            } else {
                console.log('User Saved');
                acl.addUserRoles(usr.username, usr.role);
                res.render('logout', {title: 'User Saved'});
            }
        });
    })
})

var crypto = require('crypto');
function getMD5Password(orgi){
    var md5 = crypto.createHash('md5');
    md5.update(orgi);
    var d = md5.digest('hex');
    return d;
}

module.exports = {
    router: router,
    pswecd: getMD5Password
};