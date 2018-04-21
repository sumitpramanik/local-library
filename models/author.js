var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;
var AuthorSchema = new Schema({
  first_name:{type:String, required: true, max:100},
  family_name:{type:String, required: true, max:100},
  date_of_birth: {type: Date, required: true},
  date_of_death: {type: Date, required: true}
});

AuthorSchema
.virtual('name')
.get(function(){
  return this.first_name + ', ' + this.family_name;
});

//Virtual for author's URL
AuthorSchema
  .virtual('url')
  .get(function() {
    return '/catalog/author/' + this._id;
  });

AuthorSchema
  .virtual('DOB')
  .get(function() {
    return moment(this.date_of_birth).format('MMM Do, YYYY');
  });

AuthorSchema
  .virtual('DOD')
  .get(function() {
    return moment(this.date_of_death).format('MMM Do, YYYY');
  });

//Export Model
module.exports = mongoose.model('Author', AuthorSchema);