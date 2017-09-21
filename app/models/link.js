var crypto = require('crypto');
var mongoose = require('mongoose');


var linkSchema = mongoose.Schema ({
  url : {type : String , default : null},
  baseUrl : {type : Number , default : null},
  code : { type: String, default: null},
  title : { type: String, default: 'index'},
  visits :  { type: Number, default: 0 }
});


var Link = mongoose.model('Link', linkSchema );

  linkSchema.pre('save',function(next){
     var shasum = crypto.createHash('sha1');
      shasum.update(this.url);
      this.code= shasum.digest('hex').slice(0, 5);
      next();
  })
 

module.exports = Link;




