var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/shortly.sqlite')
  },
  useNullAsDefault: true
});/*
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('urls').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('urls', function (link) {
      link.increments('id').primary();
      link.string('url', 255);
      link.string('baseUrl', 255);
      link.string('code', 100);
      link.string('title', 255);
      link.integer('visits');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
*/

var db = require('mongoose');
var schema = mongoose.Schema;




var urls = new schema ({
  id :  {type : Number , default : null} ,
  url : {type : String , default : null},
  baseUrl : {type : Number , default : null},
  code : { type: String, default: null},
  title : { type: String, default: 'index'},
  visits :  { type: Number, default: 0 },
  date: { type: Date, default: Date.now } 
})

db.urls = mongoose.model('urls', urls );






module.exports = db;





