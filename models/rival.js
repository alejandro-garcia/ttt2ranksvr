import mongoose from 'mongoose';

mongoose.set('debug', true);

var rivalSchema = new mongoose.Schema({
  	_id: mongoose.Schema.Types.ObjectId,  	
  	rivalId: { type: Number, index: true },
  	psn: String,
  	rank1id: { type: Number},
  	rank2id: { type: Number},
  	char1Id: { type: Number},
  	char2Id: { type: Number}
});

export default mongoose.model('rival', rivalSchema);