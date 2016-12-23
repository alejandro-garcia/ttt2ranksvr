import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Fighter',
  fields: () => ({
    charId: {
      type: GraphQLID,
      description: 'Peleador id'
    },
    name: {
      type: GraphQLString,
      description: 'Peleador Name'
    }, 
    rankPoints: {
      type: GraphQLFloat,
      description: 'Rank Points for promotion'
    },
    image: {
      type: GraphQLString,
      description: 'Image filename'
    },
    shortname: {
      type: GraphQLString,
      description: 'Peleador shortName'
    }, 
    abbreviation: {
      type: GraphQLString,
      description: 'Peleador name abbreviation'    	
    }
  })
})
