
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shortlydb')
var db = mongoose.connction;

var schema = mongoose.Schema ;




var urlsT = new schema ({
  id :  {type : Number , default : null} ,
  url : {type : String , default : null},
  baseUrl : {type : Number , default : null},
  code : { type: String, default: null},
  title : { type: String, default: 'index'},
  visits :  { type: Number, default: 0 },
  date: { type: Date, default: Date.now } 
})

db.urls = mongoose.model('urls', urls );

var users = new schema ({
  id :  {type : Schema.ObjectId , default : null } ,
  username : {type : String , default : null},
  password : {type : String , default : null},
  date: { type: Date, default: Date.now } 
})

db.users = mongoose.model('users', users );






module.exports = db;





