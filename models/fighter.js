import mongoose from 'mongoose';

var fighterSchema = new mongoose.Schema({
   _id: Schema.Types.ObjectId,  	
  	charId: { type: Number, index: true },
  	name: String,
  	rankPoints: { type: Number},
  	image: String ,
  	shortname: String,
  	abbreviation: String
});

export default mongoose.model('Fighter', fighterSchema);
