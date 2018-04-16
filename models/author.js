var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AuthorSchema = new Schema({
  first_name:{type:String, required: true, max:100},
  family_name:{type:String, required: true, max:100},
  data_of_birth: {type: Date, required: true},
  date_of_death: {type: Date, required: true}
});

AuthorSchema
.virtual('name')
.get(function(){
  return this.first_name + ', ' + this.last;
});

//Virtual for author's URL
AuthorSchema
  .virtual('url')
  .get(function() {
    return '/catalog/author/' + this._id;
  });

//Export Model
module.exports = mongoose.model('Author', AuthorSchema);