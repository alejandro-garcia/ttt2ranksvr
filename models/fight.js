import mongoose from 'mongoose';
import fighterModel from './fighter';
import rankModel from './rank';
import rivalModel from './rival';

var fightSchema = new mongoose.Schema({
  	_id: mongoose.Schema.Types.ObjectId,  	
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
fightSchema.methods.getFighterName = (idChar) => fighterModel.findOne().where({charId: idChar}).select({name: 1}).exec();
fightSchema.methods.getRankName = (idRank)=>  rankModel.findOne().where({rankId: idRank }).select({nombre: 1}).exec();
fightSchema.methods.getPsn = (idRival)=> rivalModel.findOne().where({rivalId: idRival }).select({psn: 1}).exec();
export default mongoose.model('fight', fightSchema);