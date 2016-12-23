import mongoose from 'mongoose';

var rankSchema = new mongoose.Schema({
  	//_id: Schema.Types.ObjectId,  	
  	rankId: { type: Number, index: true },
   nombre: String,
   orden: { type: Number},
   category: String, 
   abbreviation: String
});

export default mongoose.model('Rank', rankSchema);