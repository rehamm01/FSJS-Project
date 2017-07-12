// Load mongoose package
const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  title: String,
  artist: String,
  icon: String,
  year: String,
  media: String,
  category: String,
  museum: String,
  created_at: { type: Date, default: Date.now },
  deleted: {type: Boolean, default: false}
});


// Virtual for this entry instance URL
FileSchema
.virtual('url')
.get(function () {
  return '/entry/'+this._id
});



// FileSchema.statics.findCategory = function(category, callback){
//   return this.find({category: category}, callback);
// }

// FileSchema.methods.findSameCategory = function(callback) {
//   return this.model("File").find({category: this.category}, callback);
// }



const File = mongoose.model('File', FileSchema);
module.exports = File;

File.count({}, function(err, count) {
  if (err) {
    throw err;
  }

  // // Returns original Contemporary Art Entries but not added ones ???
  // File.find({category: "Contemporary Art, 1980-Present"}, function(err, Files) {
  //   Files.forEach(function(file) {
  //     console.log(file.title);
  //   });
  // });

  if (count > 0) return ;

	const files = require('./file.seed.json');

	File.create(files, function(err, newFiles) {
	  if (err) {
	    throw err;
	  }

	  console.log("DB seeded")
	});
});

 