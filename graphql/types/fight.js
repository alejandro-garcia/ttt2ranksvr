import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import GraphQLDate from 'graphql-date';
   
export default new GraphQLObjectType({
  name: 'Fight',
  fields: () => ({
    peleaId: { type: GraphQLInt,  description: 'custom id of fight record'},
    fecha:   { type: GraphQLDate, description: 'fight date'}, 
    char1Id: { type: GraphQLInt,  description: 'id 1st Fighter' },
    char2Id: { type: GraphQLInt,  description: 'id 2nd Fighter' },
    rivalId: { type: GraphQLInt,  description: 'Id of rival'}, 
    puntos:  { type: GraphQLInt,  description: 'Id 2nd Fighter'},
    promoBattle: { type: GraphQLString, description: 'Is promo battle (s/n)' }, 
    demoBattle:  { type: GraphQLString, description: 'Is  demotion battle (s/n)'}, 
    promoted:{ type: GraphQLString, description: 'Was promoted (s/n)'}, 
    demoted: { type: GraphQLString, description: 'Was demoted (s/n)'},
    rivalRank1: { type: GraphQLInt, description: 'Id of rank rival fighter 1'},
    rivalRank2: { type: GraphQLInt, description: 'Id of rank rival fighter 2'},
    promoBattle2: { type: GraphQLString, description: 'Is promo battle fighter 2 (s/n)'},
    demoBattle2:  { type: GraphQLString, description: 'Is demotion battle fighter 2 (s/n)'},
    rivalChar1Id:  { type: GraphQLInt, description: 'Id of rival character 1'},
    rivalChar2Id:  { type: GraphQLInt, description: 'Id of rival character 2'},
    promoted2: { type: GraphQLString, description: 'Was promoted fighter 2 (s/n)'},
    demoted2: { type: GraphQLString, description: 'Was demoted fighter 2 (s/n)'},
  	rank1id: { type: GraphQLInt, description: 'rank id of char 1'},
  	rank2id: { type: GraphQLInt, description: 'rank id of char 2'}
  })
})
