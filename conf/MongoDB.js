var mongoose = require('mongoose');
mongoose.connect('mongodb://user:password1@ds011251.mlab.com:11251/dbtest',{useNewUrlParser: true},function (err) {
    if(err) console.log(err);
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    id:ObjectId,
    username:String,
    password:String,
    role:String,
    birthdate:Date
});
const UserModel = mongoose.model('User',User);

var acl = require('./acl');
UserModel.find({},function (err,docs) {
    if(err) throw err;
    for(var i in docs){
        acl.addUserRoles(docs[i].username,docs[i].role);
    }
})

// var sv = myTest({username:'hhhhh',body:'body'}).save(function(err) {
//     if(err) throw err;
//     console.log('item save');
// });
// myTest.findOne({body:'body'},function(err,adventure){
//   console.log(adventure);
// });

module.exports = UserModel;