import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';


export default new GraphQLObjectType({
  name: 'Rank',
  fields: () => ({
    rankId: {
      type: GraphQLInt,
      description: 'Rank id'
    },
    nombre: {
      type: GraphQLString,
      description: 'Rank description'
    }, 
    orden: {
      type: GraphQLInt,
      description: 'order of record'
    },
    category: {
      type: GraphQLString,
      description: 'rank category'
    },
    abbreviation: {
      type: GraphQLString,
      description: 'rank abbreviation'
    }
  })
})
