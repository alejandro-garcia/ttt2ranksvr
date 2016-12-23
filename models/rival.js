import mongoose from 'mongoose';

var rivalSchema = new mongoose.Schema({
  	//_id: Schema.Types.ObjectId,  	
  	rivalId: { type: Number, index: true },
  	psn: String,
  	rank1id: { type: Number},
  	rank2id: { type: Number},
  	char1Id: { type: Number},
  	char2Id: { type: Number}
});

export default mongoose.model('Rival', rivalSchema);