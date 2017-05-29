import mongoose from 'mongoose';

var summarySchema = new mongoose.Schema({
  	_id: { type: Number},  	
    fightsCount: { type: Number},
  	wins: { type: Number},
    losses: { type: Number}
});
// fightSchema.methods.getFighterName = (idChar) => fighterModel.findOne().where({charId: idChar}).select({name: 1}).exec();
// fightSchema.methods.getRankName = (idRank)=>  rankModel.findOne().where({rankId: idRank }).select({nombre: 1}).exec();
// fightSchema.methods.getPsn = (idRival)=> rivalModel.findOne().where({rivalId: idRival }).select({psn: 1}).exec();
export default mongoose.model('summary', summarySchema, 'fights');