import mongoose from 'mongoose';

var fightSchema = new mongoose.Schema({
  	//_id: Schema.Types.ObjectId,  	
  	peleaId: { type: Number, index: true },
    fecha: { type: Date},
    char1Id: { type: Number},
  	char2Id: { type: Number},
    rivalId: { type: Number},
    puntos: { type: Number},
    promoBattle: { type: String}, 
    demoBattle: { type: String}, 
    promoted: { type: String}, 
    demoted: { type: String},
    rivalRank1: { type: Number},
    rivalRank2: { type: Number},
    promoBattle2: { type: String},
    demoBattle2:  { type: String},
    rivalChar1Id:  { type: Number},
    rivalChar2Id: { type: Number},
    promoted2: { type: String},
    demoted2: { type: String},
  	rank1id: { type: Number},
  	rank2id: { type: Number}
});

export default mongoose.model('Fight', fightSchema);