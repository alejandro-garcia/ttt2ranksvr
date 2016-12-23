import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Rival',
  fields: () => ({
    rivalId: {
      type: GraphQLID,
      description: 'Rival id'
    },
    psn: {
      type: GraphQLString,
      description: 'Rival nick name'
    }, 
    rank1id: {
      type: GraphQLInt,
      description: 'Rank id 1st Fighter'
    },
    rank2id: {
      type: GraphQLInt,
      description: 'Rank id 2nd Fighter'
    },
    char1Id: {
      type: GraphQLInt,
      description: 'Id 1st Fighter'
    }, 
    char2Id: {
      type: GraphQLInt,
      description: 'Id 2nd Fighter'    	
    }
  })
})
