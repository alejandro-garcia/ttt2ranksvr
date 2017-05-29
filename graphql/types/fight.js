import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

//import GraphQLDate from 'graphql-date';
import {Factory, GraphQLDate} from 'graphql-moment';
import fighter from './fighter';
//import moment from 'moment';

function getFighterName(ctx, charId){
  if (Number(charId) != -1){
    return new Promise(resolve=>{ctx.getFighterName(charId).then(retValue=>{
      if (retValue){
          resolve(retValue.name);
      } else {
          resolve("not found");
      }
    })
    .catch(err=>resolve("err: " + err))
    });    
  } else {
    return new Promise(resolve=>resolve(""));
  }
}

function getRankName(ctx, rankId){
    if (Number(rankId) != -1){
    return new Promise(resolve=>{ctx.getRankName(rankId)
       .then(retValue=> resolve((retValue) ? retValue.nombre: "not found"))
       .catch(err=>resolve("err: " + err))
    });    
  } else {
    return new Promise(resolve=>resolve(""));
  }
}

function getPsn(ctx, rivalId){
  return new Promise(resolve=>{
    ctx.getPsn(rivalId)
      .then(retValue => resolve((retValue) ? retValue.psn: "not found"))
      .catch(err => resolve("err: " + err))      
    }); 
}

// function formatDate(dtValue){
//   return new Promise(resolve=> resolve(moment(dtValue).format("DD/MM/YYYY")));
// }
   
export default new GraphQLObjectType({
  name: 'Fight',
  fields: () => ({
    peleaId: { type: GraphQLInt,  description: 'custom id of fight record'},
    fecha:   { type: Factory('DD/MM/YYYY','Fecha'), description: 'fight date'}, 
    char1Id: { type: GraphQLInt,  description: 'id 1st Fighter' },
    char1Name: { type: GraphQLString, resolve: (fight) => getFighterName(fight, fight.char1Id)},    
    char2Id: { type: GraphQLInt,  description: 'id 2nd Fighter' },
    char2Name: { type: GraphQLString, resolve: (fight) => getFighterName(fight, fight.char2Id)},        
    rivalId: { type: GraphQLInt,  description: 'Id of rival'}, 
    psn: { type: GraphQLString, resolve: (fight)=> getPsn(fight,fight.rivalId)},
    puntos:  { type: GraphQLInt,  description: 'Id 2nd Fighter'},
    promoBattle: { type: GraphQLString, description: 'Is promo battle (s/n)' }, 
    demoBattle:  { type: GraphQLString, description: 'Is  demotion battle (s/n)'}, 
    promoted:{ type: GraphQLString, description: 'Was promoted (s/n)'}, 
    demoted: { type: GraphQLString, description: 'Was demoted (s/n)'},
    rivalRank1: { type: GraphQLInt, description: 'Id of rank rival fighter 1'},    
    rivalRank1Name: { type: GraphQLString, resolve: (fight)=> getRankName(fight, fight.rivalRank1)},
    rivalRank2: { type: GraphQLInt, description: 'Id of rank rival fighter 2'},
    rivalRank2Name: { type: GraphQLString, resolve: (fight)=> getRankName(fight, fight.rivalRank2)},
    promoBattle2: { type: GraphQLString, description: 'Is promo battle fighter 2 (s/n)'},
    demoBattle2:  { type: GraphQLString, description: 'Is demotion battle fighter 2 (s/n)'},
    rivalChar1Id:  { type: GraphQLInt, description: 'Id of rival character 1'},
    rivalChar1Name: { type: GraphQLString, resolve: (fight)=> getFighterName(fight, fight.rivalChar1Id) },
    rivalChar2Id:  { type: GraphQLInt, description: 'Id of rival character 2'},
    rivalChar2Name: { type: GraphQLString, resolve: (fight)=> getFighterName(fight, fight.rivalChar2Id) },
    promoted2: { type: GraphQLString, description: 'Was promoted fighter 2 (s/n)'},
    demoted2: { type: GraphQLString, description: 'Was demoted fighter 2 (s/n)'},
  	rank1id: { type: GraphQLInt, description: 'rank id of char 1'},
    rank1Name: { type: GraphQLString, resolve: (fight)=> getRankName(fight, fight.rank1id)},
  	rank2id: { type: GraphQLInt, description: 'rank id of char 2'},
    rank2Name: { type: GraphQLString, resolve: (fight)=> getRankName(fight, fight.rank2id)}
  })
})
