import mongoose from 'mongoose';

var fighterSchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,  	
  	charId: { type: Number, index: true },
  	name: String,
  	rankPoints: { type: Number},
  	image: String ,
  	shortname: String,
	abbreviation: { type: String, index: true }
});

export default mongoose.model('Fighter', fighterSchema);
