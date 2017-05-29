import mongoose from 'mongoose';

mongoose.set('debug', true);

var rankSchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,  	
   rankId: { type: Number, index: true },
   nombre: String,
   orden: { type: Number},
   category: String, 
   abbreviation: String
});

export default mongoose.model('rank', rankSchema);