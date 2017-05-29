import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

//import GraphQLDate from 'graphql-date';
//import {Factory, GraphQLDate} from 'graphql-moment';
import fighter from './fighter';

// function formatDate(dtValue){
//   return new Promise(resolve=> resolve(moment(dtValue).format("DD/MM/YYYY")));
// }
//date:   { type: Factory('DD/MM/YYYY','IdDate'), description: 'fight date'}, 
   
export default new GraphQLObjectType({
  name: 'Summary',
  fields: () => ({    
    _id: { type: GraphQLInt },
    fightsCount: { type: GraphQLInt },
    wins: { type: GraphQLInt },
    losses: { type: GraphQLInt }
  })
})
